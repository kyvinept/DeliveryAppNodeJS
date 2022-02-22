import ApiError from 'errors/ApiError';
import strings from 'strings';
import {injectable} from 'tsyringe';
import RestaurantRepository from 'repositories/restaurantRepository';
import {Location} from 'models/location';

export interface RestaurantCreateModel {
  ownerId: number;
  name: string;
  description: string;
  images: string[];
  location: Location;
}

@injectable()
class RestaurantService {
  constructor(private restaurantRepository: RestaurantRepository) {}

  create = async (model: RestaurantCreateModel) => {
    const foundedRestaurant =
      await this.restaurantRepository.findOneByCondition({name: model.name});

    if (foundedRestaurant) {
      throw ApiError.unprocessableEntity(
        strings.restaurant.restaurantAlreadyExist,
      );
    }

    const restaurant = await this.restaurantRepository.create({
      name: model.name,
      description: model.description,
      images: model.images,
      owner_id: model.ownerId,
      location: model.location,
    });

    return restaurant;
  };

  getAll = async (page: number, perPage: number) => {
    const restaurants = await this.restaurantRepository.getAll(
      (page - 1) * perPage,
      perPage,
    );

    const totalCount = await this.restaurantRepository.getCount();

    return {restaurants, totalPage: totalCount / perPage};
  };

  getOne = async (id: number) => {
    const restaurant = await this.restaurantRepository.findOneByCondition({id});
    if (!restaurant) {
      throw ApiError.notFound(strings.restaurant.restaurantNotFound);
    }

    return restaurant;
  };
}

export default RestaurantService;
