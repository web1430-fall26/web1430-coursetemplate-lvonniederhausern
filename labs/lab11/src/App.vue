<script setup>

import { ref, computed } from 'vue';

const members = ref([
  { id: 1, name: 'Dr. Sarah Chen', role: 'Professor', department: 'Computer Science', available: true },
  { id: 2, name: 'Marcus Johnson', role: 'Lab Assistant', department: 'Computer Science', available: false },
  { id: 3, name: 'Priya Patel', role: 'Advisor', department: 'Student Services', available: true },
  { id: 4, name: 'Tom Rivera', role: 'Technician', department: 'IT Support', available: true },
  { id: 5, name: 'Aisha Williams', role: 'Professor', department: 'Computer Science', available: true },
  { id: 6, name: 'Jake Morrison', role: 'Counselor', department: 'Student Services', available: false },
  { id: 7, name: 'Keiko Tanaka', role: 'Help Desk', department: 'IT Support', available: true },
  { id: 8, name: 'Luis Garcia', role: 'Professor', department: 'Computer Science', available: false },
]);

const selectedDepartment = ref('All');

const departments = computed(() => {
  const depts = [...new Set(members.value.map(m => m.department))];
  return ['All', ...depts];
});

const showAvailableOnly = ref(false);

const filteredMembers = computed(() => {
  //if (selectedDepartment.value === 'All') return members.value;
  //return members.value.filter(m => m.department === selectedDepartment.value);
  let result = members.value;
  if (selectedDepartment.value !== 'All') {
    result = result.filter(m => m.department === selectedDepartment.value);
  }
  if (showAvailableOnly.value) {
    result = result.filter(m => m.available);
  }
  return result;
});

// (data from Part 2)
import MemberCard from './components/MemberCard.vue';
</script>

<template>
  <div class="app">
    <header class="app-header">
      <h1>Department Directory</h1>
    </header>

    <main>
      <div class="filter-bar" role="group" aria-label="Filter by department">
        <button
          v-for="dept in departments"
          :key="dept"
          :class="['filter-btn', { 'filter-btn--active': selectedDepartment === dept }]"
          :aria-pressed="selectedDepartment === dept"
          @click="selectedDepartment = dept"
        >
          {{ dept }}
        </button>
      </div>

      <p class="result-count" aria-live="polite">
        Showing {{ filteredMembers.length }} of {{ members.length }} members
      </p>

      <label>
        <input type="checkbox" v-model="showAvailableOnly">
        Show available only
      </label>

      <div class="member-grid" v-if="filteredMembers.length > 0">
        <MemberCard
          v-for="member in filteredMembers"
          :key="member.id"
          :name="member.name"
          :role="member.role"
          :department="member.department"
          :available="member.available"
        />
      </div>

      <p v-else class="empty-state">No members in this department.</p>
    </main>
  </div>
</template>

<style>
/* Global styles in App.vue or a separate main.css */
.member-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(260px, 1fr));
  gap: 1rem;
  margin-top: 1rem;
}
</style>