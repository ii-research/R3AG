<template>
  <div class="home">
    <!-- <div class="head-container">
      <nav class="navbar">
        <ul>
          <li><button @click="scrollToSection('introduction')">Introduction</button></li>
          <li><button @click="scrollToSection('workshops')">Workshops</button></li>
          <li v-if="tutorialStore.tutorials.length > 0"><button @click="scrollToSection('tutorials')">Tutorials</button></li>
          <li><button @click="scrollToSection('organization')">Organization</button></li>
        </ul>
      </nav>
      <div class="head-content">
        <h1>Welcome to the R3AG Archive</h1>
        <p>This site contains a collection of resources related to Reliable Retrieval Augmented Generation (R3AG).</p>
      </div>
    </div> -->
    <div id="introduction" class="intro-container">
      <h1>Introduction</h1>
      <p>Retrieval-augmented generation (RAG) has gained wide attention as the key component to improve generative models with external knowledge augmentation from information retrieval. It has shown great prominence in enhancing the functionality and performance of large language model (LLM)-based applications. However, with the comprehensive application of RAG, more and more problems and limitations have been identified, thus urgently requiring further fundamental exploration to improve current RAG frameworks. R³AG is intended as a long-term initiative, and we plan to expand it in various dimensions over the coming years. </p>
    </div>
    <div class="content-container">
      <div id="workshops">
        <div class="card-container" v-if="workshopStore.workshops.length > 0">
          <h1>Workshops</h1>
          <p>Here is the information of the academic events we have organized. You can click the cards and check the details.</p>
          <ContentCard
            class="card"
            v-for="w in workshopStore.workshops"
            :key="w.id"
            :title="w.title"
            :link="w.link"
            :date="w.date"
            :location="w.location"
            :description="w.description"
            :isOpen="w.isOpen"
          />
        </div>
      </div>
      <div id="tutorials">
        <div class="card-container" v-if="tutorialStore.tutorials.length > 0">
          <h1>Tutorials</h1>
          <ContentCard
            v-for="t in tutorialStore.tutorials"
            :key="t.id"
            :title="t.title"
            :link="t.link"
            :date="t.date"
            :location="t.location"
            :description="t.description"
          />
        </div>
      </div>
    </div>
    <!-- <div id="organization" class="intro-container">
      <h1>Organization</h1>
      <p>
        We are II-Research in University of Tsukuba, Japan.
        We are a group of researchers and developers dedicated to advancing the field of R3AG. Our team consists of experts in information retrieval, natural language processing, and machine learning.
        For more information, please visit our <a href="https://ii-research.github.io/">Lab's website</a>.
      </p>
    </div> -->
    <aside class="side-nav">
      <ul>
        <li>
          <button @click="scrollToTop" :class="{ active: currentSection === '' }">Top</button>
        </li>
        <li>
          <button @click="scrollToSection('introduction')" :class="{ active: currentSection === 'introduction' }">Introduction</button>
        </li>
        <li>
          <button @click="scrollToSection('workshops')" :class="{ active: currentSection === 'workshops' }">Workshops</button>
        </li>
        <li v-if="tutorialStore.tutorials.length > 0">
          <button @click="scrollToSection('tutorials')" :class="{ active: currentSection === 'tutorials' }">Tutorials</button>
        </li>
        <!-- <li>
          <button @click="scrollToSection('organization')" :class="{ active: currentSection === 'organization' }">Organization</button>
        </li> -->
      </ul>
    </aside>
  </div>
</template>


<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount } from 'vue'
import ContentCard from '@/components/content-card.vue'
import { useWorkshopStore } from '@/stores/workshop'
import { useTutorialStore } from '@/stores/tutorial'

const workshopStore = useWorkshopStore()
const tutorialStore = useTutorialStore()

const currentSection = ref('')
const sectionIds = ['introduction', 'workshops', 'tutorials', 'organization']

const onScroll = () => {
  // Check if user has scrolled to (or past) the bottom of the page
  const scrollBottom = window.innerHeight + window.scrollY >= document.body.offsetHeight - 2
  if (scrollBottom) {
    currentSection.value = 'workshops'
    return
  }

  for (const id of sectionIds) {
    const el = document.getElementById(id)
    if (el) {
      const rect = el.getBoundingClientRect()
      if (rect.top <= 100 && rect.bottom >= 100) {
        currentSection.value = id
        break
      }
    }
  }
}

onMounted(() => {
  workshopStore.loadWorkshops()
  tutorialStore.loadTutorials()
  window.addEventListener('scroll', onScroll)
  onScroll()
})

onBeforeUnmount(() => {
  window.removeEventListener('scroll', onScroll)
})

const scrollToSection = (id: string) => {
  const section = document.getElementById(id)
  if (section) {
    section.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }
}

const scrollToTop = () => {
  window.scrollTo({ top: 0, behavior: 'smooth' })
}
</script>


<style scoped lang="less">
.home {
  max-width: 100%;
  padding-bottom: 4rem;
	overflow-x: hidden;
  // padding: 2rem;
}
.head-container {
  display: flex;
  flex-direction: column;
	justify-content: space-between;
  align-items: center;
  text-align: center;
  padding: 1rem 2rem;
  background-image: url('@/assets/header.jpg');
  background-size: cover;
  background-position: center;
  width: 100%;
  height: 15rem;
  color: #f9f9f9;
	.navbar {
		width: 90%;
		z-index: 100;
		align-self: flex-start;
		box-shadow: 0 2px 4px rgba(0,0,0,0.1);
		display: flex;
		flex-direction: row-reverse;
		// padding-left: 2rem;
		ul {
			list-style: none;
			display: flex;
			justify-content: center;
			gap: 2rem;
			margin: 0;
			padding: 0;
		}
		li a {
			text-decoration: none;
			color: #f9f9f9;	
			font-weight: bold;
		}
		li a:hover {
			color: #007bff;
		}
    li button {
      background: none;
      border: none;
      font: inherit;
      color: #f9f9f9;
      cursor: pointer;
      font-weight: bold;
    }

    li button:hover {
      color: #007bff;
    }
	}
}
.intro-container {
  display: flex;
  flex-direction: column;
  padding: 2rem 2rem;
  align-items: center;
  text-align: center;
  font-size: 1.5rem;
  p {
    text-align: justify;
  }
}
.content-container {
  margin-top: 2rem;
  padding: 2rem 2rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  max-width: 100%;
  justify-content: space-between;
  background-color: #f9f9f9;
}
.card-container {
  width: 100%;
  max-width: 800px;
  margin: auto;
  .card {
    margin: 2rem 0;
  }
}
section {
  margin-bottom: 3rem;
}
h1 {
  font-size: 2rem;
  margin-bottom: 1rem;
  text-align: center;
}
p {
  font-size: 1.2rem;
  margin-bottom: 1rem;
  max-width: 800px;
  text-align: start;
}

html {
  scroll-behavior: smooth;
}

.side-nav {
  position: fixed;
  top: 50%;
  right: 1rem;
  transform: translateY(-50%);
  background: rgba(255, 255, 255, 0.95);
  padding: 1rem;
  border-radius: 8px;
  box-shadow: 0 0 8px rgba(0,0,0,0.1);
  ul {
    list-style: none;
    margin: 0;
    padding: 0;
    li {
      padding: 0.5rem 1rem;
      font-weight: bold;
      color: #555;
      /* Remove .active here, move to button */
    }
    li button {
      background: none;
      border: none;
      font: inherit;
      font-weight: bold;
      color: #555;
      cursor: pointer;
      padding: 0;
    }
    li button.active {
      color: #007bff;
    }
  }
}
</style>