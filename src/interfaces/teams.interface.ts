import { CancelTokenSource } from "axios";
import { IMeta } from "./meta.interface";

export interface ITeams {
  listTeams: IListTeams;
  teamsListCancelTokenSource: CancelTokenSource;
}

export interface ITeamItem {
  name: string;
  url: string;
}

export interface IListTeams {
  load: boolean;
  meta: IMeta;
  items: ITeamItem[];
}
