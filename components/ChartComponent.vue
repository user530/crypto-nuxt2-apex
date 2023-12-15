<template>
    <div id="chart-wrapper">
        <apexchart type="candlestick" :height="chartHeight" :width="'100%'" :options="chartOptions" :series="dataSeries">
        </apexchart>
    </div>
</template>

<script setup lang="ts">
import { ApexOptions } from 'apexcharts';
import { computed, ref } from 'vue';
import { ApexCandlesSeries } from '~/types/chartTypes';

interface IChartComponent {
    chartWidth?: number,
    chartHeight?: number,
    // chartOptions?: ApexOptions,
    dataSeries: ApexCandlesSeries[],
}

const props = withDefaults(defineProps<IChartComponent>(),
    {
        chartHeight: 350,
        chartWidth: 700,
    });

const chartOptions = computed((): ApexOptions => {
    const [ticker, interval, range] = props.dataSeries[0].name.split('.');

    return {
        chart: {
            type: 'candlestick',
            height: 350
        },
        title: {
            text: `${ticker}, ${interval}`,
            align: 'left',
            style: {
                fontSize: '16px'
            }
        },
        xaxis: {
            type: 'datetime'
        },
        yaxis: {
            tooltip: {
                enabled: true
            }
        }
    }
})




</script>