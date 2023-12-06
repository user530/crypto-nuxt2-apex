import { IsDateString, IsEnum, IsNotEmpty, IsString } from 'class-validator';
import { CurrencyPairs } from './currencyPairs';
import { TimeIntervals } from './timeIntervals';

export interface IRequestFormData {
    symbol: CurrencyPairs,
    interval: TimeIntervals,
    start_date: string,
    end_date: string,
};

export class RequestFormDataDTO implements IRequestFormData {
    @IsNotEmpty()
    @IsEnum(CurrencyPairs)
    symbol: CurrencyPairs;

    @IsNotEmpty()
    @IsEnum(TimeIntervals)
    interval: TimeIntervals;

    @IsNotEmpty()
    @IsDateString()
    start_date: string;

    @IsNotEmpty()
    @IsDateString()
    end_date: string;
}