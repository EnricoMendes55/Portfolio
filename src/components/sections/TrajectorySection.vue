<template>
  <section id="trajectory" class="trajectory-section section section--alt" ref="sectionRef">
    <div class="container">
      <div class="section__header">
        <p class="section__label">{{ t('trajectory.label') }}</p>
        <h2 class="section__title animate-in">{{ t('trajectory.title') }}</h2>
        <p class="section__subtitle animate-in delay-1">{{ t('trajectory.subtitle') }}</p>
      </div>

      <div class="trajectory-section__timeline">
        <div
          v-for="(event, index) in events"
          :key="index"
          class="trajectory-section__event animate-in"
          :class="{ 'trajectory-section__event--current': event.isCurrent }"
          :style="{ transitionDelay: `${index * 100}ms` }"
        >
          <!-- Year dot -->
          <div class="trajectory-section__dot-wrapper">
            <div class="trajectory-section__dot">
              <span v-if="event.isCurrent" class="trajectory-section__dot-pulse"></span>
            </div>
            <div v-if="index < events.length - 1" class="trajectory-section__line"></div>
          </div>

          <!-- Content -->
          <div class="trajectory-section__content">
            <div class="trajectory-section__meta">
              <span class="trajectory-section__year">{{ event.year }}</span>
              <span v-if="event.isCurrent" class="badge trajectory-section__current-badge">
                {{ t('trajectory.present') }}
              </span>
            </div>
            <h3 class="trajectory-section__title">{{ event.title }}</h3>
            <p class="trajectory-section__company">{{ event.company }}</p>
            <p class="trajectory-section__role">{{ event.role }}</p>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { useI18n } from 'vue-i18n'
import { useAnimateOnScroll } from '@/composables/useScrollSpy'

const { t, tm } = useI18n()
const sectionRef = ref<HTMLElement | null>(null)
const { observe } = useAnimateOnScroll()

const events = computed(() => tm('trajectory.events') as Array<{
  year: string; title: string; company: string; role: string; isCurrent?: boolean
}>)

onMounted(() => observe(sectionRef.value))
</script>

<style lang="less">
.trajectory-section {
  &__timeline {
    max-width: 680px;
    margin-inline: auto;
    display: flex;
    flex-direction: column;
    gap: 0;
  }

  &__event {
    display: grid;
    grid-template-columns: 40px 1fr;
    gap: var(--space-6);
    padding-bottom: var(--space-10);

    &:last-child {
      padding-bottom: 0;

      .trajectory-section__line {
        display: none;
      }
    }

    &--current {
      .trajectory-section__dot {
        background: var(--accent-default);
        border-color: var(--accent-default);
        box-shadow: 0 0 0 4px var(--accent-subtle);
      }
    }
  }

  &__dot-wrapper {
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  &__dot {
    position: relative;
    width: 14px;
    height: 14px;
    border-radius: var(--radius-full);
    background: var(--bg-surface);
    border: 2px solid var(--bg-border-strong);
    flex-shrink: 0;
    z-index: 1;
    margin-top: var(--space-1);
  }

  &__dot-pulse {
    position: absolute;
    inset: -4px;
    border-radius: var(--radius-full);
    border: 2px solid var(--accent-default);
    opacity: 0.4;
    animation: ripple 2s ease-out infinite;
  }

  &__line {
    flex: 1;
    width: 1px;
    background: var(--bg-border);
    margin-top: var(--space-2);
    margin-bottom: 0;
    min-height: var(--space-8);
  }

  &__content {
    padding-bottom: var(--space-2);
  }

  &__meta {
    .flex-start();
    gap: var(--space-3);
    margin-bottom: var(--space-2);
  }

  &__year {
    font-size: var(--text-xs);
    font-weight: var(--font-semibold);
    color: var(--text-tertiary);
    letter-spacing: 0.08em;
    text-transform: uppercase;
  }

  &__current-badge {
    font-size: 10px;
  }

  &__title {
    font-size: var(--text-lg);
    font-weight: var(--font-semibold);
    color: var(--text-primary);
    margin-bottom: var(--space-1);
  }

  &__company {
    font-size: var(--text-sm);
    font-weight: var(--font-medium);
    color: var(--accent-text);
    margin-bottom: var(--space-1);
  }

  &__role {
    font-size: var(--text-sm);
    color: var(--text-secondary);
  }
}

@keyframes ripple {
  0% { transform: scale(0.8); opacity: 0.6; }
  100% { transform: scale(2); opacity: 0; }
}
</style>
