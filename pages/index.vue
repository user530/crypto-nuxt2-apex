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
import ChartComponent from '~/components/ChartComponent.vue';
import ControlFormComponent from '~/components/ControlFormComponent.vue';
import { ApexCandlesSeries, CandlePrice } from '~/types/chartTypes';
import { IRequestFormData } from '~/types/requestFormData';
import { IDataService } from '~/types/dataService';
import { TwelveDataService } from '~/services/dataService';
import { ValidationService } from '~/services/validationService';

const isLoaded = ref<boolean>(false);
const chartData = ref<ApexCandlesSeries[]>([]);
const dataService = ref<IDataService<any, any>>(new TwelveDataService());

const formSubmitHandler = (marketFormData: IRequestFormData) => {
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

        if (!dataSeries)
            throw new Error('Failed to extract data series from the request!');

        const toDataset = dataSeries.map(
            (dataItem: {
                x: number,
                y: number[]
            }) => ({ x: new Date(dataItem.x), y: dataItem.y })
        );

        const newCandleDataset: ApexCandlesSeries[] = [{
            name: 'series-1',
            data: toDataset as CandlePrice[]
        }];

        chartData.value = newCandleDataset;

        isLoaded.value = true;
    } catch (error) {
        console.error(error);
    }
})


</script>