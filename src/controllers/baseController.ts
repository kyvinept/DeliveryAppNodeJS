import {PaginationBodyModel} from 'models/paginationBodyModel';

export default class BaseController {
  paginationBody = (model: PaginationBodyModel) => {
    return {
      data: model.data.data,
      metadata: {
        page: model.page,
        per_page: model.perPage,
        total_page: Math.ceil(model.data.totalPage),
      },
    };
  };
}
