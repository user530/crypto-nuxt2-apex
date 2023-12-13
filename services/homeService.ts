import axios from 'axios';
import { IDataService } from '~/types/dataService';
import { ApiQueryOptions } from '~/types/apiQueryOptions';
import { ApexCandlesSeries } from '~/types/chartTypes';
import { ErrorAPIMessage, SuccessAPIMessage } from '~/types/responseCryptoDTO';

export class HomeApiDataService implements IDataService<ErrorAPIMessage | SuccessAPIMessage, ApexCandlesSeries> {
    async fetchData(options: ApiQueryOptions): Promise<ErrorAPIMessage | SuccessAPIMessage> {
        const { baseUrl, queryParams } = options;

        const queryString = Object
            .entries(queryParams)
            .reduce(
                (reducer, keyValPair) => reducer += `&${keyValPair[0]}=${keyValPair[1]}`, '');

        const requestURL = baseUrl + queryString;

        try {
            const request = await axios.get<ErrorAPIMessage | SuccessAPIMessage>(requestURL);

            if (request.status !== 200)
                throw new Error('Data fetch request failed!');

            if (request.data.status === 'error')
                throw new Error(request.data.errors.join(', '));


            return request.data
        } catch (error) {
            throw error;
        }
    }

    transformData(inputData: ErrorAPIMessage | SuccessAPIMessage): ApexCandlesSeries {
        try {
            if (inputData.status === 'error')
                throw new Error('Cant transform incorrect data!');

            const { meta: { start_date, end_date, symbol, interval }, data } = inputData;

            const newData: ApexCandlesSeries = {
                name: `Ticker: ${symbol}. Interval: ${interval}. Date range: ${new Date(start_date).toUTCString()}-${new Date(end_date).toUTCString()}`,
                data: data.map(({ datetime, open, high, low, close }) => ({
                    x: new Date(datetime).getTime(),
                    y: [open, high, low, close]
                }))
            }

            return newData;
        } catch (error) {
            throw error
        }
    }
}