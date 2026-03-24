# Study Scheduler System

An intelligent study planning platform that turns daily school progress into a personalized revision schedule.

You log what was taught in school, attach topics to upcoming exams, and the system automatically generates daily study tasks using spaced repetition and exam-aware prioritization.

---

## 🚀 Vision

Most schools complete syllabus delivery close to exam dates, often leaving students with little structured revision time.

This app solves that by continuously planning revision in the background:

- If no exam is set: keeps students always exam-ready through rolling revision.
- If an exam is set: connects taught topics to that exam syllabus and reprioritizes study tasks.
- If topics are revised: they get lower priority than unrevised or weak topics.
- If new topics are added late to an exam: urgency rises automatically.

---

## 🧩 Core Features (MVP)

- Daily topic logging (“What was done in school today?”)
- Exam creation with date and syllabus-topic linking
- Auto-generated daily study plan
- Priority logic based on:
  - spaced repetition due state
  - exam proximity
  - mastery/revision history
  - newly added exam topics
- Study session feedback (`easy`, `medium`, `hard`, `missed`) to update future plans

---

## 💸 Freemium Model

### Free Tier
- Manual topic logging
- Exam + syllabus linking
- Daily auto scheduler
- Basic progress dashboard
- Topic graph view (Obsidian-style visualization)

### Premium Tier (AI)
- AI-generated study breakdowns per topic
- AI “what to focus on today” coaching
- AI weak-area diagnostics across subjects
- Smart revision summaries / quiz suggestions
- AI-generated exam-cram plans for short deadlines

---

## 🧠 Scheduling Logic (High Level)

Each topic receives a daily priority score from weighted factors:

- **Due factor:** overdue/due topics get boosted
- **Exam urgency:** topics in near exams get boosted
- **Mastery factor:** well-revised topics get reduced weight
- **Recency factor:** recently studied topics get temporary reduction
- **Late-addition factor:** newly added exam topics get short-term urgency boost

This ensures unrevised and weak topics surface first while still protecting exam readiness.

---

## 🗂 Data Model (Conceptual)

- `users`
- `subjects`
- `topics`
- `exams`
- `exam_topics` (many-to-many syllabus mapping)
- `study_sessions` (revision outcomes)
- `review_state` (spaced repetition state per topic)
- `daily_plan`
- `subscriptions`
- `ai_usage_logs`

---

## 🕸 Obsidian-like Graph View

A visual graph helps students see relationships:

- nodes: topics, subjects, exams
- edges:
  - topic → subject
  - topic → exam (syllabus inclusion)
  - topic ↔ topic (optional conceptual links)
- filters:
  - by exam
  - by due state
  - by unrevised/weak topics
- visual cues:
  - color by mastery
  - size by urgency
  - border/highlight for exam-linked topics

---

## 🔌 Obsidian Integration (Future Plan)

Possible integration tracks:

1. **Markdown Export**
   - export topics/exams as markdown notes
   - include metadata tags and links

2. **Vault Sync (Plugin/Folder-based)**
   - sync topic nodes to Obsidian vault structure
   - maintain bidirectional metadata updates (future)

3. **Graph Interop**
   - map internal topic links to Obsidian wikilinks
   - preserve identifiers for round-trip sync

---

## 🏗 Suggested Architecture

- **Frontend:** React / Next.js
- **Backend:** FastAPI (or Node/Nest)
- **Database:** PostgreSQL
- **Auth:** Email/OAuth + JWT/session
- **Jobs:** Celery / BullMQ / cron workers for daily planning
- **Billing:** Stripe
- **AI Layer:** provider abstraction (OpenAI/Anthropic/etc.)
- **Graph Engine:** topic-relation service + cached graph payloads

---

## 🛣 Roadmap

### Phase 1 — MVP
- User accounts
- Topic + exam flows
- Scheduler engine
- Daily dashboard

### Phase 2 — Freemium Foundation
- Subscription gating
- Usage limits
- Feature flags for premium AI

### Phase 3 — AI Premium
- AI daily coaching
- AI weak-area analysis
- AI adaptive revision plans

### Phase 4 — Graph Experience
- Obsidian-style graph
- filters + urgency overlays
- topic relationship editing

### Phase 5 — Obsidian Integration
- markdown export
- vault-compatible link mapping
- optional plugin path

---

## 🔐 Privacy & Safety

- User-owned learning data
- Transparent AI usage logs
- Configurable retention for AI prompts/results
- Secure storage for subscription and account data

---

## ✅ Success Metrics

- Daily active study completion rate
- Revision consistency (streak + due-topic completion)
- Exam readiness score trend
- Premium conversion for AI features
- Retention after first exam cycle

---

## 📌 Status

Planning and architecture phase.  
Implementation will prioritize scheduler quality, then monetization, then AI and graph expansion.
