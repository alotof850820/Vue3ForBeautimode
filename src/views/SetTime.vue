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
            <div
              v-if="row.meal"
              v-for="(item, index) in row.timeList"
              class="demo-time-range"
            >
              <el-time-select
                v-model="item.start"
                :min-time="setMin(row.timeList, index)"
                :max-time="item.end"
                placeholder="Start time"
                start="00:00"
                step="00:30"
                end="23:59"
              />
              <el-time-select
                :disabled="item.start === ''"
                v-model="item.end"
                :min-time="item.start"
                :max-time="setMax(row.timeList, index)"
                placeholder="End time"
                start="00:00"
                step="00:30"
                end="23:59"
              />
              <!-- 加刪除 -->
            </div>
            <el-button v-if="row.meal" @click="addTimeList(row)">Add</el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-card>
  </div>
</template>
<script setup lang="ts">
import { useRouter } from "vue-router";
import { ref, watch } from "vue";
import apiTime from "../utils/apiSetTime.json";

const router = useRouter();

const dataList = ref<any>([
  {
    date: "Sunday",
    meal: false,
    timeList: [{ start: "", end: "" }],
    id: "1",
  },
  {
    date: "Monday",
    meal: true,
    timeList: [{ start: "", end: "" }],
    id: "2",
  },
  {
    date: "Tuesday",
    meal: true,
    timeList: [{ start: "", end: "" }],
    id: "3",
  },
  {
    date: "Wednesday",
    meal: true,
    timeList: [{ start: "", end: "" }],
    id: "4",
  },
  {
    date: "Thursday",
    meal: true,
    timeList: [{ start: "", end: "" }],
    id: "5",
  },
  {
    date: "Friday",
    meal: true,
    timeList: [{ start: "", end: "" }],
    id: "6",
  },
  {
    date: "Saturday",
    meal: true,
    timeList: [{ start: "", end: "" }],
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
  let start = false;
  let time = <any>[];
  if (data === "111111111111111111111111111111111111111111111111") {
    startAt = "00:00";
    endAt = "23:59";
    time.push({
      start: startAt,
      end: endAt,
    });
    return time;
  }
  data.split("").map((unit: string, index: number) => {
    if (!trigger && unit === "1") {
      trigger = true;
      start = true;
      const miunte = index * 30;
      startAt = convertMinutes(miunte);
    } else if (trigger && unit === "0" && start) {
      trigger = false;
      start = false;
      // push
      const miunte = index * 30;

      endAt = convertMinutes(miunte);
      time.push({
        start: startAt,
        end: endAt,
      });
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
  return time;
};

const setMin: any = (timeList: any, index: number) => {
  if (timeList[index - 1]?.end) {
    let time = timeList[index - 1]?.end;
    let binaryString = "";
    const [hours, minutes] = time.split(":").map(Number);
    const totalMinutes = hours * 60 + minutes;
    for (let i = 0; i < 48; i++) {
      binaryString += i * 30 < totalMinutes ? "1" : "0";
    }
    let lastIndex = binaryString.lastIndexOf("1");
    if (lastIndex !== -1) {
      let modifiedString =
        binaryString.substring(0, lastIndex) +
        "0" +
        binaryString.substring(lastIndex + 1);

      return setTime(modifiedString)[0].end;
    }
  }
};
const setMax: any = (timeList: any, index: number) => {
  if (timeList[index + 1]?.start) {
    let time = timeList[index + 1]?.start;
    let binaryString = "";
    const [hours, minutes] = time.split(":").map(Number);
    const totalMinutes = hours * 60 + minutes;
    for (let i = 0; i < 48; i++) {
      binaryString += i * 30 < totalMinutes ? "1" : "0";
    }
    let lastIndex = binaryString.indexOf("0");
    if (lastIndex !== -1) {
      let modifiedString =
        binaryString.substring(0, lastIndex) +
        "1" +
        binaryString.substring(lastIndex + 1);
      return setTime(modifiedString)[0].end;
    }
  }
};

const getTime = () => {
  dataList.value = dataList.value.map((day: any, i: number) => {
    let time = setTime(Object.values(apiTime)[i]);

    return {
      ...day,
      timeList: time,
    };
  });
};
const addTimeList = (row: any) => {
  row.timeList.push({ start: "", end: "" });
};
const goRoute = () => {
  router.push("/TodoList");
};

watch(
  () => dataList.value,
  () => {
    dataList.value.map((item: any) => {
      for (let i = 0; i < item.timeList.length; i++) {
        if (item.timeList[i]?.start === item.timeList[i - 1]?.end) {
          item.timeList[i].start = item.timeList[i - 1].end;
          item.timeList[i - 1].start = "";
          item.timeList[i - 1].end = "";
          item.timeList = item.timeList.filter(
            (time: any) => time.start !== "" || time.end !== ""
          );
          return item.timeList;
        }
      }
    });
  },
  { deep: true }
);

getTime();
</script>
<style scoped lang="scss"></style>
