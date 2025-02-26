<template>
    <el-card v-for="book in booksdata" :key="book.id" style="max-width: 480px">
      <img
        src="https://shadow.elemecdn.com/app/element/hamburger.9cf7b091-55e9-11e9-a976-7f4d0b07eef6.png"
        style="width: 20%"
      />
      <div>
        <p>{{ book.title }}</p>
        <button @click="$emit('editBook', book)"><IconEdit style="width: 1em; height: 1em;"/></button>
        <button @click="$emit('removeBook', book)"><IconDelete style="width: 1em; height: 1em;"/></button>
      </div>
    </el-card>
</template>

<script setup>
import IconEdit from "./icons/IconEdit.vue";
import IconDelete from "./icons/IconDelete.vue";


const props = defineProps(['booksdata'])
defineEmits(['removeBook', 'editBook'])
</script>