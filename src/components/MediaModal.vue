<template>
  <div v-if="visible" class="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40">
    <div class="bg-white rounded-lg shadow-lg p-4 w-[28.4%] h-[390px] overflow-y-auto relative flex flex-col font-roboto">
      <h2 class="text-lg font-bold mb-2 text-cinzaEscuro text-center mb-6">Detalhes das Médias Diárias</h2>
      <p class="text-base font-semibold text-cinzaEscuro mb-6 text-center">Desvio Padrão: {{ desvioPadrao.toFixed(2) }}°C</p>
      <p class="text-base font-semibold text-cinzaEscuro mb-0 text-center">Projeção da média da temperatura dos próximos 5 dias:</p>
      <button @click="$emit('close')" class="absolute top-4 right-4 text-xl font-bold">&times;</button>
      <div class="flex-1 flex flex-col justify-center items-center">
        <div class="w-full flex flex-col justify-center items-center">
          <VueApexCharts
            v-if="props.medias.length > 1"
            type="line"
            :options="chartOptionsProjecao"
            :series="chartSeriesProjecao"
            width="260"
            height="120"
            class="my-2"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import VueApexCharts from 'vue3-apexcharts'
const props = defineProps({
  visible: Boolean,
  medias: Array
})
defineEmits(['close'])

const diasSemana = ['Domingo', 'Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta', 'Sábado']

// Datas das médias recebidas (últimos dias)
const datasMedias = computed(() => {
  const hoje = new Date()
  return Array.from({ length: props.medias.length }, (_, i) => {
    const dia = new Date(hoje)
    dia.setDate(hoje.getDate() - (props.medias.length - 1 - i))
    return dia.toLocaleDateString('pt-BR', { day: '2-digit', month: '2-digit' })
  })
})

// Configuração do gráfico
const chartOptions = computed(() => ({
  chart: { type: 'line', toolbar: { show: false }, sparkline: { enabled: true } },
  xaxis: { categories: datasMedias.value },
  stroke: { curve: 'smooth' },
  colors: ['#22c55e'],
  markers: { size: 4 },
  tooltip: { enabled: true },
  grid: { show: false },
  yaxis: { labels: { show: false } },
  legend: { show: false }
}))
const chartSeries = computed(() => ([{ name: 'Média Diária', data: props.medias }]))

// Gráfico de projeção dos próximos 5 dias
const chartOptionsProjecao = computed(() => ({
  chart: { type: 'line', toolbar: { show: false } },
  xaxis: {
    categories: diasProjecao.value,
    labels: { style: { fontFamily: 'Roboto', fontSize: '12px' } }
  },
  yaxis: {
    labels: {
      style: { fontFamily: 'Roboto', fontSize: '12px' },
      formatter: val => val ? val.toFixed(1) + '°C' : ''
    }
  },
  tooltip: {
    enabled: true,
    y: {
      formatter: val => val ? val.toFixed(1) + '°C' : ''
    }
  },
  stroke: { curve: 'smooth' },
  colors: ['#22c55e'],
  markers: { size: 4 },
  grid: { show: true },
  legend: { show: false }
}))
const chartSeriesProjecao = computed(() => ([{ name: 'Projeção', data: projecoes.value.map(v => Number(v.toFixed(1))) }]))

// Desvio padrão
const desvioPadrao = computed(() => {
  const arr = props.medias
  if (!arr.length) return 0
  const media = arr.reduce((a, b) => a + b, 0) / arr.length
  return Math.sqrt(arr.reduce((acc, v) => acc + Math.pow(v - media, 2), 0) / arr.length)
})

// Projeção dos próximos 5 dias por regressão linear simples
const projecoes = computed(() => {
  const arr = props.medias
  if (arr.length < 2) return Array(5).fill(arr[0] || 0)
  const n = arr.length
  const x = Array.from({ length: n }, (_, i) => i + 1)
  const y = arr
  const xBar = x.reduce((a, b) => a + b, 0) / n
  const yBar = y.reduce((a, b) => a + b, 0) / n
  const numerador = x.reduce((acc, xi, i) => acc + (xi - xBar) * (y[i] - yBar), 0)
  const denominador = x.reduce((acc, xi) => acc + Math.pow(xi - xBar, 2), 0)
  const a = numerador / denominador
  const b = yBar - a * xBar
  return Array.from({ length: 5 }, (_, i) => a * (n + i + 1) + b)
})

const diasProjecao = computed(() => {
  const hoje = new Date()
  return Array.from({ length: 5 }, (_, i) => {
    const dia = new Date(hoje)
    dia.setDate(hoje.getDate() + i + 1)
    return dia.toLocaleDateString('pt-BR', { day: '2-digit', month: '2-digit' })
  })
})
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Roboto&display=swap');
.font-roboto {
  font-family: 'Roboto', sans-serif;
}
</style>