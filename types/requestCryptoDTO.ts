import { IsDateString, IsEnum, IsNotEmpty } from 'class-validator';
import { CurrencyPairs } from '~/types/currencyPairs';
import { TimeIntervals } from '~/types/timeIntervals';
import { IRequestFormData } from './requestFormData';

export class RequestCryptoDTO implements IRequestFormData {
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