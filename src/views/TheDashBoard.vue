<template>
    <div class="card flex justify-content-center h-screen font-roboto">
        <TheSidebar :isSidebarVisible="visible" />
        <button icon="pi pi-bars" @click="visible = !visible" />

        <div class="flex items-center justify-center w-full bg-azulBG">
            <div class="w-full">
                <div class="flex gap-8 justify-center">

                    <!-- Card de Temperatura -->
                    <div class="bg-white p-3 rounded-lg shadow-md w-[15.54vw]">
                        <div class="flex items-center gap-3">
                            <div class="text-yellow-500 text-3xl">
                                <h2 class="text-base font-semibold text-cinzaMaisEscuro">Temperatura</h2>
                                <div class="flex">
                                    <img src="@/assets/imgs/image 61.svg" alt="Ícone do clima" class="w-10 h-10" />
                                    <p class="text-3xl font-semibold text-cinzaEscuro ml-2">{{ temperatura }}°C</p>
                                </div>
                            </div>
                            <div>
                                <p class="text-xs text-cinzaEscuro mt-1 ml-4">{{ minTemp }}/{{ maxTemp }}° | {{ condicao
                                    }}</p>
                            </div>
                        </div>
                    </div>

                    <!-- Card Umidade -->
                    <div class="bg-white p-3 rounded-lg shadow-md w-[15.54vw]">
                        <div class="flex items-center gap-3">
                            <div>
                                <h2 class="text-base font-semibold text-cinzaMaisEscuro">Umidade</h2>
                                <div class="flex items-center">
                                    <img src="../assets/imgs/Umidade.svg" alt="Ícone umidade" class="w-8 h-8 mt-1" />
                                    <p class="text-3xl font-semibold text-cinzaEscuro ml-2 ">{{ umidade }}%</p>
                                    <p class="text-xs -mt-4 ml-2">{{ statusUmidade }}</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    <!-- Card Sensores -->
                    <div class="bg-white p-3 rounded-lg shadow-md w-[15.54vw]">
                        <div class="flex items-center gap-3">
                            <div>
                                <h2 class="text-base font-semibold text-cinzaMaisEscuro">Sensores</h2>
                                <div class="flex">
                                    <img src="../assets/imgs/Sensor.svg" alt="Ícone sensor" class="w-10 h-10" />
                                </div>
                            </div>
                        </div>
                    </div>

                </div>

                <!-- Gráfico e Alertas -->
                <div class="flex justify-center">
                    <div class="bg-white p-4 rounded-lg shadow-md mt-6 w-full max-w-[41.66vw]">
                        <h2 class="text-lg font-bold mb-4 text-cinzaEscuro">Temperatura</h2>
                        <VueApexCharts width="100%" height="200" type="line" :options="chartOptions" :series="series" />
                    </div>

                    <div class="bg-white p-4 rounded-lg shadow-md w-[20%] h-[300px] mt-6 ml-8">
                        <h2 class="text-lg font-bold mb-4 text-cinzaEscuro text-center">Alertas</h2>
                        <div class="flex items-center gap-4 bg-CinzaFB p-1 rounded-lg border-2 shadow-sm mb-2">
                            <div class="text-red-500 text-2xl">
                                <img src="../assets/imgs/Error.svg" alt="Ícone erro" class="w-8 h-8" />
                            </div>
                            <div>
                                <p class="text-sm font-semibold text-cinzaMaisEscuro">Temperatura Alta</p>
                                <p class="text-sm text-cinzaEscuro font-semibold">A75</p>
                                <div class="flex">
                                    <p class="text-sm text-cinzaEscuro font-semibold">35.2 °C</p>
                                    <p class="text-xs text-cinzaEscuro ml-12 mt-1 font-semibold">07 de Abril 2025</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    <!-- Médias -->
                    <div class="bg-white p-4 rounded-lg shadow-md w-[18%] h-[300px] mt-6 ml-8">
                        <h2 class="text-lg font-bold mb-4 text-cinzaEscuro text-center">Médias Diarias</h2>
                        <p class="text-sm text-cinzaEscuro font-semibold mt-8">Variação Diaria: </p>
                        <p class="text-sm text-cinzaEscuro font-semibold mt-8">Maxima Registrada: {{ maxTemp }}</p>
                        <p class="text-sm text-cinzaEscuro font-semibold mt-8">Minima Registrada: {{ minTemp }}</p>
                    </div>
                </div>

                <!-- Gráfico Umidade -->
                <div class="flex bg-blue items-center">
                    <div class="bg-white ml-[6.5em] p-4 rounded-lg shadow-md mt-6 w-full max-w-[41.66vw]">
                        <h2 class="text-lg font-bold -mb-2 text-cinzaEscuro">Umidade</h2>
                        <VueApexCharts width="100%" height="150" type="bar" :options="barChartOptions"
                            :series="barSeries" />
                    </div>
                    <button
                        class="w-[25%] h-20 bg-verdeButton mt-6 rounded-xl ml-[10em] flex items-center justify-center text-base font-bold text-black hover:bg-green-600 transition">
                        RELATÓRIOS
                    </button>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import axios from 'axios';
import { ref, onMounted } from "vue";
import VueApexCharts from "vue3-apexcharts";
import TheSidebar from "@/components/TheSidebar.vue";

const temperatura = ref(0)
const minTemp = ref(0)
const maxTemp = ref(0)
const condicao = ref("Carregando...")
const umidade = ref(0)
const statusUmidade = ref("Carregando...")

const visible = ref(false);

// Gráficos
const series = [
    {
        name: "Temperatura",
        data: [21, 22, 21.5, 23, 22.5, 22],
    },
    {
        name: "Umidade",
        data: [20, 21, 20.5, 21.5, 21, 20.5],
    },
];

const chartOptions = {
    chart: {
        type: "line",
        height: 300,
        toolbar: { show: false },
    },
    stroke: { curve: "smooth" },
    xaxis: {
        categories: ["13:00", "14:00", "15:00", "16:00", "17:00", "18:00"],
    },
    colors: ["#22c55e", "#3b82f6"],
    legend: { position: "top" },
};

const barSeries = [
    {
        name: "Umidade",
        data: [30, 40, 35, 50, 49, 60],
    },
];

const barChartOptions = {
    chart: {
        type: "bar",
        height: 300,
        toolbar: { show: false },
    },
    plotOptions: {
        bar: {
            horizontal: false,
            columnWidth: "50%",
            endingShape: "rounded",
        },
    },
    xaxis: {
        categories: ["13:00", "14:00", "15:00", "16:00", "17:00", "18:00"],
    },
    colors: ["#3b82f6"],
    legend: { position: "top" },
};

// 🔁 Chamada à API de clima
onMounted(async () => {
    const apiKey = '065be3669c620443682469492fb31277';
    try {
        const response = await axios.get(
            `https://api.openweathermap.org/data/2.5/weather?q=Franca&appid=${apiKey}&units=metric&lang=pt_br`
        );

        const data = response.data;
        temperatura.value = Math.round(data.main.temp);
        minTemp.value = Math.round(data.main.temp_min);
        maxTemp.value = Math.round(data.main.temp_max);
        condicao.value = data.weather[0].description;
        umidade.value = data.main.humidity;

        // Exemplo simples de status de umidade
        if (umidade.value >= 30 && umidade.value <= 60) {
            statusUmidade.value = 'Adequado';
        } else {
            statusUmidade.value = 'Inadequado';
        }
    } catch (error) {
        console.error('Erro ao buscar dados do clima:', error);
    }
});
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Roboto&display=swap');

.font-roboto {
    font-family: 'Roboto', sans-serif;
}
</style>
