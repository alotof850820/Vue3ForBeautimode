<template>
  <el-card>
    <!-- tem -->
    <div>
      <h1 style="font-size: 25px; margin: 15px 0">Template :</h1>
      <header>Title: 此code看起來是一個可自定義inputForm</header>
      <br />
      <div>
        input 隨著size password diasbled fullWidth 狀態(error)等做UI上的變化
      </div>
      <br />
      <div>
        inputInner 也會隨隨著focus hasPrefix State 呈現相應內容
        input同時也有3種監聽事件focus blur change
      </div>
      <br />
      <div>type是password的話 就顯示相應內容且可選擇是否看的到密碼</div>
      <br />
      <div>最後依據hasSuffix state顯示內容</div>
    </div>
    <!-- script -->
    <div>
      <h1 style="font-size: 25px; margin: 15px 0">Script :</h1>
      <header>
        Title: 用Vue3 component 語法、lodash、isFieldError、PropType
      </header>
      <br />
      <div>Name叫GDBInput</div>
      <div>
        Props
        有modelValue、type、placeholder、prefix、suffix、max、min、hasDecimalPoint、size、fullWidth、emptyToNull、disabled,
        都有設定type及默認值
      </div>
      <br />
      <div>emit事件有update:modelValue和change給上層</div>
      <br />
      <div>
        邏輯部分: 提供props & emit,
        value計算屬性拿modelValue並根據不同其況set不同狀態和事件,
        state計算屬性依狀態return不同顯示和state。
        響應值有isShowPassword、isFocus控制password顯示。
        isError拿父組件只可讀的isFieldError 來使用。
        changeEvent、focusEvent、blurEvent function 根據不同state執行不同功能
      </div>
      <!-- style -->
      <div>
        <h1 style="font-size: 25px; margin: 15px 0">Style :</h1>
        <div>scss語法:依照state呈現不同樣式,有主樣式。</div>
      </div>
      <br />
      <footer>
        結論: 這是一個用Vue3語法寫的自定義input
        component,依props和event來執行不同事件和UI。
      </footer>
    </div>
  </el-card>
</template>
<script setup lang="ts"></script>
<style scoped lang="-scss"></style>
