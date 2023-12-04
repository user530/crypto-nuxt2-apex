<template>
    <form @submit.prevent="handleSubmit">
        <div class="space-y-12">
            <div class="border-b border-gray-900/10 pb-12">
                <h2 class="text-base font-semibold leading-7 text-gray-900">Market data:</h2>

                <div class="sm:col-span-3">
                    <label for="symbol" class="block text-sm font-medium leading-6 text-gray-900">Currency
                        pair</label>
                    <div class="mt-2">
                        <select id="symbol" name="symbol" v-model="marketFormData.symbol"
                            class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6">
                            <option v-for="option in currencyOptions" :value="option.value">{{ option.label }}</option>
                        </select>
                    </div>
                </div>

                <div class="sm:col-span-3">
                    <label for="interval" class="block text-sm font-medium leading-6 text-gray-900">Time
                        interval</label>
                    <div class="mt-2">
                        <select id="interval" name="interval" v-model="marketFormData.interval"
                            class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6">
                            <option v-for="interval in intervalOptions" :value="interval.value">{{ interval.label }}
                            </option>
                        </select>
                    </div>
                </div>

                <div class="sm:col-span-3">
                    <label for="start_date" class="block text-sm font-medium leading-6 text-gray-900">Start date</label>
                    <div class="mt-2">
                        <input type="date" id="start_date" name="start_date" v-model="marketFormData.start_date"
                            class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6">
                    </div>
                </div>

                <div class="sm:col-span-3">
                    <label for="end_date" class="block text-sm font-medium leading-6 text-gray-900">End date</label>
                    <div class="mt-2">
                        <input type="date" id="end_date" name="end_date" v-model="marketFormData.end_date"
                            class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6">
                    </div>
                </div>
            </div>
        </div>

        <div class="mt-6 flex items-center justify-end gap-x-6">
            <button type="submit"
                class="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">Load
                data</button>
        </div>
    </form>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue';

enum CurrencyPairs {
    BTC = "BTC/USD",
    ETH = "ETH/USD",
    "BTC/ETH" = "BTC/ETH",
};

enum TimeIntervals {
    "1 min" = "1min",
    "5 min" = "5min",
    "15 min" = "15min",
    "30 min" = "30min",
    "45 min" = "45min",
    "1 hour" = "1h",
    "2 hours" = "2h",
    "4 hours" = "4h",
    "1 day" = "1day",
    "1 week" = "1week",
    "1 month" = "1month",
};

export interface IMarketFormData {
    symbol: CurrencyPairs,
    interval: TimeIntervals,
    start_date: string,
    end_date: string,
};

const currencyOptions = Object
    .entries(CurrencyPairs)
    .map((currencyPair) => ({ label: currencyPair[0], value: currencyPair[1] }));

const intervalOptions = Object
    .entries(TimeIntervals)
    .map((intervalPair) => ({ label: intervalPair[0], value: intervalPair[1] }));

const marketFormData = ref<IMarketFormData>({
    symbol: CurrencyPairs.BTC,
    interval: TimeIntervals['1 day'],
    start_date: new Date(new Date().setDate(0)).toISOString().slice(0, 10),
    end_date: new Date().toISOString().slice(0, 10),
});

const handleSubmit = () => {
    emit('marketFormSubmitted', { ...marketFormData.value });
}

const emit = defineEmits(['marketFormSubmitted']);

onMounted(
    handleSubmit
)

</script>