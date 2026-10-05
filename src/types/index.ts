export type ThemeMode = 'light' | 'dark'
export type LocaleCode = 'pt-BR' | 'en' | 'es'

export interface NavItem {
  key: string
  target: string
}

export interface TrustSignal {
  value: string
  label: string
}

export interface WorkItem {
  key: string
  title: string
  category: string
  image: string
  summary: string
  tags: string[]
  challenge: string
  solution: string
  result: string
  liveUrl: string
}

export interface NumberItem {
  value: string
  label: string
}

export interface ProcessStep {
  number: string
  title: string
  description: string
}

export interface ServiceItem {
  key: string
  title: string
  description: string
}

export interface ContactLink {
  id: string
  label: string
  description: string
  url: string
}

export interface SkillItem {
  name: string
  core: boolean
}

export interface SkillGroup {
  key: string
  title: string
  items: SkillItem[]
}
