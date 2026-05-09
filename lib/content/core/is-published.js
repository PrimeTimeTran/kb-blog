import { DEV_MODE } from '../../../data/constants'

export function isPublished(p) {
  const fm = p?.frontMatter || {}

  const isDevFile = fm.isDev === true || fm.isDev === 'true'
  const isDraft = fm.draft === true || fm.draft === 'true'
  if (DEV_MODE && isDevFile) return true

  // 🚫 drafts are ALWAYS hidden
  if (isDraft) return false

  // 🟡 dev mode: show everything except drafts (including dev files)

  // 🟢 prod mode: only published content
  return true
}
