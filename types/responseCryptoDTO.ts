interface BaseAPIMessage {
    status: 'success' | 'error';
};

export interface ErrorAPIMessage extends BaseAPIMessage {
    status: 'error';
    errors: string[];
};

export interface SuccessAPIMessage extends BaseAPIMessage {
    status: 'success';
    meta: {
        start_date: Date;
        end_date: Date;
        symbol: string;
        interval: string;
        data_size: number;
    };
    data: {
        datetime: Date;
        open: number;
        high: number;
        low: number;
        close: number;
    }[];
};