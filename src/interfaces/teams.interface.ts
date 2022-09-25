import { CancelTokenSource } from 'axios';
import { IRenderList } from './render-list.interface';

export interface ITeams {
  listTeams: IRenderList<ITeamItem>;
  teamsListCancelTokenSource: CancelTokenSource;
}

export interface ITeamItem {
  id: number;
  name: string;
  url: string;
}
