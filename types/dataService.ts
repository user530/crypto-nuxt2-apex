import { ApiQueryOptions } from '~/types/apiQueryOptions';

export interface IDataService<InputDataType, OutputDataType> {
    fetchData(options: ApiQueryOptions): Promise<InputDataType>;
    transformData(inputData: InputDataType): OutputDataType;
}