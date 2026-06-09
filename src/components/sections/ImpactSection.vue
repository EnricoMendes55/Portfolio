<template>
  <section id="impact" class="impact-section section" ref="sectionRef">
    <div class="container">
      <div class="section__header">
        <p class="section__label">{{ t('impact.label') }}</p>
        <h2 class="section__title animate-in">{{ t('impact.title') }}</h2>
        <p class="section__subtitle animate-in delay-1">{{ t('impact.subtitle') }}</p>
      </div>

      <div class="impact-section__grid">
        <div
          v-for="(card, index) in cards"
          :key="card.key"
          class="impact-section__card animate-in"
          :style="{ transitionDelay: `${index * 80}ms` }"
        >
          <!-- Icon -->
          <div class="impact-section__icon-wrap">
            <component :is="iconMap[card.icon]" class="impact-section__icon" />
          </div>

          <!-- Title -->
          <h3 class="impact-section__card-title">{{ card.title }}</h3>

          <!-- Description -->
          <p class="impact-section__card-desc">{{ card.description }}</p>

          <!-- Results -->
          <ul class="impact-section__results">
            <li
              v-for="(result, ri) in card.results"
              :key="ri"
              class="result-tag"
            >
              {{ result }}
            </li>
          </ul>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import type { Component } from 'vue'
import { useI18n } from 'vue-i18n'
import { useAnimateOnScroll } from '@/composables/useScrollSpy'
import IconTeam from '@/components/ui/icons/impact/IconTeam.vue'
import IconDesign from '@/components/ui/icons/impact/IconDesign.vue'
import IconArchitecture from '@/components/ui/icons/impact/IconArchitecture.vue'
import IconMetrics from '@/components/ui/icons/impact/IconMetrics.vue'

const { t, tm } = useI18n()
const sectionRef = ref<HTMLElement | null>(null)
const { observe } = useAnimateOnScroll()

const cards = computed(() => tm('impact.cards') as Array<{
  key: string; icon: string; title: string; description: string; results: string[]
}>)

const iconMap: Record<string, Component> = {
  team: IconTeam,
  design: IconDesign,
  architecture: IconArchitecture,
  metrics: IconMetrics
}

onMounted(() => observe(sectionRef.value))
</script>

<style lang="less">
.impact-section {
  &__grid {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: var(--space-6);

    .mobile-only({
      grid-template-columns: 1fr;
    });
  }

  &__card {
    .surface-card();
    padding: var(--space-8);
    display: flex;
    flex-direction: column;
    gap: var(--space-5);
  }

  &__icon-wrap {
    width: 48px;
    height: 48px;
    background: var(--accent-subtle);
    border-radius: var(--radius-lg);
    .flex-center();
    color: var(--accent-default);
    flex-shrink: 0;
  }

  &__icon {
    width: 24px;
    height: 24px;
  }

  &__card-title {
    font-size: var(--text-xl);
    font-weight: var(--font-bold);
    color: var(--text-primary);
    line-height: var(--leading-snug);
  }

  &__card-desc {
    font-size: var(--text-sm);
    color: var(--text-secondary);
    line-height: var(--leading-relaxed);
    flex: 1;
  }

  &__results {
    display: flex;
    flex-wrap: wrap;
    gap: var(--space-2);
    list-style: none;
  }
}
</style>
