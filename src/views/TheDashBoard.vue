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
                                    <p class="text-3xl font-semibold text-cinzaEscuro ml-2">{{ climaTemperatura }}°C</p>
                                </div>
                            </div>
                            <div>
                                <p class="text-xs text-cinzaEscuro mt-1 ml-4">{{ climaMinTemp }}/{{ climaMaxTemp }}° | {{ climaCondicao }}</p>
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
                                    <p class="text-3xl font-semibold text-cinzaEscuro ml-2 ">{{ climaUmidade }}%</p>
                                    <p class="text-xs -mt-4 ml-2">{{ climaStatusUmidade }}</p>
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
                        <p class="text-sm text-cinzaEscuro font-semibold mt-8">Variação Diaria: {{ variacaoDiaria }}°C</p>
                        <p class="text-sm text-cinzaEscuro font-semibold mt-8">Maxima Registrada: {{ maximaRegistrada }}°C</p>
                        <p class="text-sm text-cinzaEscuro font-semibold mt-8">Minima Registrada: {{ minimaRegistrada }}°C</p>
                        <p class="text-sm text-cinzaEscuro font-semibold mt-8">Média Diaria: {{ mediaDiaria }}°C</p>
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
                        class="w-[25%] h-20 relatorios-btn mt-6 rounded-xl ml-[10em] flex items-center justify-center text-base font-bold transition">
                        RELATÓRIOS
                    </button>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import axios from 'axios';
import { ref, onMounted, reactive } from "vue";
import VueApexCharts from "vue3-apexcharts";
import TheSidebar from "@/components/TheSidebar.vue";

const temperaturaBanco = ref(0);
const umidadeBanco = ref(0);
const minTempBanco = ref(0);
const maxTempBanco = ref(0);
const condicao = ref("Carregando...")
const statusUmidade = ref("Carregando...")

const visible = ref(false);

const climaTemperatura = ref(0);
const climaMinTemp = ref(0);
const climaMaxTemp = ref(0);
const climaCondicao = ref("Carregando...");
const climaUmidade = ref(0);
const climaStatusUmidade = ref("Carregando...");

// Gráficos
const series = ref([
    {
        name: "Temperatura",
        data: [],
    },
    {
        name: "Umidade",
        data: [],
    },
]);

const chartOptions = ref({
    chart: {
        type: "line",
        height: 300,
        toolbar: { show: false },
    },
    stroke: { curve: "smooth" },
    xaxis: {
        categories: ["10:00", "10:30", "11:00", "11:30", "12:00", "12:30", "13:00", "13:30", "14:00", "14:30"],
    },
    colors: ["#22c55e", "#3b82f6"],
    legend: { position: "top" },
});

const barSeries = ref([
    {
        name: "Umidade",
        data: [],
    },
]);

const barChartOptions = ref({
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
        categories: ["10:00", "10:30", "11:00", "11:30", "12:00", "12:30", "13:00", "13:30", "14:00", "14:30"],
    },
    colors: ["#3b82f6"],
    legend: { position: "top" },
});

const maximaRegistrada = ref(0);
const minimaRegistrada = ref(0);
const mediaDiaria = ref(0);
const variacaoDiaria = ref(0);

// 🔁 Chamada à API de clima
onMounted(async () => {
    const apiKey = '065be3669c620443682469492fb31277';
    try {
        const response = await axios.get(
            `https://api.openweathermap.org/data/2.5/weather?q=Franca&appid=${apiKey}&units=metric&lang=pt_br`
        );

        const data = response.data;
        climaTemperatura.value = Math.round(data.main.temp);
        climaMinTemp.value = Math.round(data.main.temp_min);
        climaMaxTemp.value = Math.round(data.main.temp_max);
        climaCondicao.value = data.weather[0].description;
        climaUmidade.value = data.main.humidity;

        if (climaUmidade.value >= 30 && climaUmidade.value <= 60) {
            climaStatusUmidade.value = 'Adequado';
        } else {
            climaStatusUmidade.value = 'Inadequado';
        }
    } catch (error) {
        console.error('Erro ao buscar dados do clima:', error);
    }

   
    try {
        const dadosResponse = await axios.get('http://localhost:8090/api/dados'); 
        const todosDados = dadosResponse.data;

        // Descobre o último dia disponível nos dados
        let ultimoDia = null;
        if (todosDados.length > 0) {
            const ultimaData = new Date(todosDados[0].datetime);
            // Ajusta para o fuso horário de Brasília (UTC-3)
            const ultimaDataBR = new Date(ultimaData.getTime() - 3 * 60 * 60 * 1000);
            ultimoDia = {
                dia: ultimaDataBR.getDate(),
                mes: ultimaDataBR.getMonth(),
                ano: ultimaDataBR.getFullYear()
            };
        }

        // Filtra apenas os registros do último dia disponível
        const dadosUltimoDia = todosDados.filter(item => {
            const data = new Date(item.datetime);
            const dataBR = new Date(data.getTime() - 3 * 60 * 60 * 1000);
            return ultimoDia &&
                dataBR.getDate() === ultimoDia.dia &&
                dataBR.getMonth() === ultimoDia.mes &&
                dataBR.getFullYear() === ultimoDia.ano;
        });

        // 1. Defina os horários desejados (em formato de string "HH:mm")
        const horariosDesejados = [
            "10:00", "10:30", "11:00", "11:30", "12:00",
            "12:30", "13:00", "13:30", "14:00", "14:30"
        ];

        // 2. Para cada horário, encontre o registro mais próximo, sem repetir
        function encontrarMaisProximoSemRepetir(horarioAlvo, listaDisponivel) {
            const [hAlvo, mAlvo] = horarioAlvo.split(':').map(Number);
            const minutosAlvo = hAlvo * 60 + mAlvo;
            let menorDiferenca = Infinity;
            let registroMaisProximo = null;
            let indiceMaisProximo = -1;

            listaDisponivel.forEach((item, idx) => {
                const data = new Date(item.datetime);
                const minutosItem = data.getHours() * 60 + data.getMinutes();
                const diferenca = Math.abs(minutosItem - minutosAlvo);
                if (diferenca < menorDiferenca) {
                    menorDiferenca = diferenca;
                    registroMaisProximo = item;
                    indiceMaisProximo = idx;
                }
            });

            // Remove o registro já utilizado
            if (indiceMaisProximo !== -1) {
                listaDisponivel.splice(indiceMaisProximo, 1);
            }

            return registroMaisProximo;
        }

        const listaDisponivel = [...dadosUltimoDia]; // cópia para manipular
        const dadosFiltrados = horariosDesejados.map(horario => encontrarMaisProximoSemRepetir(horario, listaDisponivel));

        // 3. Monte os arrays para os gráficos (apenas horários específicos)
        const categorias = dadosFiltrados.map(item => {
            if (!item) return '';
            return new Date(item.datetime).toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' });
        });
        const tempPorHora = dadosFiltrados.map(item => item ? item.temperature : null);
        const umidPorHora = dadosFiltrados.map(item => item ? item.humidity : null);

        // Atualize os gráficos normalmente
        chartOptions.value.xaxis.categories = categorias;
        barChartOptions.value.xaxis.categories = categorias;
        series.value = [
            { name: "Temperatura", data: tempPorHora },
            { name: "Umidade", data: umidPorHora },
        ];
        barSeries.value = [
            { name: "Umidade", data: umidPorHora },
        ];

        // Cálculos de médias e variações usando TODOS os dados das últimas 24 horas
        const tempValidasDia = dadosUltimoDia.map(item => item.temperature).filter(v => v !== null && v !== undefined);
        if (tempValidasDia.length > 0) {
            maximaRegistrada.value = Math.round(Math.max(...tempValidasDia));
            minimaRegistrada.value = Math.round(Math.min(...tempValidasDia));
            mediaDiaria.value = Math.round(tempValidasDia.reduce((acc, val) => acc + val, 0) / tempValidasDia.length);
            variacaoDiaria.value = Math.round(Math.max(...tempValidasDia) - Math.min(...tempValidasDia));
        } else {
            maximaRegistrada.value = 0;
            minimaRegistrada.value = 0;
            mediaDiaria.value = 0;
            variacaoDiaria.value = 0;
        }
    } catch (error) {
        console.error('Erro ao buscar dados históricos do back-end:', error);
    }
});
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Roboto&display=swap');

.font-roboto {
    font-family: 'Roboto', sans-serif;
}

/* Estilo do botão RELATÓRIOS */
.relatorios-btn {
    background-color: #22c55e; /* verde padrão */
    color: #000;
    transition: background 0.3s, color 0.3s;
}
.relatorios-btn:hover {
    background-color: #fff;
    color: #22c55e;
    border: 2px solid #22c55e;
}
</style>
