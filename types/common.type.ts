export interface Response {
    code: 200 | 500;
    message?: string;
}

export interface EntityResponse<T = any> extends Response {
    data: {
        entity: T;
    };
};

export interface ListResponse<T = any> extends Response {
    data: {
        list: T[];
        recordsTotal: number;
    };
};

