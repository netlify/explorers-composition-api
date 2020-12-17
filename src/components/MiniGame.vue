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
      this.$emit('select-screen', 'Home')
    }
  }
}
</script>

<template>
  <section class="mini-game" id="mini-game">
    <slot name="progress" />
    <h1>{{ gameTitle }}</h1>
    <slot />
    <div class="mini-game-cta">
      <button class="nes-btn" @click="returnToHomeScreen">
        Back to Home
      </button>
    </div>
  </section>
</template>

<style>
.mini-game {
  position: relative;
  padding: 0 2rem;
}

.mini-game h1 {
  font-size: 4rem;
}

.mini-game-cta {
  margin-top: 45px;
  margin-bottom: 45px;
}
</style>
