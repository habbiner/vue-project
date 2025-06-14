<template>
    <div class="card flex justify-content-center h-screen font-roboto">
        <TheSidebar :isSidebarVisible="visible" />
        <button icon="pi pi-bars" @click="visible = !visible" />

        <div class="flex items-center justify-center w-full bg-azulBG">
            <div class="w-full">
                <div class="flex gap-8 justify-center">

                    <!-- Card de Temperatura -->
                    <div class="bg-white p-3 rounded-lg shadow-md w-[15.54vw] card-dashboard">
                        <div class="flex items-center gap-3">
                            <div class="text-yellow-500 text-3xl">
                                <h2 class="text-base font-semibold text-cinzaMaisEscuro">Temperatura</h2>
                                <div class="flex">
                                    <img src="@/assets/imgs/image 61.svg" alt="Ícone do clima" class="w-10 h-10" />
                                    <p class="text-3xl font-semibold text-cinzaEscuro ml-2">{{ climaTemperatura }}°C</p>
                                </div>
                                <p class="text-xs text-cinzaEscuro mt-1 ml-1">Mín: {{ minimaRegistrada }}°C | Máx: {{
                                    maximaRegistrada }}°C</p>

                            </div>
                        </div>
                    </div>

                    <!-- Card Umidade -->
                    <div class="bg-white p-3 rounded-lg shadow-md w-[15.54vw] card-dashboard">
                        <div class="flex items-center gap-3">
                            <div>
                                <h2 class="text-base font-semibold text-cinzaMaisEscuro">Umidade</h2>
                                <div class="flex items-center">
                                    <img src="../assets/imgs/Umidade.svg" alt="Ícone umidade" class="w-8 h-8 mt-1" />
                                    <p class="text-3xl font-semibold text-cinzaEscuro ml-2 ">{{ climaUmidade }}%</p>
                                </div>
                                <p class="text-xs text-cinzaEscuro ml-1 mt-1">Status: {{ climaStatusUmidade }}</p>
                            </div>
                        </div>
                    </div>

                    <!-- Card Sensores -->
                    <div class="bg-white p-3 rounded-lg shadow-md w-[15.54vw] card-dashboard"
                        @click="mostrarModalSensores = true">
                        <div class="flex items-center gap-3">
                            <div>
                                <h2 class="text-base font-semibold text-cinzaMaisEscuro">Sensores</h2>
                                <div class="flex flex-col">
                                    <div class="flex items-center">
                                        <img src="../assets/imgs/Sensor.svg" alt="Ícone sensor" class="w-10 h-10" />
                                        <span class="ml-2 text-base font-semibold text-cinzaEscuro">{{ sensorSelecionado
                                            }}</span>
                                    </div>
                                    <span class="text-xs text-cinzaEscuro ml-1 mt-1">{{
                                        sensorNomeParaLocal[sensorSelecionado] }}</span>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>

                <!-- Gráfico e Alertas -->
                <div class="flex justify-center">
                    <div class="bg-white p-4 rounded-lg shadow-md mt-6 w-full max-w-[41.66vw] card-dashboard">
                        <h2 class="text-lg font-bold mb-4 text-cinzaEscuro">Temperatura</h2>
                        <VueApexCharts width="100%" height="200" type="line" :options="chartOptions" :series="series" />
                    </div>

                    <div class="bg-white p-4 rounded-lg shadow-md w-[20%] h-[300px] mt-6 ml-8 card-dashboard">
                        <h2 class="text-lg font-bold mb-4 text-cinzaEscuro text-center">Alertas</h2>
                        <div v-if="alertaTemperaturaAlta"
                            class="flex items-center gap-4 bg-CinzaFB p-1 rounded-lg border-2 shadow-sm mb-2">
                            <div class="text-red-500 text-2xl">
                                <img src="../assets/imgs/Error.svg" alt="Ícone erro" class="w-8 h-8" />
                            </div>
                            <div>
                                <p class="text-sm font-semibold text-cinzaMaisEscuro">Temperatura Alta</p>
                                <p class="text-sm text-cinzaEscuro font-semibold">A75</p>
                                <div class="flex">
                                    <p class="text-sm text-cinzaEscuro font-semibold">{{ alertaTemperaturaValor }} °C
                                    </p>
                                    <p class="text-xs text-cinzaEscuro ml-12 mt-1 font-semibold">{{
                                        alertaTemperaturaData }}</p>
                                </div>
                            </div>
                        </div>
                        <div v-else class="flex items-center gap-4 bg-CinzaFB p-1 rounded-lg border-2 shadow-sm mb-2">
                            <div>
                                <p class="text-sm text-cinzaMaisEscuro">Nenhum alerta de temperatura</p>
                            </div>
                        </div>
                    </div>

                    <!-- Médias -->
                    <div class="bg-white p-4 rounded-lg shadow-md w-[18%] h-[300px] mt-6 ml-8 card-dashboard"
                        @click="mostrarModalMedia = true">
                        <h2 class="text-lg font-bold mb-4 text-cinzaEscuro text-center">Médias Diarias</h2>
                        <p class="text-sm text-cinzaEscuro font-semibold mt-8">Média Diaria: {{ mediaDiaria }}°C</p>
                        <p class="text-sm text-cinzaEscuro font-semibold mt-8">Moda: {{ moda }}°C</p>
                        <p class="text-sm text-cinzaEscuro font-semibold mt-8">Mediana: {{ mediana }}°C</p>
                        <p class="text-sm text-cinzaEscuro font-semibold mt-8">Variação Diaria: {{ variacaoDiaria }}°C
                        </p>
                    </div>
                </div>

                <!-- Gráfico Umidade -->
                <div class="flex bg-blue items-center">
                    <div
                        class="bg-white ml-[6.5em] p-4 rounded-lg shadow-md mt-6 w-full max-w-[41.66vw] card-dashboard">
                        <h2 class="text-lg font-bold -mb-2 text-cinzaEscuro">Umidade</h2>
                        <VueApexCharts width="100%" height="150" type="bar" :options="barChartOptions"
                            :series="barSeries" />
                    </div>
                    <div class="w-[25%] ml-[10em]">
                        <button
                            class="w-full h-20 bg-[#22c55e] card-dashboard relatorios-btn mt-6 rounded-lg shadow-md flex items-center justify-center text-base font-bold text-white"
                            @click="mostrarModalRelatorio = true">
                            <div class="flex items-center gap-2">
                                <span>RELATÓRIOS</span>
                            </div>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <MediaModal :visible="mostrarModalMedia" @close="mostrarModalMedia = false" :medias="mediasUltimosDias"
        :mediaDiaria="mediaDiaria" :moda="moda" :mediana="mediana" :assimetria="assimetria"
        :projecaoFutura="projecaoFutura" />
    <SensoresModal :visible="mostrarModalSensores" @close="mostrarModalSensores = false"
        @select="sensorSelecionado = $event" />
</template>

<script setup>

import axios from 'axios';
import { ref, onMounted, watch } from "vue";
import VueApexCharts from "vue3-apexcharts";
import TheSidebar from "@/components/TheSidebar.vue";
import MediaModal from '@/components/MediaModal.vue'
import SensoresModal from '@/components/SensoresModal.vue'


// Configurações gerais da API externa
import { API_CONFIG } from '@/config/api'

// Refs para dados de temperatura e umidade
const temperaturaBanco = ref(0);
const umidadeBanco = ref(0);
const minTempBanco = ref(0);
const maxTempBanco = ref(0);
const condicao = ref("Carregando...")
const statusUmidade = ref("Carregando...")

// Controle de visibilidade do sidebar
const visible = ref(false);

// Refs para dados climáticos atuais
const climaTemperatura = ref(0);
const climaMinTemp = ref(0);
const climaMaxTemp = ref(0);
const climaCondicao = ref("Carregando...");
const climaUmidade = ref(0);
const climaStatusUmidade = ref("Carregando...");

// Controle do modal de médias e dados relacionados
const mostrarModalMedia = ref(false)
const mediasUltimosDias = ref([])

// Mapeamento de nomes dos sensores para locais
const sensorNomeParaLocal = {
    'Sensor 1 - Galpão Sul': 'Galpão Sul - Lote 15',
    'Sensor 2 - Galpão Sudeste': 'Galpão Sudeste - Lote 68',
    'Sensor 3 - Galpão Norte': 'Galpão Base - Lote 02',
}

// Controle do modal de sensores e seleção atual
const mostrarModalSensores = ref(false)
const sensorSelecionado = ref('Sensor 1 - Galpão Sul')

// Array para armazenar todos os dados do backend
let todosDados = []

// Estado dos alertas de temperatura
const alertaTemperaturaAlta = ref(false);
const alertaTemperaturaValor = ref(0);
const alertaTemperaturaData = ref('');

// Configuração das séries de dados para os gráficos
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

// Configurações do gráfico de linha (temperatura)
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

// Configurações do gráfico de barras (umidade)
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

// Refs para estatísticas calculadas
const maximaRegistrada = ref(0);
const minimaRegistrada = ref(0);
const mediaDiaria = ref(0);
const variacaoDiaria = ref(0);
const moda = ref(0);
const mediana = ref(0);
const assimetria = ref(0);
const projecaoFutura = ref([]);

// Funções auxiliares para cálculos estatísticos
function calcularModa(array) {
    // Calcula a moda (valor mais frequente) do conjunto de dados
    const frequencias = array.reduce((acc, val) => {
        acc[val] = (acc[val] || 0) + 1;
        return acc;
    }, {});

    let maxFrequencia = 0;
    let modaValor = null;

    for (const [valor, frequencia] of Object.entries(frequencias)) {
        if (frequencia > maxFrequencia) {
            maxFrequencia = frequencia;
            modaValor = Number(valor);
        }
    }

    return modaValor;
}

function calcularMediana(array) {
    // Calcula a mediana (valor central) do conjunto de dados
    const ordenado = [...array].sort((a, b) => a - b);
    const meio = Math.floor(ordenado.length / 2);

    if (ordenado.length % 2 === 0) {
        return (ordenado[meio - 1] + ordenado[meio]) / 2;
    }

    return ordenado[meio];
}

function calcularAssimetria(array) {
    // Calcula a assimetria (skewness) da distribuição dos dados
    const n = array.length;
    if (n < 3) return 0;

    const media = array.reduce((a, b) => a + b) / n;
    const desvioPadrao = Math.sqrt(array.reduce((acc, val) => acc + Math.pow(val - media, 2), 0) / n);

    const momento3 = array.reduce((acc, val) => acc + Math.pow(val - media, 3), 0) / n;
    return momento3 / Math.pow(desvioPadrao, 3);
}

function calcularRegressaoLinear(dados) {
    // Calcula os coeficientes da regressão linear para projeção futura
    const n = dados.length;
    if (n < 2) return { a: 0, b: 0 };

    const x = Array.from({ length: n }, (_, i) => i);
    const y = dados;

    const somaX = x.reduce((a, b) => a + b, 0);
    const somaY = y.reduce((a, b) => a + b, 0);
    const somaXY = x.reduce((acc, xi, i) => acc + xi * y[i], 0);
    const somaX2 = x.reduce((acc, xi) => acc + xi * xi, 0);

    const a = (n * somaXY - somaX * somaY) / (n * somaX2 - somaX * somaX);
    const b = (somaY - a * somaX) / n;

    return { a, b };
}

// Função principal para atualizar os gráficos e médias
function atualizarGraficosEMedias() {
    // Filtra dados pelo sensor selecionado
    const localSensor = sensorNomeParaLocal[sensorSelecionado.value];
    const dadosSensor = todosDados.filter(item => item.local_name === localSensor);

    if (dadosSensor.length === 0) {
        console.warn(`Nenhum dado encontrado para o sensor ${sensorSelecionado.value} (${localSensor})`);
        // Limpa todas as estatísticas quando não há dados
        series.value = [{ name: "Temperatura", data: [] }, { name: "Umidade", data: [] }];
        barSeries.value = [{ name: "Umidade", data: [] }];
        maximaRegistrada.value = 0;
        minimaRegistrada.value = 0;
        mediaDiaria.value = 0;
        variacaoDiaria.value = 0;
        moda.value = 0;
        mediana.value = 0;
        assimetria.value = 0;
        projecaoFutura.value = [];
        return;
    }

    // Agrupa dados por dia para cálculo de médias
    const mediasPorDia = {};
    dadosSensor.forEach(item => {
        const data = new Date(item.datetime)
        const chave = data.getFullYear() + '-' + (data.getMonth() + 1).toString().padStart(2, '0') + '-' + data.getDate().toString().padStart(2, '0')
        if (!mediasPorDia[chave]) mediasPorDia[chave] = []
        if (typeof item.temperature === 'number') mediasPorDia[chave].push(item.temperature)
    })

    // Calcula médias dos últimos 7 dias
    const chavesOrdenadas = Object.keys(mediasPorDia).sort((a, b) => new Date(b) - new Date(a))
    mediasUltimosDias.value = chavesOrdenadas.slice(0, 7).reverse().map(chave => {
        const arr = mediasPorDia[chave]
        return arr.length ? arr.reduce((a, b) => a + b, 0) / arr.length : 0
    })

    // Processa dados do último dia para os gráficos
    let ultimoDia = null;
    if (dadosSensor.length > 0) {
        const ultimaData = new Date(dadosSensor[0].datetime);
        const ultimaDataBR = new Date(ultimaData.getTime() - 3 * 60 * 60 * 1000);
        ultimoDia = {
            dia: ultimaDataBR.getDate(),
            mes: ultimaDataBR.getMonth(),
            ano: ultimaDataBR.getFullYear()
        };
    }

    // Filtra dados apenas do último dia
    const dadosUltimoDia = dadosSensor.filter(item => {
        const data = new Date(item.datetime);
        const dataBR = new Date(data.getTime() - 3 * 60 * 60 * 1000);
        return ultimoDia &&
            dataBR.getDate() === ultimoDia.dia &&
            dataBR.getMonth() === ultimoDia.mes &&
            dataBR.getFullYear() === ultimoDia.ano;
    });

    // Lista de horários padrão para o gráfico
    const horariosDesejados = [
        "10:00", "10:30", "11:00", "11:30", "12:00",
        "12:30", "13:00", "13:30", "14:00", "14:30"
    ];

    // Encontra os dados mais próximos dos horários desejados
    function encontrarMaisProximoSemRepetir(horarioAlvo, listaDisponivel) {
        const [hAlvo, mAlvo] = horarioAlvo.split(':').map(Number);
        const minutosAlvo = hAlvo * 60 + mAlvo;
        let menorDiferenca = Infinity;
        let registroMaisProximo = null;
        let indiceMaisProximo = -1;

        // Procura o registro mais próximo do horário alvo
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

        // Remove o item usado para não ser reutilizado
        if (indiceMaisProximo !== -1) {
            listaDisponivel.splice(indiceMaisProximo, 1);
        }
        return registroMaisProximo;
    }

    // Processa os dados para os gráficos
    const listaDisponivel = [...dadosUltimoDia];
    const dadosFiltrados = horariosDesejados.map(horario =>
        encontrarMaisProximoSemRepetir(horario, listaDisponivel)
    );

    // Prepara dados para os gráficos
    const categorias = dadosFiltrados.map(item => {
        if (!item) return '';
        return new Date(item.datetime).toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' });
    });

    const tempPorHora = dadosFiltrados.map(item => item ? item.temperature : null);
    const umidPorHora = dadosFiltrados.map(item => item ? item.humidity : null);

    // Atualiza as configurações e dados dos gráficos
    chartOptions.value.xaxis.categories = categorias;
    barChartOptions.value.xaxis.categories = categorias;
    series.value = [
        { name: "Temperatura", data: tempPorHora },
        { name: "Umidade", data: umidPorHora },
    ];
    barSeries.value = [
        { name: "Umidade", data: umidPorHora },
    ];

    // Calcula estatísticas do dia
    const tempValidasDia = dadosUltimoDia
        .map(item => item.temperature)
        .filter(v => v !== null && v !== undefined);

    if (tempValidasDia.length > 0) {
        // Atualiza todas as estatísticas calculadas
        maximaRegistrada.value = Math.round(Math.max(...tempValidasDia));
        minimaRegistrada.value = Math.round(Math.min(...tempValidasDia));
        mediaDiaria.value = Math.round(tempValidasDia.reduce((acc, val) => acc + val, 0) / tempValidasDia.length);
        variacaoDiaria.value = Math.round(Math.max(...tempValidasDia) - Math.min(...tempValidasDia));

        moda.value = Math.round(calcularModa(tempValidasDia) * 10) / 10;
        mediana.value = Math.round(calcularMediana(tempValidasDia) * 10) / 10;
        assimetria.value = Math.round(calcularAssimetria(tempValidasDia) * 100) / 100;

        // Calcula projeções futuras usando regressão linear
        const { a, b } = calcularRegressaoLinear(tempValidasDia);
        projecaoFutura.value = Array.from({ length: 5 }, (_, i) => {
            const valorProjetado = a * (tempValidasDia.length + i) + b;
            return Math.round(valorProjetado * 10) / 10;
        });
    } else {
        // Zera todas as estatísticas quando não há dados
        maximaRegistrada.value = 0;
        minimaRegistrada.value = 0;
        mediaDiaria.value = 0;
        variacaoDiaria.value = 0;
        moda.value = 0;
        mediana.value = 0;
        assimetria.value = 0;
        projecaoFutura.value = [];
    }
}

// 🔁 Chamada à API de clima
onMounted(async () => {
    try {
        const response = await axios.get(
            `${API_CONFIG.WEATHER.BASE_URL}?q=${API_CONFIG.WEATHER.PARAMS.city}&appid=${API_CONFIG.WEATHER.PARAMS.key}&units=${API_CONFIG.WEATHER.PARAMS.units}&lang=${API_CONFIG.WEATHER.PARAMS.lang}`
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

        // Lógica do alerta de temperatura alta
        if (climaTemperatura.value > 30) {
            alertaTemperaturaAlta.value = true;
            alertaTemperaturaValor.value = climaTemperatura.value;
            const hoje = new Date();
            alertaTemperaturaData.value = hoje.toLocaleDateString('pt-BR', { day: '2-digit', month: 'long', year: 'numeric' });
        } else {
            alertaTemperaturaAlta.value = false;
        }
    } catch (error) {
        console.error('Erro ao buscar dados do clima:', error);
    }

    await carregarDados();
});

async function carregarDados() {
    try {
        const dadosResponse = await axios.get('https://backapp-9zet.onrender.com/api/dados');
        todosDados = dadosResponse.data;
        atualizarGraficosEMedias();
    } catch (error) {
        console.error('Erro ao buscar dados históricos do back-end:', error);
    }
}

// Adiciona um watch para atualizar os dados quando o sensor muda
watch(sensorSelecionado, () => {
    atualizarGraficosEMedias();
});
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Roboto&display=swap');

.font-roboto {
    font-family: 'Roboto', sans-serif;
}

/* Efeito de profundidade nos cards e botão */
.card-dashboard {
    transition: all 0.25s cubic-bezier(0.4, 0, 0.2, 1);
    cursor: pointer;
    border: 2px solid transparent;
}

.card-dashboard:hover {
    box-shadow: 0 4px 16px 0 rgba(7, 39, 19, 0.18);
    transform: translateY(-4px) scale(1.02);
    z-index: 2;
}

/* Estilo específico para o botão de relatórios */
.relatorios-btn {
    transition: all 0.25s cubic-bezier(0.4, 0, 0.2, 1);
}

.relatorios-btn:hover {
    border: 2px solid #22c55e;
    color: #22c55e;
    background-color: white;
}

.relatorios-btn:hover img {
    filter: invert(56%) sepia(75%) saturate(385%) hue-rotate(93deg) brightness(119%) contrast(98%);
}

/* Modal customizado */
.fixed.inset-0 {
    display: flex;
    align-items: center;
    justify-content: center;
    background: rgba(0, 0, 0, 0.4);
    z-index: 50;
}
</style>
