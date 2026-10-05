<template>
  <section id="process" class="process-section section" ref="sectionRef">
    <div class="container">
      <div class="section__header">
        <p class="section__label">{{ t('process.label') }}</p>
        <h2 class="section__title animate-in">{{ t('process.title') }}</h2>
        <p class="section__subtitle animate-in delay-1">{{ t('process.subtitle') }}</p>
      </div>

      <div class="process-section__steps">
        <div
          v-for="(step, index) in steps"
          :key="step.number"
          class="process-section__step animate-in"
          :style="{ transitionDelay: `${index * 100}ms` }"
        >
          <div class="process-section__step-number">{{ step.number }}</div>
          <div class="process-section__step-body">
            <h3 class="process-section__step-title">{{ step.title }}</h3>
            <p class="process-section__step-desc">{{ step.description }}</p>
          </div>
          <div v-if="index < steps.length - 1" class="process-section__connector" aria-hidden="true"></div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { useI18n } from 'vue-i18n'
import { useAnimateOnScroll } from '@/composables/useScrollSpy'
import type { ProcessStep } from '@/types'

const { t, tm } = useI18n()
const sectionRef = ref<HTMLElement | null>(null)
const { observe } = useAnimateOnScroll()

const steps = computed(() => tm('process.steps') as ProcessStep[])

onMounted(() => observe(sectionRef.value))
</script>

<style lang="less">
.process-section {
  &__steps {
    display: flex;
    flex-direction: column;
    gap: 0;
    max-width: 720px;
    margin-inline: auto;
    position: relative;
  }

  &__step {
    display: grid;
    grid-template-columns: 56px 1fr;
    gap: 0 var(--space-6);
    position: relative;
    padding-bottom: var(--space-10);

    &:last-child {
      padding-bottom: 0;

      .process-section__connector {
        display: none;
      }
    }
  }

  &__step-number {
    width: 56px;
    height: 56px;
    border-radius: var(--radius-full);
    border: 2px solid var(--accent-default);
    color: var(--accent-default);
    font-size: var(--text-sm);
    font-weight: var(--font-extrabold);
    letter-spacing: 0.05em;
    .flex-center();
    flex-shrink: 0;
    background: var(--bg-page);
    position: relative;
    z-index: 1;
  }

  &__connector {
    position: absolute;
    left: 27px;
    top: 56px;
    width: 2px;
    bottom: 0;
    background: linear-gradient(to bottom, var(--accent-default), var(--bg-border));
    opacity: 0.4;
  }

  &__step-body {
    padding-top: var(--space-3);
    padding-bottom: var(--space-6);
  }

  &__step-title {
    font-size: var(--text-xl);
    font-weight: var(--font-semibold);
    color: var(--text-primary);
    margin-bottom: var(--space-3);
  }

  &__step-desc {
    font-size: var(--text-base);
    color: var(--text-secondary);
    line-height: var(--leading-relaxed);
    max-width: 560px;
  }
}
</style>
