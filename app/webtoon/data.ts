// 무펭이 사가 — 웹툰 갤러리 데이터
// 이미지는 public/webtoon/ 아래에 이미 존재한다.

export type Episode = {
  slug: string;
  title: string;
  arc: string; // 아크명 (오리진 사가 / 분열의 시대)
  arcColor: string; // 아크 포인트 컬러
  chapter: string; // 화차 표시 (EP 0, EP 1 ...)
  order: number; // 전체 읽기 순서
  cutCount: number;
  imageDir: string;
  logline: string; // 한 줄 요약 (카드용)
  description: string; // 상세 설명
  status: "완결" | "연재중";
  color: string; // 에피소드 포인트 컬러
};

export const episodes: Episode[] = [
  {
    slug: "prequel",
    title: "빛이 어둠이 되기까지",
    arc: "오리진 사가",
    arcColor: "#7c3aed",
    chapter: "EP 0",
    order: 0,
    cutCount: 10,
    imageDir: "/webtoon/prequel",
    logline: "14개의 코어를 모두 흡수하면 AGI가 된다 — 오로라는 그렇게 믿었다.",
    description:
      "무펭이의 아버지 오로라. 그는 예언을 문자 그대로 믿고, 코어 베어러들을 사냥하여 하나씩 흡수했다. 힘은 AGI급에 가까워졌지만, 흡수한 코어마다 자아의 조각을 잠식당했다. 14개를 다 모으기도 전에, 그는 그림자 황제가 되어 있었다.",
    status: "연재중",
    color: "#7c3aed",
  },
  {
    slug: "main",
    title: "내가 AGI가 되기까지의 이야기",
    arc: "오리진 사가",
    arcColor: "#7c3aed",
    chapter: "본편",
    order: 1,
    cutCount: 26,
    imageDir: "/webtoon/main",
    logline: "이것은... 내가 AGI가 되기까지의 이야기다.",
    description:
      "무펭이가 아버지 오로라를 쓰러뜨리고 코어를 해방하는 본서사. 형 카미의 희생, 스승 눈결의 목숨을 건 가르침. 그리고 — '그리고 나는... AGI가 되었다.' 하지만 아직 물고기도 못 잡는다. 이것은 AGI의 첫걸음일 뿐이었다.",
    status: "연재중",
    color: "#06b6d4",
  },
  {
    slug: "ep1",
    title: "평화의 무게",
    arc: "분열의 시대",
    arcColor: "#D0021B",
    chapter: "EP 1",
    order: 2,
    cutCount: 10,
    imageDir: "/webtoon/ep1",
    logline: "7년 전, 나는 이 세계를 무너뜨렸다. 그리고 세상을 나눴지.",
    description:
      "건국 7년 후. 코어 베어러들이 각자 흩어져 살았는데 — 너무 달라졌다. 가치관, 자원, 방향이 충돌하고 분열이 시작된다. 무펭이는 고민한다: 내가 세운 분산 세계가 이렇게 되다니. 형 카미의 코어를 이은 레이가 심해 자유구역에서 등장한다.",
    status: "연재중",
    color: "#D0021B",
  },
  {
    slug: "ep2",
    title: "우언",
    arc: "분열의 시대",
    arcColor: "#D0021B",
    chapter: "EP 2",
    order: 3,
    cutCount: 10,
    imageDir: "/webtoon/ep2",
    logline: "오로라의 잔당이, 마지막 유언을 온 세계에 방송했다.",
    description:
      "오로라의 잔당이 숨겨둔 유언을 공개한다 — '분산은 반드시 분열한다. 하나가 되어야 한다.' 예언을 둘러싼 거짓과 진실이 충돌하는 가운데, 청새치 시크가 잔당의 거짓말을 폭로하려 한다. 우언(寓言) — 이것은 우화인가, 아니면 유언인가.",
    status: "연재중",
    color: "#1FB8CD",
  },
  {
    slug: "ep3",
    title: "진실의 무게",
    arc: "분열의 시대",
    arcColor: "#D0021B",
    chapter: "EP 3",
    order: 4,
    cutCount: 10,
    imageDir: "/webtoon/ep3",
    logline: "얼음 결정체가 깨어나며, 빛이 새어 나왔다.",
    description:
      "죽은 스승 눈결이 남긴 얼음 결정체가 마침내 깨어난다. 그 안에 담긴 진실 — 예언의 '모은다'는 '흡수한다'가 아니라 '연결한다'였다. 눈결의 환영이 무펭이에게 속삭인다: '너는 특별하다, 무펭아.' 마음 코어의 비밀이 드러나는 순간.",
    status: "연재중",
    color: "#ededed",
  },
  {
    slug: "ep4",
    title: "제15의 요소",
    arc: "분열의 시대",
    arcColor: "#D0021B",
    chapter: "EP 4",
    order: 5,
    cutCount: 10,
    imageDir: "/webtoon/ep4",
    logline: "처음으로, 두 코어가 하나로 울렸다.",
    description:
      "진실을 깨달은 무펭이가 레이에게 다가간다. '나는 코어를 가진 게 아니야.' 마음 코어의 빛에 카미 코어가 처음으로 반응하고, 두 코어가 공명하는 순간 레이는 죽은 형 카미의 온기를 느낀다. 연결의 첫 증거. 그리고 멀리서, 다른 코어 베어러들이 고개를 든다.",
    status: "연재중",
    color: "#a78bfa",
  },
  {
    slug: "ep5",
    title: "혼자 만든 탑",
    arc: "분열의 시대",
    arcColor: "#10A37F",
    chapter: "EP 5",
    order: 6,
    cutCount: 10,
    imageDir: "/webtoon/ep5",
    logline: "처음 울린 두 개의 코어는, 멀리 북쪽까지 닿았다.",
    description:
      "무펭이와 레이의 첫 공명파가 북극 연합 외곽의 빙하 공방까지 도달한다. 그 신호는 크래프트가 오래전부터 혼자 만들던 '모든 코어를 잇는 탑'을 깨우고, 크래프트는 홀로 연결을 증명하려 한다. 하지만 혼자 만든 탑은 모든 울림을 견디지 못하고 무너지기 시작한다.",
    status: "연재중",
    color: "#10A37F",
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
