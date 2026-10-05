<template>
  <section id="skills" class="skills-section section" ref="sectionRef">
    <div class="container">
      <div class="section__header">
        <p class="section__label">{{ t('skills.label') }}</p>
        <h2 class="section__title animate-in">{{ t('skills.title') }}</h2>
        <p class="section__subtitle animate-in delay-1">{{ t('skills.subtitle') }}</p>
      </div>

      <div class="skills-section__groups">
        <div
          v-for="(group, i) in groups"
          :key="group.key"
          class="skills-section__group animate-in"
          :style="{ transitionDelay: `${i * 80}ms` }"
        >
          <h3 class="skills-section__group-title">{{ group.title }}</h3>
          <div class="skills-section__items">
            <span
              v-for="item in group.items"
              :key="item.name"
              class="skills-section__item"
              :class="{ 'skills-section__item--core': item.core }"
            >{{ item.name }}</span>
          </div>
        </div>
      </div>

      <p class="skills-section__legend">
        <span class="skills-section__legend-sample skills-section__legend-sample--core">HTML5</span>
        {{ t('skills.legend.core') }}
        <span class="skills-section__legend-sep">·</span>
        <span class="skills-section__legend-sample">React</span>
        {{ t('skills.legend.modern') }}
      </p>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { useI18n } from 'vue-i18n'
import { useAnimateOnScroll } from '@/composables/useScrollSpy'
import type { SkillGroup } from '@/types'

const { t, tm } = useI18n()
const sectionRef = ref<HTMLElement | null>(null)
const { observe } = useAnimateOnScroll()

const groups = computed(() => tm('skills.groups') as SkillGroup[])

onMounted(() => observe(sectionRef.value))
</script>

<style lang="less">
.skills-section {
  &__groups {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: var(--space-4);
    margin-bottom: var(--space-8);

    .mobile-only({
      grid-template-columns: 1fr;
    });
  }

  &__group {
    background: var(--bg-surface);
    border: 1px solid var(--bg-border);
    border-radius: var(--radius-xl);
    padding: var(--space-6);
  }

  &__group-title {
    font-size: var(--text-xs);
    font-weight: var(--font-semibold);
    color: var(--text-tertiary);
    letter-spacing: 0.1em;
    text-transform: uppercase;
    margin-bottom: var(--space-4);
  }

  &__items {
    display: flex;
    flex-wrap: wrap;
    gap: var(--space-2);
  }

  &__item {
    font-size: var(--text-sm);
    font-weight: var(--font-medium);
    padding: 0.3rem var(--space-3);
    border-radius: var(--radius-full);
    border: 1px solid var(--bg-border);
    color: var(--text-secondary);
    background: transparent;
    line-height: 1.4;

    &--core {
      background: var(--accent-subtle);
      border-color: transparent;
      color: var(--accent-text);
      font-weight: var(--font-semibold);
    }
  }

  &__legend {
    display: flex;
    align-items: center;
    gap: var(--space-2);
    justify-content: center;
    font-size: var(--text-xs);
    color: var(--text-tertiary);
    flex-wrap: wrap;
  }

  &__legend-sep {
    color: var(--bg-border-strong);
    margin-inline: var(--space-2);
  }

  &__legend-sample {
    font-size: var(--text-xs);
    font-weight: var(--font-medium);
    padding: 0.2rem var(--space-2);
    border-radius: var(--radius-full);
    border: 1px solid var(--bg-border);
    color: var(--text-secondary);
    background: transparent;

    &--core {
      background: var(--accent-subtle);
      border-color: transparent;
      color: var(--accent-text);
      font-weight: var(--font-semibold);
    }
  }
}
</style>
