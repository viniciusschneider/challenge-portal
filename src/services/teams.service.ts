import { CancelToken } from "axios";
import { ICreateTeam } from "@/interfaces/create-team.interface";
import { IIdResponse } from "@/interfaces/id-response.interface";
import { IListTeams, ITeamItem } from "@/interfaces/teams.interface";
import { ITypeSport } from "@/interfaces/type-sport.interface";
import http from "@/common/http";
import { IPaginationParams } from "@/interfaces/pagination-params.interface";

export class TeamsService {
  async create(params: ICreateTeam): Promise<IIdResponse> {
    return await http.post<IIdResponse>('teams', params);
  }

  async getTypesSport(cancelToken: CancelToken): Promise<ITypeSport[]> {
    return await http.get<ITypeSport[]>('teams/types-sport', { cancelToken });
  }

  async getTeams(cancelToken: CancelToken, params: IPaginationParams): Promise<IListTeams> {
    return await http.get<IListTeams>(`teams`, { cancelToken, params });
  }
}

export default new TeamsService();
