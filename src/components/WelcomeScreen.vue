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
  <article class="screen">
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
        Learn {{ topic }}
        <br />
        with Jamstack Explorers!
      </a>
    </div>
    <button class="welcome-primary-cta nes-btn is-primary" @click="startGame">
      Start Mission
    </button>
  </article>
</template>

<style>
.welcome-astronaut {
  max-width: 100%;
  margin-bottom: 3rem;
  animation: hovering 3s infinite ease-in-out;
}

.welcome-primary-cta {
  padding: 1rem;
  font-size: 1.2rem;
  text-transform: uppercase;
}
</style>
