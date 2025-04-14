
import { LucideIcon } from 'lucide-react';

export interface Tool {
  id: string;
  name: string;
  description: string;
  category: 'social' | 'reconnaissance' | 'exploitation';
  command: string;
  icon: LucideIcon;
}
