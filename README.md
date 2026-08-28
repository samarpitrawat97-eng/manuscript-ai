# Manuscript AI

> AI-assisted digitization and preservation of historical Indian manuscripts.

Manuscript AI is a full-stack application designed to help researchers, historians, and archivists analyze historical manuscript images using multimodal AI.

The system accepts a manuscript image, analyzes its language and script, extracts the visible text, identifies red-ink annotations/rubrication, produces an English translation, flags uncertain readings, and sends the result through a human-verification workflow before archival.

---

## ✨ Features

- 📜 Historical manuscript image upload
- 🤖 Multimodal AI manuscript analysis using Google Gemini
- 🔤 Language and script identification
- 📝 AI-assisted manuscript transcription
- 🔴 Red-ink / rubrication extraction
- 🌍 English translation
- ⚠️ Uncertain-reading detection with flagged words
- 📊 AI confidence scoring
- 👤 Human-in-the-loop review and verification
- 🧾 Preservation of both AI-generated and human-verified results
- 📡 Real-time processing updates using Server-Sent Events (SSE)
- 🗄️ Manuscript archival using Spring Data JPA + H2
- 🌑 Dark historical/archival user interface

---

# 🏛️ Architecture

```text
                    ┌─────────────────────┐
                    │     React / Vite    │
                    │      Frontend       │
                    └──────────┬──────────┘
                               │
                         HTTP / SSE
                               │
                               ▼
                    ┌─────────────────────┐
                    │   Spring Boot API   │
                    │       :8080         │
                    └──────────┬──────────┘
                               │
              ┌────────────────┼────────────────┐
              │                │                │
              ▼                ▼                ▼
        Gemini AI         JPA Repository     SSE Stream
              │                │
              ▼                ▼
       Manuscript DTO        H2 Database
🧠 AI Processing Pipeline
A manuscript follows this workflow:
Manuscript Image
       │
       ▼
Image Upload
       │
       ▼
Gemini Multimodal Analysis
       │
       ├── Language
       ├── Script
       ├── Title
       ├── Author
       ├── Transcription
       ├── Red Ink
       ├── Translation
       ├── Confidence
       └── Flagged Words
       │
       ▼
Human Review
       │
       ▼
Verification
       │
       ▼
Permanent Archive
The system is intentionally human-in-the-loop. AI-generated manuscript readings are not treated as final scholarly truth.
🛠️ Tech Stack
Backend
Java 26
Spring Boot 4.1.1
Spring AI 2.0.1
Google Gemini API
Spring Web
Server-Sent Events (SSE)
Spring Data JPA
Hibernate
H2 Database
Maven
Lombok
Frontend
React
Vite
Tailwind CSS
Lucide React
Framer Motion
📁 Project Structure
manuscript-ai/
│
├── backend/
│   ├── pom.xml
│   ├── mvnw
│   ├── mvnw.cmd
│   │
│   └── src/
│       ├── main/
│       │   ├── java/
│       │   │   └── com/manuscript/backend/
│       │   │       ├── BackendApplication.java
│       │   │       │
│       │   │       ├── controller/
│       │   │       │   └── ManuscriptController.java
│       │   │       │
│       │   │       ├── dto/
│       │   │       │   └── ManuscriptAnalysis.java
│       │   │       │
│       │   │       ├── entity/
│       │   │       │   ├── Manuscript.java
│       │   │       │   └── ManuscriptStatus.java
│       │   │       │
│       │   │       ├── repository/
│       │   │       │   └── ManuscriptRepository.java
│       │   │       │
│       │   │       └── service/
│       │   │           ├── ManuscriptAnalysisService.java
│       │   │           └── PendingManuscriptStore.java
│       │   │
│       │   └── resources/
│       │       └── application.yml
│       │
│       └── test/
│
├── frontend/
│   ├── package.json
│   ├── vite.config.js
│   ├── tailwind.config.js
│   │
│   └── src/
│       ├── App.jsx
│       ├── api.js
│       ├── App.css
│       ├── index.css
│       │
│       ├── components/
│       │   ├── AIResult.jsx
│       │   ├── ManuscriptViewer.jsx
│       │   ├── Navbar.jsx
│       │   ├── ProcessingOverlay.jsx
│       │   ├── UploadZone.jsx
│       │   └── VerificationPanel.jsx
│       │
│       ├── data/
│       │   └── mockData.jsx
│       │
│       └── pages/
│           ├── AnalysisPage.jsx
│           ├── Dashboard.jsx
│           ├── Home.jsx
│           └── LandingPage.jsx
│
└── README.md
🚀 Getting Started
Prerequisites
Make sure you have:
Java 26
Maven Wrapper (included in the project)
Node.js and npm
A Google Gemini API key
🔐 Gemini API Key
The Gemini API key should never be committed to GitHub.
The backend expects the environment variable:
GEMINI_API_KEY
Set it in the terminal before starting the backend:
export GEMINI_API_KEY="YOUR_GEMINI_API_KEY"
Verify it without printing the key:
if [ -n "$GEMINI_API_KEY" ]; then
    echo "GEMINI KEY SET"
else
    echo "GEMINI KEY NOT SET"
fi
The application reads it from:
spring:
  ai:
    google:
      genai:
        api-key: ${GEMINI_API_KEY}
▶️ Running the Backend
From the project root:
cd backend
Compile:
./mvnw clean compile
Start Spring Boot:
./mvnw spring-boot:run
The backend runs at:
http://localhost:8080
▶️ Running the Frontend
Open a second terminal:
cd frontend
Install dependencies:
npm install
Start Vite:
npm run dev
The frontend normally runs at:
http://localhost:5173
🔌 API
Analyze Manuscript
POST /api/manuscripts/analyze
Consumes:
multipart/form-data
Request field:
file
Example:
curl -N \
  -X POST \
  http://localhost:8080/api/manuscripts/analyze \
  -F "file=@/path/to/manuscript.jpg"
The endpoint returns Server-Sent Events.
Possible event types:
progress
result
complete
error
Example progress:
event:progress
data:{"step":"Enhancing Image","message":"Preparing manuscript image..."}
Example AI result:
event:result
data:{
  "id":"...",
  "title":"...",
  "author":"...",
  "language":"Sanskrit",
  "script":"Devanagari",
  "confidence":85,
  "extractedText":"...",
  "redInk":"...",
  "translation":"...",
  "flaggedWords":[
    "..."
  ]
}
🔍 Pending Analysis
Get an analysis currently waiting for human verification:
GET /api/manuscripts/pending/{id}
Example:
curl http://localhost:8080/api/manuscripts/pending/YOUR_UUID
Pending analysis is currently stored in memory using PendingManuscriptStore.
✅ Human Verification
A manuscript is not automatically archived after AI analysis.
The reviewer submits the reviewed version using:
POST /api/manuscripts/{id}/verify
The backend:
Confirms that the manuscript exists in the pending store.
Validates the reviewed transcription.
Preserves the original AI output.
Stores the human-reviewed output.
Marks the manuscript as VERIFIED.
Records verification time.
Removes the temporary pending analysis.
🗄️ Archive
Get all archived manuscripts:
GET /api/manuscripts
Get a single archived manuscript:
GET /api/manuscripts/{id}
📊 Data Provenance
One of the core design decisions is preserving AI output separately from the final human-reviewed version.
The archived manuscript stores:
AI
├── aiExtractedText
├── aiRedInk
├── aiTranslation
└── aiFlaggedWords

HUMAN VERIFIED
├── verifiedExtractedText
├── verifiedRedInk
├── verifiedTranslation
└── verifiedFlaggedWords
This prevents the original AI interpretation from being silently overwritten.
🏷️ Verification Status
Manuscripts currently support:
REVIEW_REQUIRED
VERIFIED
A manuscript only becomes VERIFIED through the verification endpoint.
The application therefore follows:
AI Analysis
      ↓
REVIEW_REQUIRED
      ↓
Human Review
      ↓
VERIFIED
🗃️ Database
The current development database is:
H2
JDBC URL:
jdbc:h2:mem:manuscriptdb
Credentials:
Username: sa
Password: password
H2 Console:
http://localhost:8080/h2-console
Important
The database is currently in-memory.
Restarting Spring Boot clears the database:
Backend restart
      ↓
H2 recreated
      ↓
Previously archived manuscripts removed
This is intentional for the current development stage.
🎨 Frontend Design
The frontend uses a dark digital-heritage aesthetic inspired by historical archives.
Visual direction:
Deep black/brown backgrounds
Gold accent colors
Parchment-style manuscript text
Red highlights for rubrication
Serif typography for historical content
Modern controls for the application interface
🧪 Testing
The backend has been manually tested through the following complete workflow:
Real manuscript image
        ↓
Multipart upload
        ↓
Spring Boot
        ↓
Gemini multimodal analysis
        ↓
Structured ManuscriptAnalysis
        ↓
Backend-generated UUID
        ↓
Pending analysis store
        ↓
Human verification
        ↓
H2 archive
A real Sanskrit/Devanagari manuscript image has been successfully processed through this pipeline.
⚠️ Current Limitations
This is currently a development-stage application.
Known limitations include:
H2 is in-memory and not persistent across restarts.
Pending analyses are stored in memory.
Reviewer identity is currently represented by a placeholder rather than a real authenticated user account.
Professional reviewer credential verification is not implemented.
AI transcription can contain errors and requires human review.
OCR/OpenCV preprocessing is not currently implemented.
Grayscale processing is intentionally not forced because manuscript color information can be important for red-ink detection.
Production authentication and authorization are not yet implemented.
The Gemini free tier has request limits.
🔮 Future Improvements
Potential future work:
Persistent database such as PostgreSQL
Persistent pending-review records
Reviewer accounts and authentication
Role-based scholarly permissions
Reviewer notes and audit history
Advanced manuscript image viewer
Zoom and pan controls
Optional image enhancement pipelines
OpenCV preprocessing
Contrast/sharpening tools
Grayscale analysis as an optional secondary pipeline
Multiple manuscript pages per document
Manuscript collections and cataloguing
Search across archived transcriptions
Export to PDF / TEI XML / JSON
Cloud storage for manuscript images
Production deployment
🔒 Security
Never commit API keys or other secrets.
Use environment variables such as:
export GEMINI_API_KEY="..."
Do not put secrets directly inside:
application.yml
Java source files
React source files
README.md
Git history
The frontend must never contain the Gemini API key.
📜 Project Philosophy
Manuscript AI is designed as an AI-assisted scholarly tool, not an autonomous authority.
The AI helps with:
Transcription
Translation
Script identification
Red-ink detection
Uncertainty detection
but the final archival record remains subject to human review and verification.
The system deliberately preserves both:
what the AI originally produced
and:
what the human reviewer approved
so the provenance of the digital transcription remains visible.
👥 Development
This project is currently being developed in separate frontend and backend layers.
Backend → Spring Boot / Gemini / JPA / H2
Frontend → React / Vite / Tailwind
Both applications communicate locally through:
Frontend:
http://localhost:5173

Backend:
http://localhost:8080
