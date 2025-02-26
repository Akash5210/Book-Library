<template>
    <h3>Books</h3>
    <ol>
        <li v-for="book in booksdata" :key="book.id">
            {{ book.title }} 
            <el-button @click="$emit('editBook', book)"><IconEdit style="width: 1em; height: 1em;"/></el-button>
            <el-button @click="$emit('removeBook', book.id)"><IconDelete style="width: 1em; height: 1em;"/></el-button>
        </li>
    </ol>
</template>
  
<script setup>
import IconEdit from "./icons/IconEdit.vue";
import IconDelete from "./icons/IconDelete.vue";

const props = defineProps(['booksdata'])
defineEmits(['removeBook', 'editBook'])

</script>
  
  