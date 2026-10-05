<template>
  <div class="numbers-section" ref="sectionRef">
    <div class="container">
      <div class="numbers-section__grid">
        <div
          v-for="(item, index) in numbers"
          :key="item.value"
          class="numbers-section__item animate-in"
          :style="{ transitionDelay: `${index * 80}ms` }"
        >
          <span class="numbers-section__value">{{ item.value }}</span>
          <span class="numbers-section__label">{{ item.label }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { useI18n } from 'vue-i18n'
import { useAnimateOnScroll } from '@/composables/useScrollSpy'
import type { NumberItem } from '@/types'

const { tm } = useI18n()
const sectionRef = ref<HTMLElement | null>(null)
const { observe } = useAnimateOnScroll()

const numbers = computed(() => tm('numbers.items') as NumberItem[])

onMounted(() => observe(sectionRef.value))
</script>

<style lang="less">
.numbers-section {
  padding-block: var(--space-16);
  border-top: 1px solid var(--bg-border);
  border-bottom: 1px solid var(--bg-border);
  background: var(--bg-surface);

  &__grid {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: var(--space-8);
    text-align: center;

    .tablet({
      grid-template-columns: repeat(2, 1fr);
      gap: var(--space-10);
    });

    .mobile-only({
      grid-template-columns: repeat(2, 1fr);
      gap: var(--space-8);
    });
  }

  &__item {
    display: flex;
    flex-direction: column;
    gap: var(--space-2);
    align-items: center;
  }

  &__value {
    font-size: var(--text-5xl);
    font-weight: var(--font-extrabold);
    color: var(--text-primary);
    letter-spacing: -0.03em;
    line-height: 1;

    .mobile-only({
      font-size: var(--text-4xl);
    });
  }

  &__label {
    font-size: var(--text-sm);
    color: var(--text-secondary);
    font-weight: var(--font-medium);
  }
}
</style>
