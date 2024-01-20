<script setup>
import TimeAndDate from '@/components/TimeAndDate.vue'

const userTimezone = new Date().getTimezoneOffset() / -60
</script>

<template>
  <div class="user-container">
    <TimeAndDate :timezone="userTimezone" :is-user="true" name="(you)" />
  </div>
  <div class="buddy-container">
    <TimeAndDate :timezone="-1" :userTimezone="userTimezone" name="Buddy 1" />
    <TimeAndDate :timezone="0" :userTimezone="userTimezone" name="Buddy 1" />
    <TimeAndDate :timezone="1" :userTimezone="userTimezone" name="Buddy 1" />
  </div>
</template>

<style scoped></style>
