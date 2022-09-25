import { CancelTokenSource } from 'axios'
import { IFindTeams } from './find-teams.interface'
import { IRenderList } from './render-list.interface'
import { ITeamMatchesItem } from './team-matches.interface'
import { ITeamItem } from './teams.interface'

export interface IMatches {
  team: ITeamItem
  teamCancelTokenSource: CancelTokenSource
  listMatches: IRenderList<ITeamMatchesItem>
  teamsMatchesCancelTokenSource: CancelTokenSource
  searchMatches: IRenderList<ITeamMatchesItem>
  searchMatchesCancelTokenSource: CancelTokenSource
  searchFilter: IFindTeams
}
