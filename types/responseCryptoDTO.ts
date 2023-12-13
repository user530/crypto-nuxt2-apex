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
        start_date: string;
        end_date: string;
        symbol: string;
        interval: string;
        data_size: number;
    };
    data: {
        datetime: string;
        open: number;
        high: number;
        low: number;
        close: number;
    }[];
};