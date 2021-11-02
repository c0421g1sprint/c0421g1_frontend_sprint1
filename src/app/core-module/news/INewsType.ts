import {INews} from './INews';

export interface INewsType {
  typeId: number;
  typeName: string;

  newsList: INews[];
}
