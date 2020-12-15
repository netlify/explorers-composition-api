<script>
import AppFooter from './components/AppFooter.vue'
import HomeScreen from './components/HomeScreen.vue'
import MiniGame from './components/MiniGame.vue'
import PasswordGame from './components/PasswordGame.vue'
import SequenceGame from './components/SequenceGame.vue'
import VictoryScreen from './components/VictoryScreen.vue'
import WelcomeScreen from './components/WelcomeScreen.vue'
import WireGame from './components/WireGame.vue'
import { launchConfetti } from './utils/canvasConfetti'

export default {
  components: {
    AppFooter,
    HomeScreen,
    MiniGame,
    PasswordGame,
    SequenceGame,
    VictoryScreen,
    WelcomeScreen,
    WireGame
  },
  data: () => ({
    activeScreen: 'Not Started',
    miniGames: [
      {
        id: 'password-game',
        label: 'Enter Password',
        complete: false
      },
      {
        id: 'sequence-game',
        label: 'Solve Sequence',
        complete: false
      },
      {
        id: 'wire-game',
        label: 'Match Wires',
        complete: false
      }
    ]
  }),
  computed: {
    gameComplete() {
      return this.miniGames.reduce(
        (accumulator, currentValue) => accumulator && currentValue.complete,
        true
      )
    },
    taskProgress() {
      let completedTasks = 0

      this.miniGames.forEach(minigame => {
        if (minigame.complete) {
          completedTasks += 1
        }
      })

      return Math.floor((completedTasks / 3) * 100)
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
        setTimeout(() => {
          launchConfetti()
        }, 1000)
      }
    }
  }
}
</script>

<template>
  <div>
    <div class="game-stage">
      <div class="content-wrapper nes-container is-dark" id="content-wrapper">
        <transition name="fade" mode="out-in">
          <VictoryScreen v-if="gameComplete" />
          <WelcomeScreen
            v-else-if="activeScreen === 'Not Started'"
            @start-game="startGame"
          />
          <HomeScreen
            v-else-if="activeScreen === 'Game Started'"
            :taskProgress="taskProgress"
            :miniGames="miniGames"
            @register-selection="registerSelection"
          />
          <MiniGame
            v-else
            @select-screen="registerSelection"
            :gameId="activeScreen"
          >
            <template v-slot:progress>
              <h3>Progress - {{ taskProgress }}%</h3>
            </template>
            <component :is="activeScreen" @mini-game-won="updateMiniGame" />
          </MiniGame>
        </transition>
      </div>
    </div>
    <AppFooter />
  </div>
</template>

<style>
:root {
  --green: rgb(0, 255, 0);
  --red: rgb(255, 0, 0);
}

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

.game-stage h1 {
  color: white;
  font-size: 2.75rem;
  line-height: 1;
  margin-bottom: 1rem;
}

.game-stage h2 {
  font-size: 2.3rem;
}

.game-stage h3 {
  font-size: 2rem;
}

.game-stage .nes-progress {
  margin-bottom: 30px;
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
  margin-top: 5rem;
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

.task-list {
  list-style: none;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-column-gap: 30px;
  margin: 0;
  padding: 0;
}

.task-item-star.task-item-star {
  margin-bottom: 80px;
}

.welcome-astronaut {
  max-width: 100%;
  margin-bottom: 3rem;
  animation: hovering 3s infinite ease-in-out;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

@keyframes hovering {
  from {
    transform: translate(0, 0px);
  }
  50% {
    transform: translate(0, -25px);
  }
  to {
    transform: translate(0, -0px);
  }
}

.je-link {
  background-color: #42b883;
}

.je-link-wrapper {
  margin-bottom: 25px;
}

/* Utility Classes */
.is-green {
  color: var(--green);
}
.is-red {
  color: var(--red);
}
.mb2 {
  margin-bottom: 30px;
}
</style>
