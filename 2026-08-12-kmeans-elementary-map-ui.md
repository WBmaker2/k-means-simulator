# K-means 초등 학습 지도형 UI 구현 계획

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** 초등학생이 K-means 학습 순서를 쉽게 따라가도록 메인 화면을 탐험 지도형 UI로 개선하고, 메인 진입 파일을 `index.html`로 통일한다.

**Architecture:** 기존 단일 HTML의 계산 로직과 DOM ID를 유지한다. `index.html`은 학습 화면의 의미 있는 레이아웃 클래스를 제공하고, `assets/kmeans-simulator.css`는 외부 의존성 없는 디자인 토큰·컴포넌트·반응형 규칙을 담당한다. 로컬 SVG 아이콘과 Python 흐름 테스트는 그대로 재사용한다.

**Tech Stack:** HTML5, CSS3, inline SVG, vanilla JavaScript, Python unittest, 로컬 HTTP 서버, 브라우저 캡처 검증.

## Global Constraints

- 외부 CDN, 외부 폰트, 외부 이미지, 외부 아이콘을 추가하지 않는다.
- 기존 전역 함수와 동적 렌더링 ID를 변경하지 않는다.
- K값 선택 범위는 2~6 비교를 유지하고 최대값 6을 보존한다.
- `K-평균-수업-활동지.html`, CSV 다운로드, 테마 전환, 엔트리 가이드를 유지한다.
- 320px 이상 화면에서 가로 스크롤이 생기지 않게 한다.
- CSS가 로드되지 않아도 콘텐츠와 기능은 접근 가능한 HTML 구조로 남긴다.

---

### Task 1: 메인 진입 파일 정리

**Files:**
- Rename: `K-평균 시뮬레이터.html` → `index.html`
- Modify: `index.html` links and document metadata
- Modify: `K-평균-수업-활동지.html` only if it links to the old simulator filename

**Interfaces:**
- Produces the Pages root entry at `/index.html` and preserves `assets/kmeans-simulator.css` and `assets/kmeans-icons.js` relative paths.

- [ ] **Step 1: Search all references to the old filename**

Run:

```powershell
rg -n "K-평균 시뮬레이터\.html|K-평균%20시뮬레이터" .
```

Expected: references are listed before the rename so each can be updated.

- [ ] **Step 2: Rename only the main HTML file**

Run:

```powershell
Move-Item -LiteralPath 'K-평균 시뮬레이터.html' -Destination 'index.html'
```

Expected: `index.html` exists and the old filename no longer exists.

- [ ] **Step 3: Update remaining links and metadata**

Keep asset paths relative to the root:

```html
<link rel="stylesheet" href="assets/kmeans-simulator.css">
<script src="assets/kmeans-icons.js" defer></script>
```

Update only links that referred to the old simulator filename. Do not change function names or dynamic element IDs.

- [ ] **Step 4: Verify static references**

Run:

```powershell
rg -n "K-평균 시뮬레이터\.html|assets/kmeans-simulator\.css|assets/kmeans-icons\.js" .
```

Expected: no stale main filename reference; root CSS and icon paths are present.

---

### Task 2: 탐험 지도형 page shell and control hierarchy

**Files:**
- Modify: `index.html` head, header, main layout, mission, K controls, step status, canvas headings, comparison headings, footer

**Interfaces:**
- Preserve IDs: `input-k`, `slider-k`, `k-value-display`, `learning-mission`, `theme-desc`, `step-1`, `step-2`, `step-3`, `step-message`, `simulation-complete`, `stage-summary`, `average-explanation`, `entry-svg`, `line-group`, `data-points-group`, `centroids-group`, `tooltip`, `centroids-stats`, `comparison-panel`, `comparison-empty-state`, `comparison-results`.
- Preserve inline handlers: `changeTheme`, `updateK`, `stepSimulation`, `startSimulation`, `resetSimulation`, `runKComparison`, `toggleGuideSection`.

- [ ] **Step 1: Add semantic layout classes without removing existing utility classes**

Use stable classes such as:

```html
<body class="site-shell">
<header class="site-header">...</header>
<main class="page-frame">
  <section class="mission-hero">...</section>
  <section class="learning-layout">...</section>
</main>
```

Keep the existing IDs and dynamic child containers unchanged.

- [ ] **Step 2: Reframe the header and mission copy**

Keep theme buttons and icons, but add a small eyebrow label and use the hero to answer what the student is doing. The primary sentence should be short enough to fit on mobile.

- [ ] **Step 3: Make the learning sequence explicit**

Wrap the current status labels in a progress component and add `data-step` hooks only where needed. Keep `step-1` through `step-3` as the live state elements so existing JavaScript can continue updating them.

- [ ] **Step 4: Make K=2~6 direct choices visible**

Add a direct choice row near the current K controls using buttons with `data-k-choice-control="2"` through `data-k-choice-control="6"`. Each button calls `updateK(2)` through `updateK(6)`. Keep number input and range input as synchronized accessible controls.

- [ ] **Step 5: Keep Entry guide as a secondary learning resource**

Retain all guide content and download links, but wrap the card in a visually secondary section label so the K-means activity remains the first focus.

---

### Task 3: Implement the offline visual system

**Files:**
- Modify: `assets/kmeans-simulator.css`
- Modify: `index.html` inline SVG grid colors only if needed for contrast

**Interfaces:**
- Provides styling for existing utility classes and new semantic classes.
- Does not import any stylesheet or font from the network.

- [ ] **Step 1: Replace the neutral slate palette with the approved tokens**

Add tokens for `--page-bg`, `--ink`, `--muted`, `--primary`, `--primary-dark`, `--sun`, `--mint`, `--coral`, `--line`, and `--card-shadow`. Keep compatibility aliases for the existing utility classes so dynamic HTML rendered by JavaScript remains styled.

- [ ] **Step 2: Add visible base styles for the page shell**

Implement `.site-shell`, `.site-header`, `.page-frame`, `.mission-hero`, `.learning-layout`, `.control-panel`, `.visual-panel`, `.panel-card`, and `.site-footer` with a consistent 16–20px radius, 16–24px padding, clear border, and low-contrast shadow.

- [ ] **Step 3: Style primary learning actions**

Make `.primary-action` large, high contrast, and full width in the control panel. Make secondary actions distinct but quieter. Add hover, active, disabled, and focus-visible states with a minimum 3px focus ring.

- [ ] **Step 4: Style progress and K-choice controls**

Use a numbered progress row that wraps on small screens. Give `.k-choice` buttons a 44px minimum touch target, selected state, and clear label. Keep the range input as a secondary affordance.

- [ ] **Step 5: Restyle the SVG canvas and result cards**

Use a light map surface with a subtle grid and strong color contrast for points, centroids, and connection lines. Style `.stage-summary`, `.stage-summary-card`, `.comparison-empty-state`, generated comparison tables, and centroid cards so current learning state is readable without tiny text.

- [ ] **Step 6: Add responsive breakpoints**

At widths below 960px, stack controls above the visual panel. At widths below 600px, reduce page padding, allow theme buttons to wrap, stack action buttons, keep the SVG at a readable aspect ratio, and prevent fixed-width content from overflowing.

---

### Task 4: Add regression coverage for the new entry and visual hooks

**Files:**
- Modify: `tests/test_learning_flow.py`

**Interfaces:**
- Tests parse `index.html` as UTF-8 and verify both behavior-critical hooks and the new entry-file contract.

- [ ] **Step 1: Add failing assertions for the new entry contract**

Add tests that assert:

```python
assert Path("index.html").exists()
assert not Path("K-평균 시뮬레이터.html").exists()
assert 'href="assets/kmeans-simulator.css"' in html
assert 'src="assets/kmeans-icons.js"' in html
```

- [ ] **Step 2: Run the focused test and confirm the expected failure before implementation**

Run:

```powershell
python -m unittest tests.test_learning_flow -v
```

Expected before Tasks 1–3: the entry-file assertion fails because the old filename is still present.

- [ ] **Step 3: Add assertions for student-facing hooks**

Assert that the HTML contains the mission, progress IDs, direct K choice hooks for 2–6, primary action label, comparison panel, and activity sheet link.

- [ ] **Step 4: Run the full test suite after implementation**

Run:

```powershell
python -m unittest discover -s tests -v
```

Expected: zero failures.

---

### Task 5: Browser render QA and deployment handoff

**Files:**
- Create: `design-qa.md`
- Create: `qa-screenshots/2026-08-12-kmeans-redesign-*.png` when screenshots are captured

**Interfaces:**
- `design-qa.md` records the source screenshots, implementation screenshots, viewport, tested interactions, console check, findings, and final result.

- [ ] **Step 1: Serve the project locally**

Run from the project root:

```powershell
python -m http.server 8765
```

Open `http://127.0.0.1:8765/index.html` in the in-app browser.

- [ ] **Step 2: Capture desktop and mobile initial states**

Capture at 1280×900 and 390×844. Confirm the screenshot shows the styled page, not a blank page or browser-default form controls.

- [ ] **Step 3: Exercise the core learning flow**

Test theme switching, K=2 and K=6 selection, `한 단계씩 실행`, automatic run, reset, K comparison, guide tabs, CSV download control, and activity sheet link. Check for console errors after each state-changing action.

- [ ] **Step 4: Record evidence in `design-qa.md`**

Use `passed` only when no P0/P1/P2 visual or interaction issue remains. If a blocker remains, record `blocked` and name it.

- [ ] **Step 5: Publish the root entry and verify Pages**

Commit/upload `index.html`, `assets/kmeans-simulator.css`, `assets/kmeans-icons.js`, and documentation to `WBmaker2/k-means-simulator`. Verify both:

```text
https://wbmaker2.github.io/k-means-simulator/
https://wbmaker2.github.io/k-means-simulator/index.html
```

Expected: the root page opens the styled simulator rather than the repository README.

