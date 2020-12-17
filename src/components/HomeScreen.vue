<script>
export default {
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
}
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

<style>
.task-list {
  list-style: none;
  display: grid;
  margin: 0;
  padding: 0;
}

.task-item-star.task-item-star {
  margin-right: 32px;
  margin-bottom: 50px;
  transform: scale(3);
}

@media screen and (min-width: 787px) {
  .task-list {
    grid-template-columns: repeat(3, 1fr);
    grid-column-gap: 30px;
  }

  .task-item-star.task-item-star {
    margin-right: 48px;
    margin-bottom: 80px;
    transform: scale(4);
  }
}
</style>
