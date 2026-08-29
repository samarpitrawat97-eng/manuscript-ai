# Manuscript AI

> AI-assisted digitization, analysis, translation, and preservation of historical Indian manuscripts.

Manuscript AI is a full-stack application designed to help researchers, historians, archivists, and scholars analyze historical manuscript images using multimodal AI.

The application accepts a manuscript image, analyzes its language and script, extracts visible text, identifies red-ink annotations and rubrication, generates an English translation, flags uncertain readings, and sends the result through a human-in-the-loop verification workflow before archival.

---

## Features

- Historical manuscript image upload
- Multimodal AI manuscript analysis using Google Gemini
- Language identification
- Script identification
- AI-assisted manuscript transcription
- Red-ink and rubrication detection
- English translation
- Uncertain-reading detection
- Flagged-word generation
- AI confidence scoring
- Real-time processing updates using Server-Sent Events (SSE)
- Human-in-the-loop manuscript review
- Editable AI transcription before archival
- Preservation of original AI output
- Preservation of human-verified output
- Verification status and timestamp
- H2 database archival
- Historical/digital-heritage themed interface

---

## Architecture

```text
                    ┌────────────────────────┐
                    │      React / Vite      │
                    │       Frontend         │
                    └────────────┬───────────┘
                                 │
                            HTTP / SSE
                                 │
                                 ▼
                    ┌────────────────────────┐
                    │     Spring Boot API    │
                    │        :8080            │
                    └────────────┬───────────┘
                                 │
                 ┌───────────────┼────────────────┐
                 │               │                │
                 ▼               ▼                ▼
          Google Gemini     Spring Data JPA      SSE
          Multimodal AI         │
                 │               ▼
                 │           H2 Database
                 ▼
        Structured Analysis
```

---

## AI Processing Pipeline

```text
Manuscript Image
       │
       ▼
Multipart Upload
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
       ├── Correct transcription
       ├── Correct red-ink reading
       ├── Correct translation
       └── Review flagged words
       │
       ▼
Human Verification
       │
       ▼
Permanent Archive
```

The system is intentionally human-in-the-loop. AI-generated readings are not automatically treated as final scholarly truth.

---

## Tech Stack

### Backend

- Java 26
- Spring Boot 4.1.1
- Spring AI 2.0.1
- Google Gemini API
- Gemini `gemini-2.5-flash`
- Spring Web
- Server-Sent Events (SSE)
- Spring Data JPA
- Hibernate
- H2 Database
- Maven
- Lombok

### Frontend

- React
- Vite
- Tailwind CSS
- Lucide React
- Framer Motion

---

## Project Structure

```text
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
│   ├── postcss.config.js
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
```

---

## Getting Started

### Prerequisites

Make sure you have:

- Java 26
- Node.js
- npm
- Git
- A Google Gemini API key

---

## Gemini API Key

The Gemini API key must **not** be committed to GitHub.

The backend expects:

```text
GEMINI_API_KEY
```

Set the environment variable before starting Spring Boot:

```bash
export GEMINI_API_KEY="YOUR_GEMINI_API_KEY"
```

Verify it without printing the key:

```bash
if [ -n "$GEMINI_API_KEY" ]; then
    echo "GEMINI KEY SET"
else
    echo "GEMINI KEY NOT SET"
fi
```

The backend reads the key from:

```yaml
spring:
  ai:
    google:
      genai:
        api-key: ${GEMINI_API_KEY}
```

Never place the actual API key directly inside:

- `application.yml`
- Java source files
- React source files
- `README.md`
- GitHub repositories

---

## Running the Backend

From the project root:

```bash
cd backend
```

Compile the backend:

```bash
./mvnw clean compile
```

Start Spring Boot:

```bash
./mvnw spring-boot:run
```

The backend runs at:

```text
http://localhost:8080
```

Successful startup should contain:

```text
Started BackendApplication
```

---

## Running the Frontend

Open a second terminal:

```bash
cd frontend
```

Install dependencies:

```bash
npm install
```

Start Vite:

```bash
npm run dev
```

The frontend normally runs at:

```text
http://localhost:5173
```

---

## API

### Analyze Manuscript

```http
POST /api/manuscripts/analyze
```

Consumes:

```text
multipart/form-data
```

Request field:

```text
file
```

Example:

```bash
curl -N \
  -X POST \
  http://localhost:8080/api/manuscripts/analyze \
  -F "file=@/path/to/manuscript.jpg"
```

The endpoint returns Server-Sent Events.

Possible event types:

```text
progress
result
complete
error
```

Example progress event:

```text
event:progress
data:{"step":"Enhancing Image","message":"Preparing manuscript image..."}
```

The processing stages are:

```text
Enhancing Image
Isolating Script
Detecting Red Ink
AI Text Extraction
Neural Translation
```

The final analysis is sent as:

```text
event:result
data:{...}
```

---

## Manuscript Analysis Response

The structured AI result is represented by:

```java
public record ManuscriptAnalysis(
        String id,
        String title,
        String author,
        String language,
        String script,
        Integer confidence,
        String extractedText,
        String redInk,
        String translation,
        List<String> flaggedWords
) {
}
```

Example:

```json
{
  "id": "86586b87-8133-4aae-bb1b-0841e503bec8",
  "title": "Unknown",
  "author": "Unknown",
  "language": "Sanskrit (Vedic)",
  "script": "Devanagari",
  "confidence": 85,
  "extractedText": "...",
  "redInk": "श्री\nरु.आ.\n७५२",
  "translation": "...",
  "flaggedWords": [
    "uncertain reading"
  ]
}
```

The manuscript ID is generated by the backend rather than trusted from the AI response.

---

## Pending Manuscript Review

AI analysis results are temporarily stored before verification.

Get a pending analysis:

```http
GET /api/manuscripts/pending/{id}
```

Example:

```bash
curl http://localhost:8080/api/manuscripts/pending/YOUR_UUID
```

The pending data is currently managed by:

```text
PendingManuscriptStore
```

This is an in-memory store for the current development version.

---

## Human Verification

Manuscripts are **not automatically archived** after AI analysis.

The intended workflow is:

```text
AI Analysis
      ↓
REVIEW_REQUIRED
      ↓
Human Review
      ↓
POST /api/manuscripts/{id}/verify
      ↓
VERIFIED
      ↓
H2 Archive
```

Verification endpoint:

```http
POST /api/manuscripts/{id}/verify
```

The frontend sends the human-reviewed `ManuscriptAnalysis` object.

The backend:

1. Checks that the manuscript exists in the pending store.
2. Validates the reviewed transcription.
3. Preserves the original AI output.
4. Stores the reviewed version.
5. Marks the manuscript as `VERIFIED`.
6. Records the verification timestamp.
7. Removes the temporary pending analysis after archival.

---

## Data Provenance

One of the main design decisions is preserving both the AI interpretation and the final human-reviewed result.

The database stores:

```text
AI OUTPUT
├── aiExtractedText
├── aiRedInk
├── aiTranslation
└── aiFlaggedWords

HUMAN VERIFIED OUTPUT
├── verifiedExtractedText
├── verifiedRedInk
├── verifiedTranslation
└── verifiedFlaggedWords
```

This means:

```text
AI result ≠ human-approved result
```

The original AI interpretation is never silently destroyed.

This allows the system to preserve provenance for scholarly review.

---

## Verification Status

Current manuscript statuses:

```text
REVIEW_REQUIRED
VERIFIED
```

The intended workflow is:

```text
AI Analysis
    ↓
REVIEW_REQUIRED
    ↓
Human Review
    ↓
VERIFIED
```

Professional reviewer authentication and credential verification are not currently implemented.

The current reviewer identity is represented by a placeholder value:

```text
human-reviewer
```

---

## Archive API

Get all archived manuscripts:

```http
GET /api/manuscripts
```

Example:

```bash
curl http://localhost:8080/api/manuscripts
```

Get one archived manuscript:

```http
GET /api/manuscripts/{id}
```

Example:

```bash
curl http://localhost:8080/api/manuscripts/YOUR_UUID
```

---

## Database

The current development database is:

```text
H2
```

JDBC URL:

```text
jdbc:h2:mem:manuscriptdb
```

Username:

```text
sa
```

Password:

```text
password
```

H2 Console:

```text
http://localhost:8080/h2-console
```

### Important

The database currently runs entirely in memory.

That means:

```text
Restart Spring Boot
        ↓
H2 database recreated
        ↓
Previously stored records disappear
```

This is intentional for the current development stage.

---

## Frontend ↔ Backend Connection

The frontend communicates with:

```text
http://localhost:8080/api
```

The basic API configuration is:

```javascript
const API_BASE_URL = 'http://localhost:8080/api';
```

The backend allows the Vite development origin:

```text
http://localhost:5173
```

The frontend uses the backend for:

```text
POST /api/manuscripts/analyze
GET  /api/manuscripts/pending/{id}
POST /api/manuscripts/{id}/verify
GET  /api/manuscripts
GET  /api/manuscripts/{id}
```

---

## Frontend Workflow

The frontend is intended to follow this flow:

```text
Landing Page
      ↓
Dashboard
      ↓
Select Manuscript Image
      ↓
Upload to Backend
      ↓
Real SSE Processing Updates
      ↓
AI Analysis Page
      ↓
Review / Edit
      ↓
Review & Archive
      ↓
Verified Archive
```

The frontend should use the real backend response instead of relying on `mockData.jsx` for the live workflow.

---

## SSE Integration

The `/analyze` endpoint uses Server-Sent Events.

The frontend should respond to:

```text
progress
result
complete
error
```

For example:

```text
progress
    ↓
Update processing UI

result
    ↓
Store ManuscriptAnalysis

complete
    ↓
Finish processing state

error
    ↓
Show a friendly error message
```

The browser cannot use a normal `EventSource` for this endpoint because the analysis request is a `POST` with multipart form data. The frontend therefore reads the streaming response using `fetch()` and the response body stream.

---

## UI Design

The frontend uses a historical digital-heritage visual language.

Primary design characteristics:

- Deep dark background
- Gold/yellow accents
- Parchment-style text
- Red accents for manuscript ink
- Serif typography for historical content
- Modern UI controls
- Soft borders and archival styling

The primary accent colors include:

```text
Gold
Gold Light
Parchment
Red Ink
Dark Background
Secondary Background
```

---

## Historical Manuscript Support

The Gemini prompt is designed for historical Indian manuscripts and includes support for languages and scripts such as:

### Languages

- Sanskrit
- Hindi
- Persian
- Urdu
- Arabic
- Braj
- Awadhi
- Marathi
- Bengali
- Punjabi
- Gujarati
- Tamil
- Telugu
- Malayalam
- Prakrit
- Other historical languages of the Indian subcontinent

### Scripts

- Devanagari
- Perso-Arabic
- Nastaliq
- Naskh
- Modi
- Bengali
- Gurmukhi
- Sharada
- Grantha
- Tamil
- Telugu
- Malayalam
- Other historically appropriate scripts

The AI is instructed to avoid inventing unreadable text and to flag uncertain readings.

---

## Manuscript Image Processing

The current system does not force grayscale conversion.

This is intentional because color information can be important for:

- Red-ink identification
- Rubrication
- Annotations
- Headings
- Corrections
- Marginal markings

Possible future processing:

```text
Original color image
        ↓
Red-ink / visual analysis

Optional grayscale or contrast-enhanced image
        ↓
Text-reading assistance
```

OpenCV-based preprocessing is not currently part of the production pipeline.

---

## Testing

The backend has been manually tested using a real Sanskrit/Devanagari manuscript image.

The following workflow has been successfully tested:

```text
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
Pending analysis
        ↓
Human verification
        ↓
H2 archival record
```

The application has also successfully demonstrated preservation of:

```text
AI transcription
Human-verified transcription
AI red-ink extraction
Human-verified red-ink extraction
AI translation
Human-verified translation
AI flagged words
Human-verified flagged words
```

---

## Current Limitations

This is currently a development-stage application.

Known limitations include:

- H2 is an in-memory database.
- Pending analyses are stored in memory.
- Restarting the backend clears H2 and pending analyses.
- Reviewer authentication is not implemented.
- Professional reviewer credential verification is not implemented.
- Reviewer identity is currently represented by a placeholder.
- AI transcription can contain errors and requires human review.
- AI confidence is currently generated by the AI itself.
- OpenCV/image enhancement is not implemented.
- Grayscale preprocessing is not currently used.
- Production authentication and authorization are not implemented.
- Production cloud storage is not implemented.
- The Gemini free tier has request limits.
- The application has not yet been hardened for production deployment.

---

## Future Improvements

Potential future development includes:

- PostgreSQL or another persistent production database
- Persistent pending-review records
- Reviewer accounts
- Authentication and authorization
- Role-based scholarly permissions
- Reviewer credentials/profile
- Reviewer notes
- Audit history
- Version history for manuscript corrections
- AI confidence stored independently from reviewer decisions
- Advanced manuscript image viewer
- Zoom and pan controls
- Optional image enhancement
- OpenCV preprocessing
- Contrast and sharpening tools
- Optional grayscale analysis
- Multi-page manuscripts
- Manuscript collections
- Search across archived transcriptions
- TEI XML export
- PDF export
- JSON export
- Cloud manuscript image storage
- Production deployment

---

## Security

Never commit API keys or other secrets.

Use environment variables:

```bash
export GEMINI_API_KEY="..."
```

The repository should never contain a real Gemini key.

The `.gitignore` includes protection for common secret files:

```text
.env
.env.*
!.env.example
```

The Gemini API key must remain server-side.

The frontend must never contain the Gemini API key.

---

## Development Commands

### Backend

```bash
cd backend
./mvnw clean compile
./mvnw spring-boot:run
```

### Frontend

```bash
cd frontend
npm install
npm run dev
```

### Frontend Production Build

```bash
cd frontend
npm run build
```

---

## Local URLs

Frontend:

```text
http://localhost:5173
```

Backend:

```text
http://localhost:8080
```

API:

```text
http://localhost:8080/api
```

H2 Console:

```text
http://localhost:8080/h2-console
```

---

## API Summary

| Method | Endpoint | Purpose |
|---|---|---|
| POST | `/api/manuscripts/analyze` | Upload and analyze manuscript |
| GET | `/api/manuscripts/pending/{id}` | Retrieve pending AI analysis |
| POST | `/api/manuscripts/{id}/verify` | Human-review and archive manuscript |
| GET | `/api/manuscripts` | List archived manuscripts |
| GET | `/api/manuscripts/{id}` | Retrieve a single archived manuscript |

---

## Project Philosophy

Manuscript AI is intended to be an **AI-assisted scholarly tool**, not an autonomous authority.

The AI assists with:

```text
Transcription
Translation
Language identification
Script identification
Red-ink detection
Uncertainty detection
```

A human reviewer remains responsible for approving the final archival version.

The system deliberately preserves:

```text
What the AI originally produced
```

and:

```text
What the human reviewer approved
```

This creates a clear distinction between AI assistance and final scholarly interpretation.

---

## Current Development Status

```text
Backend
✅ Java 26
✅ Spring Boot 4.1.1
✅ Spring AI 2.0.1
✅ Google Gemini integration
✅ Gemini multimodal manuscript analysis
✅ Multipart image upload
✅ SSE progress updates
✅ Structured AI output
✅ Backend-generated manuscript UUID
✅ Pending review storage
✅ Human verification workflow
✅ AI output preservation
✅ Human output preservation
✅ H2 persistence
✅ H2 Console

Frontend
✅ React / Vite application
✅ Manuscript upload
✅ Backend API connection
✅ SSE processing display
✅ Real AI result display
✅ Human review/editing
✅ Verification and archival
✅ Archive display

Remaining long-term work
⏳ Production database
⏳ Persistent pending reviews
⏳ Reviewer authentication
⏳ Professional reviewer roles
⏳ Advanced manuscript viewer
⏳ Image enhancement pipeline
⏳ Production deployment
```

---

## License

The project's final open-source license has not yet been selected.

Add the appropriate license here when the project is ready for release.
