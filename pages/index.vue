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
import { IRequestFormData, RequestFormDataDTO } from '~/types/requestFormData';
import { IDataService } from '~/types/dataService';
import { SuccessAPIMessage, ErrorAPIMessage } from '~/types/responseCryptoDTO';
import { HomeApiDataService } from '~/services/homeService';
import { ValidationService } from '~/services/validationService';

const isLoaded = ref<boolean>(false);
const chartData = ref<ApexCandlesSeries[]>([]);
const dataService = ref<IDataService<SuccessAPIMessage | ErrorAPIMessage, ApexCandlesSeries>>(new HomeApiDataService());

const formSubmitHandler = async (marketFormData: IRequestFormData): Promise<void> => {
    console.log('FORM SUBMIT FIRED!');
    try {
        const { fetchData, transformData } = dataService.value;

        const isValid = await ValidationService.validateClass(RequestFormDataDTO, marketFormData);

        if (!isValid)
            return alert('Incorrect form data!');

        console.log(marketFormData)

        const marketData = await fetchData(
            {
                baseUrl: process.env.API_URI ?? 'localhost:3000/getData',
                queryParams: { ...marketFormData }
            })

        console.log(marketData)

        if (!marketData.meta && !marketData.values)
            return alert('Data fetch failed!');

        const marketDataChart = transformData(marketData);

        chartData.value = [marketDataChart];
    } catch (error) {
        console.error(error);
    }

}

onMounted(async () => {
    console.log('Mounted fired!');
    try {
        isLoaded.value = false;
        // console.log('BEFORE FETCH!');
        // const res = await fetch('/data.json');
        // const data = await res.json();
        // console.log('AFTER FETCH!');
        // console.log(data);
        // const { dataSeries } = data;

        // if (!dataSeries)
        //     throw new Error('Failed to extract data series from the request!');

        // const toDataset = dataSeries.map(
        //     (dataItem: {
        //         x: number,
        //         y: number[]
        //     }) => ({ x: new Date(dataItem.x), y: dataItem.y })
        // );

        // const newCandleDataset: ApexCandlesSeries[] = [{
        //     name: 'series-1',
        //     data: toDataset as CandlePrice[]
        // }];

        // chartData.value = newCandleDataset;

        // isLoaded.value = true;
    } catch (error) {
        console.error(error);
    }
})


</script>