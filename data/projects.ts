
import { Project } from '../types';

export const PROJECTS: Project[] = [
  // 2024
  { year: "2024", month: "10", name: "신광교 클라우드 시티", type: "지식산업센터", location: "경기도 용인시 기흥구", scale: "연면적 104,771평", role: "조직분양", status: "진행중", imageUrl: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1200&q=80" },
  // 2023
  { year: "2023", month: "05", name: "현대프리미어캠퍼스 세마역", type: "지식산업센터", location: "경기도 오산시 세교동", scale: "연면적 69,738.01평", role: "조직분양", status: "완료", imageUrl: "https://images.unsplash.com/photo-1574169208507-84376144848b?auto=format&fit=crop&w=1200&q=80" },
  // 2022
  { year: "2022", month: "12", name: "힐스테이트 선화 더와이즈", type: "공동주택", location: "대전광역시 중구 선화동", units: "851세대", role: "일반분양", status: "완료", imageUrl: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1200&q=80" },
  { year: "2022", month: "04", name: "용인 경남아너스빌 디센트", type: "공동주택", location: "경기도 용인시 처인구", units: "1,164세대", role: "일반분양", status: "완료", imageUrl: "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=1200&q=80" },
  // 2021
  { year: "2021", month: "06", name: "향동 현대 테라타워 DMC", type: "지식산업센터", location: "경기도 고양시 덕양구", scale: "연면적 6,382.61평", role: "조직분양", status: "완료", imageUrl: "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=1200&q=80" },
  { year: "2021", month: "05", name: "현대 테라타워 향동", type: "지식산업센터", location: "고양시 덕양구 향동동", scale: "연면적 25,000평", role: "조직분양", status: "완료", imageUrl: "https://images.unsplash.com/photo-1554469384-e58fac16e23a?auto=format&fit=crop&w=1200&q=80" },
  { year: "2021", month: "03", name: "양평역 한라비발디", type: "공동주택", location: "경기도 양평군 양평읍", units: "1602세대", role: "일반분양", status: "완료", imageUrl: "https://images.unsplash.com/photo-1580587771525-78b9dba3b914?auto=format&fit=crop&w=1200&q=80" },
  // 2020
  { year: "2020", month: "08", name: "힐스테이트 천호역 젠트리스", type: "공동주택", location: "서울시 강동구 성내동", units: "160세대", role: "일반분양", status: "완료", imageUrl: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80" },
  { year: "2020", month: "07", name: "오산 현대테라타워 CMC", type: "지식산업센터", location: "경기도 오산시 수청동", scale: "연면적 105,185평", role: "일반분양", status: "완료", imageUrl: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=1200&q=80" },
  { year: "2020", month: "05", name: "향동 스타비즈", type: "오피스/상업시설", location: "고양시 덕양구 향동동", units: "950실", role: "일반분양", status: "완료", imageUrl: "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&w=1200&q=80" },
  { year: "2020", month: "02", name: "별내 에이스 하이엔드타워", type: "지식산업센터", location: "경기도 남양주시 별내동", scale: "연면적 11,000평", role: "조직분양", status: "완료", imageUrl: "https://images.unsplash.com/photo-1556761175-b413da4baf72?auto=format&fit=crop&w=1200&q=80" },
  // 2019
  { year: "2019", month: "12", name: "문정동 르피에르", type: "오피스텔", location: "서울시 송파구 문정동", units: "262세대", role: "일반분양", status: "완료", imageUrl: "https://images.unsplash.com/photo-1613490493576-75de62addb69?auto=format&fit=crop&w=1200&q=80" },
  { year: "2019", month: "08", name: "남양주 다산 DIMC 현대테라타워", type: "지식산업센터", location: "경기도 남양주시 다산동", scale: "연면적 75,000평", role: "조직분양", status: "완료", imageUrl: "https://images.unsplash.com/photo-1544947950-fa07a98d237f?auto=format&fit=crop&w=1200&q=80" },
  { year: "2019", month: "02", name: "청라 리베라움 더 레이크 플러스", type: "오피스텔", location: "인천시 서구 청라동", units: "468실", role: "조직분양", status: "완료", imageUrl: "https://images.unsplash.com/photo-1582268611958-ebfd161ef9cf?auto=format&fit=crop&w=1200&q=80" },
  // 2018
  { year: "2018", month: "08", name: "마곡지구 매그넘 793", type: "오피스텔", location: "마곡지구 C17-2BL", units: "108실", role: "조직분양", status: "완료", imageUrl: "https://images.unsplash.com/photo-1599819053280-5cd4a38a7a72?auto=format&fit=crop&w=1200&q=80" },
  { year: "2018", month: "06", name: "힐스테이트 삼송역 스칸센", type: "오피스텔", location: "경기도 고양시 삼송동", units: "2,513실", role: "조직분양", status: "완료", imageUrl: "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?auto=format&fit=crop&w=1200&q=80" },
  { year: "2018", month: "04", name: "마곡 에스비타워 III", type: "오피스/상업시설", location: "마곡지구 C12-1BL", units: "67실", role: "조직분양", status: "완료", imageUrl: "https://images.unsplash.com/photo-1459767129954-9b2d1f9b908b?auto=format&fit=crop&w=1200&q=80" },
  { year: "2018", month: "04", name: "청라 리베라움 더 레이크", type: "오피스텔", location: "인천시 서구 청라동", units: "409실", role: "조직분양", status: "완료", imageUrl: "https://images.unsplash.com/photo-1515263487990-61b07816b324?auto=format&fit=crop&w=1200&q=80" },
  { year: "2018", month: "03", name: "마곡 M타워 III", type: "오피스/상업시설", location: "마곡지구 C12-1BL", units: "54실", role: "조직분양", status: "완료", imageUrl: "https://images.unsplash.com/photo-1570129477492-45c003edd2be?auto=format&fit=crop&w=1200&q=80" },
  // 2017
  { year: "2017", month: "12", name: "성남 모란 지웰 에스테이트", type: "오피스텔", location: "성남시 중원구 성남동", units: "228실", role: "조직분양", status: "완료", imageUrl: "https://images.unsplash.com/photo-1598228723793-52759bba239c?auto=format&fit=crop&w=1200&q=80" },
  { year: "2017", month: "09", name: "마곡 테크노타워 2", type: "오피스", location: "마곡지구 C13-13,14BL", units: "116실", role: "조직분양", status: "완료", imageUrl: "https://images.unsplash.com/photo-1560185007-c5ca9de5a960?auto=format&fit=crop&w=1200&q=80" },
  { year: "2017", month: "09", name: "마곡 사이언스타워 2", type: "오피스/상업시설", location: "마곡지구 C2 13-1,9BL", units: "97실", role: "조직분양", status: "완료", imageUrl: "https://images.unsplash.com/photo-1484154218962-a197022b5858?auto=format&fit=crop&w=1200&q=80" },
  { year: "2017", month: "05", name: "김포 운양 라피아노 타운하우스", type: "타운하우스", location: "경기도 김포시 운양동", units: "174세대", role: "일반분양", status: "완료", imageUrl: "https://images.unsplash.com/photo-1572120360610-d971b9d7767c?auto=format&fit=crop&w=1200&q=80" },
  { year: "2017", month: "05", name: "미사 르보아파크 II", type: "상업시설", location: "경기도 하남시 망월동", scale: "연면적 3,686평", role: "조직분양", status: "완료", imageUrl: "https://images.unsplash.com/photo-1593696140826-c58b02198d4a?auto=format&fit=crop&w=1200&q=80" },
  { year: "2017", month: "01", name: "마곡 매그넘 797", type: "오피스", location: "마곡지구 C5-4BL", units: "105실", role: "조직분양", status: "완료", imageUrl: "https://images.unsplash.com/photo-1581093450021-4a7360e9a118?auto=format&fit=crop&w=1200&q=80" },
];
