import { IMeta } from './meta.interface';

export interface IRenderList<T> {
  items: T[];
  load?: boolean;
  meta: IMeta;
}
