import { ContentRequest, RawContent, ResolvedContentSource } from '../types';

export interface ContentSource {
  id: string;
  name: string;
  resolve(request: ContentRequest): Promise<ResolvedContentSource | null>;
  read(source: ResolvedContentSource): Promise<RawContent>;
  enumerate?(): Promise<ResolvedContentSource[]>;
}
