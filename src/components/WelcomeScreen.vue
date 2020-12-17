<script>
export default {
  emits: ['start-game'],
  data() {
    return {
      heroImage: {
        src: '/images/astronaut-laptop.png',
        alt: 'Illustration of astronaut on a laptop. Credit to catalystuff'
      },
      topic: 'Composition API'
    }
  },
  methods: {
    startGame() {
      this.$emit('start-game')
    }
  }
}
</script>

<template>
  <article class="welcome">
    <img class="welcome-astronaut" :src="heroImage.src" :alt="heroImage.alt" />
    <h1>
      Launching with
      <br />
      {{ topic }}
    </h1>
    <p>
      Ready to embark
      <br />
      on your mission?
    </p>
    <div class="je-link-wrapper">
      <a
        class="je-link nes-btn is-success"
        href="https://explorers.netlify.com/learn/launching-with-composition-api?utm_source=twitter&utm_medium=je-comp-api-mis-bh&utm_campaign=devex"
      >
        Learn with <br />Jamstack Explorers!
      </a>
    </div>
    <button class="welcome-primary-cta nes-btn is-primary" @click="startGame">
      Start Mission
    </button>
  </article>
</template>

<style>
.welcome-astronaut {
  max-width: 120px;
  margin-bottom: 1rem;
  animation: hovering 3s infinite ease-in-out;
}

.welcome-primary-cta {
  padding: 1rem;
  font-size: 0.9rem;
  text-transform: uppercase;
}

.je-link {
  background-color: #42b883;
  font-size: 0.8rem;
}

.je-link-wrapper {
  margin-bottom: 25px;
}

@media screen and (min-width: 787px) {
  .je-link {
    font-size: 1rem;
  }

  .welcome-astronaut {
    max-width: 100%;
    margin-bottom: 2rem;
  }

  .welcome-primary-cta {
    font-size: 1.2rem;
  }
}
</style>
