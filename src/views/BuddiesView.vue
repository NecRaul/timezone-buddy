<script setup>
import TimeAndDate from '@/components/TimeAndDate.vue'

const userTimezone = new Date().getTimezoneOffset() / -60
</script>

<template>
  <div class="user-container">
    <TimeAndDate :timezone="userTimezone" :is-user="true" name="(you)" />
  </div>
  <div class="buddy-container">
    <TimeAndDate
      v-for="timezone in Array.from({ length: 11 }, (_, index) => index - 5)"
      :key="timezone"
      :timezone="timezone"
      :user-timezone="userTimezone"
      :name="'Buddy ' + (timezone + 6)"
    />
  </div>
</template>

<style scoped>
.user-container,
.buddy-container {
  margin: 1% auto;
}

.user-container {
  width: 600px;
  margin-top: 2%;
}

.buddy-container {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(400px, 1fr));
  margin-bottom: 2%;
}
</style>
