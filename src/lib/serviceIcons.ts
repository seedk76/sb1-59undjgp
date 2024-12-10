import {
  Wrench,
  Scissors,
  Hand,
  Zap,
  Leaf,
  Brush,
  Bird,
  Car,
  GraduationCap,
  Hammer,
  Fan,
  Truck,
  Bug,
  Camera,
  Wrench as ApplianceIcon
} from 'lucide-react';
import type { LucideIcon } from 'lucide-react';

export interface ServiceIconMapping {
  icon: LucideIcon;
  nameKey: string;
}

export const SERVICE_ICONS: ServiceIconMapping[] = [
  { nameKey: 'plumbers', icon: Wrench },
  { nameKey: 'hairSalons', icon: Scissors },
  { nameKey: 'nailSalons', icon: Hand },
  { nameKey: 'electricians', icon: Zap },
  { nameKey: 'landscapers', icon: Leaf },
  { nameKey: 'cleaners', icon: Brush },
  { nameKey: 'petGroomers', icon: Bird },
  { nameKey: 'mechanics', icon: Car },
  { nameKey: 'tutors', icon: GraduationCap },
  { nameKey: 'handymen', icon: Hammer },
  { nameKey: 'hvac', icon: Fan },
  { nameKey: 'movers', icon: Truck },
  { nameKey: 'pestControl', icon: Bug },
  { nameKey: 'photographers', icon: Camera },
  { nameKey: 'appliances', icon: ApplianceIcon }
];