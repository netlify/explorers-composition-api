<script>
import startCase from 'lodash/startCase'

export default {
  props: {
    gameId: {
      type: String,
      required: true
    }
  },
  emits: ['select-screen'],
  computed: {
    gameTitle() {
      return startCase(this.gameId)
    }
  },
  methods: {
    returnToHomeScreen() {
      this.$emit('select-screen', 'Game Started')
    }
  }
}
</script>

<template>
  <section class="mini-game">
    <h1>{{ gameTitle }}</h1>
    <slot />
    <div>
      <button @click="returnToHomeScreen">Back to Game Status</button>
    </div>
  </section>
</template>

<style>
.mini-game {
  border: 2px solid rgb(14, 162, 162);
  padding: 2rem;
  width: 200px;
  position: relative;
}
</style>
