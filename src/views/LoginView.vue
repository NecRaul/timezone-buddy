<script setup>
import router from '@/router'
import { useUidStore } from '@/stores/uid'
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
  let data
  msg.value = ''
  try {
    switch (provider) {
      case 'email':
        data = await signInWithEmailAndPassword(auth, email.value, password.value)
        break
      case 'anonymous':
        data = await signInAnonymously(auth)
        break
      case 'google':
        data = await signInWithPopup(auth, new GoogleAuthProvider())
        break
      case 'register':
        router.push({ name: 'Register' })
        return
      case 'reset':
        router.push({ name: 'Reset' })
        return
    }
    const uidStore = useUidStore()
    uidStore.setUid(data.user.uid)
    router.push({ name: 'Buddies' })
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
