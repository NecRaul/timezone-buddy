<script setup>
import TimeAndDate from '@/components/TimeAndDate.vue'

const userTimezone = new Date().getTimezoneOffset() / -60
</script>

<template>
  <div><TimeAndDate id="user" :timezone="userTimezone" :is-user="true" name="(you)" /></div>
</template>

<style scoped></style>
