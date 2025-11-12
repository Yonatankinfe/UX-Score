# UXScope - AI-Powered UX Analysis

UXScope is an AI-powered tool that audits any website's user experience. Get instant analysis on performance, accessibility, SEO, and design, with a detailed score and actionable improvement suggestions.

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
- **Responsive Design**: Fully responsive for a seamless experience on any device.

## 🚀 How It Works

UXScope simplifies the complex process of a UX audit into a single click:

1.  **Input URL**: The user enters the URL of the website they wish to analyze.
2.  **API Call**: The application sends a detailed prompt, including the target URL and a required JSON schema, to the Google Gemini Pro model (`gemini-2.5-pro`).
3.  **AI Generation**: Gemini analyzes the website based on its vast knowledge base, simulating a professional audit. It structures its findings into a JSON object that matches the requested schema.
4.  **Display Report**: The frontend receives the structured data and dynamically renders a comprehensive report, complete with scores, summaries, and lists of strengths and suggestions.
5.  **Leaderboard Update**: The new analysis is added to the session's leaderboard, which is sorted by the overall score.

## 🛠️ Tech Stack

- **Frontend**: [React](https://reactjs.org/) with [TypeScript](https://www.typescriptlang.org/)
- **AI Model**: [Google Gemini API](https://ai.google.dev/docs) (`@google/genai`)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **Charts**: [Recharts](https://recharts.org/)

## ⚙️ Getting Started

Follow these instructions to get a local copy up and running.

### Prerequisites

- A modern web browser.
- A local web server to serve the `index.html` file. You can use extensions like VS Code's "Live Server".

### Installation & Setup

1.  **Clone the repository:**
    ```bash
    git clone https://github.com/your-username/uxscope.git
    cd uxscope
    ```

2.  **API Key Configuration:**

    This project requires a Google Gemini API key to function. The application is configured to read the API key from an environment variable named `API_KEY`.

    -   Get your API key from [Google AI Studio](https://makersuite.google.com/app/apikey).
    -   You must set this key in the environment where you are running the application. The specific method will depend on your operating system and deployment environment. For local development in a bash terminal, you can export the variable:
        ```bash
        export API_KEY="YOUR_API_KEY_HERE"
        ```
    -   When deploying to a hosting service (like Vercel, Netlify, etc.), add `API_KEY` as an environment variable in the project settings.

    **Note**: The application will not work without this environment variable being correctly set.

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

NOTE
Currenlty the code is saving it in csv file not in database 

## 📄 License

This project is licensed under the MIT License.

