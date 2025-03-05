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
</template>

<script setup>
import { ref } from 'vue'
import { Plus, Grid, Files } from '@element-plus/icons-vue'
import AddOrEditBook from './AddOrEditBook.vue'
import BookCardView from './BookCardView.vue'
import BookGridView from './BookGridView.vue'


// const openReadmeInEditor = () => fetch('/__open-in-editor?file=README.md')

//publication date new property
const booksdata = ref([
  { id: 1, title: "The Gravity sdf sdf sdf s fsdf sd fdsf sd  sd fsd sdfd sdf ", type: ["Science Fiction"], author: "123", price: "10", summary: "testing1" },
  { id: 2, title: "Intesteller", type: ["Science Fiction"], author: "456", price: "20", summary: "testing2"},
  { id: 3, title: "Doremon", type: ["Romance"], author: "789", price: "25", summary: "testing3" },
  { id: 4, title: "Sinchan", type: ["Romance"], author: "101", price: "15", summary: "testing1" },
  { id: 5, title: "Annabell", type: ["Horror"], author: "102", price: "5", summary: "testing5" },
  { id: 6, title: "Ouija", type: ["Horror"], author: "103", price: "100", summary: "testing1" },
  { id: 7, title: "Never Lie", type: ["Thriller", "Horror"], author: "104", price: "12", summary: "testing5" },
  { id: 8, title: "The Locked Door", type: ["Thriller", "Romance"], author: "105", price: "23", summary: "testing1" },
  { id: 9, title: "I too had a love story", type: ["Fantasy"], author: "106", price: "21", summary: "testing12" },
  { id: 10, title: "Can Love happens twice", type: ["Fantasy"], author: "107", price: "11", summary: "testing01" }
])

const currentView = ref("card");
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
