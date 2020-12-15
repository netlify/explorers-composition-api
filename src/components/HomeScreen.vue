<script>
import { defineComponent } from 'vue'

export default defineComponent({
  props: ['taskProgress', 'miniGames'],
  emits: ['registerSelection']
})
</script>

<template>
  <article>
    <h2>Mission</h2>
    <p>Complete all tasks!</p>
    <h3>Progress - {{ taskProgress }}%</h3>
    <progress
      class="nes-progress is-success"
      :value="taskProgress"
      max="100"
    ></progress>
    <h3>Tasks</h3>
    <ul class="task-list">
      <li
        v-for="minigame in miniGames"
        :key="minigame.id"
        @click="$emit('register-selection', minigame.id)"
      >
        <i
          class="task-item-star nes-icon is-large star"
          :class="minigame.complete ? '' : 'is-transparent'"
        ></i>
        <p>{{ minigame.label }}</p>
      </li>
    </ul>
  </article>
</template>
