import { CancelTokenSource } from "axios";
import { ITypeSport } from "./type-sport.interface";

export interface IConfigs {
  typesSport: ITypeSport[];
  typesSportCancelTokenSource: CancelTokenSource;
}
