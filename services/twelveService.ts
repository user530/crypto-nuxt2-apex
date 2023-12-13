import axios from 'axios';
import { IDataService } from '~/types/dataService';
import { ApiQueryOptions } from '~/types/apiQueryOptions';
import { TwelveDataAPI } from '~/types/twelveDataAPI';
import { ApexCandlesSeries, CandlePrice } from '~/types/chartTypes';

export class TwelveDataService implements IDataService<TwelveDataAPI, ApexCandlesSeries> {
    async fetchData(options: ApiQueryOptions): Promise<TwelveDataAPI> {
        const { baseUrl, queryParams } = options;
        const queryStr = Object
            .entries(queryParams)
            .reduce(
                (paramString, keyValPair) => paramString += `&${keyValPair[0]}=${keyValPair[1]}`, '');

        const requestURI = baseUrl + queryStr

        const request = await axios.get<TwelveDataAPI>(requestURI);
        if (request.status !== 200)
            throw new Error('Data fetch request failed!');

        return request.data;
    }

    transformData(inputData: TwelveDataAPI): ApexCandlesSeries {
        const { meta, values } = inputData;

        const candlePrices: CandlePrice[] = values
            .map(
                ({ datetime, open, high, low, close }) =>
                ({
                    x: new Date(datetime).getTime(),
                    y: [parseInt(open), parseInt(high), parseInt(low), parseInt(close)]
                }));

        return { name: meta.symbol, data: candlePrices };
    }
}