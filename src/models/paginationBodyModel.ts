import {Model} from 'objection';

export interface PaginationBodyModel {
  data: {
    data: Model[];
    totalPage: number;
  };
  page: number;
  perPage: number;
}
