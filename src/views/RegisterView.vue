<script setup>
import router from '@/router'
import { ref } from 'vue'
import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth'

const auth = getAuth()
const email = ref('')
const password = ref('')
const msg = ref()

async function register() {
  await createUserWithEmailAndPassword(auth, email.value, password.value)
    .then((data) => {
      router.push({ name: 'Buddies', query: { uid: data.user.uid } })
    })
    .catch((error) => {
      msg.value = error.message
    })
}
</script>

<template>
  <div class="creds">
    <p><input type="text" placeholder="Email" v-model="email" /></p>
    <p><input type="password" placeholder="Password" v-model="password" /></p>
    <p v-if="msg">{{ msg }}</p>
    <p><button @click="register">Register</button></p>
  </div>
</template>
