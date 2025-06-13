<template>
  <div v-if="visible" class="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40" @mousedown.self="$emit('close')">
    <div class="bg-white rounded-lg shadow-lg p-6 w-[400px] relative flex flex-col font-roboto">
      <button @click="$emit('close')" class="absolute top-4 right-4 text-xl font-bold">&times;</button>
        <!-- Médias Detalhadas -->
      <h2 class="text-xl font-bold mb-6 text-center">Média detalhadas</h2>
      <div class="mb-8">
        <div class="flex justify-between mb-4">
          <span class="text-base font-semibold">Média diária:</span>
          <span class="text-gray-600">{{ mediaDiaria }} °C</span>
        </div>
        <div class="flex justify-between mb-4">
          <span class="text-base font-semibold">Moda:</span>
          <span class="text-gray-600">{{ moda }} °C</span>
        </div>
        <div class="flex justify-between mb-4">
          <span class="text-base font-semibold">Mediana:</span>
          <span class="text-gray-600">{{ mediana }} °C</span>
        </div>
        <div class="flex justify-between mb-4">
          <span class="text-base font-semibold">Desvio Padrão:</span>
          <span class="text-gray-600">{{ desvioPadrao.toFixed(1) }} °C</span>
        </div>
        <div class="flex justify-between mb-4">
          <span class="text-base font-semibold">Assimetria:</span>
          <span class="text-gray-600">{{ assimetria }}</span>
        </div>
      </div>

      <!-- Linha divisória -->
      <hr class="border-gray-200 my-4">

      <!-- Médias Projetadas -->
      <h2 class="text-xl font-bold mb-6 text-center">Médias Projetada</h2>
      <div>
        <div v-for="(projecao, index) in proximasDatasProjecoes" :key="index" class="flex justify-between mb-4">
          <span class="text-base font-semibold">{{ projecao.dia }} - {{ projecao.data }}:</span>
          <span class="text-gray-600">{{ projecao.temperatura.toFixed(1) }} °C</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  visible: Boolean,
  medias: Array,  mediaDiaria: Number,
  moda: Number,
  mediana: Number,
  assimetria: Number,
  projecaoFutura: Array
})

defineEmits(['close'])

// Desvio padrão
const desvioPadrao = computed(() => {
  const arr = props.medias
  if (!arr.length) return 0
  const media = arr.reduce((a, b) => a + b, 0) / arr.length
  return Math.sqrt(arr.reduce((acc, v) => acc + Math.pow(v - media, 2), 0) / arr.length)
})

// Projeção dos próximos 4 dias
const proximasDatasProjecoes = computed(() => {
  const diasSemana = ['Domingo', 'Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta', 'Sábado']
  const hoje = new Date()
  
  return Array.from({ length: 4 }, (_, i) => {
    const data = new Date(hoje)
    data.setDate(hoje.getDate() + i)
    
    return {
      dia: diasSemana[data.getDay()],
      data: `${data.getDate().toString().padStart(2, '0')}/${(data.getMonth() + 1).toString().padStart(2, '0')}`,
      temperatura: props.medias[i] || props.mediaDiaria || 0
    }
  })
})
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Roboto&display=swap');
.font-roboto {
  font-family: 'Roboto', sans-serif;
}
</style>