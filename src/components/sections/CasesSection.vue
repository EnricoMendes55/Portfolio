<template>
  <section id="cases" class="cases-section section section--alt" ref="sectionRef">
    <div class="container">
      <div class="section__header">
        <p class="section__label">{{ t('cases.label') }}</p>
        <h2 class="section__title animate-in">{{ t('cases.title') }}</h2>
        <p class="section__subtitle animate-in delay-1">{{ t('cases.subtitle') }}</p>
      </div>

      <div class="cases-section__grid">
        <button
          v-for="(item, index) in cases"
          :key="item.key"
          class="cases-section__card animate-in"
          :style="{ transitionDelay: `${index * 80}ms` }"
          @click="openCase(item)"
        >
          <div class="cases-section__card-top">
            <span class="cases-section__category badge">{{ item.category }}</span>
          </div>

          <h3 class="cases-section__card-title">{{ item.title }}</h3>
          <p class="cases-section__card-summary">{{ item.summary }}</p>

          <div class="cases-section__card-tags">
            <span
              v-for="tag in item.tags"
              :key="tag"
              class="badge badge--neutral"
            >{{ tag }}</span>
          </div>

          <div class="cases-section__card-cta">
            <span>{{ t('cases.seeDetails') }}</span>
            <span class="cases-section__arrow">→</span>
          </div>
        </button>
      </div>
    </div>

    <!-- Modal -->
    <BaseModal v-model="modalOpen" :title="selectedCase?.title">
      <template v-if="selectedCase">
        <div class="cases-section__modal-header">
          <span class="badge">{{ selectedCase.category }}</span>
          <h2 class="cases-section__modal-title">{{ selectedCase.title }}</h2>
        </div>

        <div class="cases-section__modal-body">
          <div class="cases-section__modal-section">
            <h4 class="cases-section__modal-label">{{ t('cases.problem') }}</h4>
            <p>{{ selectedCase.problem }}</p>
          </div>
          <div class="cases-section__modal-section">
            <h4 class="cases-section__modal-label">{{ t('cases.solution') }}</h4>
            <p>{{ selectedCase.solution }}</p>
          </div>
          <div class="cases-section__modal-section">
            <h4 class="cases-section__modal-label">{{ t('cases.impact') }}</h4>
            <ul class="cases-section__impact-list">
              <li
                v-for="(imp, i) in selectedCase.impact"
                :key="i"
                class="result-tag"
              >{{ imp }}</li>
            </ul>
          </div>
          <div class="cases-section__modal-tags">
            <span class="cases-section__modal-label">{{ t('cases.techStack') }}</span>
            <div class="cases-section__tag-list">
              <span
                v-for="tag in selectedCase.tags"
                :key="tag"
                class="badge"
              >{{ tag }}</span>
            </div>
          </div>
        </div>
      </template>
    </BaseModal>
  </section>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { useI18n } from 'vue-i18n'
import { useAnimateOnScroll } from '@/composables/useScrollSpy'
import BaseModal from '@/components/ui/BaseModal.vue'

interface CaseDetail {
  key: string
  title: string
  category: string
  summary: string
  tags: string[]
  problem: string
  solution: string
  impact: string[]
}

const { t, tm } = useI18n()
const sectionRef = ref<HTMLElement | null>(null)
const { observe } = useAnimateOnScroll()

const modalOpen = ref(false)
const selectedCase = ref<CaseDetail | null>(null)

const cases = computed(() => tm('cases.items') as CaseDetail[])

function openCase(item: CaseDetail) {
  selectedCase.value = item
  modalOpen.value = true
}

onMounted(() => observe(sectionRef.value))
</script>

<style lang="less">
.cases-section {
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
    text-align: left;
    display: flex;
    flex-direction: column;
    gap: var(--space-4);
    cursor: pointer;

    &:hover .cases-section__arrow {
      transform: translateX(4px);
    }
  }

  &__card-top {
    .flex-start();
  }

  &__card-title {
    font-size: var(--text-xl);
    font-weight: var(--font-bold);
    color: var(--text-primary);
    line-height: var(--leading-snug);
  }

  &__card-summary {
    font-size: var(--text-sm);
    color: var(--text-secondary);
    line-height: var(--leading-relaxed);
    flex: 1;
  }

  &__card-tags {
    display: flex;
    flex-wrap: wrap;
    gap: var(--space-2);
  }

  &__card-cta {
    .flex-start();
    gap: var(--space-2);
    font-size: var(--text-sm);
    font-weight: var(--font-semibold);
    color: var(--accent-text);
    padding-top: var(--space-2);
    border-top: 1px solid var(--bg-border);
  }

  &__arrow {
    transition: transform var(--transition-fast);
  }

  // Modal styles
  &__modal-header {
    margin-bottom: var(--space-8);
    display: flex;
    flex-direction: column;
    gap: var(--space-4);
    padding-right: var(--space-8);
  }

  &__modal-title {
    font-size: var(--text-2xl);
    font-weight: var(--font-bold);
    color: var(--text-primary);
    line-height: var(--leading-snug);
  }

  &__modal-body {
    display: flex;
    flex-direction: column;
    gap: var(--space-8);
  }

  &__modal-section {
    display: flex;
    flex-direction: column;
    gap: var(--space-3);

    p {
      font-size: var(--text-base);
      line-height: var(--leading-relaxed);
    }
  }

  &__modal-label {
    font-size: var(--text-xs);
    font-weight: var(--font-semibold);
    letter-spacing: 0.08em;
    text-transform: uppercase;
    color: var(--text-tertiary);
  }

  &__impact-list {
    display: flex;
    flex-wrap: wrap;
    gap: var(--space-2);
    list-style: none;
  }

  &__modal-tags {
    display: flex;
    flex-direction: column;
    gap: var(--space-3);
  }

  &__tag-list {
    display: flex;
    flex-wrap: wrap;
    gap: var(--space-2);
  }
}
</style>
