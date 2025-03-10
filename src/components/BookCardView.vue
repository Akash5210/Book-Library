<template>
  <div class="cardView">
    <el-scrollbar height="500px">
    <el-space wrap >
      <el-card v-for="book in booksdata" :key="book.id" style="width: 220px" lazy>
        <el-image class="imagePlaceholder">
          <template #error>
            <div class="image-slot">
              <el-icon><icon-picture /></el-icon>
            </div>
          </template>
        </el-image>
        <!-- <img src="https://shadow.elemecdn.com/app/element/hamburger.9cf7b091-55e9-11e9-a976-7f4d0b07eef6.png"
          style="width: 100%" /> -->
        <div>
          <div class="bookDetails">
            <p class="ellipsis">Title:
              <el-tooltip class="box-item" :disabled="book.title.length < 15" effect="light" :content="book.title"
                placement="bottom-start" :open-delay="200">
                {{ book.title }}
              </el-tooltip>
            </p>
            <p>Genre : {{ book.type.join(', ') }}</p>
            <p>Author: {{ book.author }}</p>
            <p>Price: ₹{{ book.price }}</p>
          </div>
          <div class="actionButtons" v-if="loggedInAccess.getIsLoggedIn">
            <el-button @click="handleEdit(book)" circle>
              <IconEdit style="width: 1em; height: 1em;" />
            </el-button>
            <el-popconfirm title="Are you sure to remove this?" @confirm="handleDelete(book)">
              <template #reference>
                <el-button type="danger" circle>
                  <IconDelete style="width: 1em; height: 1em;" />
                </el-button>
              </template>
            </el-popconfirm>
          </div>
        </div>
      </el-card>
    </el-space>
  </el-scrollbar>
  </div>
  <AddOrEditBook :modifyBook="modifyBook" />
</template>

<script setup>
import { Picture as IconPicture } from '@element-plus/icons-vue'
import IconEdit from "./icons/IconEdit.vue";
import IconDelete from "./icons/IconDelete.vue";

import AddOrEditBook from './AddOrEditBook.vue'
import { useLoggedInAccessStore } from '@/stores/loggedInAccess'

const loggedInAccess = useLoggedInAccessStore()

const props = defineProps(['booksdata'])
const emit = defineEmits(['removeBook', 'modifyBook'])

const handleEdit = (book) => {
  emit('modifyBook', { ...book });
}

const handleDelete = (book) => {
  emit('removeBook', book.id)
}
</script>

<style scoped>
.cardView {
  margin: 20px auto;
}

.cardView .bookDetails {
  margin-top: 10px;
  min-height: 7rem;
}

.cardView .actionButtons {
  display: flex;
  justify-content: space-around;
}

.ellipsis {
  width: 100%;
  display: block;
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
  word-break: break-all;
}
.imagePlaceholder{
  height: 7rem;
  display: flex;
  justify-content: center;
  align-items: center;
  background: var(--el-fill-color-light);
  color: var(--el-text-color-secondary);
  font-size: 30px;
}
.image-slot .el-icon {
  font-size: 30px;
}
</style>