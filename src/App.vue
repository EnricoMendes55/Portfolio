<template>
  <div class="site-layout">
    <a href="#main-content" class="skip-to-content">
      {{ t('a11y.skipToContent') }}
    </a>
    <AppHeader />
    <RouterView />
    <AppFooter />
  </div>
</template>

<script setup lang="ts">
import { useI18n } from 'vue-i18n'
import AppHeader from '@/components/layout/AppHeader.vue'
import AppFooter from '@/components/layout/AppFooter.vue'

const { t } = useI18n()
</script>
