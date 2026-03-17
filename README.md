# Startup Idea Validator Dashboard

A single-page web application where users can submit startup ideas and explore them on an interactive dashboard.

Built for **Blind Date — Round 1** competition.

---

## Features

### Core
- **Idea Submission** — Submit a startup idea with title, description, problem statement, category, difficulty, and market potential
- **Difficulty Score** — Rated 1 (Easy) to 5 (Extremely Hard) via a slider
- **Market Potential** — Options: Low, Medium, High, Very High
- **Card Dashboard** — All submitted ideas displayed as browsable cards
- **Filtering** — Filter by category, difficulty level, and market potential
- **Search** — Keyword search across title, description, and problem statement
- **Statistics Panel** — Live stats: total ideas, most common category, average difficulty score
- **Input Validation** — Blocks empty submissions and duplicate titles

### Bonus
- **Upvoting** — Users can upvote ideas; vote can be toggled
- **Trending Section** — Highlights top 3 most-upvoted ideas
- **Animated Cards** — Smooth fade-in animation on card render
- **Dark Mode** — Toggle between light and dark theme
- **Popularity Score** — Calculated per idea based on difficulty, market potential, and upvotes

---

## Tech Stack

- HTML5
- CSS3 (CSS Variables, Grid, Flexbox)
- Vanilla JavaScript (no frameworks, no dependencies)

---

## How to Run

No installation or setup required.

1. Clone or download the repository
2. Open `index.html` in any modern browser

```bash
git clone https://github.com/your-username/startup-idea-validator.git
cd startup-idea-validator
# Just open index.html in your browser
```

---

## Project Structure

```
startup-idea-validator/
├── index.html    # Entire application (HTML + CSS + JS in one file)
└── README.md
```

---

## How It Works

All data is managed in-memory using a JavaScript state object. The UI is re-rendered on every state change using a `render()` function that rebuilds the DOM. No backend or database is used.

Validation checks:
- Required fields: title, description, problem statement
- Duplicate title detection (case-insensitive)

Popularity score formula:
```
score = ((6 - difficulty) × 10 + marketScore + votes × 5) / 3
```
Where marketScore: Low = 10, Medium = 30, High = 60, Very High = 100

---

## Screenshots

> Add screenshots here after running the project locally.

---

## Author

**Kshitij Kumar**  
B.Tech CSE — AI-Driven DevOps  
Jain University FET
