import { CancelTokenSource } from 'axios'
import { ITypeSport } from './type-sport.interface'
import { IUserAddress } from './user-address.interface'

export interface IConfigs {
  typesSport: ITypeSport[]
  typesSportCancelTokenSource: CancelTokenSource
  address: IUserAddress[]
  addressCancelTokenSource: CancelTokenSource
}
