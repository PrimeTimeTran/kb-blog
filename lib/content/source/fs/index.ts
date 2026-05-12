import type { ContentSource } from '../../core/types'
import { resolve } from './resolve'
import { read } from './read'
import { list } from './list'

export const filesystemSource: ContentSource = {
  id: 'filesystem',
  source: 'filesystem',
  read,
  list,
  resolve,
}
