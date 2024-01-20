<script setup>
import { db } from '@/main'
import router from '@/router'
import TimeAndDate from '@/components/TimeAndDate.vue'
import { ref, onMounted } from 'vue'
import { doc, getDoc, setDoc } from 'firebase/firestore'

const uid = router.currentRoute.value.query.uid

const userTimezone = new Date().getTimezoneOffset() / -60

const timezoneOptions = {
  '-12': 'GMT-12:00 (International Date Line West)',
  '-11': 'GMT-11:00 (Midway Island, Samoa)',
  '-10': 'GMT-10:00 (Hawaii)',
  '-9': 'GMT-09:00 (Alaska)',
  '-8': 'GMT-08:00 (Pacific Time)',
  '-7': 'GMT-07:00 (Mountain Time)',
  '-6': 'GMT-06:00 (Central Time)',
  '-5': 'GMT-05:00 (Eastern Time)',
  '-4': 'GMT-04:00 (Atlantic Time)',
  '-3': 'GMT-03:00 (Greenland, Brasilia)',
  '-2': 'GMT-02:00 (Mid-Atlantic)',
  '-1': 'GMT-01:00 (Azores)',
  0: 'GMT±00:00 (Greenwich Mean Time)',
  1: 'GMT+01:00 (Central European Time)',
  2: 'GMT+02:00 (Eastern European Time)',
  3: 'GMT+03:00 (Moscow, Arabia Standard Time)',
  4: 'GMT+04:00 (Azerbaijan Standard Time)',
  5: 'GMT+05:00 (Pakistan Standard Time)',
  6: 'GMT+06:00 (Kazakhstan Time)',
  7: 'GMT+07:00 (Indochina Time)',
  8: 'GMT+08:00 (China Standard Time)',
  9: 'GMT+09:00 (Japan Standard Time)',
  10: 'GMT+10:00 (Australian Eastern Time)',
  11: 'GMT+11:00 (Solomon Islands Time)',
  12: 'GMT+12:00 (New Zealand Standard Time)'
}

const buddies = ref(new Map())
const buddyName = ref('')
const buddyTimezone = ref('0')

async function setBuddy() {
  if (buddyName.value == '') {
    alert('Buddy name cannot be empty!')
    return
  }
  const docData = {
    buddies: {
      [buddyName.value]: buddyTimezone.value
    }
  }
  await setDoc(doc(db, 'users', uid), docData, { merge: true })
  buddies.value.set(buddyName.value, buddyTimezone.value)
  buddies.value = new Map([...buddies.value.entries()].sort((a, b) => a[1] - b[1]))
  buddyName.value = ''
  buddyTimezone.value = 0
}

function removeBuddy(removedName) {
  buddies.value = new Map([...buddies.value.entries()].filter(([name]) => name !== removedName))
  console.log(buddies.value)
}

onMounted(async () => {
  const docSnap = await getDoc(doc(db, 'users', uid))
  if (docSnap.exists()) {
    Object.entries(docSnap.data().buddies)
      .sort((a, b) => a[1] - b[1])
      .forEach(([name, timezone]) => buddies.value.set(name, timezone))
  } else {
    console.error('Data is all gone!')
  }
})
</script>

<template>
  <div class="user-container">
    <TimeAndDate :timezone="userTimezone" :is-user="true" name="(you)" />
  </div>
  <div class="buddy-container">
    <TimeAndDate
      v-for="[name, timezone] in buddies"
      :key="name"
      :timezone="parseInt(timezone)"
      :user-timezone="userTimezone"
      :name="name"
      @removeBuddy="removeBuddy(name)"
    />
  </div>
  <div class="set-buddy">
    <input type="text" v-model="buddyName" placeholder="Buddy" />
    <select v-model="buddyTimezone">
      <option
        v-for="timezone in Object.entries(timezoneOptions).sort((a, b) => a[0] - b[0])"
        :key="timezone[0]"
        :value="timezone[0]"
      >
        {{ timezone[1] }}
      </option>
    </select>
    <button @click="setBuddy">Add/Update Buddy</button>
  </div>
</template>

<style scoped>
.user-container,
.buddy-container,
.set-buddy {
  margin: 1% auto;
}

.user-container {
  width: 600px;
  margin-top: 2%;
}

.buddy-container {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(400px, 1fr));
}

.set-buddy {
  display: flex;
  flex-wrap: wrap;
  align-self: flex-end;
  justify-content: center;
  margin-bottom: 2%;
}
</style>
