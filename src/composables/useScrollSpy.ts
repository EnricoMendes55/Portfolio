import { ref, onMounted, onUnmounted } from 'vue'

export function useScrollSpy(sectionIds: string[]) {
  const activeSection = ref<string>(sectionIds[0] ?? '')

  let observer: IntersectionObserver | null = null

  onMounted(() => {
    observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            activeSection.value = entry.target.id
          }
        })
      },
      {
        rootMargin: `-${64}px 0px -60% 0px`,
        threshold: 0
      }
    )

    sectionIds.forEach((id) => {
      const el = document.getElementById(id)
      if (el) observer!.observe(el)
    })
  })

  onUnmounted(() => {
    observer?.disconnect()
  })

  return { activeSection }
}

export function useAnimateOnScroll() {
  let observer: IntersectionObserver | null = null

  function observe(container: HTMLElement | null) {
    if (!container) return

    observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible')
            observer!.unobserve(entry.target)
          }
        })
      },
      { threshold: 0.1, rootMargin: '0px 0px -40px 0px' }
    )

    const targets = container.querySelectorAll<HTMLElement>(
      '.animate-in, .animate-in-left, .animate-scale'
    )
    targets.forEach((el) => observer!.observe(el))
  }

  onUnmounted(() => {
    observer?.disconnect()
  })

  return { observe }
}
