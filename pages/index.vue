<template>
    <div id="page-wrapper" class="mx-auto max-w-7xl px-4 py-24 sm:px-6 sm:py-32 lg:px-8">
        <h1 class="text-2xl font-bold leading-7 text-gray-900 sm:truncate sm:text-3xl sm:tracking-tight mb-24">Crypto Prices
        </h1>
        <ControlFormComponent @marketFormSubmitted="formSubmitHandler" />
        <ChartComponent v-if="isLoaded" :dataSeries="chartData" />
    </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import ChartComponent from '~/components/ChartComponent.vue';
import ControlFormComponent from '~/components/ControlFormComponent.vue';
import { ApexCandlesSeries } from '~/types/chartTypes';
import { IRequestFormData, RequestFormDataDTO } from '~/types/requestFormData';
import { IDataService } from '~/types/dataService';
import { SuccessAPIMessage, ErrorAPIMessage } from '~/types/responseCryptoDTO';
import { HomeApiDataService } from '~/services/homeService';
import { ValidationService } from '~/services/validationService';

const isLoaded = ref<boolean>(false);
const chartData = ref<ApexCandlesSeries[]>([]);
const dataService = ref<IDataService<SuccessAPIMessage | ErrorAPIMessage, ApexCandlesSeries>>(new HomeApiDataService());

const formSubmitHandler = async (marketFormData: IRequestFormData): Promise<void> => {
    try {
        isLoaded.value = false;

        const { fetchData, transformData } = dataService.value;

        const isValid = await ValidationService.validateClass(RequestFormDataDTO, marketFormData);

        if (!isValid)
            return alert('Incorrect form data!');

        const marketData = await fetchData(
            {
                baseUrl: process.env.API_URI ?? 'localhost:5000/getData',
                queryParams: { ...marketFormData }
            })

        if (marketData.status === 'error')
            throw new Error('Data fetch failed!');

        const marketDataChart = transformData(marketData);

        chartData.value = [marketDataChart];

        isLoaded.value = true;
    } catch (error) {
        console.error(error);
    }

}

</script>