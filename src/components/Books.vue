<template>
  <div class="actionHeaderButtons">
    <el-button plain @click="isFormVisible = true" type="success" :icon="Plus">Add New Book</el-button>
    <el-button-group class="ml-20">
      <el-button type="primary" :icon="Grid" @click="currentView = 'grid'" />
      <el-button type="primary" :icon="Files" @click="currentView = 'card'" />
    </el-button-group>
  </div>
  <AddOrEditBook 
    :booksdata="booksdata" 
    :isFormVisible="isFormVisible" 
    :modifyBookData="modifyBookData"
    @changeFormVisibility="changeFormVisibility"
    @addBook="addBook" 
    @editBook="editBook"
  />
  <BookCardView 
    v-if="currentView === 'card'" 
    :booksdata="booksdata" 
    @modifyBook="modifyBook"
    @removeBook="removeBook" 
    @editBook="editBook" 
  />
  <BookGridView 
    v-if="currentView === 'grid'" 
    :booksdata="booksdata" 
    @modifyBook="modifyBook"
    @removeBook="removeBook" 
    @editBook="editBook"
  />
  <BooksCarousel/>
</template>

<script setup>
import { ref } from 'vue'
import { Plus, Grid, Files } from '@element-plus/icons-vue'
import AddOrEditBook from './AddOrEditBook.vue'
import BookCardView from './BookCardView.vue'
import BookGridView from './BookGridView.vue'
import BooksCarousel from './BooksCarousel.vue'
import jsonBookData from './bookData.json'

// const openReadmeInEditor = () => fetch('/__open-in-editor?file=README.md')

//publication date new property
const booksdata = ref(jsonBookData);

const currentView = ref("grid");
const isFormVisible = ref(false);
const modifyBookData = ref({});

const changeFormVisibility = (currentValue)=>{
  isFormVisible.value = currentValue;
}

const addBook = (book) => {
  booksdata.value.push(book)
  console.log("pushed", book)
}

const modifyBook = (book)=>{
  modifyBookData.value = book;
}

const editBook = (currentBook) => {
  console.log(currentBook)

  booksdata.value.forEach(book => {
    if (book.id === currentBook.id) {
      book.title = currentBook.title;
      book.type = [...currentBook.type];
      book.author = currentBook.author;
      book.price = currentBook.price;
      book.summary = currentBook.summary
    }
  })
}

let removeBook = (id) => {
  console.log(id);
  booksdata.value = booksdata.value.filter(book => book.id !== id);
}

</script>
<style>
.actionHeaderButtons{
  display: flex;
  justify-content:flex-end;
  margin-bottom: 10px;
}
.ml-20{
  margin-left: 20px;
}
</style>
