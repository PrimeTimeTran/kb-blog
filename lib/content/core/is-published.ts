import { DEV_MODE } from '../../../data/constants'

export function isPublished(p) {
  const fm = p?.frontMatter || {}
  const isDevFile = fm.isDev === true || fm.isDev === 'true'
  const isDraft = fm.draft === true || fm.draft === 'true'
  if (DEV_MODE && isDevFile) return true
  if (isDraft) return false
  return true
}
