import { LucideIcon } from 'lucide-react';

export interface NavItem {
  label: string;
  href: string;
}

export interface Feature {
  title: string;
  description: string;
  icon: LucideIcon;
}

export interface Step {
  id: number;
  title: string;
  description: string;
  icon: LucideIcon;
}

export interface Testimonial {
  id: number;
  content: string;
  author: string;
  role: string;
  company: string;
  avatarUrl: string;
}

export interface ShippingEstimate {
  service: string;
  price: number;
  days: number;
  carrier: string;
}

export interface AIAnalysisResult {
  weightEstimate?: string;
  dimensionEstimate?: string;
  category?: string;
  handlingAdvice?: string;
}