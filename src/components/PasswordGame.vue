<script>
export default {
  data() {
    return {
      gameStatus: 'In Progress',
      passwordInput: ''
    }
  },
  computed: {
    correctPassword() {
      return Math.floor(Math.random() * 1000000 + 1000).toString()
    },
    userWins() {
      return this.gameStatus === 'Player Wins!'
    }
  },
  methods: {
    checkPassword() {
      if (this.correctPassword === this.passwordInput) {
        this.gameStatus = 'Player Wins!'
        this.$emit('mini-game-won', 'password-game')
      } else {
        this.gameStatus = 'Wrong password!'
      }
    }
  }
}
</script>

<template>
  <form class="password-task" @submit.prevent>
    <h2>{{ userWins ? 'ACCESS GRANTED' : 'ACCESS DENIED' }}</h2>
    <div class="password-task-input">
      <label for="enter-password">Enter Password</label>
      <input
        id="enter-password"
        type="text"
        v-model="passwordInput"
        @keyup.enter="checkPassword"
      />
    </div>
    <p class="post-it nes-container">
      Secret Password: <br />{{ correctPassword }}
    </p>
    <button
      class="password-task-submit nes-btn is-primary"
      type="submit"
      @click="checkPassword"
    >
      Submit
    </button>
  </form>
</template>

<style>
.password-task {
  display: grid;
}

.password-task-input {
  display: grid;
  margin-bottom: 30px;
}

.password-task-input label {
  margin-bottom: 1rem;
  font-size: 1.5rem;
}

.password-task-input input {
  padding: 0.5rem;
  font-size: 1.5rem;
  text-align: center;
}

.password-task-submit {
  font-size: 1.2rem;
}

.post-it {
  position: absolute;
  bottom: -200px;
  right: -200px;
  padding: 1rem;
  width: 300px;
  background-color: yellow;
  color: black;
}
</style>
