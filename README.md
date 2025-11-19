# UXScope - AI-Powered UX Analysis

UXScope is an AI-powered tool that audits any website's user experience. Get instant analysis on performance, accessibility, SEO, and design, with a detailed score and actionable improvement suggestions.

## 🚀 Live Demo
Coming soon

## ✨ Features

- **Instant AI Analysis**: Leverages the Google Gemini API to provide a comprehensive UX audit in seconds.
- **Detailed Scoring**: Get an overall UX score, plus individual scores for key areas:
  - **Performance**: Speed, responsiveness, and efficiency.
  - **Accessibility**: Adherence to WCAG guidelines.
  - **SEO**: Search engine visibility and optimization.
  - **Design Consistency**: Visual coherence and branding.
- **Actionable Insights**: Receive a clear list of a website's strengths and concrete suggestions for improvement.
- **Interactive Report**: View results in a beautifully designed, easy-to-understand dashboard with gauges and summary cards.
- **Leaderboard**: See how your audited site stacks up against other top-rated websites.
- **Bring Your Own Key**: Securely use your own Google Gemini API key, stored only in your browser.
- **Responsive Design**: Fully responsive for a seamless experience on any device.

## 🛠️ Tech Stack

- React + TypeScript
- Vite (blazing-fast builds)
- Tailwind CSS
- Recharts (charts & gauges)
- Google Gemini API (`gemini-1.5-pro` or `gemini-1.5-flash`)

## ⚙️ Getting Started (Development)

### Prerequisites
- Node.js (v18 or higher)
- A free Google Gemini API key → [Get it here](https://aistudio.google.com/app/apikey)

### Local Development
## Step one
```bash
git clone https://github.com/Yonatankinfe/UX-Score.git
cd UX-Score
npm install
npm run dev
```
## Step two
Open http://localhost:5173 → enter your Gemini API key when prompted.

## Step three
```
npm run dev       # Start dev server (hot reload)
npm run build     # Build for production → creates ./dist folder
npm run preview   # Preview the production build locally
npm run deploy    # Deploy to GitHub Pages (after setup)
```
## 🚀 How It Works





UXScope simplifies the complex process of a UX audit into a single click:

1.  **Enter API Key**: The first time you use the app, you'll be prompted to enter your Google Gemini API key. This is stored securely in your browser's local storage for future sessions.
2.  **Input URL**: The user enters the URL of the website they wish to analyze.
3.  **API Call**: The application sends a detailed prompt, including the target URL and a required JSON schema, to the Google Gemini Pro model (`gemini-2.5-pro`) using the provided API key.
4.  **AI Generation**: Gemini analyzes the website based on its vast knowledge base, simulating a professional audit. It structures its findings into a JSON object that matches the requested schema.
5.  **Display Report**: The frontend receives the structured data and dynamically renders a comprehensive report, complete with scores, summaries, and lists of strengths and suggestions.
6.  **Leaderboard Update**: The new analysis is added to the session's leaderboard, which is sorted by the overall score.

## 🛠️ Tech Stack

- **Frontend**: [React](https://reactjs.org/) with [TypeScript](https://www.typescriptlang.org/)
- **AI Model**: [Google Gemini API](https://ai.google.dev/docs) (`@google/genai`)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **Charts**: [Recharts](https://recharts.org/)

## ⚙️ Getting Started

Follow these instructions to get a local copy up and running.

### Prerequisites

- A modern web browser.
- A Google Gemini API key.
- A local web server to serve the `index.html` file. You can use extensions like VS Code's "Live Server".

### Installation & Setup

1.  **Clone the repository:**
    ```bash
    git clone https://github.com/your-username/uxscope.git
    cd uxscope
    ```

2.  **API Key Configuration:**

    UXScope requires a Google Gemini API key to function.

    -   If you don't have one, get your API key from [Google AI Studio](https://makersuite.google.com/app/apikey).
    -   When you first launch the application, you will be prompted to enter this API key.
    -   Paste your key into the input field and click "Continue".

    Your API key is stored exclusively in your browser's local storage. It is not transmitted to any server other than the Google Gemini API for analysis requests.

3.  **Run the application:**
    Since this is a simple static project with ES modules, you don't need a complex build step. Just serve the project's root directory with a local web server.
    - If you are using VS Code, you can install the [Live Server](https://marketplace.visualstudio.com/items?itemName=ritwickdey.LiveServer) extension, right-click on `index.html`, and select "Open with Live Server".
    - Alternatively, you can use Python's built-in server:
      ```bash
      # For Python 3
      python -m http.server
      ```
      Then open `http://localhost:8000` in your browser.

## 📁 Project Structure

```
.
├── components/          # React components
│   ├── APIKeyInputForm.tsx
│   ├── Leaderboard.tsx
│   ├── Loader.tsx
│   ├── ReportCard.tsx
│   ├── ReportDisplay.tsx
│   ├── ScoreGauge.tsx
│   └── URLInputForm.tsx
├── services/            # Services, e.g., for API calls
│   └── geminiService.ts
├── App.tsx              # Main application component
├── index.html           # Entry HTML file
├── index.tsx            # React root renderer
├── leaderboard.csv      # Initial data for the leaderboard
├── metadata.json        # Application metadata
├── README.md            # This file
└── types.ts             # TypeScript type definitions
```

# Image
<img width="1353" height="810" alt="Image" src="https://github.com/user-attachments/assets/0ee1a44c-6121-4110-b385-b3edb2a47032" />
<img width="1357" height="804" alt="Image" src="https://github.com/user-attachments/assets/ab090a24-39b9-4907-9180-9a1006225d31" />
<img width="1360" height="807" alt="Image" src="https://github.com/user-attachments/assets/6cc10b98-767e-481e-aca9-21b86c9c5f58" />
<img width="1346" height="816" alt="Image" src="https://github.com/user-attachments/assets/93dd5e41-80af-4ef8-bc27-a25e24f4c994" />
<img width="1358" height="807" alt="Image" src="https://github.com/user-attachments/assets/f16ca250-ba5c-4e01-b43d-dea804edc952" />

# Video

## NOTE
```
Currenlty the code is saving it in csv file not in database 
```
## 📄 License

This project is licensed under the MIT License.

