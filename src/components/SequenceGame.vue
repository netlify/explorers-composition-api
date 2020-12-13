<script>
import shuffle from 'lodash/shuffle'

export default {
  data() {
    return {
      gameStatus: 'In Progress',
      userSequence: [],
      displayValidation: false,
      trackValidation: [false, false, false],
      colorOptions: ['red', 'blue', 'green']
    }
  },
  computed: {
    correctSequence() {
      return shuffle(['blue', 'green', 'red'])
    },
    userWins() {
      return this.trackValidation.findIndex(item => item === false) === -1
    }
  },
  methods: {
    addColorToSequence(color) {
      this.userSequence.push(color)
    },
    checkColorSequence() {
      for (let i = 0; i < this.userSequence.length; i++) {
        this.trackValidation[i] =
          this.userSequence[i] === this.correctSequence[i]
      }

      this.displayValidation = true

      if (this.userWins) {
        this.$emit('mini-game-won', 'sequence-game')
      } else {
        setTimeout(() => {
          this.userSequence = []
          this.displayValidation = false
        }, 3000)
      }
    }
  },
  watch: {
    userSequence: {
      handler(currentValue) {
        if (currentValue.length === 3) {
          this.checkColorSequence()
        }
      },
      deep: true
    }
  }
}
</script>

<template>
  <div>
    <h2>Chosen Sequence</h2>
    <div class="color-swatch-wrapper">
      <div
        v-for="(color, index) in userSequence"
        :key="`color-${index}`"
        class="color-swatch"
        :style="`background-color: ${color};`"
      >
        {{ displayValidation ? trackValidation[index] : color }}
      </div>
    </div>
    <h2>Inputs</h2>
    <div class="color-swatch-wrapper">
      <button
        v-for="(color, index) in colorOptions"
        :key="`color-${index}`"
        class="color-swatch"
        :style="`background-color: ${color};`"
        @click="addColorToSequence(color)"
      >
        {{ color }}
      </button>
    </div>
  </div>
</template>

<style>
.color-swatch-wrapper {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-column-gap: 10px;
}

.color-swatch {
  border: 2px solid black;
  padding: 1rem;
  color: white;
  font-weight: bold;
  border: 0;
}
</style>
