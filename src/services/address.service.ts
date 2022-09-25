import http from '@/common/http'
import { IFindCEP } from '@/interfaces/find-cep.interface'
import { IUserAddress } from '@/interfaces/user-address.interface'
import { CancelToken } from 'axios'

export class AddressService {
  async findCEP(cep: string): Promise<IFindCEP> {
    return http.get<IFindCEP>(`address/find-cep/${cep}`)
  }

  async userAddress(cancelToken: CancelToken): Promise<IUserAddress[]> {
    return http.get<IUserAddress[]>('address', { cancelToken })
  }
}

export default new AddressService()
