<template>
  <div class="booksHome">
    <div class="actionHeaderButtons py-6">
      <el-button plain @click="isFormVisible = true" type="success" :icon="Plus">Add New Book</el-button>
      <el-button-group class="ml-20">
        <el-button type="primary" :icon="Grid" @click="currentView = 'grid'" :plain="currentView !== 'grid'"/>
        <el-button type="primary" :icon="Files" @click="currentView = 'card'" :plain="currentView !== 'card'"/>
      </el-button-group>
    </div>
    <Login v-if="loggedInAccess.getShowLoginModal"/>
    <Register v-if="loggedInAccess.getshowRegisterModal"/>

    <AddOrEditBook :booksdata="booksdata" :isFormVisible="isFormVisible" :modifyBookData="modifyBookData"
      @changeFormVisibility="changeFormVisibility" @addBook="addBook" @editBook="editBook" />
    <BookCardView v-if="currentView === 'card'" :booksdata="booksdata" @modifyBook="modifyBook" @removeBook="removeBook"
      @editBook="editBook" />
    <BookGridView v-if="currentView === 'grid'" :booksdata="booksdata" @modifyBook="modifyBook" @removeBook="removeBook"
      @editBook="editBook" />
    <BooksCarousel :carouselData="carouselData" />
    <FooterSection />

    <el-backtop :right="100" :bottom="100" />
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { Plus, Grid, Files } from '@element-plus/icons-vue';
import AddOrEditBook from './AddOrEditBook.vue';
import BookCardView from './BookCardView.vue';
import BookGridView from './BookGridView.vue';
import BooksCarousel from './BooksCarousel.vue';
import FooterSection from './Footer.vue';
import jsonBookData from './bookData.json';
import carouselData from './carouselData.json';
import Login from './login/Login.vue';
import Register from './login/Register.vue';

// const openReadmeInEditor = () => fetch('/__open-in-editor?file=README.md')

import { useLoggedInAccessStore } from '@/stores/loggedInAccess'

const loggedInAccess = useLoggedInAccessStore()

const booksdata = ref(jsonBookData);

const currentView = ref("grid");
const isFormVisible = ref(false);
const modifyBookData = ref({});

const changeFormVisibility = (currentValue) => {
  isFormVisible.value = currentValue;
}

const addBook = (book) => {
  booksdata.value.push(book)
  console.log("pushed", book)
}

const modifyBook = (book) => {
  modifyBookData.value = book;
}

const editBook = (currentBook) => {
  console.log(currentBook)

  const book = booksdata.value.find(book => book.id === currentBook.id)
  if (book) {
    // book.title = currentBook.title;
    // book.type = [...currentBook.type];
    // book.author = currentBook.author;
    // book.price = currentBook.price;
    // book.summary = currentBook.summary
    Object.assign(book, currentBook);
  }
}

const removeBook = (id) => {
  console.log(id);
  booksdata.value = booksdata.value.filter(book => book.id !== id);
}

</script>
<style>
.actionHeaderButtons {
  display: flex;
  justify-content: flex-end;
  margin-bottom: 10px;
  max-width: 1280px;
  margin: 0 18rem;
}

.ml-20 {
  margin-left: 20px;
}

.mb-20 {
  margin-bottom: 200px;
}

.login{

}
</style>
