import {INewsType} from "./INewsType";

export interface INews {
  newsId: number;
  newsTitle: string;
  newsBrief: string;
  newsContent: string;
  newsImageUrl: string;
  newsPostDate: string;

  newsType: INewsType;
}
