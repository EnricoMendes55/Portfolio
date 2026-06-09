<template>
  <footer class="app-footer">
    <div class="app-footer__inner container">
      <p class="app-footer__copy">
        {{ t('footer.made') }}
        <span class="app-footer__heart" aria-hidden="true">♥</span>
        {{ t('footer.by') }} · {{ currentYear }} · {{ t('footer.rights') }}
      </p>
      <div class="app-footer__links">
        <a
          href="https://www.linkedin.com/in/enrico-mendes-vienhage/"
          target="_blank"
          rel="noopener noreferrer"
          class="app-footer__link"
          :aria-label="`LinkedIn — ${t('a11y.externalLink')}`"
        >LinkedIn</a>
        <a
          href="https://github.com/EnricoMendes55"
          target="_blank"
          rel="noopener noreferrer"
          class="app-footer__link"
          :aria-label="`GitHub — ${t('a11y.externalLink')}`"
        >GitHub</a>
        <a
          href="mailto:contatoenricomv@gmail.com"
          class="app-footer__link"
        >E-mail</a>
      </div>
    </div>
  </footer>
</template>

<script setup lang="ts">
import { useI18n } from 'vue-i18n'

const { t } = useI18n()
const currentYear = new Date().getFullYear()
</script>

<style lang="less">
.app-footer {
  border-top: 1px solid var(--bg-border);
  padding-block: var(--space-8);

  &__inner {
    .flex-between();
    gap: var(--space-4);
    flex-wrap: wrap;

    .mobile-only({
      flex-direction: column;
      align-items: center;
      text-align: center;
    });
  }

  &__copy {
    font-size: var(--text-sm);
    color: var(--text-tertiary);
  }

  &__heart {
    color: var(--accent-default);
  }

  &__links {
    .flex-start();
    gap: var(--space-6);
  }

  &__link {
    font-size: var(--text-sm);
    color: var(--text-tertiary);
    text-decoration: none;
    transition: color var(--transition-fast);

    &:hover {
      color: var(--text-secondary);
    }
  }
}
</style>
