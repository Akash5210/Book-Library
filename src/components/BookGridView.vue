<template>
    <div>
    <el-table :data="booksdata" style="width: 100%">
        <el-table-column fixed prop="title" label="Title" sortable width="150" />
        <el-table-column fixed prop="type" label="Type" sortable width="90" />
        <el-table-column prop="author" label="Author" sortable width="120" />
        <el-table-column prop="price" label="Price" sortable width="120" />
        <el-table-column prop="id" label="ID" sortable width="120" />
      <el-table-column fixed="right" label="Operations" min-width="120">
        <template #default="scope">
          <el-button @click="handleEdit(scope.row)" type="primary" size="small" >Edit</el-button>
          <el-button @click="handleDelete(scope.row)" type="danger" size="small" >Delete</el-button>
        </template>
      </el-table-column>
    </el-table>
</div>
</template>
<script setup>
const props = defineProps(['booksdata'])
const emit = defineEmits(['removeBook', 'editBook'])

const handleEdit = (book)=>{
    emit('editBook', book)
}
const handleDelete = (book)=>{
    emit('removeBook', book.id)
}
</script>