<template>
  <div>
    <el-table :data="booksdata" style="width: 100%">
      <el-table-column fixed prop="title" label="Title" sortable min-width="160" />
      <el-table-column fixed prop="type" label="Type" sortable />
      <el-table-column prop="author" label="Author" sortable />
      <el-table-column prop="price" label="Price" sortable />
      <el-table-column prop="id" label="ID" sortable />
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
</template>
<script setup>
const props = defineProps(['booksdata'])
const emit = defineEmits(['removeBook', 'populateModal'])

const handleEdit = (book) => {
  emit('populateModal', book)
}
const handleDelete = (book) => {
  emit('removeBook', book.id)
}
</script>