<template>
  <component
    :is="tag"
    :href="href"
    :target="external ? '_blank' : undefined"
    :rel="external ? 'noopener noreferrer' : undefined"
    :type="tag === 'button' ? type : undefined"
    :disabled="tag === 'button' ? disabled : undefined"
    :aria-label="ariaLabel"
    :class="['btn', `btn--${variant}`, size !== 'md' && `btn--${size}`, { 'btn--full': full }]"
  >
    <slot name="icon-left" />
    <slot />
    <slot name="icon-right" />
  </component>
</template>

<script setup lang="ts">
withDefaults(defineProps<{
  variant?: 'primary' | 'secondary' | 'ghost' | 'icon'
  size?: 'sm' | 'md' | 'lg'
  tag?: 'button' | 'a'
  type?: 'button' | 'submit' | 'reset'
  href?: string
  external?: boolean
  disabled?: boolean
  full?: boolean
  ariaLabel?: string
}>(), {
  variant: 'secondary',
  size: 'md',
  tag: 'button',
  type: 'button',
  external: false,
  disabled: false,
  full: false
})
</script>

<style lang="less">
.btn--full {
  width: 100%;
}
</style>
