## AI-Powered National Health Portal for Unified Medical Access and Personalized Care in India

In India, healthcare data remains deeply fragmented, making it difficult for patients to retrieve medical records, book appointments, or consult the right specialists — especially when moving between hospitals, diagnostic labs, or cities. The situation is even more challenging in rural or underserved regions, where digital healthcare access is minimal. On top of that, interpreting medical test reports is often confusing for the average person due to complex medical jargon and a lack of accessible explanations.

To address these challenges, we have developed a comprehensive web application — a unified digital health portal that brings hospitals, doctors, diagnostic labs, and patients together on a single platform.

# The platform offers the following key features:

1. Seamless appointment booking with registered hospitals and doctors

2. Instant access to medical test results, securely retrieved through hospital-issued credentials

3. AI-powered report analysis via a personalized chatbot that interprets reports in simple language and suggests next steps or relevant specialists

4. A centralized user dashboard for patients, doctors, and hospitals to manage their interactions efficiently

5. The landing page features distinct login and registration options for hospitals, doctors, and patients, ensuring a tailored experience for every stakeholder.

6. This platform is built with the vision of "AI for Social Good", aiming to create a secure, intelligent, and inclusive health ecosystem that empowers every citizen — regardless of their location or background — to understand and take control of their health.

## Installation/Setup
To set up the project, follow these steps:

1. Clone the repository using `git clone https://github.com/SakshiThapliyal19/hashhacks.git

cd hashhacks.git

2. Install Dependencies

      npm install

3. Set Up Environment Variables


NEXT_PUBLIC_FIREBASE_API_KEY="AIzaSyAcn2Kw1BUFRmd0E98zHYGnSe-BMHR_wEs",
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN="hashhacks-16cd4.firebaseapp.com",
NEXT_PUBLIC_FIREBASE_PROJECT_ID="hashhacks-16cd4",
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET="hashhacks-16cd4.firebasestorage.app",
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID="733989043363",
NEXT_PUBLIC_FIREBASE_APP_ID="1:733989043363:web:59a8bd63a3293cf43d5316"

// API setup
const API_KEY = "AIzaSyCkQTUtIgXPL77KWdxof1wo8KSINVOTYoQ";
const API_URL = https://generativelanguage.googleapis.com/v1/models/gemini-1.5-pro:generateContent?key=${API_KEY};


4. Run the application

      npm run dev


the app will be available at http://localhost:3000



## Tech Stack
      Frontend: Next.js

      Styling: Tailwind CSS

      Authentication: Firebase Authentication

      Chatbot / AI: Gemini API (Google AI Studio)