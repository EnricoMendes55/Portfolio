<template>
  <section id="resume" class="resume-section section section--alt" ref="sectionRef">
    <div class="container">
      <div class="section__header">
        <p class="section__label">{{ t('resume.label') }}</p>
        <h2 class="section__title animate-in">{{ t('resume.title') }}</h2>
        <p class="section__subtitle animate-in delay-1">{{ t('resume.subtitle') }}</p>
      </div>

      <!-- Download card -->
      <div class="resume-section__download-area animate-in delay-2">
        <div class="resume-section__download-card">
          <div class="resume-section__file-icon" aria-hidden="true">
            <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
              <rect x="6" y="2" width="20" height="28" rx="3" stroke="currentColor" stroke-width="2"/>
              <path d="M11 12h10M11 17h10M11 22h6" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
              <path d="M20 2v8h6" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
          </div>
          <div class="resume-section__file-info">
            <p class="resume-section__file-name">Enrico_Mendes_Vienhage_Resume.pdf</p>
            <p class="resume-section__file-meta">{{ t('resume.download') }}</p>
          </div>
          <BaseButton
            variant="primary"
            tag="a"
            href="/Portfolio/resume.pdf"
            external
          >
            <template #icon-left><IconDownload /></template>
            {{ t('resume.download') }}
          </BaseButton>
        </div>
      </div>

      <!-- Certifications placeholder -->
      <div class="resume-section__certifications animate-in delay-3">
        <h3 class="resume-section__cert-title">{{ t('resume.certifications.title') }}</h3>
        <div class="resume-section__cert-empty">
          <p>{{ t('resume.certifications.empty') }}</p>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useI18n } from 'vue-i18n'
import { useAnimateOnScroll } from '@/composables/useScrollSpy'
import BaseButton from '@/components/ui/BaseButton.vue'
import IconDownload from '@/components/ui/icons/IconDownload.vue'

const { t } = useI18n()
const sectionRef = ref<HTMLElement | null>(null)
const { observe } = useAnimateOnScroll()

onMounted(() => observe(sectionRef.value))
</script>

<style lang="less">
.resume-section {
  &__download-area {
    max-width: 600px;
    margin-inline: auto;
    margin-bottom: var(--space-16);
  }

  &__download-card {
    .surface-card-static();
    padding: var(--space-6);
    display: flex;
    align-items: center;
    gap: var(--space-5);

    .mobile-only({
      flex-direction: column;
      text-align: center;
    });
  }

  &__file-icon {
    color: var(--accent-default);
    flex-shrink: 0;
  }

  &__file-info {
    flex: 1;
  }

  &__file-name {
    font-size: var(--text-sm);
    font-weight: var(--font-semibold);
    color: var(--text-primary);
    margin-bottom: var(--space-1);
  }

  &__file-meta {
    font-size: var(--text-xs);
    color: var(--text-tertiary);
  }

  &__certifications {
    max-width: 600px;
    margin-inline: auto;
  }

  &__cert-title {
    font-size: var(--text-lg);
    font-weight: var(--font-semibold);
    color: var(--text-primary);
    margin-bottom: var(--space-6);
  }

  &__cert-empty {
    .surface-card-static();
    padding: var(--space-10);
    text-align: center;

    p {
      font-size: var(--text-sm);
      color: var(--text-tertiary);
    }
  }
}
</style>
