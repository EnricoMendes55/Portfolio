import { createI18n } from 'vue-i18n'
import ptBR from './locales/pt-BR.json'
import en from './locales/en.json'
import es from './locales/es.json'

export type MessageSchema = typeof ptBR

const savedLocale = localStorage.getItem('locale') as string | null
const browserLocale = navigator.language

function resolveLocale(raw: string | null): string {
  if (!raw) return 'pt-BR'
  if (raw.startsWith('pt')) return 'pt-BR'
  if (raw.startsWith('es')) return 'es'
  if (raw.startsWith('en')) return 'en'
  return 'pt-BR'
}

const locale = savedLocale ?? resolveLocale(browserLocale)

export const i18n = createI18n<[MessageSchema], 'pt-BR' | 'en' | 'es'>({
  legacy: false,
  locale: locale as 'pt-BR' | 'en' | 'es',
  fallbackLocale: 'en',
  messages: {
    'pt-BR': ptBR,
    en,
    es
  }
})

export function setLocale(locale: 'pt-BR' | 'en' | 'es') {
  i18n.global.locale.value = locale
  localStorage.setItem('locale', locale)
  document.documentElement.lang = locale === 'pt-BR' ? 'pt-BR' : locale
}
