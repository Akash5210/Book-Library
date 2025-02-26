<template>  
  <input v-model="newBook.title" placeholder="Title"/>
  <input v-model="newBook.author" placeholder="Author"/>
  <input v-model="newBook.price" placeholder="Price"/>
  <button :style='{marginLeft:"5px",}' @click="addItem">{{ newBook.btnStatus }}</button>
  <div>
    <input type="radio" id="horror" value="horror" v-model="newBook.type"/>
    <label for="horror">Horror</label>

    <input type="radio" id="scienceFiction" value="scienceFiction" v-model="newBook.type" />
    <label for="scienceFiction">Science Fiction</label>

    <input type="radio" id="romance" value="romance" v-model="newBook.type" />
    <label for="romance">Romance</label>

    <input type="radio" id="thriller" value="thriller" v-model="newBook.type"/>
    <label for="thriller">Thriller</label>

    <input type="radio" id="fantasy" value="fantasy" v-model="newBook.type" />
    <label for="fantasy">Fantasy</label>
  </div>

  <Book :booksdata="booksdata" @removeBook="removeBook" @editBook="editBook"/>
  <!-- <BookCardView :booksdata="booksdata" @removeBook="removeBook" @editBook="editBook" /> -->
  <BookGridView :booksdata="booksdata" @removeBook="removeBook" @editBook="editBook"/>
</template>

<script setup>
import { ref } from 'vue'
import Book from './Book.vue'
import BookCardView from './BookCardView.vue'
import BookGridView from './BookGridView.vue'


const openReadmeInEditor = () => fetch('/__open-in-editor?file=README.md')

const booksdata = ref([
  {id: 1, title: "The Gravity", type: "scienceFiction", author:"123",price: 10},
  {id: 2, title: "Intesteller", type: "scienceFiction", author:"456",price: 20},
  {id: 3, title: "Doremon", type: "romance", author:"789",price: 25},
  {id: 4, title: "Sinchan", type: "romance", author:"101",price: 15},
  {id: 5, title: "Annabell", type: "horror", author:"102",price: 5},
  {id: 6, title: "Ouija", type: "horror", author:"103",price: 100},
  {id: 7, title: "Never Lie", type: "thriller", author:"104",price: 12},
  {id: 8, title: "The Locked Door", type: "thriller", author:"105",price: 23},
  {id: 9, title: "I too had a love story", type: "fantasy", author:"106",price: 21},
  {id: 10, title: "Can Love happens twice", type: "fantasy", author:"107",price: 11}
])

const newBook = ref({
  id: "", 
  title: "", 
  type: "", 
  author:"",
  price: 0,
  btnStatus: "Add"
})

let addItem = (book)=> {
  if(!newBook.value.title || !newBook.value.type){
    alert("Please, Provide both values!")
    return ;
  }

  const tempData = {
    id: newBook.value.btnStatus === "Add"? Date.now() + Math.random(): newBook.value.id,
    title: newBook.value.title,
    type: newBook.value.type,
    author: newBook.value.author,
    price: newBook.value.price,
  }
  console.log(tempData);

  if(newBook.value.btnStatus === "Add"){
    booksdata.value.push(tempData);
  }else{
    booksdata.value.forEach(book => {
      if(book.id === tempData.id){
        book.title = tempData.title;
        book.type = tempData.type;
        book.author = tempData.author;
        book.price = tempData.price;
      }
    })
  }
  resetValues();
}

let editBook = (book)=>{
  newBook.value.id = book.id;
  newBook.value.title = book.title;
  newBook.value.type = book.type;
  newBook.value.author = book.author;
  newBook.value.price = book.price;
  newBook.value.btnStatus = 'Update';
}

let removeBook = (id)=>{
  console.log(id);
  booksdata.value = booksdata.value.filter(book => book.id !== id);
}

const resetValues = ()=>{
  newBook.value = {
    id: "",
    book: "",
    bookType: "",
    author:"",
    price: 0,
    btnStatus: "Add"
  }
}
</script>
