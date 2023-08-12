<template>
  <el-card>
    <!-- tem -->
    <div>
      <h1 style="font-size: 25px; margin: 15px 0">Template :</h1>
      <header>Title: 此code看起來是一個switch</header>
      <br />
      <div>隨著checked diasbled spacing 做UI上的變化,且監聽click執行toggle</div>
      <br />
      <div>依據state顯示done close</div>
      <br />
      <div>依label description顯示GDBDescription component</div>
    </div>
    <!-- script -->
    <div>
      <h1 style="font-size: 25px; margin: 15px 0">Script :</h1>
      <header>用Vue3 component 語法、lodash</header>
      <br />
      <div>
        Props
        有modelValue、disabled、activeColor、disActiveColor、trueValue、falseValue、label、labelColor、description、descriptionColor、iconDescriptionColor、spacing,
        都有設定type及默認值
      </div>
      <br />
      <div>emit事件有update:modelValue給上層</div>
      <br />
      <div>
        邏輯部分: 提供props & emit,
        style計算屬性根據activeColor、disActiveColor、labelColor呈現不同style,
        check計算屬性依狀態return modelValue。 toggle計算屬性依props state emit
        modelValue。
      </div>
      <!-- style -->
      <div>
        <h1 style="font-size: 25px; margin: 15px 0">Style :</h1>
        <div>scss語法:依照state呈現不同樣式,有主樣式 並結合響應。</div>
      </div>
      <br />
      <footer>
        結論: 這是一個用Vue3語法寫的可set switch
        component,依props和event來執行不同事件和UI。
      </footer>
    </div>
  </el-card>
</template>
<script setup lang="ts"></script>
<style scoped lang="scss"></style>
