import { createI18n } from 'vue-i18n'
import type { Ref } from 'vue'
import ptBR from './locales/pt-BR.json'
import en from './locales/en.json'
import es from './locales/es.json'

export type MessageSchema = typeof ptBR
export type LocaleCode = 'pt-BR' | 'en' | 'es'

function resolveLocale(): LocaleCode {
  const stored = localStorage.getItem('locale')
  if (stored === 'pt-BR' || stored === 'en' || stored === 'es') return stored
  const browser = navigator.language
  if (browser.startsWith('es')) return 'es'
  if (browser.startsWith('en')) return 'en'
  return 'pt-BR'
}

export const i18n = createI18n({
  legacy: false,
  locale: resolveLocale(),
  fallbackLocale: 'en',
  messages: {
    'pt-BR': ptBR,
    en,
    es
  }
})

export function setLocale(code: LocaleCode) {
  (i18n.global.locale as Ref<string>).value = code
  localStorage.setItem('locale', code)
  document.documentElement.lang = code
}
