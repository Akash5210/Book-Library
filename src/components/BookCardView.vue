<template>
  <div class="cardView">
    <el-space wrap>
      <el-card v-for="book in booksdata" :key="book.id" style="max-width: 220px">
        <img src="https://shadow.elemecdn.com/app/element/hamburger.9cf7b091-55e9-11e9-a976-7f4d0b07eef6.png"
          style="width: 100%" />
        <div>
          <p>{{ book.title }}</p>
          <p>Genre : {{ book.type }}</p>
          <p>Author: {{ book.author }}</p>
          <p>Price: {{ book.price }}</p>
          <el-button @click="$emit('editBook', book)" circle>
            <IconEdit style="width: 1em; height: 1em;" />
          </el-button>
          <el-popconfirm 
            title="Are you sure to remove this?"
            @confirm="handleDelete(book)"
          >
            <template #reference>
              <el-button type="danger" circle>
                <IconDelete style="width: 1em; height: 1em;" />
              </el-button>
            </template>
          </el-popconfirm>
        </div>
      </el-card>
    </el-space>
  </div>
</template>

<script setup>
import IconEdit from "./icons/IconEdit.vue";
import IconDelete from "./icons/IconDelete.vue";


const props = defineProps(['booksdata'])
const emit = defineEmits(['removeBook', 'editBook'])

const handleDelete = (book)=>{
    emit('removeBook', book.id)
}
</script>

<style>
.cardView {
  margin-bottom: 20px;
}
</style>