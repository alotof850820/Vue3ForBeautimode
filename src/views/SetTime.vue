<template>
  <div>
    <el-card>
      <el-button @click="goRoute" style="background-color: red"
        >Go TodoList</el-button
      >
      <el-table :data="dataList" style="width: 100%">
        <el-table-column prop="date" label="Date" width="180" />
        <el-table-column label="whether to provide meals" width="210">
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
            <div v-if="row.meal" style="width: 54%">
              <div
                v-for="(item, index) in row.timeList"
                style="width: 100%; margin: 5px"
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
                &nbsp&nbsp-&nbsp&nbsp
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

                <el-button
                  style="margin: 5px 0px 5px 17px; background-color: #f4f4f4"
                  @click="row.timeList.splice(index, 1)"
                  >Del</el-button
                >
              </div>

              <el-button
                style="
                  width: 100%;
                  margin: 5px;
                  background-color: #8fc325;
                  color: white;
                "
                v-if="row.meal"
                @click="addTimeList(row)"
              >
                Add
              </el-button>
            </div>
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
import type {
  TimeType,
  TimeListType,
  DataType,
  AllDataListType,
} from "../utils/apiSetTimeType";
import { ElMessage } from "element-plus";

const router = useRouter();

const dataList = ref<AllDataListType>([
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
const setMinutes = (minutes: number) => {
  const hours = Math.floor(minutes / 60);
  const minute = minutes % 60;
  const time = `${hours.toString().padStart(2, "0")}:${minute
    .toString()
    .padStart(2, "0")}`;
  return time;
};
const setTime = (data: string) => {
  let startAt = "";
  let endAt = "";
  let start = false;
  let change = false;
  let time = <TimeListType>[];

  data.split("").map((unit: string, index: number) => {
    if (!start && unit === "1") {
      change = true;
      start = true;
      const miunte = index * 30;
      startAt = setMinutes(miunte);
    } else if (start && unit === "0" && start) {
      change = true;
      start = false;
      const miunte = index * 30;
      endAt = setMinutes(miunte);
      time.push({
        start: startAt,
        end: endAt,
      });
    }
    if (!change && index === 47) {
      time.push({
        start: "00:00",
        end: "23:59",
      });
    }
    if (change && index === 47 && unit === "1") {
      time.push({
        start: startAt,
        end: "23:59",
      });
    }
  });
  return time;
};
const setMin = (timeList: TimeListType, index: number) => {
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
const setMax = (timeList: TimeListType, index: number) => {
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
  dataList.value = dataList.value.map((day: DataType, i: number) => {
    let time = setTime(Object.values(apiTime)[i]);

    return {
      ...day,
      timeList: time,
    };
  });
};
const addTimeList = (row: DataType) => {
  if (row.timeList[row.timeList.length - 1].start === "") {
    ElMessage({
      type: "error",
      message: "請填入時間",
    });
    return;
  }

  row.timeList.push({ start: "", end: "" });
};
const goRoute = () => {
  router.push("/TodoList");
};

watch(
  () => dataList.value.map((item) => item.timeList),
  () => {
    dataList.value.map((item: DataType) => {
      for (let i = 0; i < item.timeList.length; i++) {
        if (item.timeList[i]?.start === item.timeList[i - 1]?.end) {
          item.timeList[i].start = item.timeList[i - 1].end;
          item.timeList[i - 1].start = "";
          item.timeList[i - 1].end = "";

          item.timeList = item.timeList.filter(
            (time: TimeType) => time.start !== "" || time.end !== ""
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
