<template>
  <div>
    <el-card>
      <el-button @click="goRoute">Go TodoList</el-button>
      <el-table :data="dataList" style="width: 100%">
        <el-table-column prop="date" label="Date" width="180" />
        <el-table-column label="whether to provide meals" width="180">
          <template #="{ row }">
            <el-switch
              v-model="row.meal"
              class="mb-2"
              active-text="本日供餐"
              inactive-text="本日不供餐"
          /></template>
        </el-table-column>
        <el-table-column label="Time">
          <template #="{ row }">
            <div v-if="row.meal" class="demo-time-range">
              <el-time-select
                v-model="row.start"
                class="mr-4"
                placeholder="Start time"
                start="00:00"
                step="00:30"
                end="23:59"
              />
              <el-time-select
                v-model="row.end"
                placeholder="End time"
                start="00:00"
                step="00:30"
                end="23:59"
              /></div
          ></template>
        </el-table-column>
      </el-table>
    </el-card>
  </div>
</template>
<script setup lang="ts">
import { useRouter } from "vue-router";
import { ref } from "vue";
import apiTime from "../utils/apiSetTime.json";

const router = useRouter();

const dataList = ref<any>([
  {
    date: "Sunday",
    meal: false,
    start: "",
    end: "",
    id: "1",
  },
  {
    date: "Monday",
    meal: true,
    start: "",
    end: "",
    id: "2",
  },
  {
    date: "Tuesday",
    meal: true,
    start: "",
    end: "",
    id: "3",
  },
  {
    date: "Wednesday",
    meal: true,
    start: "",
    end: "",
    id: "4",
  },
  {
    date: "Thursday",
    meal: true,
    start: "",
    end: "",
    id: "5",
  },
  {
    date: "Friday",
    meal: true,
    start: "",
    end: "",
    id: "6",
  },
  {
    date: "Saturday",
    meal: true,
    start: "",
    end: "",
    id: "7",
  },
]);
const convertMinutes = (minutes: number) => {
  const hours = Math.floor(minutes / 60);
  const remainingMinutes = minutes % 60;
  const formattedTime = `${hours.toString().padStart(2, "0")}:${remainingMinutes
    .toString()
    .padStart(2, "0")}`;
  return formattedTime;
};

const setTime = (data: any) => {
  let startAt = "";
  let endAt = "";
  let trigger = false;

  data.split("").map((unit: string, index: number) => {
    if (!trigger && unit === "1") {
      trigger = true;
      const miunte = index * 30;
      startAt = convertMinutes(miunte);
    } else if (trigger && unit === "0") {
      trigger = false;
      const miunte = index * 30;
      endAt = convertMinutes(miunte);
    } else if (trigger && index === 47) {
      if (!endAt) {
        startAt = "00:00";
        endAt = "23:59";
      }
    } else if (!trigger && index === 0) {
      startAt = "00:00";
      endAt = "23:59";
    }
  });
  return {
    start: startAt,
    end: endAt,
  };
};

const getTime = () => {
  dataList.value = dataList.value.map((day: any, i: number) => {
    let time = setTime(Object.values(apiTime)[i]);
    return {
      date: day.date,
      meal: day.meal,
      start: time.start,
      end: time.end,
      id: day.id,
    };
  });
};
const goRoute = () => {
  router.push("/TodoList");
};
getTime();
</script>
<style scoped lang="scss"></style>
