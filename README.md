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
