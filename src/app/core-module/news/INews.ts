import {INewsType} from './INewsType';

export interface INews {
  newsId: number;
  newsTitle: string;
  newsBrief: string;
  newsContent: string;
  imageUrl: string;
  postDate: string;

  type: INewsType;
}
