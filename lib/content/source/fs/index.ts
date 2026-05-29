import type { ContentSource } from '../../types';
import { list } from './list';
import { read } from './read';
import { resolve } from './resolve';

export const filesystemSource: ContentSource = {
  id: 'filesystem',
  source: 'filesystem',
  read,
  list,
  resolve,
};
