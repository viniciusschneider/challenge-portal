import http from '@/common/http'
import { IConfirmMatchParams } from '@/interfaces/confirm-match-params.interface'
import { ICreateMatch } from '@/interfaces/create-match.interface'
import { IIdResponse } from '@/interfaces/id-response.interface'
import { IPaginationParams } from '@/interfaces/pagination-params.interface'
import { IRenderList } from '@/interfaces/render-list.interface'
import { ISearchParams } from '@/interfaces/search-params.interface'
import { ITeamMatchesItem } from '@/interfaces/team-matches.interface'
import { ITeamItem } from '@/interfaces/teams.interface'
import { CancelToken } from 'axios'

export class MatchesService {
  async create(
    cancelToken: CancelToken,
    params: ICreateMatch
  ): Promise<IIdResponse> {
    return http.post<IIdResponse, ICreateMatch>('matches', params, {
      cancelToken
    })
  }

  async searchMatches(
    cancelToken: CancelToken,
    params: ISearchParams
  ): Promise<IRenderList<ITeamMatchesItem>> {
    return http.get<IRenderList<ITeamMatchesItem>>('matches/search', {
      cancelToken,
      params
    })
  }

  async getTeamMatches(
    cancelToken: CancelToken,
    teamId: number,
    params: IPaginationParams
  ): Promise<IRenderList<ITeamMatchesItem>> {
    return http.get<IRenderList<ITeamMatchesItem>>(
      `matches/team-matches/${teamId}`,
      { cancelToken, params }
    )
  }

  async getTeam(cancelToken: CancelToken, teamId: number): Promise<ITeamItem> {
    return http.get<ITeamItem>(`teams/${teamId}`, { cancelToken })
  }

  async confirmMatch(
    cancelToken: CancelToken,
    params: IConfirmMatchParams
  ): Promise<IIdResponse> {
    return http.post<IIdResponse, IConfirmMatchParams>(
      'matches/confirm-match',
      params,
      {
        cancelToken
      }
    )
  }
}

export default new MatchesService()
