<template>
  <div>
    <!-- topBar -->
    <TopBar />
    <RouterView />
  </div>
</template>

<script setup lang="ts">
import TopBar from "./components/Layout.vue";
</script>

<style scoped lang="scss"></style>
