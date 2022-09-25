import { IPaginationParams } from './pagination-params.interface'

export interface ISearchParams extends IPaginationParams {
  address: string
  startDate: Date
  endDate: Date
}
