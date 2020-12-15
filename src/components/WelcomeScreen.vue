<script>
import { defineComponent } from 'vue'
export default defineComponent({
  emits: ['start-game']
})
</script>

<template>
  <article class="screen">
    <img
      class="welcome-astronaut"
      src="/images/astronaut-laptop.png"
      alt="Illustration of astronaut on a laptop. Credit to catalystuff"
    />
    <h1>
      Launching with
      <br />
      Composition API
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
        Learn Composition API
        <br />
        with Jamstack Explorers!
      </a>
    </div>
    <button class="nes-btn is-primary" @click="$emit('start-game')">
      Start Mission
    </button>
  </article>
</template>
