<template>
  <input v-model="newBook.title" placeholder="Title" />
  <input v-model="newBook.author" placeholder="Author" />
  <input v-model="newBook.price" placeholder="Price" />
  <button :style='{ marginLeft: "5px", }' @click="addItem">{{ newBook.btnStatus }}</button>
  <div>
    <input type="radio" id="horror" value="Horror" v-model="newBook.type" />
    <label for="horror">Horror</label>

    <input type="radio" id="scienceFiction" value="Science Fiction" v-model="newBook.type" />
    <label for="scienceFiction">Science Fiction</label>

    <input type="radio" id="romance" value="Romance" v-model="newBook.type" />
    <label for="romance">Romance</label>

    <input type="radio" id="thriller" value="Thriller" v-model="newBook.type" />
    <label for="thriller">Thriller</label>

    <input type="radio" id="fantasy" value="Fantasy" v-model="newBook.type" />
    <label for="fantasy">Fantasy</label>
  </div>
  <div>
    <el-button type="success" :icon="Plus">Add New Book</el-button>
    <el-button-group class="ml-4">
      <el-button type="primary" :icon="Grid" @click="currentView = 'grid'" />
      <el-button type="primary" :icon="Files" @click="currentView = 'card'" />
    </el-button-group>
  </div>

  <BookCardView v-if="currentView === 'card'" :booksdata="booksdata" @removeBook="removeBook" @editBook="editBook" />
  <BookGridView v-if="currentView === 'grid'" :booksdata="booksdata" @removeBook="removeBook" @editBook="editBook" />
</template>

<script setup>
import { ref } from 'vue'
import { Plus, Grid, Files} from '@element-plus/icons-vue'
import BookCardView from './BookCardView.vue'
import BookGridView from './BookGridView.vue'


const openReadmeInEditor = () => fetch('/__open-in-editor?file=README.md')

const booksdata = ref([
  { id: 1, title: "The Gravity", type: "Science Fiction", author: "123", price: 10 },
  { id: 2, title: "Intesteller", type: "Science Fiction", author: "456", price: 20 },
  { id: 3, title: "Doremon", type: "Romance", author: "789", price: 25 },
  { id: 4, title: "Sinchan", type: "Romance", author: "101", price: 15 },
  { id: 5, title: "Annabell", type: "Horror", author: "102", price: 5 },
  { id: 6, title: "Ouija", type: "Horror", author: "103", price: 100 },
  { id: 7, title: "Never Lie", type: "Thriller", author: "104", price: 12 },
  { id: 8, title: "The Locked Door", type: "Thriller", author: "105", price: 23 },
  { id: 9, title: "I too had a love story", type: "Fantasy", author: "106", price: 21 },
  { id: 10, title: "Can Love happens twice", type: "Fantasy", author: "107", price: 11 }
])

const newBook = ref({
  id: "",
  title: "",
  type: "",
  author: "",
  price: 0,
  btnStatus: "Add"
})

const currentView = ref("grid");

let addItem = (book) => {
  if (!newBook.value.title || !newBook.value.type) {
    alert("Please, Provide both values!")
    return;
  }

  const tempData = {
    id: newBook.value.btnStatus === "Add" ? Date.now() + Math.random() : newBook.value.id,
    title: newBook.value.title,
    type: newBook.value.type,
    author: newBook.value.author,
    price: newBook.value.price,
  }
  console.log(tempData);

  if (newBook.value.btnStatus === "Add") {
    booksdata.value.push(tempData);
  } else {
    booksdata.value.forEach(book => {
      if (book.id === tempData.id) {
        book.title = tempData.title;
        book.type = tempData.type;
        book.author = tempData.author;
        book.price = tempData.price;
      }
    })
  }
  resetValues();
}

let editBook = (book) => {
  newBook.value.id = book.id;
  newBook.value.title = book.title;
  newBook.value.type = book.type;
  newBook.value.author = book.author;
  newBook.value.price = book.price;
  newBook.value.btnStatus = 'Update';
}

let removeBook = (id) => {
  console.log(id);
  booksdata.value = booksdata.value.filter(book => book.id !== id);
}

const resetValues = () => {
  newBook.value = {
    id: "",
    book: "",
    bookType: "",
    author: "",
    price: 0,
    btnStatus: "Add"
  }
}
</script>
