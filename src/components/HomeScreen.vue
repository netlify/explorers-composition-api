<script>
import { defineComponent } from 'vue'

export default defineComponent({
  props: {
    taskProgress: {
      type: Number,
      required: true
    },
    miniGames: {
      type: Array,
      required: true
    }
  },
  emits: ['register-selection'],
  methods: {
    registerSelection(id) {
      this.$emit('register-selection', id)
    }
  }
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
        v-for="miniGame in miniGames"
        :key="miniGame.id"
        @click="registerSelection(miniGame.id)"
      >
        <i
          class="task-item-star nes-icon is-large star"
          :class="miniGame.complete ? '' : 'is-transparent'"
        ></i>
        <p>{{ miniGame.label }}</p>
      </li>
    </ul>
  </article>
</template>
