<template>
  <section id="home" class="hero-section section" ref="sectionRef">
    <div class="hero-section__inner container">
      <div class="hero-section__content">

        <!-- Label -->
        <div class="hero-section__label animate-in">
          <span class="hero-section__dot" aria-hidden="true"></span>
          {{ t('hero.greeting') }}
        </div>

        <!-- Headline -->
        <h1 class="hero-section__headline animate-in delay-1">
          {{ t('hero.name') }}
        </h1>

        <!-- Role -->
        <p class="hero-section__role animate-in delay-2">
          {{ t('hero.role') }}
        </p>

        <!-- Subtitle -->
        <p class="hero-section__subtitle animate-in delay-3">
          {{ t('hero.subtitle') }}
        </p>

        <!-- CTA Buttons -->
        <div class="hero-section__cta animate-in delay-4">
          <BaseButton
            variant="primary"
            size="lg"
            tag="a"
            href="/Portfolio/resume.pdf"
            external
          >
            <template #icon-left><IconDownload /></template>
            {{ t('hero.cta.resume') }}
          </BaseButton>

          <BaseButton
            variant="secondary"
            size="lg"
            tag="a"
            href="https://www.linkedin.com/in/enrico-mendes-vienhage/"
            external
          >
            {{ t('hero.cta.linkedin') }}
          </BaseButton>

          <BaseButton
            variant="ghost"
            size="lg"
            tag="a"
            href="https://github.com/EnricoMendes55"
            external
          >
            {{ t('hero.cta.github') }}
          </BaseButton>
        </div>

        <!-- Metrics -->
        <div class="hero-section__metrics animate-in delay-5">
          <div
            v-for="(metric, i) in metrics"
            :key="i"
            class="hero-section__metric"
          >
            <span class="hero-section__metric-value">{{ metric.value }}</span>
            <span class="hero-section__metric-label">{{ metric.label }}</span>
          </div>
        </div>
      </div>

      <!-- Decorative background grid -->
      <div class="hero-section__bg" aria-hidden="true">
        <div class="hero-section__photo" :style="{ backgroundImage: `url(${heroBg})` }"></div>
        <div class="hero-section__grid"></div>
        <div class="hero-section__glow"></div>
      </div>
    </div>

    <!-- Scroll indicator -->
    <a
      href="#trajectory"
      class="hero-section__scroll"
      :aria-label="t('hero.scroll')"
      @click.prevent="scrollToNext"
    >
      <span class="hero-section__scroll-text">{{ t('hero.scroll') }}</span>
      <IconArrowDown />
    </a>
  </section>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { useI18n } from 'vue-i18n'
import { useAnimateOnScroll } from '@/composables/useScrollSpy'
import BaseButton from '@/components/ui/BaseButton.vue'
import IconDownload from '@/components/ui/icons/IconDownload.vue'
import IconArrowDown from '@/components/ui/icons/IconArrowDown.vue'
import heroBg from '@/assets/hero-bg.webp'

const { t, tm } = useI18n()
const sectionRef = ref<HTMLElement | null>(null)
const { observe } = useAnimateOnScroll()

const metrics = computed(() => tm('hero.metrics') as Array<{ value: string; label: string }>)

function scrollToNext() {
  const el = document.getElementById('trajectory')
  if (el) {
    const top = el.getBoundingClientRect().top + window.scrollY - 64
    window.scrollTo({ top, behavior: 'smooth' })
  }
}

onMounted(() => observe(sectionRef.value))
</script>
