<script>
import shuffle from 'lodash/shuffle'

export default {
  data() {
    return {
      gameStatus: 'In Progress',
      userSequence: [],
      displayValidation: false,
      colorOptions: [{ label: 'red' }, { label: 'blue' }, { label: 'green' }]
    }
  },
  computed: {
    correctSequence() {
      return shuffle(['blue', 'green', 'red'])
    },
    displaySequence() {
      let defaultColors = [
        { label: 'black' },
        { label: 'black' },
        { label: 'black' }
      ]

      this.userSequence.forEach((item, index) => {
        defaultColors[index] = item
      })

      return defaultColors
    },
    userWins() {
      if (this.userSequence && this.userSequence.length === 3) {
        return this.userSequence.reduce((accumulator, currentValue) => {
          return accumulator && currentValue.matched
        }, true)
      } else {
        return false
      }
    }
  },
  methods: {
    addColorToSequence(color) {
      this.userSequence.push({
        ...color,
        matched: false
      })
    },
    checkColorSequence() {
      this.userSequence.forEach((item, index) => {
        item.matched = item.label === this.correctSequence[index]
      })

      this.displayValidation = true

      if (this.userWins) {
        this.$emit('mini-game-won', 'sequence-game')
      } else {
        setTimeout(() => {
          this.userSequence = []
          this.displayValidation = false
        }, 2000)
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
    <section>
      <h2
        class="sequence-game-status"
        :class="userWins ? 'is-green' : 'is-red'"
      >
        <i
          class="nes-icon trophy is-medium"
          :class="userWins ? '' : 'is-off'"
        />
        <span class="sequence-game-status-text"
          >{{ userWins ? 'Correct' : 'Mystery' }} Sequence</span
        >
      </h2>
      <div class="color-swatch-wrapper">
        <div
          v-for="(color, index) in displaySequence"
          :key="`color-${index}`"
          class="nes-container color-swatch"
          :style="`background-color: ${color.label};`"
        >
          <i
            class="color-swatch-heart nes-icon is-large heart"
            :class="color.matched ? '' : 'is-empty'"
          ></i>
          <span class="color-swatch-text">
            {{ color.label === 'black' ? 'black' : color.label }}
          </span>
        </div>
      </div>
    </section>
    <section v-if="!userWins">
      <h2>Inputs</h2>
      <div class="color-swatch-wrapper">
        <button
          v-for="(color, index) in colorOptions"
          :key="`color-${index}`"
          class="nes-container color-swatch"
          :style="`background-color: ${color.label};`"
          @click="addColorToSequence(color)"
        >
          {{ color.label }}
        </button>
      </div>
    </section>
  </div>
</template>

<style>
.color-swatch-heart {
  margin: 0;
  margin-bottom: 15px;
}

.color-swatch-text {
  margin-top: 15px;
}

.color-swatch-wrapper {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-column-gap: 10px;
  margin-bottom: 30px;
}

.color-swatch {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 1rem;
  border: 3px solid white;
  color: white;
  font-weight: bold;
}

.sequence-game-status {
  display: flex;
  align-items: center;
  margin-bottom: 1.5rem;
}

.sequence-game-status .nes-icon.trophy.is-off {
  filter: grayscale(1);
}

.sequence-game-status-text {
  margin-top: 13px;
}
</style>
