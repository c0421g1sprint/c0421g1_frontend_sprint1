import {INews} from "./INews";

export interface INewsType {
  newsTypeId: number;
  newsTypeName: string;

  newsList: INews[];
}
