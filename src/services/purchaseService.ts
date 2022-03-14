import ApiError from 'errors/ApiError';
import {PlatformSpecificPurchaseModel} from 'models/database/platformSpecificPurchaseModel';
import {Purchase} from 'models/database/purchase';
import {PurchasePlatform} from 'models/purchasePlatform';
import PurchaseRepository from 'repositories/purchaseRepository';
import strings from 'strings';
import {delay, inject, injectable} from 'tsyringe';
import ApplePurchaseService from './applePurchaseService';

@injectable()
class PurchaseService {
  constructor(
    private purchaseRepository: PurchaseRepository,
    private applePurchaseService: ApplePurchaseService,
  ) {}

  verify = async (
    receipt: string,
    platform: PurchasePlatform,
    userId: number,
  ) => {
    let specificPurchaseData: PlatformSpecificPurchaseModel = null;
    if (platform == PurchasePlatform.apple) {
      specificPurchaseData = await this.applePurchaseService.verify(receipt);
    }

    const purchaseWithTheSameReceipt =
      await this.purchaseRepository.findOneByCondition({receipt});

    if (
      purchaseWithTheSameReceipt.user_id != userId &&
      purchaseWithTheSameReceipt.receipt == receipt
    ) {
      throw ApiError.unprocessableEntity(strings.purchase.receiptsAlreadyExist);
    }

    const purchase = await this.purchaseRepository.findOneByCondition({
      user_id: userId,
    });

    if (purchase) {
      purchase.receipt = receipt;
      purchase.platform = platform;
      purchase.product_id = specificPurchaseData.productId;
      purchase.expiration_date = specificPurchaseData.expirationDate;
      purchase.transaction_id = specificPurchaseData.transactionId;
      return;
    }

    await this.purchaseRepository.create({
      receipt,
      platform,
      product_id: specificPurchaseData.productId,
      expiration_date: specificPurchaseData.expirationDate,
      transaction_id: specificPurchaseData.transactionId,
      user_id: userId,
    });
  };

  checkSubscriptions = async () => {
    const nowDate = new Date().toISOString();
    const purchases = await this.purchaseRepository.getAll({
      whereParams: {
        name: 'expiration_date',
        conditionMark: '<',
        value: nowDate,
      },
    });

    console.log('purchases', purchases);
    purchases.forEach(async (item) => {
      const result = await this.checkIfValid(item.receipt, item.platform);
      if (result) {
        await this.purchaseRepository.updatePurchase(item, result);
      } else {
        await this.purchaseRepository.delete(item);
      }
    });
  };

  private checkIfValid = async (
    receipt: string,
    platform: PurchasePlatform,
  ) => {
    try {
      if (platform == PurchasePlatform.apple) {
        return await this.applePurchaseService.verify(receipt);
      }
    } catch (e) {
      return null;
    }
  };
}

export default PurchaseService;
