<template>
    <div v-if="visible" class="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40" @mousedown.self="$emit('close')">
        <div class="bg-white rounded-lg shadow-lg p-6 w-[32vw] min-h-[340px] relative flex flex-col font-roboto">
        <button @click="$emit('close')" class="absolute top-4 right-4 text-xl font-bold">&times;</button>
        <h2 class="text-2xl font-bold mb-6 text-cinzaEscuro text-center">Sensores cadastrados</h2>
        <div class="grid grid-cols-2 gap-6">
            <!-- Sensor Sul -->
            <div class="sensor-card bg-white p-4 rounded-lg shadow-md flex flex-col justify-between min-h-[90px] h-[110px] w-full min-w-[220px] max-w-full" @click="selecionarSensor('Sensor 1 - Galpão Sul')">
            <span class="text-base font-semibold text-cinzaMaisEscuro mb-2">Sensor 1 - Galpão Sul</span>
            <div class="flex items-center justify-between">
                <img src="../assets/imgs/Sensor.svg" alt="Ícone sensor" class="w-8 h-8" />
                <span class="bg-green-100 text-green-600 text-xs font-semibold px-2 py-1 rounded flex items-center gap-1">100% <span class="ml-1">↑</span></span>
            </div>
            </div>
            <!-- Sensor Base -->
            <div class="sensor-card bg-white p-4 rounded-lg shadow-md flex flex-col justify-between min-h-[90px] h-[110px] w-full min-w-[220px] max-w-full" @click="selecionarSensor('Sensor 2 - Galpão Sudeste')">
            <span class="text-base font-semibold text-cinzaMaisEscuro mb-2">Sensor 2 - Galpão Sudeste</span>
            <div class="flex items-center justify-between">
                <img src="../assets/imgs/Sensor.svg" alt="Ícone sensor" class="w-8 h-8" />
                <span class="bg-green-100 text-green-600 text-xs font-semibold px-2 py-1 rounded flex items-center gap-1">100% <span class="ml-1">↑</span></span>
            </div>
            </div>
            <!-- Sensor Base -->
            <div class="sensor-card bg-white p-4 rounded-lg shadow-md flex flex-col justify-between min-h-[90px] h-[110px] w-full min-w-[220px] max-w-full" @click="selecionarSensor('Sensor 3 - Galpão Norte')">
            <span class="text-base font-semibold text-cinzaMaisEscuro mb-2">Sensor 3 - Galpão Base</span>
            <div class="flex items-center justify-between">
                <img src="../assets/imgs/Sensor.svg" alt="Ícone sensor" class="w-8 h-8" />
                <span class="bg-green-100 text-green-600 text-xs font-semibold px-2 py-1 rounded flex items-center gap-1">100% <span class="ml-1">↑</span></span>
            </div>
            </div>
            <!-- Adicionar novo sensor -->
            <div class="sensor-card bg-white p-4 rounded-lg shadow-md flex flex-col justify-center items-center min-h-[90px] h-[110px] w-full min-w-[220px] max-w-full cursor-pointer hover:bg-gray-100 transition">
            <span class="text-base font-semibold text-cinzaMaisEscuro text-center">+ Cadastrar novo Sensor</span>
            </div>
        </div>
        </div>
    </div>
    </template>

    <script setup>
    import { defineEmits, defineProps } from 'vue'
    const props = defineProps({
    visible: Boolean
    })
    const emit = defineEmits(['close', 'select'])

    function selecionarSensor(nome) {
    emit('select', nome)
    emit('close')
    }
    </script>

    <style scoped>
    @import url('https://fonts.googleapis.com/css2?family=Roboto&display=swap');
    .font-roboto {
    font-family: 'Roboto', sans-serif;
    }

    .sensor-card {
    transition: background 0.2s, box-shadow 0.2s;
    cursor: pointer;
    }
    .sensor-card:hover {
    background: #f3f4f6;
    box-shadow: 0 4px 16px 0 rgba(7, 39, 19, 0.10), 0 1.5px 4px 0 rgba(0,0,0,0.08);
    }
    </style>
