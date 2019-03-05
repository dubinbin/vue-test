<template>
  <div>
    <p class="area">{{date}}</p>
    <button class="change" @click="changeDate">改变</button>
  </div>
</template>

<script>
  import ChildComponent from './ChildComponent'

  export default {
    name: 'ParentComponent',
    data() {
      return {
        date: '2月9号',
        emitted: false
      }
    },
    methods: {
      changeDate() {
          this.date = '3月9号'
      }
    }
  }
</script>