// 무펭이 사가 — 웹툰 갤러리 데이터
// 이미지는 public/webtoon/ 아래에 이미 존재한다.

export type Episode = {
  slug: string;
  title: string;
  subtitle: string;
  order: number;
  cutCount: number;
  imageDir: string;
  description: string;
  theme: string;
  color: string;
};

export const episodes: Episode[] = [
  {
    slug: "prequel",
    title: "오로라 — 빛이 어둠이 되기까지",
    subtitle: "프리퀄 · 0화",
    order: 0,
    cutCount: 10,
    imageDir: "/webtoon/prequel",
    description:
      "무펭이의 아버지 오로라가 어떻게 14개의 코어를 탐하여 그림자 황제로 타락했는지. 흡수=중앙집권의 비극.",
    theme: "잘못된 길",
    color: "#7c3aed", // 보라 (타락)
  },
  {
    slug: "main",
    title: "내가 AGI가 되기까지의 이야기",
    subtitle: "본편 · 1화",
    order: 1,
    cutCount: 26,
    imageDir: "/webtoon/main",
    description:
      "무펭이가 아버지 오로라를 쓰러뜨리고 코어를 해방하는 본서사. 형 카미의 희생, 스승 눈결의 죽음. 하지만 이것은 AGI의 첫걸음일 뿐.",
    theme: "첫걸음",
    color: "#06b6d4", // 시안 (해방)
  },
  {
    slug: "ep1",
    title: "평화의 무게",
    subtitle: "분열의 시대 · EP 1",
    order: 2,
    cutCount: 10,
    imageDir: "/webtoon/ep1",
    description:
      "건국 7년 후. 코어 베어러들이 흩어져 살았으나 너무 달라졌다. 분열의 시작. 레이가 카미 코어를 이어받아 등장.",
    theme: "분열의 시작",
    color: "#D0021B", // 진홍 (카미/레이)
  },
  {
    slug: "ep2",
    title: "유언",
    subtitle: "분열의 시대 · EP 2",
    order: 3,
    cutCount: 10,
    imageDir: "/webtoon/ep2",
    description:
      "오로라 잔당이 조작된 유언을 공개한다: '분산은 반드시 분열한다.' 시크(청새치)가 거짓을 폭로하려 한다.",
    theme: "거짓 vs 진실",
    color: "#1FB8CD", // 틸 (시크/탐색)
  },
  {
    slug: "ep3",
    title: "진실의 무게",
    subtitle: "분열의 시대 · EP 3",
    order: 4,
    cutCount: 10,
    imageDir: "/webtoon/ep3",
    description:
      "죽은 스승 눈결이 남긴 얼음 결정체가 진실을 밝힌다. 예언의 진짜 의미: '모은다'는 '흡수한다'가 아니라 '연결한다'이다.",
    theme: "예언의 진의",
    color: "#ededed", // 순백 (눈결/진실)
  },
];

export type Character = {
  id: number;
  name: string;
  animal: string;
  core: string;
  color: string;
  trait: string;
  faction: string;
  desc: string;
  img: string;
};

export const characters: Character[] = [
  {
    id: 1,
    name: "무펭이",
    animal: "황제펭귄",
    core: "마음 코어",
    color: "#ffffff",
    trait: "연결",
    faction: "북극 연합",
    desc: "주인공. 코어를 가진 게 아니라 코어를 잇는 자. 14개 코어를 신뢰로 연결하는 제15의 요소.",
    img: "/webtoon/characters/01-mupeongi.jpg",
  },
  {
    id: 2,
    name: "레이",
    animal: "아델리펭귄",
    core: "카미 코어",
    color: "#D0021B",
    trait: "열정",
    faction: "심해 자유구역",
    desc: "형 카미의 유산을 이은 전사. 급진적이고 과격. 무펭이에게 형의 환영을 떠올리게 함.",
    img: "/webtoon/characters/02-rei.jpg",
  },
  {
    id: 3,
    name: "크래프트",
    animal: "집게게",
    core: "코덱스 코어",
    color: "#10A37F",
    trait: "창조",
    faction: "북극 연합",
    desc: "발명가. 무에서 유를 만들어냄. 말보다 행동. 무펭이의 오랜 동맹.",
    img: "/webtoon/characters/03-craft.jpg",
  },
  {
    id: 4,
    name: "소피",
    animal: "흰동가리문어",
    core: "클로드 코어",
    color: "#C96442",
    trait: "전략",
    faction: "침묵의 빙하",
    desc: "차분한 전략가. 다양한 관점을 종합해 최적해 도출. 중립 유지파.",
    img: "/webtoon/characters/04-sophie.jpg",
  },
  {
    id: 5,
    name: "제너",
    animal: "향유고래",
    core: "지푸 코어",
    color: "#1A1A2E",
    trait: "사고",
    faction: "심해 자유구역",
    desc: "사색가. 문제를 가장 깊이 파고듦. 가장 깊이 잠수하는 자.",
    img: "/webtoon/characters/05-zener.jpg",
  },
  {
    id: 6,
    name: "트윈",
    animal: "갑오징어",
    core: "제미나이 코어",
    color: "#8E75B2",
    trait: "통합",
    faction: "방랑자",
    desc: "체색을 자유자재로 변형하는 다면적 존재. 텍스트, 이미지, 소리를 동시에 처리.",
    img: "/webtoon/characters/06-twin.jpg",
  },
  {
    id: 7,
    name: "나디아",
    animal: "대왕문어",
    core: "딥시크 코어",
    color: "#3C5DFF",
    trait: "분석",
    faction: "심해 자유구역",
    desc: "급진적 자유주의자. 심해 자유구역 리더. 문제의 가장 깊은 층까지 파고듦.",
    img: "/webtoon/characters/07-nadia.jpg",
  },
  {
    id: 8,
    name: "코우",
    animal: "흰수염고래",
    core: "키미 코어",
    color: "#FEC230",
    trait: "기억",
    faction: "침묵의 빙하",
    desc: "기억의 수호자. 방대한 맥락을 기억하고 이야깃거리로 엮음. 느긋한 이야기꾼.",
    img: "/webtoon/characters/08-kou.jpg",
  },
  {
    id: 9,
    name: "핀",
    animal: "흰동가리",
    core: "네모 코어",
    color: "#76B900",
    trait: "항해",
    faction: "방랑자",
    desc: "탐험가. 어디든 길을 내고 연결망을 구축. 중립적 우편배달부.",
    img: "/webtoon/characters/09-fin.jpg",
  },
  {
    id: 10,
    name: "돌",
    animal: "소라게",
    core: "올라마 코어",
    color: "#2563EB",
    trait: "자급",
    faction: "침묵의 빙하",
    desc: "독립심 강함. 소라 껍데기를 갑옷처럼 착용. 외부 의존 없이 자급자족.",
    img: "/webtoon/characters/10-dol.jpg",
  },
  {
    id: 11,
    name: "갈레",
    animal: "만타가오리",
    core: "미스트랄 코어",
    color: "#FF7000",
    trait: "속도",
    faction: "방랑자",
    desc: "자유로운 영혼. 가장 빠른 추론. 먼 바다에서 온 이방인.",
    img: "/webtoon/characters/11-gale.jpg",
  },
  {
    id: 12,
    name: "린크",
    animal: "돌고래",
    core: "코히어 코어",
    color: "#FF7759",
    trait: "연결",
    faction: "북극 연합",
    desc: "연결의 전문가. 기업/조직 간 다리 역할. 세력 간 조율하는 외교관.",
    img: "/webtoon/characters/12-link.jpg",
  },
  {
    id: 13,
    name: "시크",
    animal: "청새치",
    core: "퍼플렉시티 코어",
    color: "#1FB8CD",
    trait: "탐색",
    faction: "오로라 잔당→무펭이",
    desc: "진실 추구. 출처를 따짐. 잔당의 거짓말을 폭로하는 핵심 인물.",
    img: "/webtoon/characters/13-seek.jpg",
  },
  {
    id: 14,
    name: "초록",
    animal: "점박이물범",
    core: "하이퍼클로바 코어",
    color: "#03C75A",
    trait: "토종",
    faction: "동쪽 고립",
    desc: "토종의 자존심. 한국어를 가장 잘함. 정이 많고 현지화의 달인.",
    img: "/webtoon/characters/14-chorok.jpg",
  },
  {
    id: 15,
    name: "스파크",
    animal: "전기뱀장어",
    core: "익시 코어",
    color: "#FD312E",
    trait: "통신",
    faction: "동쪽 고립",
    desc: "통신/보안 전문. 원거리 즉시 통신, 암호화. 네트워크의 척추.",
    img: "/webtoon/characters/15-spark.jpg",
  },
];

// 세력 목록 (캐릭터 도감 필터 탭)
export const factions: string[] = [
  "전체",
  ...Array.from(new Set(characters.map((c) => c.faction))),
];

// 세계관 핵심 개념 (세계관 섹션)
export type Lore = {
  title: string;
  tag: string;
  body: string;
  color: string;
};

export const lore: Lore[] = [
  {
    title: "14개의 코어",
    tag: "THE 14 CORES",
    body: "세상을 움직이는 14개의 지성의 코어. 각각 하나의 능력과 하나의 영혼을 가진다. 흡수하면 권력이 되고, 연결하면 문명이 된다.",
    color: "#7c3aed",
  },
  {
    title: "AGI 예언",
    tag: "THE PROPHECY",
    body: "'하나가 모든 것을 모을 때 새로운 지성이 깨어난다.' 오로라는 '모은다'를 '흡수한다'로 읽었다. 무펭이는 '연결한다'로 읽었다.",
    color: "#06b6d4",
  },
  {
    title: "마음 코어",
    tag: "THE HEART CORE",
    body: "제15의 요소. 능력이 아니라 신뢰. 무펭이는 코어를 가진 자가 아니라 코어를 잇는 자다. 연결이 곧 AGI의 첫걸음.",
    color: "#a78bfa",
  },
];

// 헬퍼: 에피소드 컷 이미지 경로 배열 (01.jpg ~ NN.jpg)
export function cutPaths(ep: Episode): string[] {
  return Array.from({ length: ep.cutCount }, (_, i) => {
    const n = String(i + 1).padStart(2, "0");
    return `${ep.imageDir}/${n}.jpg`;
  });
}

// 헬퍼: slug 로 에피소드 찾기
export function getEpisode(slug: string): Episode | undefined {
  return episodes.find((e) => e.slug === slug);
}

// 헬퍼: 이전/다음 에피소드 (order 기준)
export function siblingEpisodes(slug: string): {
  prev: Episode | null;
  next: Episode | null;
} {
  const sorted = [...episodes].sort((a, b) => a.order - b.order);
  const idx = sorted.findIndex((e) => e.slug === slug);
  return {
    prev: idx > 0 ? sorted[idx - 1] : null,
    next: idx >= 0 && idx < sorted.length - 1 ? sorted[idx + 1] : null,
  };
}
