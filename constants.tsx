
import React from 'react';
import { 
  Building2, 
  Landmark, 
  TrendingUp, 
  Users, 
  Target, 
  ShieldCheck, 
  Handshake, 
  Award,
  Sparkles,
  Globe,
  PencilRuler,
  Key,
  BarChart3
} from 'lucide-react';
import { Project } from './types';
import { PROJECTS, DATA_VERSION } from './data/projects';

export const COLORS = {
  primary: '#C5A059', // Elegant Gold
  accent: '#F3F4F6',  // Off-white
  secondary: '#111827',
  darker: '#0d1117',
};

export { PROJECTS, DATA_VERSION };

export const PHILOSOPHY = [
  {
    title: "혁신 [ Innovation ]",
    subtitle: "새로운 패러다임",
    desc: "부동산 시장은 하루가 다르게 변화하고 있습니다.\n우리는 현실에 만족하지 않고, 새로운 시각과 분석력을 바탕으로 보다 나은 미래의 비전을 제시하는 기업이 되겠습니다.",
    icon: <Sparkles className="w-12 h-12" />
  },
  {
    title: "공유 [ Value Share ]",
    subtitle: "공유 가치 창출",
    desc: "새로운 시대는 새로운 가치를 창출을 원하고 있습니다.\n우리는 고객은 물론, 나아가 사회 구성원 모두가 만족할 수 있는 더욱 의미 있고 올바른 가치의 창출을 위해 힘쓰겠습니다.",
    icon: <Globe className="w-12 h-12" />
  },
  {
    title: "신뢰 [ Trustability ]",
    subtitle: "정직과 신뢰",
    desc: "사업의 파트너로서 가장 중요한 덕목은 정직과 신뢰입니다.\n우리는 항상 공정하고 투명한 자세로 임하여 말이 아닌 행동으로 신뢰를 만들어 가겠습니다.",
    icon: <ShieldCheck className="w-12 h-12" />
  }
];

export const BUSINESS_SCOPE = [
  {
    id: "dev",
    title: "부동산 개발",
    subtitle: "Real Estate Development",
    desc: "공동주택 및 상업시설 시행, 각종 부동산 개발 PM",
    imageUrl: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1200&q=80",
    scope: ["업무시설 개발", "상업시설 개발", "주택사업 개발"],
    workflow: ["개발환경 분석", "사업타당성 분석", "마스터플랜 수립", "설계 및 인허가", "운영 관리", "공사 및 계약관리", "마케팅 진행", "시공사 선정"],
    icon: <PencilRuler className="w-16 h-16" />
  },
  {
    id: "sale",
    title: "분양 대행",
    subtitle: "Agency for Sale in Lots",
    desc: "지식산업센터 및 상업시설 분양, 상업시설 MD 및 공동주택 개발",
    imageUrl: "https://images.unsplash.com/photo-1450101499163-c8848c66ca85?auto=format&fit=crop&w=1200&q=80",
    scope: ["지식산업센터", "상업시설", "주택사업"],
    workflow: ["시장조사 진행", "세부 전략 수립", "사전 마케팅", "메인 마케팅", "사후 마케팅"],
    icon: <Key className="w-16 h-16" />
  },
  {
    id: "consult",
    title: "개발 자문",
    subtitle: "Development Consulting",
    desc: "부동산 개발 컨설팅, 사업성 분석 및 리스크 평가",
    imageUrl: "https://images.unsplash.com/photo-1542744095-291d1f67b221?auto=format&fit=crop&w=1200&q=80",
    scope: ["시장조사 보고서 작성", "상품 검토 및 구성", "마케팅 전략 수립"],
    workflow: ["입지분석", "수요분석", "SWOT 분석", "유효 컨셉 설정", "사업성 분석"],
    icon: <BarChart3 className="w-16 h-16" />
  }
];
