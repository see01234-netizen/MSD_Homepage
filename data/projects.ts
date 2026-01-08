
import { Project } from '../types';

export const DATA_VERSION = "20240523_v7"; // 데이터 버전 업데이트

// 이미지 상수 정의 (재사용성 및 유지보수 용이)
const IMAGES = {
  knowledge: [
    "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1200&q=80",
    "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=1200&q=80",
    "https://images.unsplash.com/photo-1554469384-e58fac16e23a?auto=format&fit=crop&w=1200&q=80",
    "https://images.unsplash.com/photo-1497215728101-856f4ea42174?auto=format&fit=crop&w=1200&q=80",
    "https://images.unsplash.com/photo-1577412647305-991150c7d163?auto=format&fit=crop&w=1200&q=80"
  ],
  apt: [
    "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=1200&q=80",
    "https://images.unsplash.com/photo-1515263487990-61b07816b324?auto=format&fit=crop&w=1200&q=80",
    "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80",
    "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1200&q=80",
    "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1200&q=80"
  ],
  commercial: [
    "https://images.unsplash.com/photo-1519567241046-7f570eee3d9f?auto=format&fit=crop&w=1200&q=80",
    "https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&w=1200&q=80",
    "https://images.unsplash.com/photo-1555636222-cae831e670b3?auto=format&fit=crop&w=1200&q=80"
  ],
  hotel: [
    "https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=1200&q=80",
    "https://images.unsplash.com/photo-1582719508461-905c673771fd?auto=format&fit=crop&w=1200&q=80"
  ],
  office: [
    "https://images.unsplash.com/photo-1496180727794-815e2982919e?auto=format&fit=crop&w=1200&q=80",
    "https://images.unsplash.com/photo-1556955112-28cde3817b0a?auto=format&fit=crop&w=1200&q=80"
  ]
};

export const PROJECTS: Project[] = [
  // 2024
  { year: "2024", month: "10", name: "신광교 클라우드 시티", type: "지식산업센터", location: "경기도 용인시 기흥구", scale: "연면적 104,771평", role: "조직분양", status: "진행중", imageUrl: "/images/cloud_city.png" },
  // 2023
  { year: "2023", month: "05", name: "현대프리미어캠퍼스 세마역", type: "지식산업센터", location: "경기도 오산시 세교동", scale: "연면적 69,738.01평", role: "조직분양", status: "완료", imageUrl: "/images/sema_station.png" },
  // 2022
  { year: "2022", month: "12", name: "힐스테이트 선화 더와이즈", type: "공동주택", location: "대전광역시 중구 선화동", units: "851세대", role: "일반분양", status: "완료", imageUrl: IMAGES.apt[0] },
  { year: "2022", month: "04", name: "용인 경남아너스빌 디센트", type: "공동주택", location: "경기도 용인시 처인구", units: "1,164세대", role: "일반분양", status: "완료", imageUrl: IMAGES.apt[1] },
  // 2021
  { year: "2021", month: "06", name: "향동 현대 테라타워 DMC", type: "지식산업센터", location: "경기도 고양시 덕양구", scale: "연면적 6,382.61평", role: "조직분양", status: "완료", imageUrl: IMAGES.knowledge[2] },
  { year: "2021", month: "05", name: "현대 테라타워 향동", type: "지식산업센터", location: "고양시 덕양구 향동동", scale: "연면적 25,000평", role: "조직분양", status: "완료", imageUrl: IMAGES.knowledge[3] },
  { year: "2021", month: "03", name: "양평역 한라비발디", type: "공동주택", location: "경기도 양평군 양평읍", units: "1602세대", role: "일반분양", status: "완료", imageUrl: IMAGES.apt[2] },
  // 2020
  { year: "2020", month: "08", name: "힐스테이트 천호역 젠트리스", type: "공동주택", location: "서울시 강동구 성내동", units: "160세대", role: "일반분양", status: "완료", imageUrl: IMAGES.apt[3] },
  { year: "2020", month: "07", name: "오산 현대테라타워 CMC", type: "지식산업센터", location: "경기도 오산시 수청동", scale: "연면적 105,185평", role: "일반분양", status: "완료", imageUrl: IMAGES.knowledge[4] },
  { year: "2020", month: "05", name: "향동 스타비즈", type: "오피스/상업시설", location: "고양시 덕양구 향동동", units: "950실", role: "일반분양", status: "완료", imageUrl: IMAGES.commercial[0] },
  { year: "2020", month: "02", name: "별내 에이스 하이엔드타워", type: "지식산업센터", location: "경기도 남양주시 별내동", scale: "연면적 11,000평", role: "조직분양", status: "완료", imageUrl: IMAGES.knowledge[0] },
  // 2019
  { year: "2019", month: "12", name: "문정동 르피에르", type: "오피스텔", location: "서울시 송파구 문정동", units: "262세대", role: "일반분양", status: "완료", imageUrl: IMAGES.apt[4] },
  { year: "2019", month: "08", name: "남양주 다산 DIMC 현대테라타워", type: "지식산업센터", location: "경기도 남양주시 다산동", scale: "연면적 75,000평", role: "조직분양", status: "완료", imageUrl: IMAGES.knowledge[1] },
  { year: "2019", month: "02", name: "청라 리베라움 더 레이크 플러스", type: "오피스텔", location: "인천시 서구 청라동", units: "468실", role: "조직분양", status: "완료", imageUrl: IMAGES.apt[0] },
  // 2018
  { year: "2018", month: "08", name: "마곡지구 매그넘 793", type: "오피스텔", location: "마곡지구 C17-2BL", units: "108실", role: "조직분양", status: "완료", imageUrl: IMAGES.office[0] },
  { year: "2018", month: "06", name: "힐스테이트 삼송역 스칸센", type: "오피스텔", location: "경기도 고양시 삼송동", units: "2,513실", role: "조직분양", status: "완료", imageUrl: IMAGES.apt[1] },
  { year: "2018", month: "04", name: "마곡 에스비타워 III", type: "오피스/상업시설", location: "마곡지구 C12-1BL", units: "67실", role: "조직분양", status: "완료", imageUrl: IMAGES.commercial[1] },
  { year: "2018", month: "04", name: "청라 리베라움 더 레이크", type: "오피스텔", location: "인천시 서구 청라동", units: "409실", role: "조직분양", status: "완료", imageUrl: IMAGES.apt[2] },
  { year: "2018", month: "03", name: "마곡 M타워 III", type: "오피스/상업시설", location: "마곡지구 C12-1BL", units: "54실", role: "조직분양", status: "완료", imageUrl: IMAGES.commercial[2] },
  // 2017
  { year: "2017", month: "12", name: "성남 모란 지웰 에스테이트", type: "오피스텔", location: "성남시 중원구 성남동", units: "228실", role: "조직분양", status: "완료", imageUrl: IMAGES.apt[3] },
  { year: "2017", month: "09", name: "마곡 테크노타워 2", type: "오피스", location: "마곡지구 C13-13,14BL", units: "116실", role: "조직분양", status: "완료", imageUrl: IMAGES.office[1] },
  { year: "2017", month: "09", name: "마곡 사이언스타워 2", type: "오피스/상업시설", location: "마곡지구 C2 13-1,9BL", units: "97실", role: "조직분양", status: "완료", imageUrl: IMAGES.commercial[0] },
  { year: "2017", month: "05", name: "김포 운양 라피아노 타운하우스", type: "타운하우스", location: "경기도 김포시 운양동", units: "174세대", role: "일반분양", status: "완료", imageUrl: IMAGES.apt[4] },
  { year: "2017", month: "05", name: "미사 르보아파크 II", type: "상업시설", location: "경기도 하남시 망월동", scale: "연면적 3,686평", role: "조직분양", status: "완료", imageUrl: IMAGES.commercial[1] },
  { year: "2017", month: "01", name: "마곡 매그넘 797", type: "오피스", location: "마곡지구 C5-4BL", units: "105실", role: "조직분양", status: "완료", imageUrl: IMAGES.office[0] },
  // 2016
  { year: "2016", month: "09", name: "마곡 퀸즈파크 11차", type: "오피스/상업시설", location: "마곡지구 C10-1,2BL", units: "227세대", role: "조직분양", status: "완료", imageUrl: IMAGES.commercial[2] },
  { year: "2016", month: "09", name: "마곡 우성에스비타워2", type: "오피스/상업시설", location: "마곡지구 업무10-3BL", units: "151실", role: "조직분양", status: "완료", imageUrl: IMAGES.commercial[0] },
  { year: "2016", month: "08", name: "마곡 열린 M타워", type: "오피스/상업시설", location: "마곡지구 C11-2BL", units: "151실", role: "조직분양", status: "완료", imageUrl: IMAGES.commercial[1] },
  { year: "2016", month: "08", name: "라비드 퐁네프", type: "오피스텔", location: "경기도 김포시 운양동", units: "656실", role: "조직분양", status: "완료", imageUrl: IMAGES.apt[0] },
  { year: "2016", month: "05", name: "방화동 메이빌 아파트", type: "공동주택", location: "서울시 강서구 방화동", units: "90세대", role: "조직분양", status: "완료", imageUrl: IMAGES.apt[1] },
  { year: "2016", month: "03", name: "마곡 퀸즈파크 10차", type: "오피스/상업시설", location: "마곡지구 C5-2,3BL", units: "124실", role: "조직분양", status: "완료", imageUrl: IMAGES.commercial[2] },
  { year: "2016", month: "03", name: "마곡 퀸즈파크 9차", type: "오피스/상업시설", location: "마곡지구 C7-2,3,4BL", units: "280실", role: "조직분양", status: "완료", imageUrl: IMAGES.commercial[0] },
  // 2015
  { year: "2015", month: "11", name: "마곡 두산더랜드타워", type: "오피스/상업시설", location: "마곡지구 C2-2,5BL", units: "756실", role: "조직분양", status: "완료", imageUrl: IMAGES.office[1] },
  { year: "2015", month: "09", name: "마곡 두산더랜드파크", type: "오피스/상업시설", location: "마곡지구 C3-1,2,5BL", units: "428실", role: "조직분양", status: "완료", imageUrl: IMAGES.office[0] },
  { year: "2015", month: "06", name: "마곡 프라이빗타워 2차", type: "오피스", location: "마곡지구 C3-3BL", units: "147실", role: "조직분양", status: "완료", imageUrl: IMAGES.office[1] },
  { year: "2015", month: "06", name: "영통 클래시아", type: "오피스텔", location: "수원시 영통구 영통동", units: "352실", role: "조직분양", status: "완료", imageUrl: IMAGES.apt[2] },
  { year: "2015", month: "03", name: "마곡 안강프라이빗타워 1차", type: "오피스", location: "마곡지구 C3-6BL", units: "176세대", role: "조직분양", status: "완료", imageUrl: IMAGES.office[0] },
  { year: "2015", month: "01", name: "광교 엘포트 아이파크", type: "오피스텔", location: "경기도 수원시 영통구", units: "1,750실", role: "조직분양", status: "완료", imageUrl: IMAGES.apt[3] },
  // 2014
  { year: "2014", month: "11", name: "제주 휘슬락 호텔", type: "레지던스", location: "제주시 건입동", units: "349실", role: "조직분양", status: "완료", imageUrl: IMAGES.hotel[0] },
  { year: "2014", month: "02", name: "호텔 리젠트마린 제주", type: "레지던스", location: "제주시 건입동", units: "327실", role: "조직분양", status: "완료", imageUrl: IMAGES.hotel[1] },
  // 2013
  { year: "2013", month: "03", name: "제주디아일랜드 마리나", type: "레지던스", location: "제주 서귀포시 성산읍", units: "215실", role: "조직분양", status: "완료", imageUrl: IMAGES.hotel[0] },
  // 2012
  { year: "2012", month: "06", name: "광교 코아루 S", type: "오피스텔", location: "광교도시지원시설용지 4-3블럭", units: "250실", role: "조직분양", status: "완료", imageUrl: IMAGES.apt[4] },
  // 2011
  { year: "2011", month: "06", name: "강서 힐스테이트", type: "오피스텔", location: "서울시 강서구 화곡동", units: "2,603실", role: "조직분양", status: "완료", imageUrl: IMAGES.apt[0] },
  { year: "2011", month: "02", name: "신동백 롯데캐슬 에코", type: "공동주택", location: "경기도 용인시 중동", units: "2,770세대", role: "조직분양", status: "완료", imageUrl: IMAGES.apt[1] },
  // 2010
  { year: "2010", month: "06", name: "구성 스파팰리스 리가", type: "공동주택", location: "경기도 용인시 언남동", units: "553세대", role: "조직분양", status: "완료", imageUrl: IMAGES.apt[2] },
  { year: "2010", month: "01", name: "광주 장지 벽산 블루밍", type: "공동주택", location: "경기도 광주시 장지동", units: "716세대", role: "조직분양", status: "완료", imageUrl: IMAGES.apt[3] },
  // 2009
  { year: "2009", month: "06", name: "화성 동탄 파라곤", type: "타운하우스", location: "경기도 화성시 반송동", units: "32세대", role: "조직분양", status: "완료", imageUrl: IMAGES.apt[4] },
  { year: "2009", month: "04", name: "용인 마북 동양파라곤", type: "공동주택", location: "경기도 용인시 마북동", units: "278세대", role: "조직분양", status: "완료", imageUrl: IMAGES.apt[0] },
];
