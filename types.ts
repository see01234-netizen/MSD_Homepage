
import React from 'react';

export interface Project {
  year: string;
  month: string;
  name: string;
  type: string;
  location?: string;
  scale?: string;
  units?: string;
  role?: string;
  description?: string;
  imageUrl?: string;
  status?: '완료' | '진행중';
}

export interface SiteConfig {
  companyName: string;
  heroTitle: string;
  heroSubtitle: string;
  heroDescription: string;
  phone: string;
  address: string;
  email: string;
  businessNumber: string;
  ceoName: string;
}

export interface BusinessSection {
  title: string;
  description: string;
  scope: string[];
  workflow: string[];
  icon: React.ReactNode;
}
