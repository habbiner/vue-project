<template>
  <div :class="[
    'bg-white h-full transition-all duration-300 flex flex-col items-center shadow-lg',
    isSidebarVisible ? 'w-[280px]' : 'w-[70px]',
    'rounded-tr-lg rounded-br-lg'
  ]">
    <div class="flex items-center justify-center w-full py-6">
      <router-link to="home">
        <img src="../assets/imgs/logo.png" alt="Logo" />
      </router-link>
      <span v-if="isSidebarVisible" class="text-2xl font-bold text-black-700">AGROTECH</span>
    </div>
    
    <div v-if="isSidebarVisible" class="w-full px-4 mb-4">
      <input type="text" placeholder="Search for anything" class="w-full py-2 px-4 rounded-lg bg-green-100 text-gray-600" />
    </div>

    <div class="flex-1 flex flex-col justify-start w-full mt-4">
      <RouterLink to="/home" class="flex items-center text-gray-700 hover:text-green-700 w-full px-4 py-2" :class="{
        'justify-center px-2 py-2': !isSidebarVisible,
        'justify-start px-2 py-2': isSidebarVisible
      }">
        <i class="fa fa-home fa-lg"></i>
        <span v-if="isSidebarVisible" class="ml-2">Home</span>
      </RouterLink>
      <RouterLink to="/animais" class="flex items-center text-gray-700 hover:text-green-700 w-full px-4 py-2" :class="{
        'justify-center px-2 py-2': !isSidebarVisible,
        'justify-start px-2 py-2': isSidebarVisible
      }">
        <img src="../assets/imgs/Vaquinha.svg" />
        <span v-if="isSidebarVisible" class="ml-2">Animais</span>
      </RouterLink>
      <RouterLink to="/animais-card" class="flex items-center text-gray-700 hover:text-green-700 w-full px-4 py-2" :class="{
        'justify-center px-2 py-2': !isSidebarVisible,
        'justify-start px-2 py-2': isSidebarVisible
      }">
        <i class="fa fa-window-restore"></i>
        <span v-if="isSidebarVisible" class="ml-2">Animais Card</span>
      </RouterLink>
      <RouterLink to="/fazenda" class="flex items-center text-gray-700 hover:text-green-700 w-full px-4 py-2" :class="{
        'justify-center px-2 py-2': !isSidebarVisible,
        'justify-start px-2 py-2': isSidebarVisible
      }">
        <i class="fa fa-map"></i>
        <span v-if="isSidebarVisible" class="ml-2">Fazenda</span>
      </RouterLink>
      <RouterLink to="/informacoes" class="flex items-center text-gray-700 hover:text-green-700 w-full px-4 py-2" :class="{
        'justify-center px-2 py-2': !isSidebarVisible,
        'justify-start px-2 py-2': isSidebarVisible
      }">
        <i class="fa fa-info-circle fa-lg"></i>
        <span v-if="isSidebarVisible" class="ml-2">Informações</span>
      </RouterLink>
      <RouterLink to="/usuarios" class="flex items-center text-gray-700 hover:text-green-700 w-full px-4 py-2" :class="{
        'justify-center px-2 py-2': !isSidebarVisible,
        'justify-start px-2 py-2': isSidebarVisible
      }">
        <i class="fa fa-user fa-lg"></i>
        <span v-if="isSidebarVisible" class="ml-2">Usuários</span>
      </RouterLink>
      <RouterLink to="/animal" class="flex items-center text-gray-700 hover:text-green-700 w-full px-4 py-2" :class="{
        'justify-center px-2 py-2': !isSidebarVisible,
        'justify-start px-2 py-2': isSidebarVisible
      }">
        <img src="../assets/imgs/bardin.svg" />
        <span v-if="isSidebarVisible" class="ml-2">Animal</span>
      </RouterLink>
    </div>
    <div class="flex mb-16 items-center w-full ml-4 gap-4">
      <img class="rounded-full h-12 w-12 border-2 border-gray-300" src="../assets/imgs/login.jpg" alt="User avatar" />
      <div class="flex flex-col items-start">
        <span v-if="isSidebarVisible" class="text-black text-sm">Habbiner Soares de Andrade</span>
        <span v-if="isSidebarVisible" class="text-black-300 text-xs">habbiner.andrade@gmail.com</span>
        <RouterLink to="/">
          <span v-if="isSidebarVisible" class="text-black cursor-pointer flex items-center gap-1 text-sm">
            <i class="fa fa-sign-out fa-lg"></i>
            Logout
          </span>
        </RouterLink>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'TheSidebar',
  props: {
    isSidebarVisible: {
      type: Boolean,
      required: true,
    },
  },
};
</script>

<style scoped>
.w-full {
  display: flex;
}
</style>