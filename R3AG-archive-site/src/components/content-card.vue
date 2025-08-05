

<template>
  <div class="card" @click="openLink">
    <div class="card-title">
      <h2>{{ `${title}` }}<span :style="isOpen ? { color: '#FFD800' } : {}">{{`${isOpen ? '🔓 Opening for Participation!!!' : '🔒'}`}}</span></h2>
    </div>
    <p class="card-date-location">{{ date }} <span v-if="location">| {{ location }}</span></p>
    <p class="card-description">{{ description }}</p>
  </div>
</template>

<script setup lang="ts">
const props = defineProps<{
  title: string
  link: string
  date: string
  location?: string
  description: string
  isOpen?: boolean
}>()

const openLink = () => { window.open(props.link, '_blank') }

</script>

<style scoped lang="less">
.card {
  border: 1px solid #ddd;
  padding: 1rem;
  margin-bottom: 1rem;
  border-radius: 8px;
  transition: box-shadow 0.2s;
  cursor: pointer;
}
.card:hover {
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
}
.card-title {
  text-decoration: none;
  color: #333;
}
.card-title h2 {
  margin: 0 0 0.5rem 0;
  font-size: 1.25rem;
}
.card-date-location {
  font-size: 0.9rem;
  color: #666;
}
.card-description {
  margin-top: 0.5rem;
  font-size: 1rem;
  color: #444;
}
</style>