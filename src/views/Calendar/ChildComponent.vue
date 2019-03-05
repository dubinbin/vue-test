<template>
    <div class="ChildComponent" @click="custom">
        1
    </div>
</template>

<script>
export default {
    methods: {
        custom() {
            this.$emit('custom', true)
        }
    }
}
</script>

