<template>
  <div>
    <el-table ref="gridRef" 
      :data="booksdata" 
      tooltip-effect="light" 
      fit
      style="width: 100%">
      <el-table-column fixed prop="title" label="Title" show-overflow-tooltip sortable min-width="160" />
      <el-table-column 
        fixed 
        prop="type" 
        label="Type" 
        show-overflow-tooltip 
        tooltip-effect="light"
        sortable 
        :filters="[
          {text: 'Science Fiction', value: 'Science Fiction'},
          {text: 'Romance', value: 'Romance'},
          {text: 'Horror', value: 'Horror'},
          {text: 'Thriller', value: 'Thriller'},
          {text: 'Fantasy', value: 'Fantasy'},
        ]"
        :filter-method="filterBookType"
      />
      <el-table-column prop="author" label="Author" show-overflow-tooltip/>
      <el-table-column prop="price" label="Price" show-overflow-tooltip sortable />
      <el-table-column prop="id" label="ID"/>
      <el-table-column fixed="right" label="Operations">
        <template #default="scope">
          <el-button @click="handleEdit(scope.row)" type="primary" size="small">Edit</el-button>
          <el-popconfirm 
            title="Are you sure to remove this?" 
            @confirm="handleDelete(scope.row)"
          >
            <template #reference>
              <el-button type="danger" size="small">Delete</el-button>
            </template>
          </el-popconfirm>
        </template>
      </el-table-column>
    </el-table>
  </div>
  <AddOrEditBook 
    :modifyBook="modifyBook"
  />
</template>
<script setup>
import { ref } from 'vue';

import AddOrEditBook from './AddOrEditBook.vue'

const props = defineProps(['booksdata'])
const emit = defineEmits(['removeBook', 'modifyBook'])

const gridRef = ref();

const modifyBook = ref({});

const filterBookType = (value, row, column) => {
  const bookType = column['property'];
  return row[bookType].includes(value);
}

const handleEdit = (book) => {
  emit('modifyBook', {...book});
}
const handleDelete = (book) => {
  emit('removeBook', book.id)
}
</script>