<template>
    <div v-if="visible" class="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40">
        <div class="bg-white rounded-lg shadow-lg p-8 w-[80vw] max-h-[90vh] overflow-y-auto relative">
        <button @click="$emit('close')" class="absolute top-4 right-4 text-xl font-bold">&times;</button>
        <h2 class="text-2xl font-bold mb-4 text-cinzaEscuro">Relatório dos Últimos 7 Dias</h2>
        <div v-if="relatorioPronto">
            <VueApexCharts type="line" :options="relatorioChartOptions" :series="relatorioSeries" height="250" />
            <div class="mt-4 grid grid-cols-2 gap-4">
                <div>
                    <p><b>Média:</b> {{ relatorioEstatisticas.media }}</p>
                    <p><b>Moda:</b> {{ relatorioEstatisticas.moda }}</p>
                    <p><b>Mediana:</b> {{ relatorioEstatisticas.mediana }}</p>
                </div>
                <div>
                    <p><b>Desvio Padrão:</b> {{ relatorioEstatisticas.dp }}</p>
                    <p><b>Assimetria:</b> {{ relatorioEstatisticas.assimetria }}</p>
                    <p><b>Projeção Futura (regressão):</b> {{ relatorioEstatisticas.projecao }}</p>
                </div>
        </div>
    </div>
    <div v-else>
        <p>Carregando relatório...</p>
        </div>
    </div>
</div>
</template>

<script setup>
import { ref, watch } from 'vue';
import VueApexCharts from 'vue3-apexcharts';

defineProps({
  visible: Boolean,
  dados: Array
});
const emit = defineEmits(['close']);

const relatorioPronto = ref(false);
const relatorioSeries = ref([]);
const relatorioChartOptions = ref({});
const relatorioEstatisticas = ref({
  media: 0, moda: 0, mediana: 0, dp: 0, assimetria: 0, projecao: 0
});

watch([
  () => visible,
  (props) => props.dados
], ([val, dados]) => {
  if (val && dados && dados.length > 0) {
    relatorioPronto.value = false;
    gerarRelatorio7Dias(dados);
    relatorioPronto.value = true;
  }
});

function gerarRelatorio7Dias(todosDados) {
  const agora = new Date();
  const seteDiasAtras = new Date(agora.getTime() - 7 * 24 * 60 * 60 * 1000);

  const dados7dias = todosDados.filter(item => {
    const data = new Date(item.datetime);
    return data >= seteDiasAtras;
  });

  const temperaturas = dados7dias.map(d => d.temperature).filter(Number.isFinite);
  const umidades = dados7dias.map(d => d.humidity).filter(Number.isFinite);
  const datas = dados7dias.map(d => new Date(d.datetime).toLocaleDateString('pt-BR'));

  relatorioEstatisticas.value = {
    media: media(temperaturas).toFixed(2),
    moda: moda(temperaturas),
    mediana: mediana(temperaturas),
    dp: desvioPadrao(temperaturas).toFixed(2),
    assimetria: assimetria(temperaturas).toFixed(2),
    projecao: regressaoLinear(temperaturas)
  };

  relatorioSeries.value = [
    { name: 'Temperatura', data: temperaturas },
    { name: 'Umidade', data: umidades }
  ];
  relatorioChartOptions.value = {
    chart: { type: 'line' },
    xaxis: { categories: datas }
  };
}

function media(arr) {
  return arr.reduce((a, b) => a + b, 0) / arr.length;
}
function moda(arr) {
  const freq = {};
  arr.forEach(v => freq[v] = (freq[v] || 0) + 1);
  let max = 0, moda = arr[0];
  for (const k in freq) {
    if (freq[k] > max) { max = freq[k]; moda = k; }
  }
  return moda;
}
function mediana(arr) {
  const sorted = [...arr].sort((a, b) => a - b);
  const mid = Math.floor(sorted.length / 2);
  return sorted.length % 2 !== 0 ? sorted[mid] : (sorted[mid - 1] + sorted[mid]) / 2;
}
function desvioPadrao(arr) {
  const m = media(arr);
  return Math.sqrt(arr.reduce((acc, v) => acc + Math.pow(v - m, 2), 0) / arr.length);
}
function assimetria(arr) {
  const m = media(arr);
  const dp = desvioPadrao(arr);
  return arr.reduce((acc, v) => acc + Math.pow((v - m) / dp, 3), 0) / arr.length;
}
function regressaoLinear(arr) {
  const n = arr.length;
  const x = Array.from({ length: n }, (_, i) => i + 1);
  const y = arr;
  const xBar = media(x);
  const yBar = media(y);
  const numerador = x.reduce((acc, xi, i) => acc + (xi - xBar) * (y[i] - yBar), 0);
  const denominador = x.reduce((acc, xi) => acc + Math.pow(xi - xBar, 2), 0);
  const a = numerador / denominador;
  const b = yBar - a * xBar;
  const proximoX = n + 1;
  return (a * proximoX + b).toFixed(2);
}
</script>

<style scoped>
.fixed.inset-0 {
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(0,0,0,0.4);
  z-index: 50;
}
</style>
