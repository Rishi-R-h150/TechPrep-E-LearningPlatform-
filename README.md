# Tech Prep App

Tech Prep App is a modern e-learning platform designed for students to practice and improve their **DSA (Data Structures and Algorithms)** skills. It provides a comprehensive coding environment, contests, and performance tracking in multiple programming languages.

---

## Features

### 1. **Topic-wise DSA Practice**
- Students can practice coding problems categorized by topics.
- Supported programming languages: **Python, C, C++, Java, JavaScript**.
- Each problem can be solved and tested in an integrated coding environment.

### 2. **Contest Environment**
- Students can **participate in contests** or **host their own contests**.
- Each contest is uniquely identified by its **name**.
- **Password-protected contests** ensure only authorized participants can join.
- **Participants’ rankings** are displayed in real-time for each contest.

### 3. **Code Evaluation**
- Code submissions are evaluated in a **sandboxed environment** using the **Judge0 API**.
- Supports **custom test cases** for each problem.
- After evaluation, the platform displays:
  - **Execution time**
  - **Memory usage**
  - **Success/failure of test cases**

### 4. **Authentication & Authorization**
- Secured using **JWT-based authentication**.
- **Route-based authorization** ensures only authenticated users can access protected features.

---

## Tech Stack

- **Frontend:** React.js (or your chosen frontend framework)
- **Backend:** Node.js + Express.js
- **Database:** MongoDB / PostgreSQL
- **Code Evaluation:** [Judge0 API](https://ce.judge0.com/)
- **Authentication:** JWT
- **Languages Supported:** Python, C, C++, Java, JavaScript

---

## How it Works

1. **User Registration & Login**
   - Users create an account and login using JWT-secured routes.

2. **Practice Problems**
   - Select a topic → choose a problem → write code → submit.
   - Code is sent to the **Judge0 API** for execution.
   - Results show correctness, time, and memory metrics.

3. **Contests**
   - Join a contest using its **name and password**.
   - Submit solutions for problems in the contest.
   - **Leaderboard updates** as submissions are evaluated.

4. **Evaluation**
   - Each submission runs in a **sandboxed environment**.
   - Supports **custom test cases** for precise evaluation.
   - Provides detailed feedback including **time and space complexities**.

---

## Usage

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/tech-prep-app.git
   cd tech-prep-app
