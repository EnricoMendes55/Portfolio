<template>
  <section id="about" class="about-section section" ref="sectionRef">
    <div class="container">
      <div class="about-section__layout">
        <!-- Photo -->
        <div class="about-section__photo-wrap animate-in">
          <div class="about-section__photo">
            <img
              :src="aboutPhotoUrl"
              :alt="t('hero.name')"
              loading="lazy"
              class="about-section__img"
              @error="(e) => ((e.target as HTMLImageElement).style.display = 'none')"
            />
          </div>
        </div>

        <!-- Content -->
        <div class="about-section__content">
          <p class="section__label animate-in">{{ t('about.label') }}</p>
          <h2 class="about-section__title animate-in delay-1">{{ t('about.title') }}</h2>

          <div class="about-section__paragraphs animate-in delay-2">
            <p
              v-for="(para, i) in paragraphs"
              :key="i"
              class="about-section__para"
            >{{ para }}</p>
          </div>

          <div class="about-section__tools animate-in delay-3">
            <p class="about-section__tools-label">{{ t('about.toolsLabel') }}</p>
            <div class="about-section__tools-grid">
              <span v-for="tool in tools" :key="tool" class="about-section__tool">
                {{ tool }}
              </span>
            </div>
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

const paragraphs = computed(() => tm('about.paragraphs') as string[])
const tools = computed(() => tm('about.tools') as string[])
const aboutPhotoUrl = `${import.meta.env.BASE_URL}about-photo.webp`

onMounted(() => observe(sectionRef.value))
</script>

<style lang="less">
.about-section {
  &__layout {
    display: grid;
    grid-template-columns: 380px 1fr;
    gap: var(--space-16);
    align-items: start;

    .tablet({
      grid-template-columns: 1fr;
      gap: var(--space-12);
    });
  }

  &__photo-wrap {
    position: sticky;
    top: calc(var(--header-height) + var(--space-8));

    .tablet({
      position: static;
      max-width: 360px;
      margin-inline: auto;
    });
  }

  &__photo {
    border-radius: var(--radius-2xl);
    overflow: hidden;
    aspect-ratio: 3 / 4;
    background: var(--bg-surface-raised);
    border: 1px solid var(--bg-border);
  }

  &__img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    object-position: top center;
  }

  &__title {
    font-size: var(--text-4xl);
    font-weight: var(--font-extrabold);
    color: var(--text-primary);
    letter-spacing: -0.02em;
    margin-bottom: var(--space-8);
    line-height: 1.15;

    .mobile-only({
      font-size: var(--text-3xl);
    });
  }

  &__paragraphs {
    display: flex;
    flex-direction: column;
    gap: var(--space-5);
    margin-bottom: var(--space-10);
  }

  &__para {
    font-size: var(--text-lg);
    color: var(--text-secondary);
    line-height: var(--leading-relaxed);

    .mobile-only({
      font-size: var(--text-base);
    });
  }

  &__tools {
    padding-top: var(--space-8);
    border-top: 1px solid var(--bg-border);
  }

  &__tools-label {
    font-size: var(--text-xs);
    font-weight: var(--font-semibold);
    color: var(--text-tertiary);
    letter-spacing: 0.1em;
    text-transform: uppercase;
    margin-bottom: var(--space-4);
  }

  &__tools-grid {
    display: flex;
    flex-wrap: wrap;
    gap: var(--space-2);
  }

  &__tool {
    .badge();
    font-size: var(--text-sm);
    padding: 0.375rem var(--space-3);
  }
}
</style>
