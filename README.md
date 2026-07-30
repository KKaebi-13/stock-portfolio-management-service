# 📈 Stock Portfolio Management Service (SPMS)

Automated Stock Trading and Portfolio Management Service via Toss Securities Open API

---

## 🛠 Tech Stack
- **Environment:** pnpm workspace (Monorepo)
- **Frontend:** React 19, Vite, TypeScript
- **Backend:** NestJS, TypeScript
- **Architecture:** Clean Architecture (Port & Adapter / Hexagonal)

---

## 🌿 Branching Strategy (GitHub Flow)

* **`main`**: 항상 배포 가능한(Production-ready) 상태를 유지하는 유일한 메인 브랜치입니다.
* **`feature/{기능명}`**: 새로운 기능 개발 시 `main`에서 파생되는 브랜치입니다. (예: `feature/toss-oauth`)
* **`fix/{이슈명}`**: 긴급한 버그 수정 시 `main`에서 파생되는 브랜치입니다. (예: `fix/login-error`)

---

## 💬 Commit Convention

* `feat`: 새로운 기능 추가
* `fix`: 버그 수정
* `refactor`: 코드 리팩토링
* `style`: 코드 포맷팅, 세미콜론 누락, 코드 변경이 없는 경우
* `docs`: 문서 수정 (README.md 등)
* `test`: 테스트 코드, 리팩토링 테스트 코드 추가
* `chore`: 빌드 업무 수정, 패키지 매니저 수정
