<template>
  <div class="Index">
    <Calendar
    @changeDate="changeDate"
    :signCalendarInfo="signCalendarInfo"
    />
  </div>
</template>

<script>
import Index from './Index.js'
export default {
  name: 'Index',
  ...Index
}
</script>

<style scoped>
@import url('./Index.css');
</style>