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

<style lang="less">
.hero-section {
  position: relative;
  min-height: calc(100vh - var(--header-height));
  display: flex;
  align-items: center;
  overflow: hidden;
  padding-block: var(--space-24);

  .mobile-only({
    padding-block: var(--space-16);
    min-height: auto;
  });

  &__inner {
    position: relative;
    z-index: var(--z-raised);
  }

  &__content {
    max-width: 780px;
  }

  &__label {
    .flex-start();
    gap: var(--space-2);
    font-size: var(--text-sm);
    font-weight: var(--font-medium);
    color: var(--text-secondary);
    margin-bottom: var(--space-5);
  }

  &__dot {
    width: 8px;
    height: 8px;
    background: var(--color-success);
    border-radius: var(--radius-full);
    box-shadow: 0 0 0 3px rgb(34 197 94 / 0.2);
    animation: pulse 2s ease-in-out infinite;
  }

  &__headline {
    font-size: var(--text-7xl);
    .heading-display();
    color: var(--text-primary);
    margin-bottom: var(--space-4);
    letter-spacing: -0.03em;

    .tablet({
      font-size: var(--text-6xl);
    });

    .mobile-only({
      font-size: var(--text-4xl);
    });
  }

  &__role {
    font-size: var(--text-xl);
    font-weight: var(--font-semibold);
    color: var(--accent-text);
    margin-bottom: var(--space-5);

    .mobile-only({
      font-size: var(--text-lg);
    });
  }

  &__subtitle {
    font-size: var(--text-xl);
    color: var(--text-secondary);
    line-height: var(--leading-relaxed);
    max-width: 580px;
    margin-bottom: var(--space-10);

    .mobile-only({
      font-size: var(--text-base);
    });
  }

  &__cta {
    display: flex;
    flex-wrap: wrap;
    gap: var(--space-3);
    margin-bottom: var(--space-16);

    .mobile-only({
      flex-direction: column;
      margin-bottom: var(--space-10);
    });
  }

  &__metrics {
    display: grid;
    grid-template-columns: repeat(4, auto);
    gap: var(--space-8);
    justify-content: start;
    padding-top: var(--space-8);
    border-top: 1px solid var(--bg-border);

    .tablet({
      grid-template-columns: repeat(2, auto);
      gap: var(--space-6);
    });

    .mobile-only({
      grid-template-columns: repeat(2, 1fr);
      gap: var(--space-6);
    });
  }

  &__metric {
    display: flex;
    flex-direction: column;
    gap: var(--space-1);
  }

  &__metric-value {
    font-size: var(--text-3xl);
    font-weight: var(--font-extrabold);
    color: var(--text-primary);
    letter-spacing: var(--tracking-tight);
    line-height: 1;
  }

  &__metric-label {
    font-size: var(--text-xs);
    color: var(--text-secondary);
    font-weight: var(--font-medium);
    max-width: 120px;
    line-height: var(--leading-snug);
  }

  // Decorative background
  &__bg {
    position: absolute;
    inset: 0;
    z-index: var(--z-below);
    pointer-events: none;
    overflow: hidden;
  }

  &__grid {
    position: absolute;
    inset: 0;
    background-image:
      linear-gradient(var(--bg-border) 1px, transparent 1px),
      linear-gradient(90deg, var(--bg-border) 1px, transparent 1px);
    background-size: 60px 60px;
    opacity: 0.4;
    mask-image: radial-gradient(ellipse 80% 80% at 50% 0%, black 30%, transparent 100%);
  }

  &__glow {
    position: absolute;
    top: -20%;
    right: -10%;
    width: 60%;
    height: 60%;
    background: radial-gradient(ellipse, var(--accent-subtle) 0%, transparent 70%);
    opacity: 0.6;

    [data-theme="dark"] & {
      opacity: 0.3;
    }
  }

  // Scroll indicator
  &__scroll {
    position: absolute;
    bottom: var(--space-8);
    left: 50%;
    transform: translateX(-50%);
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: var(--space-2);
    color: var(--text-tertiary);
    text-decoration: none;
    font-size: var(--text-xs);
    font-weight: var(--font-medium);
    transition: color var(--transition-fast);
    animation: float 3s ease-in-out infinite;

    &:hover {
      color: var(--text-secondary);
    }

    .mobile-only({ display: none; });
  }

  &__scroll-text {
    letter-spacing: 0.08em;
    text-transform: uppercase;
  }
}

@keyframes float {
  0%, 100% { transform: translateX(-50%) translateY(0); }
  50% { transform: translateX(-50%) translateY(6px); }
}
</style>
