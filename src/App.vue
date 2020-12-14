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
    <div class="game-stage">
      <div class="content-wrapper nes-container is-dark">
        <div v-if="activeScreen === 'Not Started'" class="screen">
          <h1 class="title">Launching with Composition API</h1>
          <p>Ready to embark on your mission?</p>
          <button class="nes-btn is-primary" @click="startGame">
            Start Mission
          </button>
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
    </div>
  </div>
</template>

<style>
html {
  width: 100%;
  height: 100vh;
  background: 50% 100% / cover no-repeat url('/images/background-dashboard.png'),
    80% -175px / cover no-repeat url('/images/background-planet.jpg');
}

body {
  background: transparent;
}

body,
button {
  font-family: 'Press Start 2P', cursive;
}

h1,
h2,
h3,
h4,
h5,
h6 {
  font-family: 'Ruslan Display', cursive;
}

.title {
  color: white;
  font-size: 2.75rem;
  line-height: 1;
  margin-bottom: 1rem;
}

.content-wrapper {
  padding: 4rem;
  text-align: center;
  max-width: 80%;
}

.content-wrapper p {
  font-size: 1.25rem;
  margin-bottom: 1.5rem;
}

.game-stage {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  margin-top: 10rem;
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
</style>
