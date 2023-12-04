<template>
    <div id="chart-wrapper">
        <apexchart type="candlestick" :height="chartHeight" :width="chartWidth" :options="chartOptions"
            :series="dataSeries">
        </apexchart>
    </div>
</template>

<script setup lang="ts">
import { ApexOptions } from 'apexcharts';

export interface ApexCandlesSeries {
    name: string,
    data: CandlePrice[],
}

interface CandlePrice {
    x: Date,
    y: [number, number, number, number],
}

interface IChartComponent {
    chartWidth?: number,
    chartHeight?: number,
    chartOptions?: ApexOptions,
    dataSeries: ApexCandlesSeries[],
}

const props = withDefaults(defineProps<IChartComponent>(),
    {
        chartHeight: 350,
        chartWidth: 700,
        chartOptions: () => ({
            chart: {
                type: 'candlestick',
                height: 350
            },
            title: {
                text: 'Crypto chart',
                align: 'left'
            },
            xaxis: {
                type: 'datetime'
            },
            yaxis: {
                tooltip: {
                    enabled: true
                }
            }
        })
    });

</script>