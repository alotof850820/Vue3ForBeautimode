<template>
  <div>
    <el-card class="box-card">
      <el-button type="primary" @click="addTodo">Add User title</el-button>

      <!-- table -->
      <el-table :data="allTodos" border style="margin: 10px 0px">
        <el-table-column width="80px" align="center" type="index" />
        <el-table-column width="100px" label="User" align="center">
          <template #="{ row }">
            <pre>我是User{{ row.userId }}</pre>
          </template>
        </el-table-column>
        <el-table-column label="Title" align="center">
          <template #="{ row }">
            <pre>{{ row.title }}</pre>
          </template>
        </el-table-column>

        <el-table-column width="200px" align="center" label="Operate">
          <template #="{ row }">
            <el-button type="primary" size="small" @click="editTodo(row)"
              >Edit</el-button
            >
            <el-popconfirm
              :title="`確定刪除User${row.userId}嗎?`"
              width="250px"
              icon="Delete"
              @confirm="delTodo(row)"
            >
              <template #reference>
                <el-button type="primary" size="small">Del</el-button>
              </template>
            </el-popconfirm>
          </template>
        </el-table-column>
      </el-table>
      <!-- page -->
    </el-card>
    <!-- dialog -->
    <el-dialog
      v-model="dialogVisible"
      :title="userData.id ? 'Edit User title' : 'Add User title'"
      width="30%"
    >
      <span>輸入title</span>
      <el-input v-model="userData.title"></el-input>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="dialogVisible = false">Cancel</el-button>
          <el-button type="primary" @click="ok"> Confirm </el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>
<script setup lang="ts">
import { reactive, ref } from "vue";
import type {
  TodoResponseType,
  TodoType,
  AllTodoArrayType,
} from "../utils/apiTodoListType";
import {
  apiGetAlltodos,
  apiAddtodo,
  apiUpdatetodo,
  apiDeltodo,
} from "../utils/apiTodoList.ts";
import { ElMessage } from "element-plus";

const allTodos = ref<AllTodoArrayType>([]);
const dialogVisible = ref<boolean>(false);
const userData = reactive<TodoType>({
  title: "",
  completed: true,
  userId: 1,
});

const ok = async () => {
  // edit
  if (userData.id) {
    const res: TodoResponseType = await apiUpdatetodo(userData.id, userData);
    if (res.status === 200) {
      ElMessage({
        type: "success",
        message: "success to Edit data",
      });
      getAllTodo();
      dialogVisible.value = false;
    } else {
      ElMessage({
        type: "error",
        message: "Failed to Edit data",
      });
    }
  } else {
    const res: TodoResponseType = await apiAddtodo(userData);
    if (res.status === 201) {
      ElMessage({
        type: "success",
        message: "success to Add data",
      });
      getAllTodo();
      dialogVisible.value = false;
    } else {
      ElMessage({
        type: "error",
        message: "Failed to Add data",
      });
    }
  }
};
const getAllTodo = async () => {
  const res: TodoResponseType = await apiGetAlltodos();

  if (res.status === 200) {
    allTodos.value = res.data.filter((user: TodoType) => user.userId === 1);
  } else {
    ElMessage({
      type: "error",
      message: "Failed to Get data",
    });
  }
};
const addTodo = async () => {
  dialogVisible.value = true;
};

const editTodo = async (row: TodoType) => {
  dialogVisible.value = true;
  Object.assign(userData, {
    id: 1,
    title: row.title,
    completed: true,
    userId: row.userId,
  });
};
const delTodo = async (row: TodoType) => {
  const res: any = await apiDeltodo(row.id as number);

  if (res.status === 200) {
    ElMessage({
      type: "success",
      message: "success to Del data",
    });
    getAllTodo();
    dialogVisible.value = false;
  } else {
    ElMessage({
      type: "error",
      message: "Failed to Del data",
    });
  }
};

getAllTodo();
</script>
<style scoped lang="scss"></style>
../utils/apiTodoList.ts
