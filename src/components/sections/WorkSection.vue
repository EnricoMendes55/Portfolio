<template>
  <section id="work" class="work-section section" ref="sectionRef">
    <div class="container">
      <div class="section__header">
        <p class="section__label">{{ t('work.label') }}</p>
        <h2 class="section__title animate-in">{{ t('work.title') }}</h2>
        <p class="section__subtitle animate-in delay-1">{{ t('work.subtitle') }}</p>
      </div>

      <div class="work-section__list">
        <article
          v-for="(item, index) in workItems"
          :key="item.key"
          class="work-section__case animate-in"
          :class="[
            `work-section__case--${item.key}`,
            { 'work-section__case--featured': item.featured }
          ]"
          :style="{ transitionDelay: `${index * 120}ms` }"
        >
          <!-- Content -->
          <div class="work-section__case-body">
            <div class="work-section__case-meta">
              <span class="work-section__case-num">0{{ index + 1 }}</span>
              <span class="work-section__case-cat">{{ item.category }}</span>
            </div>

            <h3 class="work-section__case-title">{{ item.title }}</h3>
            <p class="work-section__case-summary">{{ item.summary }}</p>

            <!-- Stats grid (AI Briefing) -->
            <div
              v-if="item.highlights?.length"
              class="work-section__case-stats"
            >
              <div
                v-for="h in item.highlights"
                :key="h.label"
                class="work-section__case-stat"
              >
                <strong>{{ h.value }}</strong>
                <span>{{ h.label }}</span>
              </div>
            </div>

            <!-- Callout (BI Dashboard) -->
            <p v-if="item.callout" class="work-section__case-callout">
              {{ item.callout }}
            </p>

            <!-- Stack -->
            <p class="work-section__case-stack">
              {{ item.tags.slice(0, 5).join(' · ') }}
            </p>

            <!-- CTA -->
            <button
              class="work-section__case-cta"
              @click="openCase(item)"
            >
              {{ t('work.seeCase') }} <span aria-hidden="true">→</span>
            </button>
          </div>

          <!-- Media -->
          <div
            class="work-section__case-media"
            @click="openCase(item)"
            role="button"
            tabindex="0"
            :aria-label="`${t('work.seeCase')}: ${item.title}`"
            @keydown.enter="openCase(item)"
          >
            <div
              class="work-section__case-bg"
              :class="`work-section__thumb--${item.key}`"
            >
              <img
                v-if="item.image"
                :src="item.image"
                :alt="item.title"
                class="work-section__case-img"
              />
            </div>
            <div class="work-section__case-overlay">
              <span class="work-section__case-overlay-label">
                {{ t('work.seeCase') }} →
              </span>
            </div>
          </div>
        </article>
      </div>
    </div>

    <!-- Case Modal -->
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
              :class="`work-section__thumb--${activeCase.key}`"
            >
              <img
                v-if="activeCase.image"
                :src="activeCase.image"
                :alt="activeCase.title"
                class="work-section__case-img"
              />
              <div v-else class="work-section__placeholder">
                <span class="work-section__placeholder-text">{{ activeCase.category }}</span>
              </div>
            </div>

            <div class="work-section__modal-content">
              <span class="work-section__cat-label">{{ activeCase.category }}</span>
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
const sectionRef = ref<HTMLElement | null>(null)
const modalRef = ref<HTMLElement | null>(null)
const activeCase = ref<WorkItem | null>(null)
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

  // ----------------------------------------------------------------
  // Case list
  // ----------------------------------------------------------------

  &__list {
    display: flex;
    flex-direction: column;
    gap: var(--space-6);
    margin-top: var(--space-16);
  }

  // ----------------------------------------------------------------
  // Individual case — default layout (content left, media right)
  // ----------------------------------------------------------------

  &__case {
    display: grid;
    grid-template-columns: 2fr 3fr;
    min-height: 540px;
    border-radius: var(--radius-2xl);
    overflow: hidden;
    background: var(--bg-surface);
    border: 1px solid var(--bg-border);
    transition: box-shadow var(--transition-normal);

    &:hover {
      box-shadow: 0 8px 40px rgb(0 0 0 / 0.18);
    }

    // BI Dashboard — media on left
    &--bi-dashboard {
      grid-template-columns: 3fr 2fr;

      .work-section__case-media {
        order: -1;
      }
    }

    // Clínica Balvedi — balanced halves, slightly shorter
    &--clinica-balvedi {
      grid-template-columns: 1fr 1fr;
      min-height: 480px;
    }

    .tablet({
      grid-template-columns: 1fr !important;
      min-height: auto;

      &--bi-dashboard .work-section__case-media {
        order: 0;
      }
    });
  }

  // ----------------------------------------------------------------
  // Case body (text side)
  // ----------------------------------------------------------------

  &__case-body {
    padding: var(--space-10) var(--space-10);
    display: flex;
    flex-direction: column;

    .tablet({
      padding: var(--space-8) var(--space-6);
      order: 2;
    });

    .mobile-only({
      padding: var(--space-6);
    });
  }

  &__case-meta {
    display: flex;
    align-items: center;
    gap: var(--space-3);
    margin-bottom: var(--space-5);
  }

  &__case-num {
    font-size: var(--text-xs);
    font-weight: var(--font-semibold);
    color: var(--text-tertiary);
    letter-spacing: 0.12em;
    font-variant-numeric: tabular-nums;
  }

  &__case-cat {
    font-size: var(--text-xs);
    font-weight: var(--font-semibold);
    color: var(--accent-default);
    letter-spacing: 0.08em;
    text-transform: uppercase;
  }

  &__case-title {
    font-size: var(--text-2xl);
    font-weight: var(--font-bold);
    color: var(--text-primary);
    line-height: var(--leading-snug);
    letter-spacing: -0.02em;
    margin-bottom: var(--space-4);

    .work-section__case--featured & {
      font-size: var(--text-3xl);

      .tablet({
        font-size: var(--text-2xl);
      });
    }

    .tablet({
      font-size: var(--text-xl);
    });
  }

  &__case-summary {
    font-size: var(--text-sm);
    color: var(--text-secondary);
    line-height: var(--leading-relaxed);
    max-width: 400px;
    margin-bottom: var(--space-6);
  }

  // Stats grid (AI Briefing hero case)
  &__case-stats {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: var(--space-3);
    padding: var(--space-5);
    background: var(--bg-surface-raised);
    border-radius: var(--radius-lg);
    margin-bottom: var(--space-6);
  }

  &__case-stat {
    display: flex;
    flex-direction: column;
    gap: 2px;

    strong {
      font-size: var(--text-xl);
      font-weight: var(--font-bold);
      color: var(--text-primary);
      line-height: 1.1;
      letter-spacing: -0.02em;
    }

    span {
      font-size: var(--text-xs);
      color: var(--text-tertiary);
      line-height: 1.4;
    }
  }

  // Callout (BI Dashboard)
  &__case-callout {
    font-size: var(--text-sm);
    color: var(--text-secondary);
    line-height: var(--leading-relaxed);
    padding: var(--space-3) var(--space-4);
    border-left: 2px solid var(--accent-default);
    background: var(--bg-surface-raised);
    border-radius: 0 var(--radius-md) var(--radius-md) 0;
    margin-bottom: var(--space-6);
    font-style: italic;
  }

  // Stack text line
  &__case-stack {
    font-size: var(--text-xs);
    color: var(--text-tertiary);
    letter-spacing: 0.04em;
    line-height: 1.5;
    margin-top: auto;
    padding-top: var(--space-5);
    border-top: 1px solid var(--bg-border);
    margin-bottom: var(--space-5);
  }

  // Case CTA
  &__case-cta {
    display: inline-flex;
    align-items: center;
    gap: var(--space-2);
    font-size: var(--text-sm);
    font-weight: var(--font-semibold);
    color: var(--text-primary);
    background: transparent;
    border: 1px solid var(--bg-border);
    border-radius: var(--radius-md);
    padding: var(--space-2) var(--space-5);
    cursor: pointer;
    transition: background var(--transition-fast), border-color var(--transition-fast), color var(--transition-fast);
    width: fit-content;

    &:hover {
      background: var(--bg-surface-raised);
      border-color: var(--text-tertiary);
    }
  }

  // ----------------------------------------------------------------
  // Case media (image / gradient side)
  // ----------------------------------------------------------------

  &__case-media {
    position: relative;
    overflow: hidden;
    cursor: pointer;

    &:hover .work-section__case-bg {
      transform: scale(1.04);
    }

    &:hover .work-section__case-overlay {
      opacity: 1;
    }

    .tablet({
      aspect-ratio: 16 / 9;
      order: 1;
    });
  }

  &__case-bg {
    position: absolute;
    inset: -2px;
    transition: transform 0.6s ease;
  }

  &__case-img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  &__case-overlay {
    position: absolute;
    inset: 0;
    background: rgb(0 0 0 / 0.42);
    display: flex;
    align-items: center;
    justify-content: center;
    opacity: 0;
    transition: opacity var(--transition-fast);
    backdrop-filter: blur(3px);
  }

  &__case-overlay-label {
    font-size: var(--text-sm);
    font-weight: var(--font-semibold);
    color: #fff;
    letter-spacing: 0.06em;
    padding: var(--space-3) var(--space-5);
    border: 1px solid rgba(255,255,255,0.3);
    border-radius: var(--radius-full);
    background: rgba(255,255,255,0.1);
    backdrop-filter: blur(4px);
  }

  // ----------------------------------------------------------------
  // Gradient backgrounds (card + modal)
  // ----------------------------------------------------------------

  &__thumb--ai-briefing {
    background: linear-gradient(145deg, #0f0c29 0%, #2d2060 40%, #4a3f8a 75%, #6b5fb0 100%);
    width: 100%;
    height: 100%;
  }

  &__thumb--bi-dashboard {
    background: linear-gradient(145deg, #071a24 0%, #0a3545 40%, #0d6b55 75%, #0a9e78 100%);
    width: 100%;
    height: 100%;
  }

  &__thumb--clinica-balvedi {
    background: linear-gradient(145deg, #0c1e2e 0%, #0e3354 40%, #1a5a8a 75%, #2282c0 100%);
    width: 100%;
    height: 100%;
  }

  // ----------------------------------------------------------------
  // Modal
  // ----------------------------------------------------------------

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

  &__cat-label {
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
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    position: absolute;
    inset: 0;
  }

  &__placeholder-text {
    font-size: var(--text-xs);
    font-weight: var(--font-semibold);
    color: rgb(255 255 255 / 0.35);
    letter-spacing: 0.12em;
    text-transform: uppercase;
  }
}

// Modal transition
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
