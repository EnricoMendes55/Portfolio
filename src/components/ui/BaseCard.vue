<template>
  <div :class="['base-card', { 'base-card--interactive': interactive }]">
    <slot />
  </div>
</template>

<script setup lang="ts">
withDefaults(defineProps<{
  interactive?: boolean
}>(), {
  interactive: false
})
</script>

<style lang="less">
.base-card {
  .surface-card-static();
  padding: var(--space-8);

  &--interactive {
    cursor: pointer;
    transition:
      box-shadow var(--transition-normal),
      border-color var(--transition-normal),
      transform var(--transition-normal);

    &:hover {
      box-shadow: var(--shadow-lg);
      border-color: var(--bg-border-strong);
      transform: translateY(-2px);
    }
  }
}
</style>
