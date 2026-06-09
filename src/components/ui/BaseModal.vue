<template>
  <Teleport to="body">
    <Transition name="modal">
      <div
        v-if="modelValue"
        class="modal-overlay"
        role="dialog"
        :aria-label="title"
        aria-modal="true"
        @click.self="close"
        @keydown.esc="close"
      >
        <div ref="panelRef" class="modal-panel" tabindex="-1">
          <button
            class="modal-close btn btn--icon"
            :aria-label="t('a11y.closeModal')"
            @click="close"
          >
            <IconClose />
          </button>
          <slot />
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<script setup lang="ts">
import { ref, watch, nextTick } from 'vue'
import { useI18n } from 'vue-i18n'
import IconClose from '@/components/ui/icons/IconClose.vue'

const props = defineProps<{
  modelValue: boolean
  title?: string
}>()

const emit = defineEmits<{
  'update:modelValue': [value: boolean]
}>()

const { t } = useI18n()
const panelRef = ref<HTMLElement | null>(null)

function close() {
  emit('update:modelValue', false)
}

watch(() => props.modelValue, async (val) => {
  if (val) {
    await nextTick()
    panelRef.value?.focus()
    document.body.style.overflow = 'hidden'
  } else {
    document.body.style.overflow = ''
  }
})
</script>

<style lang="less">
.modal-close {
  position: absolute;
  top: var(--space-5);
  right: var(--space-5);
}

.modal-enter-active,
.modal-leave-active {
  transition: opacity var(--transition-normal);

  .modal-panel {
    transition: opacity var(--transition-normal), transform var(--transition-normal);
  }
}

.modal-enter-from,
.modal-leave-to {
  opacity: 0;

  .modal-panel {
    opacity: 0;
    transform: scale(0.96) translateY(8px);
  }
}
</style>
