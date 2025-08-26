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
import type { Link } from '@/stores/workshop';
import { computed } from 'vue';

const props = defineProps<{
  title: string
  link: string | Link
  date: string
  location?: string
  description: string
  isOpen?: boolean
}>()

const default_link = computed(() => typeof props.link === 'string' ? props.link : props.link.cn)
const fallback_link = computed(() => typeof props.link === 'string' ? props.link : props.link.en ?? props.link.cn)

async function canAccess(url: string, timeoutMs = 4000): Promise<boolean> {
  // Try a HEAD/GET with no-cors so opaque responses still count as reachable.
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), timeoutMs);
  try {
    // Some servers don't allow HEAD; GET with no-store avoids cache
    await fetch(url, { method: 'GET', mode: 'no-cors', cache: 'no-store', signal: controller.signal });
    clearTimeout(timer);
    return true; // If the network path works, fetch resolves (even opaque)
  } catch (e) {
    clearTimeout(timer);
    return false; // Network error / timeout
  }
}

const openLink = async () => {


  window.open(default_link.value, '_blank')

  // // Open a blank window immediately to avoid popup blockers
  // const newWin = window.open('about:blank', '_blank');

  // const ok = await canAccess(default_link.value, 400);
  // const target = ok ? default_link.value : (fallback_link.value || default_link.value);

  // if (newWin) {
  //   // Navigate the already-opened window
  //   newWin.location.href = target;
  // } else {
  //   // Fallback if popup blocked
  //   window.location.href = target;
  // }
};
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
