# Startup Idea Validator Dashboard

A single-page web application where users can submit startup ideas and explore them on an interactive dashboard.

Built for **Tech Event— Round 1** competition.

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


## Author

Built by **Kshitij Kumar**

GitHub: https://github.com/kshitijkumar-dev  
Email: kshitijkumar.dev@gmail.com  
LinkedIn: https://www.linkedin.com/in/kshitijkumar-dev/
