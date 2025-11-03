## 요약

이 리포지토리는 Vite 기반의 간단한 프론트엔드 샘플 프로젝트입니다. AI 코딩 에이전트는 아래 핵심 파일과 패턴을 먼저 살펴보면 빠르게 생산적으로 작업할 수 있습니다.

## 빠른 시작 (핵심 명령)
- 의존성 설치: `npm install`
- 개발 서버: `npm run dev`  (Vite)
- 빌드: `npm run build`  (생산 번들 생성)
- 프로덕션 미리보기: `npm run preview`

이 정보는 `package.json`의 `scripts`에 정의되어 있습니다.

## 아키텍처 한눈에 보기
- 진입점: `index.html` -> 모듈 엔트리 `src/main.js`를 로드합니다.
- UI 패턴: 단일 페이지의 간단한 모듈화된 vanilla JavaScript. 예: `src/main.js`는 `src/counter.js`의 `setupCounter`를 호출합니다.
- 스타일/애셋: CSS와 이미지를 JS에서 import 합니다 (예: `import './style.css'`, `import viteLogo from '/vite.svg'`). 루트에서 시작하는 경로(`/vite.svg`)는 정적 루트 또는 `public/` 하위에 위치한 파일을 가리킵니다.

## 프로젝트-특화 규칙 / 패턴 (에이전트가 알아둘 것)
- package.json에 `type: "module"`이 설정되어 있으므로 ES 모듈 구문(`import`/`export`)을 사용하세요.
- 자바스크립트 모듈은 `src/`에 있으며 브라우저 번들링을 Vite가 처리합니다.
- 정적 파일(예: `vite.svg`, `javascript.svg`)은 루트 경로(`/...`)로 참조됩니다. 새 파일을 추가하려면 `public/` 또는 루트에 배치하세요.
- UI 업데이트 패턴은 DOM 직접 조작입니다. 예: `setupCounter(element)`는 내부 상태를 캡처하고 `element.innerHTML`을 업데이트합니다 — 컴포넌트 프레임워크가 없습니다.

## 자주 하는 변경/작업 예시 (구체적 예제)
- 카운터 동작 수정: `src/counter.js`의 `setCounter` 또는 이벤트 핸들러를 수정하세요. 개발 서버에서 자동 반영됩니다.
- 새로운 페이지/스크립트 추가: `index.html`에 새로운 마운트 포인트 추가하고 `src/`에 모듈을 만든 뒤 `type="module"` 스크립트를 가리키세요.
- 스타일 변경: `src/style.css`를 편집하거나 `src/main.js`에서 새로운 CSS를 import 하세요.

## 디버깅 팁
- 콘솔 로그: 브라우저 개발자 도구를 사용하세요. Vite 개발 모드에서 소스맵이 제공됩니다.
- 빌드 문제: `npm run build` 실패 시 빌드 출력(에러 메시지)을 그대로 확인하세요. 종종 잘못된 경로(절대/상대) 또는 import 오류가 원인입니다.

## 어디를 편집해야 하는지 (파일 지도)
- 진입/렌더링: `index.html`, `src/main.js`
- UI 로직 예제: `src/counter.js` (카운터 구현)
- 스타일: `src/style.css`
- 빌드/도구: `package.json`, `vite.config.js`

## 제약 및 비어있는 부분
- 현재 테스트 스위트가 없습니다. (레포에 테스트 설정이 없음)
- CI 설정(.github/workflows)은 없음 — PR을 위한 자동 검사 정책이 없다면 빌드/린트 작업 추가를 권장합니다.

## 검색 키워드(에이전트용 빠른 탐색)
- `setupCounter` — 카운터 동작의 시작점
- `index.html`, `src/main.js` — 진입점 및 렌더 흐름
- `package.json` scripts — 실행/빌드 커맨드

## 마무리(요청할 때)
이 파일을 기준으로 더 상세한 규칙(예: 커밋 메시지 양식, PR 템플릿, 코드 스타일 규칙)을 원하시면 알려주세요 — 리포지토리에서 해당 패턴이 발견되면 자동으로 병합하겠습니다.

***
_자동 생성: 리포지토리 스캔 기반 요약 — 불확실한 환경(예: CI, 테스트 프레임워크)이 있으면 알려주시면 내용을 확장하겠습니다._
***
