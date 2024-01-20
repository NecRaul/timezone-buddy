<script setup>
import { db } from '@/main'
import router from '@/router'
import { ref, onMounted, onBeforeUnmount, getCurrentInstance } from 'vue'
import { updateDoc, deleteField, doc } from 'firebase/firestore'

const uid = router.currentRoute.value.query.uid

const props = defineProps({
  timezone: Number,
  userTimezone: Number,
  isUser: {
    type: Boolean,
    default: false
  },
  name: String
})

const currentTime = ref(getCurrentTime(props.timezone))
const difference = props.timezone - props.userTimezone

function getCurrentTime(offset) {
  const now = new Date()
  const localTime = new Date(now.getTime() + now.getTimezoneOffset() * 60000 + 3600000 * offset)
  const dateOptions = { year: 'numeric', month: 'long', day: 'numeric' }
  const timeOptions = { hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: false }

  const date = localTime.toLocaleDateString(undefined, dateOptions)
  const time = localTime.toLocaleTimeString(undefined, timeOptions)

  return { date, time }
}

function updateCurrentTime() {
  currentTime.value = getCurrentTime(props.timezone)
}

const { emit } = getCurrentInstance()

async function removeBuddy() {
  await updateDoc(doc(db, 'users', uid), {
    [`buddies.${props.name}`]: deleteField()
  })
  emit('removeBuddy')
}

function logout() {
  emit('logout')
}

onMounted(() => {
  const intervalId = setInterval(updateCurrentTime, 1000)
  onBeforeUnmount(() => clearInterval(intervalId))
})
</script>

<template>
  <div>
    <h1>{{ name }}</h1>
    <p>Date: {{ currentTime.date }}</p>
    <p>Time: {{ currentTime.time }}</p>
    <p>GMT{{ timezone >= 0 ? '+' + timezone : timezone }}</p>
    <p v-if="!isUser">
      <template v-if="difference !== 0">
        This buddy is {{ Math.abs(difference) }} hour{{ Math.abs(difference) === 1 ? '' : 's' }}
        {{ difference > 0 ? 'ahead' : 'behind' }} of you.
      </template>
      <template v-else> This buddy lives in the same timezone as you. </template>
    </p>
    <p v-else>This is (you)</p>
    <button v-if="!isUser" @click="removeBuddy" class="remove">Remove Buddy</button>
    <button v-else @click="logout" class="remove">Log Out</button>
  </div>
</template>

<style scoped>
div {
  position: relative;
  background-color: rgb(96, 62, 66);
  padding: 15px;
  border-radius: 8px;
  text-align: center;
  margin: 3% 3%;
}

h1 {
  color: rgb(232, 232, 232);
  font-size: 1.5em;
  margin-top: 0px;
  margin-bottom: 10px;
}

p {
  color: rgb(232, 232, 232);
  margin: 5px 0;
}

p:nth-child(4) {
  font-weight: bold;
}

button {
  margin-top: 5px;
}
</style>
