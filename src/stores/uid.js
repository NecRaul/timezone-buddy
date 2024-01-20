import { ref } from 'vue'
import { defineStore } from 'pinia'

export const useUidStore = defineStore('uid', () => {
  const uid = ref('')

  function getUid() {
    return uid.value
  }

  function setUid(newUid) {
    uid.value = newUid
  }

  function resetUid() {
    uid.value = ''
  }

  return { uid, getUid, setUid, resetUid }
})
