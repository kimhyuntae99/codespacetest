# codespacetest

## Chatbot (Dinner suggestion)

This project includes a tiny demo chatbot that recommends dinner menus.

How it works:
- The client code reads the API key from `import.meta.env.VITE_GPT_API_KEY` and calls OpenAI's chat completions endpoint directly from the browser.

Important security note:
- DO NOT ship a real secret exposed to client-side code in production. Browser requests reveal the key to end users. Use server-side functions (Netlify Functions, serverless, or your own backend) to keep the key secret.

Local quickstart (dev):
1. Copy `.env.example` to `.env` and replace with your API key:

```bash
cp .env.example .env
# edit .env and set VITE_GPT_API_KEY
```

2. Start dev server:

```bash
npm install
npm run dev
```

Now open the app and try the "Dinner Suggestion Chatbot" section.

If you want to make this secure for production, move the OpenAI request to a server-side endpoint and keep the key out of client bundles.
