<template>
  <el-card>
    <el-button @click="router.push('/TodoList')" style="background-color: red"
      >Go TodoList</el-button
    >
    <el-button @click="router.push('/SetTime')" style="background-color: red"
      >Go SetTime</el-button
    >
    <el-button
      @click="router.push('/codeReviewOne')"
      style="background-color: red"
      >Go CodeReviewOne</el-button
    >
    <el-button
      @click="router.push('/codeReviewTwo')"
      style="background-color: red"
      >Go CodeReviewTwo</el-button
    >
  </el-card>
</template>
<script setup lang="ts">
import { useRouter } from "vue-router";

const router = useRouter();
</script>
<style scoped lang="scss"></style>
