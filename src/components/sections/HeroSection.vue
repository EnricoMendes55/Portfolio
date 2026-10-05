<template>
  <section id="home" class="hero-section section" ref="sectionRef">
    <div class="hero-section__inner container">
      <div class="hero-section__content">

        <!-- Name -->
        <p class="hero-section__name animate-in">
          {{ t('hero.name') }}
        </p>

        <!-- Headline -->
        <h1 class="hero-section__headline animate-in delay-1">
          {{ t('hero.headline') }}
        </h1>

        <!-- Disciplines -->
        <p class="hero-section__role animate-in delay-2">
          {{ t('hero.role') }}
        </p>

        <!-- Trust signals -->
        <div class="hero-section__trust animate-in delay-3">
          <span
            v-for="signal in trustSignals"
            :key="signal.value"
            class="hero-section__trust-item"
          >
            <strong>{{ signal.value }}</strong>
            <span class="hero-section__trust-label">{{ signal.label }}</span>
          </span>
        </div>

        <!-- CTAs -->
        <div class="hero-section__cta animate-in delay-4">
          <BaseButton
            variant="primary"
            size="lg"
            tag="a"
            href="#work"
            @click.prevent="scrollTo('work')"
          >
            {{ t('hero.cta.primary') }}
            <template #icon-right><IconArrowDown /></template>
          </BaseButton>

          <BaseButton
            variant="secondary"
            size="lg"
            tag="a"
            href="#contact"
            @click.prevent="scrollTo('contact')"
          >
            {{ t('hero.cta.secondary') }}
          </BaseButton>
        </div>
      </div>

      <!-- Decorative background -->
      <div class="hero-section__bg" aria-hidden="true">
        <div class="hero-section__photo" :style="{ backgroundImage: `url(${heroBg})` }"></div>
        <div class="hero-section__grid"></div>
        <div class="hero-section__glow"></div>
      </div>
    </div>

    <!-- Scroll indicator -->
    <a
      href="#work"
      class="hero-section__scroll"
      :aria-label="t('hero.scroll')"
      @click.prevent="scrollTo('work')"
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
import IconArrowDown from '@/components/ui/icons/IconArrowDown.vue'
import heroBg from '@/assets/hero-bg.webp'
import type { TrustSignal } from '@/types'

const { t, tm } = useI18n()
const sectionRef = ref<HTMLElement | null>(null)
const { observe } = useAnimateOnScroll()

const trustSignals = computed(() => tm('hero.trust') as TrustSignal[])

function scrollTo(target: string) {
  const el = document.getElementById(target)
  if (el) {
    const top = el.getBoundingClientRect().top + window.scrollY - 64
    window.scrollTo({ top, behavior: 'smooth' })
  }
}

onMounted(() => observe(sectionRef.value))
</script>
