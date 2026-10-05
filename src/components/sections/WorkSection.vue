<template>
  <section id="work" class="work-section section" ref="sectionRef">
    <div class="container">

      <div class="section__header">
        <p class="section__label">{{ t('work.label') }}</p>
        <h2 class="section__title animate-in">{{ t('work.title') }}</h2>
        <p class="section__subtitle animate-in delay-1">{{ t('work.subtitle') }}</p>
      </div>

      <div class="work-section__projects">
        <article
          v-for="(item, index) in workItems"
          :key="item.key"
          class="work-section__project animate-in"
          :class="`work-section__project--${item.key}`"
          :style="{ transitionDelay: `${index * 100}ms` }"
        >
          <!-- Info column -->
          <div class="work-section__project-info">
            <div class="work-section__project-meta">
              <span class="work-section__project-num">0{{ index + 1 }}</span>
              <span class="work-section__project-cat">{{ item.category }}</span>
            </div>

            <h3 class="work-section__project-title">{{ item.title }}</h3>
            <p class="work-section__project-summary">{{ item.summary }}</p>

            <!-- Stats grid — AI Briefing only, typographic, no background -->
            <div v-if="item.highlights?.length" class="work-section__project-stats">
              <div
                v-for="h in item.highlights"
                :key="h.label"
                class="work-section__project-stat"
              >
                <strong>{{ h.value }}</strong>
                <span>{{ h.label }}</span>
              </div>
            </div>

            <!-- Callout — BI Dashboard -->
            <p v-if="item.callout" class="work-section__project-callout">
              {{ item.callout }}
            </p>

            <p class="work-section__project-stack">
              {{ item.tags.slice(0, 5).join(' · ') }}
            </p>

            <button class="work-section__project-cta" @click="openCase(item)">
              {{ t('work.seeCase') }} →
            </button>
          </div>

          <!-- Visual column — browser mockup, ready for screenshots -->
          <div
            class="work-section__project-visual"
            @click="openCase(item)"
            role="button"
            tabindex="0"
            :aria-label="`${t('work.seeCase')}: ${item.title}`"
            @keydown.enter="openCase(item)"
          >
            <div class="work-section__browser">
              <div class="work-section__browser-chrome">
                <div class="work-section__browser-dots">
                  <span></span><span></span><span></span>
                </div>
                <div class="work-section__browser-url"></div>
              </div>
              <div
                class="work-section__browser-screen"
                :class="`work-section__screen--${item.key}`"
              >
                <img
                  v-if="item.image"
                  :src="item.image"
                  :alt="item.title"
                  class="work-section__project-img"
                />
              </div>
            </div>
          </div>
        </article>
      </div>

    </div>

    <!-- Case modal — full detail -->
    <Transition name="modal">
      <div
        v-if="activeCase"
        class="work-section__modal-backdrop"
        @click.self="closeCase"
        role="dialog"
        :aria-label="activeCase.title"
        aria-modal="true"
      >
        <div class="work-section__modal" ref="modalRef">
          <button
            class="work-section__modal-close btn btn--icon"
            :aria-label="t('work.close')"
            @click="closeCase"
          >
            <IconClose />
          </button>

          <div class="work-section__modal-body">
            <div
              class="work-section__modal-thumb"
              :class="`work-section__screen--${activeCase.key}`"
            >
              <img
                v-if="activeCase.image"
                :src="activeCase.image"
                :alt="activeCase.title"
                class="work-section__project-img"
              />
              <div v-else class="work-section__placeholder">
                <span class="work-section__placeholder-text">{{ activeCase.category }}</span>
              </div>
            </div>

            <div class="work-section__modal-content">
              <span class="work-section__modal-cat">{{ activeCase.category }}</span>
              <h2 class="work-section__modal-title">{{ activeCase.title }}</h2>

              <div class="work-section__modal-section">
                <h4>{{ t('work.challenge') }}</h4>
                <p>{{ activeCase.challenge }}</p>
              </div>

              <div class="work-section__modal-section">
                <h4>{{ t('work.solution') }}</h4>
                <p>{{ activeCase.solution }}</p>
              </div>

              <div class="work-section__modal-section">
                <h4>{{ activeCase.outcomeLabel || t('work.result') }}</h4>
                <p>{{ activeCase.result }}</p>
              </div>

              <div class="work-section__modal-section">
                <h4>{{ t('work.stack') }}</h4>
                <div class="work-section__tags">
                  <span
                    v-for="tag in activeCase.tags"
                    :key="tag"
                    class="work-section__tag"
                  >{{ tag }}</span>
                </div>
              </div>

              <a
                v-if="activeCase.liveUrl"
                :href="activeCase.liveUrl"
                target="_blank"
                rel="noopener noreferrer"
                class="btn btn--primary btn--md"
              >
                {{ t('work.viewLive') }} →
              </a>
            </div>
          </div>
        </div>
      </div>
    </Transition>
  </section>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted } from 'vue'
import { useI18n } from 'vue-i18n'
import { useAnimateOnScroll } from '@/composables/useScrollSpy'
import IconClose from '@/components/ui/icons/IconClose.vue'
import type { WorkItem } from '@/types'

const { t, tm } = useI18n()
const sectionRef  = ref<HTMLElement | null>(null)
const modalRef    = ref<HTMLElement | null>(null)
const activeCase  = ref<WorkItem | null>(null)
const { observe } = useAnimateOnScroll()

const workItems = computed(() => tm('work.items') as WorkItem[])

function openCase(item: WorkItem) {
  activeCase.value = item
  document.body.style.overflow = 'hidden'
}

function closeCase() {
  activeCase.value = null
  document.body.style.overflow = ''
}

function onKeydown(e: KeyboardEvent) {
  if (e.key === 'Escape') closeCase()
}

onMounted(() => {
  observe(sectionRef.value)
  document.addEventListener('keydown', onKeydown)
})

onUnmounted(() => {
  document.removeEventListener('keydown', onKeydown)
  document.body.style.overflow = ''
})
</script>

<style lang="less">
.work-section {

  // ─────────────────────────────────────────────────────────────
  // Projects list — no card container, editorial composition
  // ─────────────────────────────────────────────────────────────

  &__projects {
    margin-top: var(--space-16);
  }

  &__project {
    display: grid;
    grid-template-columns: 5fr 7fr; // default: info 42% | visual 58%
    gap: var(--space-16);
    align-items: start;
    padding-top: var(--space-12);
    padding-bottom: clamp(5rem, 8vw, 8.75rem);
    position: relative;

    // Composition 02 — BI Dashboard: visual left, info right
    &--bi-dashboard {
      grid-template-columns: 7fr 5fr;

      .work-section__project-info   { order: 2; }
      .work-section__project-visual { order: 1; }
    }

    // Composition 03 — Clínica Balvedi: stacked (info above, visual full-width)
    &--clinica-balvedi {
      grid-template-columns: 1fr;
      gap: var(--space-10);

      .work-section__project-info {
        max-width: 600px;
      }
    }

    // Tablet: single column, visual always first
    .tablet({
      grid-template-columns: 1fr !important;
      gap: var(--space-10);
      padding-top: var(--space-10);
      padding-bottom: clamp(3rem, 6vw, 5rem);
      align-items: start;

      .work-section__project-visual { order: 1; }
      .work-section__project-info   { order: 2; }
    });

    .mobile-only({
      gap: var(--space-8);
      padding-top: var(--space-8);
      padding-bottom: clamp(2.5rem, 5vw, 4rem);
    });
  }

  // Per-project atmosphere — very subtle, background only
  &__project--ai-briefing {
    &::before {
      content: '';
      position: absolute;
      inset: 0;
      background: radial-gradient(ellipse 70% 80% at 72% 50%, rgba(90, 72, 168, 0.055) 0%, transparent 70%);
      pointer-events: none;
      z-index: 0;
    }
  }

  &__project--bi-dashboard {
    &::before {
      content: '';
      position: absolute;
      inset: 0;
      background: radial-gradient(ellipse 70% 80% at 28% 50%, rgba(10, 130, 100, 0.055) 0%, transparent 70%);
      pointer-events: none;
      z-index: 0;
    }
  }

  &__project--clinica-balvedi {
    &::before {
      content: '';
      position: absolute;
      inset: 0;
      background: radial-gradient(ellipse 80% 60% at 50% 80%, rgba(24, 80, 160, 0.055) 0%, transparent 70%);
      pointer-events: none;
      z-index: 0;
    }
  }

  // Keep content above pseudo-element
  &__project-info,
  &__project-visual {
    position: relative;
    z-index: 1;
  }

  // ─────────────────────────────────────────────────────────────
  // Info block
  // ─────────────────────────────────────────────────────────────

  &__project-info {
    display: flex;
    flex-direction: column;
  }

  &__project-meta {
    display: flex;
    align-items: center;
    gap: var(--space-3);
    margin-bottom: var(--space-5);
  }

  &__project-num {
    font-size: var(--text-xs);
    font-weight: var(--font-semibold);
    color: var(--text-tertiary);
    letter-spacing: 0.14em;
    font-variant-numeric: tabular-nums;
  }

  &__project-cat {
    font-size: var(--text-xs);
    font-weight: var(--font-semibold);
    color: var(--accent-default);
    letter-spacing: 0.08em;
    text-transform: uppercase;
  }

  &__project-title {
    font-size: var(--text-2xl);
    font-weight: var(--font-bold);
    color: var(--text-primary);
    line-height: var(--leading-snug);
    letter-spacing: -0.02em;
    margin-bottom: var(--space-4);

    // Featured case gets larger title
    .work-section__project--ai-briefing & {
      font-size: var(--text-3xl);
    }

    .tablet({
      font-size: var(--text-xl) !important;
    });
  }

  &__project-summary {
    font-size: var(--text-sm);
    color: var(--text-secondary);
    line-height: var(--leading-relaxed);
    max-width: 380px;
    margin-bottom: var(--space-6);

    .work-section__project--clinica-balvedi & {
      max-width: 500px;
    }
  }

  // Stats — purely typographic, zero background
  &__project-stats {
    display: grid;
    grid-template-columns: repeat(2, max-content);
    column-gap: var(--space-10);
    row-gap: var(--space-6);
    margin-bottom: var(--space-8);
  }

  &__project-stat {
    display: flex;
    flex-direction: column;
    gap: 4px;

    strong {
      font-size: var(--text-3xl);
      font-weight: var(--font-extrabold);
      color: var(--text-primary);
      line-height: 1;
      letter-spacing: -0.03em;
    }

    span {
      font-size: var(--text-xs);
      color: var(--text-tertiary);
      line-height: 1.4;
    }
  }

  // Callout — BI Dashboard technical highlight
  &__project-callout {
    font-size: var(--text-sm);
    color: var(--text-secondary);
    line-height: var(--leading-relaxed);
    padding-left: var(--space-4);
    border-left: 2px solid var(--accent-default);
    font-style: italic;
    margin-bottom: var(--space-6);
  }

  // Stack line
  &__project-stack {
    font-size: var(--text-xs);
    color: var(--text-tertiary);
    letter-spacing: 0.04em;
    line-height: 1.6;
    padding-top: var(--space-5);
    border-top: 1px solid var(--bg-border);
    margin-bottom: var(--space-5);
  }

  // CTA — minimal pill button
  &__project-cta {
    display: inline-flex;
    align-items: center;
    gap: var(--space-2);
    font-size: var(--text-sm);
    font-weight: var(--font-semibold);
    color: var(--text-primary);
    background: transparent;
    border: 1px solid var(--bg-border);
    border-radius: var(--radius-full);
    padding: var(--space-2) var(--space-5);
    cursor: pointer;
    transition: background var(--transition-fast), border-color var(--transition-fast);
    width: fit-content;

    &:hover {
      background: var(--bg-surface-raised);
      border-color: var(--text-secondary);
    }
  }

  // ─────────────────────────────────────────────────────────────
  // Visual block — browser mockup
  // ─────────────────────────────────────────────────────────────

  &__project-visual {
    cursor: pointer;

    &:hover .work-section__browser {
      transform: translateY(-4px);
      box-shadow: 0 24px 64px rgb(0 0 0 / 0.38), 0 0 0 1px rgba(255, 255, 255, 0.07);
    }

    [data-theme="light"] &:hover .work-section__browser {
      box-shadow: 0 24px 64px rgb(0 0 0 / 0.12), 0 0 0 1px rgba(0,0,0,0.06);
    }
  }

  // Browser frame — minimal, not a card
  &__browser {
    border-radius: 10px;
    border: 1px solid rgba(255, 255, 255, 0.09);
    overflow: hidden;
    box-shadow: 0 8px 36px rgb(0 0 0 / 0.28), 0 0 0 1px rgba(0, 0, 0, 0.2);
    transition: transform 0.4s ease, box-shadow 0.4s ease;

    [data-theme="light"] & {
      border-color: var(--bg-border);
      box-shadow: 0 8px 36px rgb(0 0 0 / 0.08);
    }
  }

  &__browser-chrome {
    height: 36px;
    background: var(--bg-surface-raised);
    border-bottom: 1px solid rgba(255, 255, 255, 0.06);
    display: flex;
    align-items: center;
    padding: 0 var(--space-4);
    gap: var(--space-3);
    flex-shrink: 0;

    [data-theme="light"] & {
      border-bottom-color: var(--bg-border);
    }
  }

  &__browser-dots {
    display: flex;
    gap: 5px;
    flex-shrink: 0;

    span {
      width: 10px;
      height: 10px;
      border-radius: 50%;

      &:nth-child(1) { background: #ff5f56; }
      &:nth-child(2) { background: #ffbd2e; }
      &:nth-child(3) { background: #27c93f; }
    }
  }

  &__browser-url {
    flex: 1;
    max-width: 220px;
    height: 20px;
    border-radius: 4px;
    background: rgba(255, 255, 255, 0.05);

    [data-theme="light"] & {
      background: var(--bg-surface);
      border: 1px solid var(--bg-border);
    }
  }

  // Screen area — ready for screenshots
  &__browser-screen {
    aspect-ratio: 16 / 10;
    position: relative;
    overflow: hidden;
  }

  &__screen--ai-briefing {
    background: linear-gradient(155deg, #120f28 0%, #221855 45%, #312570 100%);
  }

  &__screen--bi-dashboard {
    background: linear-gradient(155deg, #07171f 0%, #0b3240 45%, #0c5445 100%);
  }

  &__screen--clinica-balvedi {
    background: linear-gradient(155deg, #0d1c2c 0%, #12304e 45%, #174e78 100%);
  }

  &__project-img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    display: block;
  }

  // ─────────────────────────────────────────────────────────────
  // Modal
  // ─────────────────────────────────────────────────────────────

  &__modal-backdrop {
    position: fixed;
    inset: 0;
    background: rgb(0 0 0 / 0.72);
    z-index: var(--z-modal);
    display: flex;
    align-items: center;
    justify-content: center;
    padding: var(--space-4);
    backdrop-filter: blur(4px);
  }

  &__modal {
    background: var(--bg-surface);
    border: 1px solid var(--bg-border);
    border-radius: var(--radius-2xl);
    width: 100%;
    max-width: 900px;
    max-height: 90vh;
    overflow-y: auto;
    position: relative;
    box-shadow: var(--shadow-xl);
  }

  &__modal-close {
    position: sticky;
    top: var(--space-4);
    float: right;
    margin: var(--space-4) var(--space-4) 0 0;
    z-index: 1;
    background: var(--bg-surface-raised);
    border: 1px solid var(--bg-border);
    width: 36px;
    height: 36px;
  }

  &__modal-body {
    display: grid;
    grid-template-columns: 1fr;
    clear: right;
  }

  &__modal-thumb {
    aspect-ratio: 16 / 9;
    border-radius: var(--radius-2xl) var(--radius-2xl) 0 0;
    overflow: hidden;
    position: relative;
  }

  &__modal-content {
    padding: var(--space-8);

    .mobile-only({
      padding: var(--space-6);
    });
  }

  &__modal-cat {
    display: inline-block;
    font-size: var(--text-xs);
    font-weight: var(--font-semibold);
    color: var(--accent-default);
    letter-spacing: 0.08em;
    text-transform: uppercase;
    margin-bottom: var(--space-2);
  }

  &__modal-title {
    font-size: var(--text-3xl);
    font-weight: var(--font-bold);
    color: var(--text-primary);
    margin: var(--space-3) 0 var(--space-8);
    letter-spacing: -0.02em;
  }

  &__modal-section {
    margin-bottom: var(--space-6);

    h4 {
      font-size: var(--text-xs);
      font-weight: var(--font-semibold);
      color: var(--text-tertiary);
      letter-spacing: 0.1em;
      text-transform: uppercase;
      margin-bottom: var(--space-2);
    }

    p {
      font-size: var(--text-base);
      color: var(--text-secondary);
      line-height: var(--leading-relaxed);
    }
  }

  &__tags {
    display: flex;
    flex-wrap: wrap;
    gap: var(--space-2);
  }

  &__tag {
    .badge();
  }

  &__placeholder {
    position: absolute;
    inset: 0;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  &__placeholder-text {
    font-size: var(--text-xs);
    font-weight: var(--font-semibold);
    color: rgb(255 255 255 / 0.28);
    letter-spacing: 0.12em;
    text-transform: uppercase;
  }
}

.modal-enter-active,
.modal-leave-active {
  transition: opacity var(--transition-normal);

  .work-section__modal {
    transition: transform var(--transition-normal), opacity var(--transition-normal);
  }
}

.modal-enter-from,
.modal-leave-to {
  opacity: 0;

  .work-section__modal {
    transform: scale(0.96) translateY(10px);
    opacity: 0;
  }
}
</style>
