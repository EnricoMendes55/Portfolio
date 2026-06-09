<template>
  <button
    class="theme-toggle btn btn--icon"
    :aria-label="isDark ? t('theme.light') : t('theme.dark')"
    :title="isDark ? t('theme.light') : t('theme.dark')"
    @click="toggleTheme"
  >
    <Transition name="theme-icon" mode="out-in">
      <IconSun v-if="isDark" key="sun" />
      <IconMoon v-else key="moon" />
    </Transition>
  </button>
</template>

<script setup lang="ts">
import { useI18n } from 'vue-i18n'
import { useTheme } from '@/composables/useTheme'
import IconSun from '@/components/ui/icons/IconSun.vue'
import IconMoon from '@/components/ui/icons/IconMoon.vue'

const { t } = useI18n()
const { isDark, toggleTheme } = useTheme()
</script>

<style lang="less">
.theme-toggle {
  width: 36px;
  height: 36px;
}

.theme-icon-enter-active,
.theme-icon-leave-active {
  transition: opacity var(--transition-fast), transform var(--transition-fast);
}

.theme-icon-enter-from {
  opacity: 0;
  transform: rotate(-90deg) scale(0.8);
}

.theme-icon-leave-to {
  opacity: 0;
  transform: rotate(90deg) scale(0.8);
}
</style>
