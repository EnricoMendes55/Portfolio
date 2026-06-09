<template>
  <div ref="rootRef" class="lang-switcher" :class="{ 'lang-switcher--open': isOpen }">
    <button
      class="lang-switcher__trigger btn btn--icon"
      :aria-label="t('language.select')"
      :aria-expanded="isOpen"
      @click="isOpen = !isOpen"
    >
      <span class="lang-switcher__flag">{{ currentFlag }}</span>
      <span class="lang-switcher__code">{{ currentCode }}</span>
      <IconChevronDown class="lang-switcher__chevron" />
    </button>

    <Transition name="dropdown">
      <div v-if="isOpen" class="lang-switcher__dropdown" role="menu">
        <button
          v-for="lang in languages"
          :key="lang.code"
          class="lang-switcher__option"
          :class="{ 'lang-switcher__option--active': locale === lang.code }"
          role="menuitem"
          @click="select(lang.code)"
        >
          <span>{{ lang.flag }}</span>
          <span>{{ lang.label }}</span>
        </button>
      </div>
    </Transition>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted } from 'vue'
import { useI18n } from 'vue-i18n'
import { setLocale } from '@/i18n'
import IconChevronDown from '@/components/ui/icons/IconChevronDown.vue'
import type { LocaleCode } from '@/types'

const { t, locale } = useI18n()
const isOpen = ref(false)
const rootRef = ref<HTMLElement | null>(null)

const languages = [
  { code: 'pt-BR' as LocaleCode, label: 'Português', flag: '🇧🇷' },
  { code: 'en' as LocaleCode,    label: 'English',   flag: '🇺🇸' },
  { code: 'es' as LocaleCode,    label: 'Español',   flag: '🇪🇸' }
]

const currentLang = computed(() => languages.find(l => l.code === locale.value))
const currentFlag = computed(() => currentLang.value?.flag ?? '🇧🇷')
const currentCode = computed(() => {
  if (locale.value === 'pt-BR') return 'PT'
  if (locale.value === 'en') return 'EN'
  return 'ES'
})

function select(code: LocaleCode) {
  setLocale(code)
  isOpen.value = false
}

function onDocumentClick(e: MouseEvent) {
  if (rootRef.value && !rootRef.value.contains(e.target as Node)) {
    isOpen.value = false
  }
}

onMounted(() => document.addEventListener('click', onDocumentClick, true))
onUnmounted(() => document.removeEventListener('click', onDocumentClick, true))
</script>

<style lang="less">
.lang-switcher {
  position: relative;

  &__trigger {
    .flex-start();
    gap: var(--space-1);
    padding: var(--space-2) var(--space-3);
    min-width: 72px;
    height: 36px;
    font-size: var(--text-sm);
    font-weight: var(--font-semibold);
    border-radius: var(--radius-md);
  }

  &__flag {
    font-size: 14px;
    line-height: 1;
  }

  &__code {
    color: var(--text-secondary);
    font-size: var(--text-xs);
    font-weight: var(--font-semibold);
    letter-spacing: 0.05em;
  }

  &__chevron {
    margin-left: auto;
    color: var(--text-tertiary);
    transition: transform var(--transition-fast);

    .lang-switcher--open & {
      transform: rotate(180deg);
    }
  }

  &__dropdown {
    position: absolute;
    top: calc(100% + var(--space-2));
    right: 0;
    min-width: 140px;
    background: var(--bg-surface);
    border: 1px solid var(--bg-border);
    border-radius: var(--radius-lg);
    box-shadow: var(--shadow-lg);
    padding: var(--space-2);
    z-index: var(--z-dropdown);
    overflow: hidden;
  }

  &__option {
    .btn-base();
    .flex-start();
    gap: var(--space-2);
    width: 100%;
    padding: var(--space-2) var(--space-3);
    border-radius: var(--radius-md);
    font-size: var(--text-sm);
    color: var(--text-secondary);
    background: transparent;
    border: none;

    &:hover {
      background: var(--bg-surface-raised);
      color: var(--text-primary);
    }

    &--active {
      color: var(--accent-text);
      background: var(--accent-subtle);
    }
  }
}

.dropdown-enter-active,
.dropdown-leave-active {
  transition: opacity var(--transition-fast), transform var(--transition-fast);
}

.dropdown-enter-from,
.dropdown-leave-to {
  opacity: 0;
  transform: translateY(-4px) scale(0.98);
}
</style>
