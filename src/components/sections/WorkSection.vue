<template>
  <section id="work" class="work-section section" ref="sectionRef">
    <div class="container">
      <div class="section__header">
        <p class="section__label">{{ t('work.label') }}</p>
        <h2 class="section__title animate-in">{{ t('work.title') }}</h2>
        <p class="section__subtitle animate-in delay-1">{{ t('work.subtitle') }}</p>
      </div>

      <div class="work-section__grid">
        <article
          v-for="(item, index) in workItems"
          :key="item.key"
          class="work-section__card animate-in"
          :style="{ transitionDelay: `${(index % 3) * 80}ms` }"
          @click="openCase(item)"
          role="button"
          tabindex="0"
          @keydown.enter="openCase(item)"
          :aria-label="item.title"
        >
          <!-- Image / Placeholder -->
          <div
            class="work-section__thumb"
            :class="`work-section__thumb--${item.key}`"
          >
            <img
              v-if="item.image"
              :src="item.image"
              :alt="item.title"
              loading="lazy"
              class="work-section__img"
            />
            <div v-else class="work-section__placeholder">
              <span class="work-section__placeholder-text">{{ item.category }}</span>
            </div>

            <!-- Hover overlay -->
            <div class="work-section__overlay">
              <span class="work-section__see-case">{{ t('work.seeCase') }} →</span>
            </div>
          </div>

          <!-- Card info -->
          <div class="work-section__info">
            <span class="work-section__category">{{ item.category }}</span>
            <h3 class="work-section__title">{{ item.title }}</h3>
            <p class="work-section__summary">{{ item.summary }}</p>
            <div class="work-section__tags">
              <span v-for="tag in item.tags" :key="tag" class="work-section__tag">{{ tag }}</span>
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
            <!-- Modal image -->
            <div
              class="work-section__modal-thumb"
              :class="`work-section__thumb--${activeCase.key}`"
            >
              <img
                v-if="activeCase.image"
                :src="activeCase.image"
                :alt="activeCase.title"
                class="work-section__img"
              />
              <div v-else class="work-section__placeholder">
                <span class="work-section__placeholder-text">{{ activeCase.category }}</span>
              </div>
            </div>

            <div class="work-section__modal-content">
              <span class="work-section__category">{{ activeCase.category }}</span>
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
                  <span v-for="tag in activeCase.tags" :key="tag" class="work-section__tag">{{ tag }}</span>
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

  &__card {
    .surface-card();
    overflow: hidden;
    cursor: pointer;
    padding: 0;

    &:hover {
      .work-section__overlay {
        opacity: 1;
      }
      .work-section__img,
      .work-section__placeholder {
        transform: scale(1.03);
      }
    }
  }

  &__thumb {
    position: relative;
    aspect-ratio: 16 / 10;
    overflow: hidden;
    background: var(--bg-surface-raised);
  }

  // Project-specific placeholder gradients
  &__thumb--ai-briefing     { background: linear-gradient(135deg, #0f0c29 0%, #302b63 55%, #4a3f8a 100%); }
  &__thumb--bi-dashboard    { background: linear-gradient(135deg, #071a24 0%, #0d4a5c 55%, #0a8a6a 100%); }
  &__thumb--clinica-balvedi { background: linear-gradient(135deg, #0c1e2e 0%, #1a4a6b 55%, #1e7a9b 100%); }

  &__img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    transition: transform var(--transition-normal);
  }

  &__placeholder {
    width: 100%;
    height: 100%;
    .flex-center();
    transition: transform var(--transition-normal);
  }

  &__placeholder-text {
    font-size: var(--text-xs);
    font-weight: var(--font-semibold);
    color: rgb(255 255 255 / 0.4);
    letter-spacing: 0.12em;
    text-transform: uppercase;
  }

  &__overlay {
    position: absolute;
    inset: 0;
    background: rgb(0 0 0 / 0.5);
    .flex-center();
    opacity: 0;
    transition: opacity var(--transition-fast);
    backdrop-filter: blur(2px);
  }

  &__see-case {
    font-size: var(--text-sm);
    font-weight: var(--font-semibold);
    color: #fff;
    letter-spacing: 0.02em;
  }

  &__info {
    padding: var(--space-5) var(--space-6) var(--space-6);
  }

  &__category {
    display: inline-block;
    font-size: var(--text-xs);
    font-weight: var(--font-semibold);
    color: var(--accent-default);
    letter-spacing: 0.08em;
    text-transform: uppercase;
    margin-bottom: var(--space-2);
  }

  &__title {
    font-size: var(--text-lg);
    font-weight: var(--font-semibold);
    color: var(--text-primary);
    margin-bottom: var(--space-2);
    line-height: var(--leading-snug);
  }

  &__summary {
    font-size: var(--text-sm);
    color: var(--text-secondary);
    line-height: var(--leading-relaxed);
    margin-bottom: var(--space-4);
  }

  &__tags {
    display: flex;
    flex-wrap: wrap;
    gap: var(--space-2);
  }

  &__tag {
    .badge();
  }

  // Modal
  &__modal-backdrop {
    position: fixed;
    inset: 0;
    background: rgb(0 0 0 / 0.7);
    z-index: var(--z-modal);
    .flex-center();
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
  }

  &__modal-content {
    padding: var(--space-8);

    .mobile-only({
      padding: var(--space-6);
    });
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
    transform: scale(0.96) translateY(8px);
    opacity: 0;
  }
}
</style>
