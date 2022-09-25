import { CancelToken } from 'axios';
import { ICreateTeam } from '@/interfaces/create-team.interface';
import { IIdResponse } from '@/interfaces/id-response.interface';
import { ITeamItem } from '@/interfaces/teams.interface';
import { ITypeSport } from '@/interfaces/type-sport.interface';
import http from '@/common/http';
import { IPaginationParams } from '@/interfaces/pagination-params.interface';
import { IRenderList } from '@/interfaces/render-list.interface';

export class TeamsService {
  async create(
    cancelToken: CancelToken,
    params: ICreateTeam
  ): Promise<IIdResponse> {
    return await http.post<IIdResponse, ICreateTeam>('teams', params, {
      cancelToken
    });
  }

  async getTypesSport(cancelToken: CancelToken): Promise<ITypeSport[]> {
    return await http.get<ITypeSport[]>('teams/types-sport', { cancelToken });
  }

  async getTeams(
    cancelToken: CancelToken,
    params: IPaginationParams
  ): Promise<IRenderList<ITeamItem>> {
    return await http.get<IRenderList<ITeamItem>>('teams', {
      cancelToken,
      params
    });
  }
}

export default new TeamsService();
