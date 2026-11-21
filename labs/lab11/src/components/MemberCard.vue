<script setup>
defineProps({
  name: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    required: true,
  },
  department: {
    type: String,
    required: true,
  },
  available: {
    type: Boolean,
    default: false,
  },
});
</script>

<template>
  <article class="member-card" :class="{ 'member-card--unavailable': !available }">
    <header class="member-card__header">
      <h2 class="member-card__name">{{ name }}</h2>
      <span
        class="member-card__status"
        :class="available ? 'status--available' : 'status--unavailable'"
        :aria-label="available ? 'Available' : 'Not available'"
      >
        {{ available ? 'Available' : 'Unavailable' }}
      </span>
    </header>

    <p class="member-card__role">{{ role }}</p>
    <p class="member-card__department">{{ department }}</p>

    <button
      class="member-card__btn"
      :disabled="!available"
      :aria-disabled="!available"
    >
      Schedule Meeting
    </button>
  </article>
</template>

<style scoped>
.member-card {
  border: 1px solid #ddd;
  border-radius: 0.5rem;
  padding: 1rem;
}

.member-card--unavailable {
  opacity: 0.6;
}

.member-card__header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  gap: 0.5rem;
}

.status--available { color: green; }
.status--unavailable { color: #999; }

.member-card__btn:disabled {
  cursor: not-allowed;
  opacity: 0.5;
}
</style>