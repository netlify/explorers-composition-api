<script>
import MiniGame from './components/MiniGame.vue'
import PasswordGame from './components/PasswordGame.vue'
import SequenceGame from './components/SequenceGame.vue'
import WireGame from './components/WireGame.vue'
import { launchConfetti } from './utils/canvasConfetti'

export default {
  components: {
    MiniGame,
    SequenceGame,
    WireGame,
    PasswordGame
  },
  data: () => ({
    activeScreen: 'Not Started',
    minigames: [
      {
        id: 'password-game',
        complete: false
      },
      {
        id: 'sequence-game',
        complete: false
      },
      {
        id: 'wire-game',
        complete: false
      }
    ]
  }),
  computed: {
    gameComplete() {
      return this.minigames.reduce(
        (accumulator, currentValue) => accumulator && currentValue.complete,
        true
      )
    }
  },
  methods: {
    updateMiniGame(id) {
      const minigame = this.minigames.find(minigame => minigame.id === id)

      minigame.complete = true
    },
    startGame() {
      this.activeScreen = 'Game Started'
    },
    registerSelection(gameId) {
      this.activeScreen = gameId
    }
  },
  watch: {
    gameComplete(status) {
      if (status) {
        launchConfetti()
      }
    }
  }
}
</script>

<template>
  <div>
    <h1>Space Game</h1>
    <div class="game-stage">
      <div class="mini-game-wrapper">
        <div v-if="activeScreen === 'Not Started'">
          <p>Ready to play?</p>
        </div>
        <div v-else-if="activeScreen === 'Game Started'">
          <h2>Mission</h2>
          <p>Complete all three mini-games to win!</p>
          <ul>
            <li
              v-for="minigame in minigames"
              :key="minigame.id"
              @click="registerSelection(minigame.id)"
            >
              {{ minigame.id }} - {{ minigame.complete }}
            </li>
          </ul>
        </div>
        <MiniGame
          v-else
          @select-screen="registerSelection"
          :gameId="activeScreen"
        >
          <component :is="activeScreen" @mini-game-won="updateMiniGame" />
        </MiniGame>
      </div>
      <div
        class="panel"
        :class="activeScreen === 'Not Started' ? '' : 'is-hidden'"
      >
        <button class="panel-button" @click="startGame">Start Game</button>
      </div>
    </div>
  </div>
</template>

<style>
.mini-game-wrapper {
  display: flex;
}

.game-stage {
  border: 5px solid black;
  height: 500px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
}

.panel {
  border: 2px solid black;
  width: 200px;
  height: 300px;
  margin: 0 auto;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: white;
  transform: translateY(100%);
  opacity: 1;
  transition: transform 0.5s ease-in, opacity 0.5s ease-in;
  position: absolute;
}

.panel.is-hidden {
  transform: translateY(140%);
  opacity: 0;
}

.panel-button {
  border-radius: 50%;
  width: 75px;
  height: 75px;
}
</style>
