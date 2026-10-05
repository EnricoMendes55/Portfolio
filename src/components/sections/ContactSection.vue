<template>
  <section id="contact" class="contact-section section" ref="sectionRef">
    <div class="container">
      <div class="section__header">
        <p class="section__label">{{ t('contact.label') }}</p>
        <h2 class="section__title animate-in">{{ t('contact.title') }}</h2>
        <p class="section__subtitle animate-in delay-1">{{ t('contact.subtitle') }}</p>
      </div>

      <div class="contact-section__links">
        <a
          v-for="(link, index) in contactLinks"
          :key="link.id"
          :href="link.url"
          :target="link.url.startsWith('mailto') ? undefined : '_blank'"
          :rel="link.url.startsWith('mailto') ? undefined : 'noopener noreferrer'"
          class="contact-section__link-card animate-in"
          :class="`contact-section__link-card--${link.id}`"
          :style="{ transitionDelay: `${index * 80}ms` }"
          :aria-label="`${link.label} — ${link.url.startsWith('mailto') ? '' : t('a11y.externalLink')}`"
        >
          <div class="contact-section__link-icon">
            <component :is="contactIconMap[link.id]" />
          </div>
          <div class="contact-section__link-info">
            <p class="contact-section__link-label">{{ link.label }}</p>
            <p class="contact-section__link-desc">{{ link.description }}</p>
          </div>
          <div class="contact-section__link-arrow">
            <IconExternalLink />
          </div>
        </a>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import type { Component } from 'vue'
import { useI18n } from 'vue-i18n'
import { useAnimateOnScroll } from '@/composables/useScrollSpy'
import IconEmail from '@/components/ui/icons/contact/IconEmail.vue'
import IconWhatsApp from '@/components/ui/icons/contact/IconWhatsApp.vue'
import IconLinkedIn from '@/components/ui/icons/contact/IconLinkedIn.vue'
import IconExternalLink from '@/components/ui/icons/IconExternalLink.vue'
import type { ContactLink } from '@/types'

const { t, tm } = useI18n()
const sectionRef = ref<HTMLElement | null>(null)
const { observe } = useAnimateOnScroll()

const contactLinks = computed(() => tm('contact.links') as ContactLink[])

const contactIconMap: Record<string, Component> = {
  email:    IconEmail,
  whatsapp: IconWhatsApp,
  linkedin: IconLinkedIn
}

onMounted(() => observe(sectionRef.value))
</script>

<style lang="less">
.contact-section {
  &__links {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: var(--space-6);
    max-width: 900px;
    margin-inline: auto;

    .tablet({
      grid-template-columns: 1fr;
      max-width: 480px;
    });
  }

  &__link-card {
    .surface-card();
    padding: var(--space-8);
    text-decoration: none;
    display: flex;
    flex-direction: column;
    gap: var(--space-5);
    position: relative;

    &:hover {
      text-decoration: none;

      .contact-section__link-arrow {
        transform: translate(2px, -2px);
        color: var(--accent-default);
      }

      .contact-section__link-label {
        color: var(--text-primary);
      }
    }

    &--whatsapp {
      .contact-section__link-icon {
        background: rgb(37 211 102 / 0.12);
        color: #25d366;
      }

      &:hover {
        border-color: rgb(37 211 102 / 0.4);
      }
    }
  }

  &__link-icon {
    width: 48px;
    height: 48px;
    background: var(--accent-subtle);
    border-radius: var(--radius-lg);
    .flex-center();
    color: var(--accent-default);
    flex-shrink: 0;

    svg {
      width: 24px;
      height: 24px;
    }
  }

  &__link-info {
    flex: 1;
  }

  &__link-label {
    font-size: var(--text-lg);
    font-weight: var(--font-semibold);
    color: var(--text-primary);
    margin-bottom: var(--space-1);
    transition: color var(--transition-fast);
  }

  &__link-desc {
    font-size: var(--text-sm);
    color: var(--text-secondary);
  }

  &__link-arrow {
    color: var(--text-tertiary);
    transition: transform var(--transition-fast), color var(--transition-fast);
    align-self: flex-start;
    margin-left: auto;
  }
}
</style>
