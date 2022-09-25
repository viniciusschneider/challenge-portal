import { IPaginationParams } from './pagination-params.interface';

export interface IFindTeamsParams extends IPaginationParams {
  address: string;
  endDate: Date;
  startDate: Date;
}
