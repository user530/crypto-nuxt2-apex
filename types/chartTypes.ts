import { Type } from 'class-transformer';
import { IsNotEmpty, IsNumber, IsString, ValidateNested } from 'class-validator';

export interface ApexCandlesSeries {
    name: string,
    data: CandlePrice[],
}

export interface CandlePrice {
    x: number,
    y: [number, number, number, number],
}

class CandlePriceDTO implements CandlePrice {
    @IsNotEmpty()
    @IsNumber()
    x: number;

    @IsNotEmpty()
    @IsNumber({}, { each: true })
    y: [number, number, number, number];
}

export class ApexCandlesDTO implements ApexCandlesSeries {
    @IsNotEmpty()
    @IsString()
    name: string;

    @IsNotEmpty()
    @ValidateNested({ each: true })
    // @Type(() => CandlePriceDTO)  // For some reason nuxt doesnt work with 
    data: CandlePriceDTO[];
}