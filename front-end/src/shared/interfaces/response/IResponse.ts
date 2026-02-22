import { IMetaPagination } from './IMetaPagination';

export interface IList<T> {
    data: T[];
    meta: IMetaPagination;
}

export interface IResponse<T> {
    data?: T;
    message?: string;
    statusCode: number;
}

export interface IListResponse<T> {
    data?: IList<T>;
    message?: string;
    statusCode: number;
}
