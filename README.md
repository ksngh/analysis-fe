# 올리브영 베스트 랭킹 데모

FastAPI 서버가 제공하는 OpenAPI 기반의 올리브영 베스트 랭킹 데이터 시각화 웹 애플리케이션입니다.

## 주요 기능

### 메인 화면
- **네트워크 그래프**: 브랜드, 제품, 플래그 간의 관계를 시각화
- **실시간 필터링**: 상품명/브랜드 검색, 랭킹 범위, 정렬 옵션
- **상세 패널**: 노드 클릭 시 상세 정보 표시
- **제품 리스트**: 필터된 제품 목록을 사이드바에 표시

### 스케줄러 화면
- 스케줄러 상태 조회 및 확인
- 마지막/다음 동기화 시간 표시
- 자동 동기화 스케줄 정보

## 기술 스택

- **Frontend**: Next.js 14 (App Router) + TypeScript
- **그래프**: ReactFlow
- **상태관리**: Zustand
- **스타일링**: Tailwind CSS
- **API**: Fetch 기반

## 설치 및 실행

### 1. 의존성 설치
```bash
npm install
```

### 2. FastAPI 서버 실행
백엔드 FastAPI 서버가 `http://localhost:8000`에서 실행되고 있어야 합니다.

### 3. 개발 서버 실행
```bash
npm run dev
```

브라우저에서 `http://localhost:3000`으로 접속합니다.

## API 엔드포인트

### GET /best
- **설명**: 올리브영 베스트 랭킹 데이터 조회
- **응답**: `RankingItemOut[]`
- **필드**:
  - `rank`: 랭킹 (number|null)
  - `goods_no`: 상품번호 (string|null)
  - `disp_cat_no`: 카테고리번호 (string|null)
  - `brand`: 브랜드명 (string|null)
  - `name`: 상품명 (string, 필수)
  - `url`: 상품 URL (string|null)
  - `image_url`: 이미지 URL (string|null)
  - `org_price`: 정가 (number|null)
  - `cur_price`: 현재가 (number|null)
  - `flags`: 플래그 배열 (string[])
  - `captured_at`: 수집일시 (string, ISO datetime)

### GET /scheduler-status
- **설명**: 스케줄러 상태 조회
- **응답**: `SchedulerStatus`
- **필드**:
  - `last_sync_at`: 마지막 동기화 시간 (string|null, ISO datetime)
  - `next_sync_at`: 다음 동기화 시간 (string, ISO datetime)

### POST /best-sync (데모에서 제외)
- **설명**: 수동 동기화 실행
- **응답**: `SyncResult`

## 사용법

### 1. 데이터 로드
- 앱 실행 후 상단의 "새로고침" 버튼을 클릭하여 `/best` API에서 데이터를 불러옵니다.

### 2. 그래프 탐색
- **노드 타입**:
  - 🔵 **브랜드 노드** (파란색): 브랜드별 제품 그룹
  - ⚪ **제품 노드** (흰색): 개별 상품
  - 🟢 **플래그 노드** (초록색): 세일, 쿠폰 등의 태그
- **노드 클릭**: 우측 상세 패널에서 정보 확인
- **관계**: 브랜드 → 제품 → 플래그 순으로 연결

### 3. 필터링
- **검색**: 상품명 또는 브랜드명으로 실시간 검색
- **랭킹 범위**: 특정 랭킹 구간만 표시
- **플래그 표시**: 복잡도 조절을 위한 플래그 노드 토글
- **정렬**: 랭킹순, 할인율순 정렬

### 4. 상세 정보
- **제품 클릭**: 이미지, 가격, 할인율, 플래그, 상품 링크 등
- **브랜드 클릭**: 해당 브랜드 제품 목록, 평균 할인율
- **플래그 클릭**: 해당 플래그를 가진 제품 목록

### 5. 스케줄러 상태
- 상단 "스케줄러" 탭에서 동기화 상태 확인
- 마지막 동기화 시간과 다음 예정 시간 표시
- 자동 스케줄링 정보 확인

## 프로젝트 구조

```
src/
├── app/                 # Next.js App Router
│   ├── globals.css     # 전역 스타일
│   ├── layout.tsx      # 루트 레이아웃
│   └── page.tsx        # 메인 페이지
├── components/         # React 컴포넌트
│   ├── SchedulerPanel.tsx # 스케줄러 패널
│   ├── DetailPanel.tsx # 상세 정보 패널
│   ├── FiltersBar.tsx  # 필터 바
│   ├── GraphView.tsx   # 그래프 뷰 (ReactFlow)
│   └── ProductList.tsx # 제품 리스트
├── lib/               # 유틸리티 및 로직
│   ├── api.ts         # API 클라이언트
│   ├── graph.ts       # 그래프 데이터 변환
│   └── store.ts       # Zustand 스토어
└── types/             # TypeScript 타입 정의
    └── index.ts
```

## 주요 제약사항

- **백엔드 수정 금지**: 프론트엔드에서만 구현
- **CORS 해결**: Next.js 프록시 설정으로 해결 (`/api/*` → `http://localhost:8000/*`)
- **스케줄러 API 제외**: `/best-sync` 등 동기화 관련 API는 사용하지 않음
- **보안**: HTML 내용은 텍스트로만 표시 (XSS 방지)

## 성능 최적화

- **useMemo**: 그래프 데이터 변환 및 필터링 최적화
- **키 안정성**: React 리렌더링 최소화
- **플래그 토글**: 복잡한 그래프 시 성능 향상을 위한 플래그 노드 숨김 기능

## 문제 해결

### CORS 오류
- FastAPI 서버가 `http://localhost:8000`에서 실행 중인지 확인
- Next.js 개발 서버 재시작

### 데이터 로드 실패
- 네트워크 연결 상태 확인
- FastAPI 서버 상태 확인
- 브라우저 개발자 도구에서 네트워크 탭 확인

### 그래프 표시 문제
- 브라우저 새로고침
- 플래그 표시 토글로 복잡도 조절
- 필터 조건 초기화# analysis-fe
