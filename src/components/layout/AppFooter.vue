<template>
  <footer class="app-footer">
    <div class="app-footer__inner container">
      <div class="app-footer__brand">
        <p class="app-footer__name">Enrico Mendes Vienhage</p>
        <p class="app-footer__role">{{ t('footer.role') }}</p>
      </div>
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
        >{{ t('footer.github') }}</a>
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
  padding-block: var(--space-10);

  &__inner {
    display: grid;
    grid-template-columns: 1fr auto 1fr;
    align-items: center;
    gap: var(--space-4);

    .tablet({
      grid-template-columns: 1fr;
      text-align: center;
      gap: var(--space-6);
    });
  }

  &__brand {
    .tablet({
      order: 1;
    });
  }

  &__name {
    font-size: var(--text-sm);
    font-weight: var(--font-semibold);
    color: var(--text-secondary);
  }

  &__role {
    font-size: var(--text-xs);
    color: var(--text-tertiary);
    margin-top: var(--space-1);
  }

  &__copy {
    font-size: var(--text-xs);
    color: var(--text-tertiary);
    text-align: center;

    .tablet({
      order: 3;
    });
  }

  &__heart {
    color: var(--accent-default);
  }

  &__links {
    .flex-start();
    justify-content: flex-end;
    gap: var(--space-6);

    .tablet({
      justify-content: center;
      order: 2;
    });
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
