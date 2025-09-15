<template>
    <div>
        <h1>Books with ISBN > 1000</h1>
        <div>
            <button type="button" @click="sort">
                Sort by ISBN
            </button>
        </div>
        <ul>
            <li v-for="book in books" :key="book.id">
                <template v-if="editId === book.id">
                    <input v-model="editForm.name" placeholder="name" />
                    <input v-model="editForm.isbn" placeholder="isbn (number)" />
                    <button @click="save(book.id)">Save</button>
                    <button @click="cancel">Cancel</button>
                </template>
                <template v-else>
                    {{ book.name }} - ISBN: {{ book.isbn }}
                    <button @click="edit(book)">Edit</button>
                    <button @click="remove(book.id)">Remove</button>
                </template>
                
            </li>
        </ul>
    </div>
</template>

<script>
import {ref, onMounted, watch} from 'vue';
import db from '../firebase/init.js';
import {collection, query, where, orderBy, limit, getDocs, updateDoc, deleteDoc, doc} from 'firebase/firestore';

export default {
    setup() {
        const books = ref([]);
        const dir = ref('asc')
        const editId = ref(null)
        const editForm = ref({ name: '', isbn: '' })

        const fetchBooks = async () => {
            try {
                const q = query(
                    collection(db, 'books'), 
                    where('isbn', '>', 1000), 
                    orderBy('isbn', dir.value === 'desc' ? 'desc' : 'asc'),
                    limit(3)
                )
                const querySnapshot = await getDocs(q);
                const booksArray = [];
                querySnapshot.forEach((doc) => {
                    booksArray.push({id: doc.id, ...doc.data()});
                });
                books.value = booksArray;
            } catch (error) {
                console.error('error fetching books: ',error);
            }
        };

    const edit = (b) => {
      editId.value = b.id
      editForm.value = { name: b.name, isbn: b.isbn }
    }
    const cancel = () => {
      editId.value = null
      editForm.value = { name: '', isbn: '' }
    }
    const save = async (id) => {
      const isbnNum = Number(editForm.value.isbn)
      if (Number.isNaN(isbnNum)) {
        return alert('ISBN must be a valid number')
      }
      try {
        await updateDoc(doc(db, 'books', id), {
          name: editForm.value.name.trim(),
          isbn: isbnNum,
        })
        cancel()
      } catch (error) {
        console.error('update error:', error)
      }
    }
    const remove = async (id) => {
      try {
        await deleteDoc(doc(db, 'books', id))
      } catch (error) {
        console.error('delete error:', error)
      }
    }
    const sort = () => {
      dir.value = dir.value === 'asc' ? 'desc' : 'asc'
    }
    watch(dir, fetchBooks)    
    onMounted(() => {
            fetchBooks();
        });
        return { books, dir, sort, editId, editForm, edit, cancel, save, remove }
  
    }
};
</script>
