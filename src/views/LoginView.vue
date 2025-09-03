<script setup>
import { ref } from 'vue'

const success = ref('')

const formData = ref({
  username: '',
  password: '',
})

const errors = ref({
  username: null,
  password: null,
  auth: null,   
})

const validateUsername = (blur) => {
  if (!formData.value.username) {
    if (blur) errors.value.username = 'Username is required.'
  } else {
    errors.value.username = null
  }
}
const validatePassword = (blur) => {
  if (!formData.value.password) {
    if (blur) errors.value.password = 'Password is required.'
  } else {
    errors.value.password = null
  }
}

const CREDS = { username: 'Marry', password: 'A12345678a!' } 

const onSubmit = () => {
  validateUsername(true)
  validatePassword(true)
  if (errors.value.username || errors.value.password) return

  errors.value.auth = null
  const ok =
    formData.value.username === CREDS.username &&
    formData.value.password === CREDS.password

  if (!ok) {
    errors.value.auth = 'Invalid username or password.'
    return
  }


  localStorage.setItem('isAuthed', 'true')
  localStorage.setItem('authedUser', JSON.stringify({ username: formData.value.username }))

  success.value = 'Login successful.'
}
</script>

<template>
  <div class="container mt-5">
    <div class="row">
      <div class="col-md-8 offset-md-2">
        <h1 class="text-center">Login</h1>
        <form @submit.prevent="onSubmit">
          <div class="row mb-3">
            <div class="col-md-12">
              <label for="username" class="form-label">Username</label>
              <input
                id="username"
                type="text"
                class="form-control"
                v-model.trim="formData.username"
                @blur="() => validateUsername(true)"
                @input="() => validateUsername(false)"
              />
              <div v-if="errors.username" class="text-danger">{{ errors.username }}</div>
            </div>
          </div>

          <div class="row mb-3">
            <div class="col-md-12">
              <label for="password" class="form-label">Password</label>
              <input
                id="password"
                type="password"
                class="form-control"
                v-model="formData.password"
                @blur="() => validatePassword(true)"
                @input="() => validatePassword(false)"
              />
              <div v-if="errors.password" class="text-danger">{{ errors.password }}</div>
            </div>
          </div>

          <div v-if="errors.auth" class="text-danger mb-3">{{ errors.auth }}</div>

          <div class="text-center">
            <button type="submit" class="btn btn-primary me-2">Log in</button>
          </div>
          <div v-if="success" class="alert alert-success mt-3">{{ success }}</div>
        </form>
      </div>
    </div>
  </div>
</template>
