import { IPaginationParams } from './pagination-params.interface';

export interface INotificationsParams extends IPaginationParams {
  timestamp: number;
}
