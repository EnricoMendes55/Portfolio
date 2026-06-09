<template>
  <section id="skills" class="skills-section section" ref="sectionRef">
    <div class="container">
      <div class="section__header">
        <p class="section__label">{{ t('skills.label') }}</p>
        <h2 class="section__title animate-in">{{ t('skills.title') }}</h2>
        <p class="section__subtitle animate-in delay-1">{{ t('skills.subtitle') }}</p>
      </div>

      <div class="skills-section__grid">
        <div
          v-for="(category, index) in categories"
          :key="category.key"
          class="skills-section__category animate-in"
          :style="{ transitionDelay: `${index * 80}ms` }"
        >
          <div class="skills-section__category-header">
            <div class="skills-section__category-icon">
              <component :is="categoryIconMap[category.icon]" />
            </div>
            <h3 class="skills-section__category-label">{{ category.label }}</h3>
          </div>

          <div class="skills-section__items">
            <span
              v-for="item in category.items"
              :key="item"
              class="skills-section__item"
            >{{ item }}</span>
          </div>
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
import IconCode from '@/components/ui/icons/skills/IconCode.vue'
import IconSkillDesign from '@/components/ui/icons/skills/IconSkillDesign.vue'
import IconShield from '@/components/ui/icons/skills/IconShield.vue'
import IconPeople from '@/components/ui/icons/skills/IconPeople.vue'
import IconRocket from '@/components/ui/icons/skills/IconRocket.vue'

const { t, tm } = useI18n()
const sectionRef = ref<HTMLElement | null>(null)
const { observe } = useAnimateOnScroll()

const categories = computed(() => tm('skills.categories') as Array<{
  key: string; icon: string; label: string; items: string[]
}>)

const categoryIconMap: Record<string, Component> = {
  code: IconCode,
  design: IconSkillDesign,
  shield: IconShield,
  people: IconPeople,
  rocket: IconRocket
}

onMounted(() => observe(sectionRef.value))
</script>

<style lang="less">
.skills-section {
  &__grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: var(--space-6);

    .tablet({
      grid-template-columns: repeat(2, 1fr);
    });

    .mobile-only({
      grid-template-columns: 1fr;
    });
  }

  &__category {
    .surface-card-static();
    padding: var(--space-6);
    display: flex;
    flex-direction: column;
    gap: var(--space-5);
  }

  &__category-header {
    .flex-start();
    gap: var(--space-3);
  }

  &__category-icon {
    width: 36px;
    height: 36px;
    background: var(--accent-subtle);
    border-radius: var(--radius-md);
    .flex-center();
    color: var(--accent-default);
    flex-shrink: 0;

    svg {
      width: 18px;
      height: 18px;
    }
  }

  &__category-label {
    font-size: var(--text-base);
    font-weight: var(--font-semibold);
    color: var(--text-primary);
  }

  &__items {
    display: flex;
    flex-wrap: wrap;
    gap: var(--space-2);
  }

  &__item {
    font-size: var(--text-xs);
    font-weight: var(--font-medium);
    padding: var(--space-1) var(--space-3);
    background: var(--bg-surface-raised);
    border: 1px solid var(--bg-border);
    border-radius: var(--radius-full);
    color: var(--text-secondary);
    transition:
      background-color var(--transition-fast),
      color var(--transition-fast),
      border-color var(--transition-fast);

    &:hover {
      background: var(--accent-subtle);
      color: var(--accent-text);
      border-color: var(--accent-subtle);
    }
  }
}
</style>
