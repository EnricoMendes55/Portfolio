<template>
  <main id="main-content" class="main-content">
    <HeroSection />
    <WorkSection />
    <NumbersSection />
    <SkillsSection />
    <AboutSection />
    <ContactSection />
  </main>
</template>

<script setup lang="ts">
import HeroSection from '@/components/sections/HeroSection.vue'
import WorkSection from '@/components/sections/WorkSection.vue'
import NumbersSection from '@/components/sections/NumbersSection.vue'
import SkillsSection from '@/components/sections/SkillsSection.vue'
import AboutSection from '@/components/sections/AboutSection.vue'
import ContactSection from '@/components/sections/ContactSection.vue'
</script>
