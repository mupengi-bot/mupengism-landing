# 무펭이즘 랜딩페이지 v4

**코리아 디자인어워즈 수준의 프리미엄 디자인**

## 디자인 원칙

### 1. 타이포그래피 중심
- **Pretendard 가변폰트** 사용 (한글 최적화)
- Hero: 6xl~9xl (96px~128px)
- Section Title: 4xl~7xl (36px~72px)
- Big Number: 8xl~12rem (96px~192px)
- 웨이트: 700-900 (볼드~블랙)
- Letter-spacing: -0.03em ~ -0.01em (타이트)
- Line-height: 1.1~1.2 (헤드라인), 1.6 (본문)

### 2. 여백의 미
- 섹션 간 여백: `py-32` (8rem / 128px)
- 컨테이너 max-width: 1280px (6xl)
- 카드 내부 여백: `p-12` (3rem)
- 빽빽하지 않은 레이아웃 — 숨 쉬는 공간

### 3. 미니멀 컬러 팔레트
- **Primary**: #000000 (블랙)
- **Background**: #ffffff (화이트)
- **Gray**: #fafafa (카드), #e5e5e5 (보더)
- **Text**: #000000, #6b7280 (서브텍스트)
- 포인트 컬러 절제 — 검은색과 흰색만으로 승부

### 4. 부드러운 모션
- Transition: `0.3s ease-out` (빠르고 자연스럽게)
- Scroll Animation: `0.8s ease-out` (천천히 등장)
- Transform: `translateY(40px)` → `translateY(0)` (위에서 아래로)
- Intersection Observer 사용 (뷰포트 진입 시 애니메이션)

### 5. 마이크로 인터랙션
- 커서: `cursor: pointer` + `opacity: 0.7` on hover
- 스크롤바: 커스텀 디자인 (8px, 블랙)
- 카드 호버: 보더 색상 변경 (#e5e5e5 → #000000)
- 버튼 호버: 배경/텍스트 반전 (블랙 → 화이트)
- 펭귄 이모지: `float` 애니메이션 (subtle하게)

## 섹션 구조

1. **Hero** — 대형 타이포 + 펭귄 이모지
2. **Vision** — 블랙 배경 + 한 문장씩 스크롤 등장
3. **Before/After** — SaaS vs AIaaS 비교 카드
4. **OpenClaw** — 4개 핵심 기능 (숫자 01-04)
5. **Ecosystem** — 80+ 큰 숫자 + 스킬 카테고리
6. **Use Case** — MUFI 포토부스 사례
7. **CTA** — 단일 버튼, 미니멀

## 기술 스택

- **HTML5** (semantic markup)
- **Tailwind CSS** (CDN, 3.x)
- **Pretendard Variable** (한글 폰트)
- **Vanilla JavaScript** (Intersection Observer)
- **No dependencies** — 순수 HTML/CSS/JS

## 금지 사항 (코리아 디자인어워즈 가이드라인)

❌ 과한 그라디언트  
❌ 글래스모피즘 남발  
❌ 아이콘 라이브러리 (Font Awesome 등)  
❌ 촌스러운 그림자 (box-shadow: 0 10px 50px rgba...)  
❌ 빽빽한 레이아웃  
❌ 외부 이미지 (텍스트와 도형만으로)

## 배포

```bash
# 로컬 서버 실행
cd /Users/mupeng/.openclaw/workspace/projects/mupengism-landing
python3 -m http.server 8000
```

브라우저에서 `http://localhost:8000` 접속

## 레퍼런스

이 디자인은 다음 사이트들의 패턴을 분석하여 제작되었습니다:

- **토스** (toss.im) — 대형 타이포, 여백, 섹션 구분
- **배민** (baemin.com) — 짧은 카피, 큰 숫자, 포인트 컬러 절제
- **원티드** (wanted.co.kr) — 깔끔한 네비게이션, 텍스트 중심
- **Awwwards Korea** — 국제적 디자인 트렌드

## 디자인 철학

> "토스, 배민 수준의 한국 프리미엄 디자인. 여백과 타이포로 승부."

좋은 디자인은 덜어내는 것입니다. 불필요한 요소를 제거하고, 타이포그래피와 여백만으로 메시지를 전달합니다.

---

**Made with ❤️ by 무펭이즘**
