export type ThemeMode = 'light' | 'dark'
export type LocaleCode = 'pt-BR' | 'en' | 'es'

export interface TimelineEvent {
  year: string
  title: string
  company: string
  role: string
  isCurrent?: boolean
}

export interface MetricItem {
  value: string
  label: string
}

export interface ImpactCard {
  key: string
  icon: string
  results: string[]
}

export interface CaseItem {
  key: string
  tags: string[]
}

export interface SkillCategory {
  key: string
  icon: string
  items: string[]
}

export interface Certification {
  name: string
  issuer: string
  year: string
  url?: string
}

export interface ContactLink {
  id: string
  label: string
  url: string
  icon: string
  description: string
}

export interface NavItem {
  key: string
  target: string
}
