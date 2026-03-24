const app = document.getElementById('app')

const state = {
  topics: [],
  exams: [],
}

const masteryWeight = {
  hard: 1.6,
  medium: 1,
  easy: 0.7,
}

function daysUntil(dateText) {
  if (!dateText) return 999
  const now = new Date()
  const examDate = new Date(dateText)
  const diffMs = examDate.setHours(0, 0, 0, 0) - now.setHours(0, 0, 0, 0)
  return Math.ceil(diffMs / (1000 * 60 * 60 * 24))
}

function urgencyMultiplier(days) {
  if (days <= 0) return 2.5
  if (days <= 3) return 2.2
  if (days <= 7) return 1.8
  if (days <= 14) return 1.4
  return 1
}

function getDailyPlan() {
  return state.topics
    .map((topic) => {
      const examLinks = state.exams.filter((exam) =>
        exam.topicNames.map((name) => name.toLowerCase()).includes(topic.name.toLowerCase()),
      )

      const nearestExamDays = Math.min(...examLinks.map((exam) => daysUntil(exam.date)), 999)
      const examBoost = urgencyMultiplier(nearestExamDays)
      const score = Math.round(100 * masteryWeight[topic.mastery] * examBoost)

      return {
        ...topic,
        score,
        nearestExamDays: nearestExamDays === 999 ? null : nearestExamDays,
        examNames: examLinks.map((exam) => exam.name),
      }
    })
    .sort((a, b) => b.score - a.score)
    .slice(0, 8)
}

function render() {
  const dailyPlan = getDailyPlan()
  const linked = new Set(state.exams.flatMap((exam) => exam.topicNames.map((name) => name.toLowerCase())))

  app.innerHTML = `
    <header>
      <h1>Study Scheduler System</h1>
      <p>Log topics and exam dates to auto-generate a revision priority plan.</p>
    </header>

    <section class="grid">
      <article class="card">
        <h2>Add Topic</h2>
        <form id="topicForm" class="form">
          <label>Topic Name<input name="name" placeholder="Quadratic Equations" required /></label>
          <label>Subject<input name="subject" placeholder="Mathematics" required /></label>
          <label>Mastery
            <select name="mastery">
              <option value="hard">Hard</option>
              <option value="medium" selected>Medium</option>
              <option value="easy">Easy</option>
            </select>
          </label>
          <button type="submit">Add Topic</button>
        </form>
      </article>

      <article class="card">
        <h2>Add Exam</h2>
        <form id="examForm" class="form">
          <label>Exam Name<input name="name" placeholder="Midterm 1" required /></label>
          <label>Date<input type="date" name="date" required /></label>
          <label>Syllabus Topics (comma-separated)
            <input name="topicNames" placeholder="Quadratic Equations, Trigonometric Identities" />
          </label>
          <button type="submit">Add Exam</button>
        </form>
      </article>
    </section>

    <section class="card">
      <h2>Daily Plan (Top Priorities)</h2>
      ${
        dailyPlan.length === 0
          ? '<p class="muted">No plan yet. Add topics and optionally connect them to exams.</p>'
          : `<ul class="list">${dailyPlan
              .map(
                (item, index) => `
              <li>
                <div>
                  <strong>#${index + 1} ${item.name}</strong>
                  <p>${item.subject} • Mastery: ${item.mastery} • ${
                  item.examNames.length ? `Exams: ${item.examNames.join(', ')}` : 'No exam linked'
                }</p>
                </div>
                <div class="pill">Score ${item.score}</div>
                ${
                  item.nearestExamDays !== null
                    ? `<small>${
                        item.nearestExamDays >= 0
                          ? `${item.nearestExamDays} days until nearest exam`
                          : `${Math.abs(item.nearestExamDays)} days overdue`
                      }</small>`
                    : ''
                }
              </li>`,
              )
              .join('')}</ul>`
      }
    </section>

    <section class="card">
      <h2>Current Data Snapshot</h2>
      <p>Topics: <strong>${state.topics.length}</strong> • Exams: <strong>${state.exams.length}</strong> • Exam-linked topics: <strong>${linked.size}</strong></p>
    </section>
  `

  document.getElementById('topicForm').addEventListener('submit', (event) => {
    event.preventDefault()
    const data = new FormData(event.target)
    state.topics.push({
      id: crypto.randomUUID(),
      name: String(data.get('name')).trim(),
      subject: String(data.get('subject')).trim(),
      mastery: String(data.get('mastery')),
    })
    render()
  })

  document.getElementById('examForm').addEventListener('submit', (event) => {
    event.preventDefault()
    const data = new FormData(event.target)
    state.exams.push({
      id: crypto.randomUUID(),
      name: String(data.get('name')).trim(),
      date: String(data.get('date')),
      topicNames: String(data.get('topicNames'))
        .split(',')
        .map((topic) => topic.trim())
        .filter(Boolean),
    })
    render()
  })
}

render()
