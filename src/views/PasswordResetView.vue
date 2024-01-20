<script setup>
import router from '../router'
import { ref } from 'vue'
import { getAuth, sendPasswordResetEmail } from 'firebase/auth'

const auth = getAuth()
const email = ref('')
const msg = ref()

async function resetPassword() {
  sendPasswordResetEmail(auth, email.value)
    .then(async () => {
      msg.value = 'Password Reset Sent To Your Email'
      await new Promise((r) => setTimeout(r, 5000))
      router.push({ name: 'Login' })
    })
    .catch((error) => {
      msg.value = error.message
    })
}
</script>

<template>
  <div class="creds">
    <p><input type="text" placeholder="Email" v-model="email" /></p>
    <p v-if="msg">{{ msg }}</p>
    <p><button @click="resetPassword">Reset Password</button></p>
  </div>
</template>
