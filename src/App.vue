<script>
import { computed, reactive, toRefs } from 'vue'
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
  setup() {
    const state = reactive({
      gameComplete: computed(() => {
        return state.miniGames.reduce(
          (accumulator, currentValue) => accumulator && currentValue.complete,
          true
        )
      }),
      taskProgress: computed(() => {
        let completedTasks = 0

        state.miniGames.forEach(miniGame => {
          if (miniGame.complete) {
            completedTasks += 1
          }
        })

        return Math.floor((completedTasks / 3) * 100)
      }),
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
    })

    const registerSelection = gameId => {
      state.activeScreen = gameId
    }

    const restartGame = () => {
      state.miniGames.forEach(miniGame => {
        miniGame.complete = false
      })

      state.activeScreen = 'Not Started'
    }

    const startGame = () => {
      state.activeScreen = 'Home'
    }

    const updateMiniGame = id => {
      const miniGame = state.miniGames.find(miniGame => miniGame.id === id)

      miniGame.complete = true
    }

    return {
      ...toRefs(state),
      registerSelection,
      restartGame,
      startGame,
      updateMiniGame
    }
  },
  watch: {
    activeScreen(screen) {
      if (screen === 'Home' && this.gameComplete) {
        launchConfetti()
      }
    }
  }
}
</script>

<template>
  <div class="app-wrapper">
    <div class="game-stage">
      <div class="content-wrapper nes-container is-dark" id="content-wrapper">
        <transition name="fade" mode="out-in">
          <VictoryScreen
            v-if="gameComplete && activeScreen === 'Home'"
            @restart-game="restartGame"
          />
          <WelcomeScreen
            v-else-if="activeScreen === 'Not Started'"
            @start-game="startGame"
          />
          <HomeScreen
            v-else-if="activeScreen === 'Home'"
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
  background-attachment: fixed;
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

.app-wrapper {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
}

.game-stage {
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  margin-top: 2rem;
}

.game-stage h1 {
  color: white;
  line-height: 1;
  margin-bottom: 1rem;
  font-size: 1.8rem;
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
  padding: 1.5rem;
  text-align: center;
  max-width: 80%;
}

.content-wrapper p {
  font-size: 1rem;
  margin-bottom: 1.5rem;
}

.content-wrapper .nes-progress {
  height: 36px;
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

@media screen and (min-width: 787px) {
  .content-wrapper {
    padding: 4rem;
  }

  .game-stage {
    margin-top: 5rem;
  }

  .game-stage h1 {
    font-size: 2.75rem;
  }
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
