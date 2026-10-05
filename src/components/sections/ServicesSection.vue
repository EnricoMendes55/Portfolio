<template>
  <section id="services" class="services-section section" ref="sectionRef">
    <div class="container">
      <div class="section__header">
        <p class="section__label">{{ t('services.label') }}</p>
        <h2 class="section__title animate-in">{{ t('services.title') }}</h2>
        <p class="section__subtitle animate-in delay-1">{{ t('services.subtitle') }}</p>
      </div>

      <div class="services-section__grid">
        <div
          v-for="(item, index) in services"
          :key="item.key"
          class="services-section__card animate-in"
          :style="{ transitionDelay: `${index * 80}ms` }"
        >
          <div class="services-section__icon">
            <component :is="iconMap[item.key]" />
          </div>
          <h3 class="services-section__title">{{ item.title }}</h3>
          <p class="services-section__desc">{{ item.description }}</p>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, defineComponent, h } from 'vue'
import { useI18n } from 'vue-i18n'
import { useAnimateOnScroll } from '@/composables/useScrollSpy'
import type { ServiceItem } from '@/types'
import type { Component } from 'vue'

const { t, tm } = useI18n()
const sectionRef = ref<HTMLElement | null>(null)
const { observe } = useAnimateOnScroll()

const services = computed(() => tm('services.items') as ServiceItem[])

const IconWebsite = defineComponent({
  render: () => h('svg', { viewBox: '0 0 24 24', fill: 'none', stroke: 'currentColor', 'stroke-width': '1.5', 'stroke-linecap': 'round', 'stroke-linejoin': 'round', 'aria-hidden': 'true' }, [
    h('rect', { x: '2', y: '3', width: '20', height: '14', rx: '2' }),
    h('path', { d: 'M8 21h8M12 17v4' })
  ])
})

const IconLanding = defineComponent({
  render: () => h('svg', { viewBox: '0 0 24 24', fill: 'none', stroke: 'currentColor', 'stroke-width': '1.5', 'stroke-linecap': 'round', 'stroke-linejoin': 'round', 'aria-hidden': 'true' }, [
    h('path', { d: 'M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z' }),
    h('path', { d: 'M14 2v6h6M9 13h6M9 17h4' })
  ])
})

const IconUI = defineComponent({
  render: () => h('svg', { viewBox: '0 0 24 24', fill: 'none', stroke: 'currentColor', 'stroke-width': '1.5', 'stroke-linecap': 'round', 'stroke-linejoin': 'round', 'aria-hidden': 'true' }, [
    h('circle', { cx: '12', cy: '12', r: '3' }),
    h('path', { d: 'M12 1v4M12 19v4M4.22 4.22l2.83 2.83M16.95 16.95l2.83 2.83M1 12h4M19 12h4M4.22 19.78l2.83-2.83M16.95 7.05l2.83-2.83' })
  ])
})

const IconFrontend = defineComponent({
  render: () => h('svg', { viewBox: '0 0 24 24', fill: 'none', stroke: 'currentColor', 'stroke-width': '1.5', 'stroke-linecap': 'round', 'stroke-linejoin': 'round', 'aria-hidden': 'true' }, [
    h('polyline', { points: '16 18 22 12 16 6' }),
    h('polyline', { points: '8 6 2 12 8 18' })
  ])
})

const iconMap: Record<string, Component> = {
  website:  IconWebsite,
  landing:  IconLanding,
  ui:       IconUI,
  frontend: IconFrontend
}

onMounted(() => observe(sectionRef.value))
</script>

<style lang="less">
.services-section {
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
    gap: var(--space-4);
  }

  &__icon {
    width: 48px;
    height: 48px;
    background: var(--accent-subtle);
    border-radius: var(--radius-lg);
    .flex-center();
    color: var(--accent-default);
    flex-shrink: 0;

    svg {
      width: 22px;
      height: 22px;
    }
  }

  &__title {
    font-size: var(--text-lg);
    font-weight: var(--font-semibold);
    color: var(--text-primary);
    line-height: var(--leading-snug);
  }

  &__desc {
    font-size: var(--text-sm);
    color: var(--text-secondary);
    line-height: var(--leading-relaxed);
    flex: 1;
  }
}
</style>
