<template>
    <div class="hello">
      <span class="count">{{ count }}</span>
      <button @click="increment">Increment</button>
    </div>
</template>

<script>
export default {
  name: 'HelloWorld',
  data () {
    return {
      count: 0
    }
  },
  methods: {
     increment() {
        this.count++
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1, h2 {
  font-weight: normal;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
