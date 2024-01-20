<script setup>
import router from '../router'
import { ref } from 'vue'
import {
  getAuth,
  signInAnonymously,
  GoogleAuthProvider,
  signInWithPopup,
  signInWithEmailAndPassword
} from 'firebase/auth'

const auth = getAuth()
const email = ref('')
const password = ref('')
const msg = ref()

async function authenticate(provider) {
  msg.value = ''
  try {
    switch (provider) {
      case 'email':
        await signInWithEmailAndPassword(auth, email.value, password.value)
        break
      case 'anonymous':
        await signInAnonymously(auth)
        break
      case 'google':
        await signInWithPopup(auth, new GoogleAuthProvider())
        break
      case 'register':
        router.push({ name: 'Register' })
        return
      case 'reset':
        router.push({ name: 'Reset' })
        return
    }
    // route to buddies
  } catch (error) {
    msg.value = error.message
  }
}
</script>

<template>
  <div class="creds">
    <p><input type="text" placeholder="Email" v-model="email" /></p>
    <p><input type="password" placeholder="Password" v-model="password" /></p>
    <p v-if="msg">{{ msg }}</p>
    <p><button @click="authenticate('email')">Sign In With Email</button></p>
    <p><button @click="authenticate('google')">Sign In With Google</button></p>
    <p><button @click="authenticate('anonymous')">Sign In Anonymously</button></p>
    <p><button @click="authenticate('register')">Register</button></p>
    <p><button @click="authenticate('reset')">Forgot Password?</button></p>
  </div>
</template>
