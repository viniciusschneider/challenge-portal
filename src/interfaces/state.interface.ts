import { IConfigs } from './configs.interface';
import { IMatches } from './matches.interface';
import { INotifications } from './notifications';
import { IStateUi } from './state-ui.interface';
import { IStateUser } from './state-user.interface';
import { ITeams } from './teams.interface';

export interface IState {
  configs: IConfigs;
  matches: IMatches;
  notifications: INotifications;
  teams: ITeams;
  ui: IStateUi;
  user: IStateUser;
}
