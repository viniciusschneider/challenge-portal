import http from "@/common/http";
import { IAccessToken } from "@/interfaces/access-token.interface";
import { ILogin } from "@/interfaces/login.interface";

export class LoginService {
  async login(params: ILogin): Promise<IAccessToken> {
    return http.post<IAccessToken>('auth/login', params);
  }
}

export default new LoginService();
