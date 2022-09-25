import { IAddress } from './address.interface'

export interface ICreateMatch {
  address?: IAddress
  addressId?: number
  date: Date
  teamId: number
}
