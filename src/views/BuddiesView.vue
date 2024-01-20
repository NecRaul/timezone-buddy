<script setup>
import TimeAndDate from '@/components/TimeAndDate.vue'
import { ref } from 'vue'

const userTimezone = new Date().getTimezoneOffset() / -60

const buddies = ref(new Map())
const buddyName = ref('')
const buddyTimezone = ref('0')

function setBuddy() {
  if (buddyName.value == '') {
    alert('Buddy name cannot be empty!')
    return
  }
  buddies.value.set(buddyName.value, buddyTimezone.value)
  buddyName.value = ''
  buddyTimezone.value = 0
}
</script>

<template>
  <div class="user-container">
    <TimeAndDate :timezone="userTimezone" :is-user="true" name="(you)" />
  </div>
  <div class="buddy-container">
    <TimeAndDate
      v-for="[name, timezone] in buddies"
      :key="name"
      :timezone="timezone"
      :user-timezone="userTimezone"
      :name="'Buddy ' + (timezone + 6)"
    />
  </div>
  <div class="set-buddy">
    <input type="text" v-model="buddyName" placeholder="Buddy" />
    <select v-model="buddyTimezone">
      <option
        v-for="timezone in Array.from({ length: 11 }, (_, index) => index - 5)"
        :key="timezone"
        :value="timezone"
      >
        {{ timezone }}
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
