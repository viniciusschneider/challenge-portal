import { IAccessToken } from './access-token.interface'
import { IUser } from './user.interface'

export interface IStateUser {
  accessToken: IAccessToken
  user: IUser
}
