<script setup>
import { getAuth, signOut } from "firebase/auth"
import { useRouter } from "vue-router"

const router = useRouter()
const auth = getAuth()

const logout = () => {
  signOut(auth)
    .then(() => {
      console.log("Firebase Sign out Successful!")
      router.push("/")
      console.log(auth.currentUser)
    })
    .catch((error) => {
      console.log(error.code)
    })
}
</script>

<template>
    <h1>Logout</h1>
    <button @click="logout">Logout</button>
</template>