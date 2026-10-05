<template>
  <header class="app-header" :class="{ 'app-header--scrolled': isScrolled }">
    <div class="app-header__inner container">
      <!-- Logo / Name -->
      <a href="#home" class="app-header__logo" @click.prevent="scrollTo('home')">
        <span class="app-header__initials">EMV</span>
        <span class="app-header__name">Enrico Mendes</span>
      </a>

      <!-- Desktop nav -->
      <nav class="app-header__nav" aria-label="Navegação principal">
        <a
          v-for="item in navItems"
          :key="item.key"
          :href="`#${item.target}`"
          class="app-header__link"
          :class="{ 'app-header__link--active': activeSection === item.target }"
          @click.prevent="scrollTo(item.target)"
        >
          {{ t(`nav.${item.key}`) }}
        </a>
      </nav>

      <!-- Actions -->
      <div class="app-header__actions">
        <LanguageSwitcher />
        <ThemeToggle />
        <BaseButton
          variant="primary"
          size="sm"
          tag="a"
          href="#contact"
          class="app-header__cta"
          @click.prevent="scrollTo('contact')"
        >
          {{ t('nav.hireMe') }}
        </BaseButton>

        <!-- Mobile hamburger -->
        <button
          class="app-header__hamburger btn btn--icon"
          :aria-label="menuOpen ? t('a11y.menuClose') : t('a11y.menuOpen')"
          :aria-expanded="menuOpen"
          @click="menuOpen = !menuOpen"
        >
          <Transition name="menu-icon" mode="out-in">
            <IconClose v-if="menuOpen" key="close" />
            <IconMenu v-else key="menu" />
          </Transition>
        </button>
      </div>
    </div>

    <!-- Mobile menu -->
    <Transition name="mobile-menu">
      <div v-if="menuOpen" class="app-header__mobile-menu">
        <nav class="app-header__mobile-nav">
          <a
            v-for="item in navItems"
            :key="item.key"
            :href="`#${item.target}`"
            class="app-header__mobile-link"
            :class="{ 'app-header__mobile-link--active': activeSection === item.target }"
            @click.prevent="mobileNavClick(item.target)"
          >
            {{ t(`nav.${item.key}`) }}
          </a>
        </nav>
        <div class="app-header__mobile-footer">
          <BaseButton variant="primary" full tag="a" href="#contact" @click.prevent="mobileNavClick('contact')">
            {{ t('nav.hireMe') }}
          </BaseButton>
        </div>
      </div>
    </Transition>
  </header>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import { useI18n } from 'vue-i18n'
import { useScrollSpy } from '@/composables/useScrollSpy'
import ThemeToggle from '@/components/ui/ThemeToggle.vue'
import LanguageSwitcher from '@/components/ui/LanguageSwitcher.vue'
import BaseButton from '@/components/ui/BaseButton.vue'
import IconClose from '@/components/ui/icons/IconClose.vue'
import IconMenu from '@/components/ui/icons/IconMenu.vue'
import type { NavItem } from '@/types'

const { t } = useI18n()
const menuOpen = ref(false)
const isScrolled = ref(false)

const navItems: NavItem[] = [
  { key: 'work',     target: 'work' },
  { key: 'process',  target: 'process' },
  { key: 'services', target: 'services' },
  { key: 'about',    target: 'about' },
  { key: 'contact',  target: 'contact' }
]

const { activeSection } = useScrollSpy(navItems.map(i => i.target))

function scrollTo(target: string) {
  const el = document.getElementById(target)
  if (el) {
    const top = el.getBoundingClientRect().top + window.scrollY - 64
    window.scrollTo({ top, behavior: 'smooth' })
  }
}

function mobileNavClick(target: string) {
  menuOpen.value = false
  setTimeout(() => scrollTo(target), 100)
}

function onScroll() {
  isScrolled.value = window.scrollY > 20
}

onMounted(() => window.addEventListener('scroll', onScroll, { passive: true }))
onUnmounted(() => window.removeEventListener('scroll', onScroll))
</script>

<style lang="less">
.app-header {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: var(--z-sticky);
  height: var(--header-height);
  background: var(--header-bg);
  border-bottom: 1px solid transparent;
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  transition:
    border-color var(--transition-normal),
    box-shadow var(--transition-normal);

  &--scrolled {
    border-bottom-color: var(--header-border);
    box-shadow: var(--shadow-sm);
  }

  &__inner {
    .flex-between();
    height: 100%;
    gap: var(--space-6);
  }

  &__logo {
    .flex-start();
    gap: var(--space-3);
    text-decoration: none;
    flex-shrink: 0;
  }

  &__initials {
    width: 32px;
    height: 32px;
    background: var(--accent-default);
    color: var(--text-on-accent);
    border-radius: var(--radius-md);
    font-size: var(--text-xs);
    font-weight: var(--font-extrabold);
    letter-spacing: 0.05em;
    .flex-center();
  }

  &__name {
    font-size: var(--text-sm);
    font-weight: var(--font-semibold);
    color: var(--text-primary);

    .mobile-only({ display: none; });
  }

  &__nav {
    .flex-start();
    gap: var(--space-1);
    flex: 1;

    .mobile-only({ display: none; });
  }

  &__link {
    font-size: var(--text-sm);
    font-weight: var(--font-medium);
    color: var(--text-secondary);
    padding: var(--space-2) var(--space-3);
    border-radius: var(--radius-md);
    text-decoration: none;
    transition:
      color var(--transition-fast),
      background-color var(--transition-fast);
    .focus-ring();

    &:hover {
      color: var(--text-primary);
      background: var(--bg-surface-raised);
    }

    &--active {
      color: var(--text-primary);
      background: var(--bg-surface-raised);
    }
  }

  &__actions {
    .flex-start();
    gap: var(--space-2);
    flex-shrink: 0;
  }

  &__cta {
    .mobile-only({ display: none; });
  }

  &__hamburger {
    display: none;
    width: 36px;
    height: 36px;

    .mobile-only({ display: flex; });
  }

  &__mobile-menu {
    position: absolute;
    top: var(--header-height);
    left: 0;
    right: 0;
    background: var(--bg-surface);
    border-bottom: 1px solid var(--bg-border);
    box-shadow: var(--shadow-lg);
    padding: var(--space-4);
  }

  &__mobile-nav {
    display: flex;
    flex-direction: column;
    gap: var(--space-1);
    margin-bottom: var(--space-4);
  }

  &__mobile-link {
    font-size: var(--text-base);
    font-weight: var(--font-medium);
    color: var(--text-secondary);
    padding: var(--space-3) var(--space-4);
    border-radius: var(--radius-md);
    text-decoration: none;
    transition:
      color var(--transition-fast),
      background-color var(--transition-fast);

    &:hover,
    &--active {
      color: var(--text-primary);
      background: var(--bg-surface-raised);
    }
  }

  &__mobile-footer {
    padding-top: var(--space-4);
    border-top: 1px solid var(--bg-border);
  }
}

.menu-icon-enter-active,
.menu-icon-leave-active {
  transition: opacity var(--transition-fast), transform var(--transition-fast);
}

.menu-icon-enter-from,
.menu-icon-leave-to {
  opacity: 0;
  transform: scale(0.7) rotate(45deg);
}

.mobile-menu-enter-active,
.mobile-menu-leave-active {
  transition: opacity var(--transition-normal), transform var(--transition-normal);
}

.mobile-menu-enter-from,
.mobile-menu-leave-to {
  opacity: 0;
  transform: translateY(-8px);
}
</style>
