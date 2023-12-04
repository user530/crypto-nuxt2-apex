<template>
    <div id="page-wrapper" class="mx-auto max-w-7xl px-4 py-24 sm:px-6 sm:py-32 lg:px-8">
        <h1 class="text-2xl font-bold leading-7 text-gray-900 sm:truncate sm:text-3xl sm:tracking-tight mb-24">Crypto Prices
        </h1>
        <ControlFormComponent @marketFormSubmitted="formSubmitHandler" />
        <ChartComponent v-if="isLoaded" :dataSeries="chartData" />
    </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from "vue";
import ChartComponent, { ApexCandlesSeries } from '~/components/ChartComponent.vue';
import ControlFormComponent, { IMarketFormData } from '~/components/ControlFormComponent.vue';

const isLoaded = ref<boolean>(false);
const chartData = ref<ApexCandlesSeries[]>([]);
// const chartOptions = ref<ApexOptions>({
//     chart: {
//         type: 'candlestick',
//         height: 350
//     },
//     title: {
//         text: 'Crypto chart',
//         align: 'left'
//     },
//     xaxis: {
//         type: 'datetime'
//     },
//     yaxis: {
//         tooltip: {
//             enabled: true
//         }
//     }
// });


const formSubmitHandler = (marketFormData: IMarketFormData) => {
    console.log('FORM SUBMIT FIRED!');
    console.log(marketFormData);
    // VALIDATE DATA
    // FETCH DATA
}

onMounted(async () => {
    try {
        isLoaded.value = false;
        const res = await fetch('/data.json');
        const data = await res.json();

        const { dataSeries } = data;

        if (dataSeries) {
            const toDataset = dataSeries.map(
                (dataItem: {
                    x: number,
                    y: number[]
                }) => ({ x: new Date(dataItem.x), y: dataItem.y })
            );
            chartData.value = [{
                name: 'series-1',
                data: toDataset as any[]
            }];

            isLoaded.value = true;
        }
    } catch (error) {
        console.error(error);
    }
})


</script>