<script>
export default {
  methods: {
    restartGame() {
      this.$emit('restart-game')
    }
  }
}
</script>

<template>
  <article>
    <img
      class="astronaut-rocket"
      src="/images/astronaut-rocket.png"
      alt="Illustration of astronaut on a rocket. Credit to catalystuff"
    />
    <h1>
      Great job
      <br />
      space cadet!
    </h1>
    <p>
      Ready to embark
      <br />
      on your next mission?
    </p>
    <a
      class="victory-cta nes-btn is-primary"
      href="https://explorers.netlify.com/?deployed-app&utm_medium=launch-comp-bh&utm_campaign=devex"
    >
      <i class="nes-icon trophy is-medium" /> Find a new mission
    </a>
    <div>
      <button class="victory-cta nes-btn is-success" @click="restartGame">
        <i class="nes-icon coin is-medium" />
        Play Again
      </button>
    </div>
  </article>
</template>

<style>
.victory-cta {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
}

.victory-cta.is-primary {
  margin-bottom: 25px;
}

.victory-cta .nes-icon {
  margin-right: 40px;
}

.astronaut-rocket {
  max-width: 100%;
  margin-bottom: 3rem;
  animation: hovering 3s infinite ease-in-out;
}
</style>
