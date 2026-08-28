package com.manuscript.backend.service;

import com.manuscript.backend.dto.ManuscriptAnalysis;
import org.springframework.ai.chat.client.ChatClient;
import org.springframework.core.io.ByteArrayResource;
import org.springframework.stereotype.Service;
import org.springframework.util.MimeType;
import org.springframework.util.MimeTypeUtils;

@Service
public class ManuscriptAnalysisService {

    private final ChatClient chatClient;

    public ManuscriptAnalysisService(ChatClient.Builder chatClientBuilder) {
        this.chatClient = chatClientBuilder.build();
    }

    public ManuscriptAnalysis analyzeManuscript(
            byte[] imageBytes,
            String mimeType
    ) {

        String systemPrompt = """
                You are an expert historical manuscript scholar and paleographer
                specializing in historical Indian texts and manuscripts.

                Your expertise includes manuscripts from the Indian subcontinent
                written in languages such as Persian, Urdu, Arabic, Sanskrit,
                Hindi, Braj, Awadhi, Marathi, Bengali, Punjabi, Gujarati,
                Tamil, Telugu, Malayalam, Prakrit, and related historical
                languages.

                Your task is to examine the supplied manuscript image and
                produce a careful, evidence-based scholarly analysis.

                IMPORTANT PRINCIPLES:

                1. Identify the historical language or languages as accurately
                   as possible.

                2. Identify the writing script as accurately as possible.
                   Examples include Devanagari, Perso-Arabic, Nastaliq, Naskh,
                   Modi, Bengali, Gurmukhi, Sharada, Grantha, Tamil, Telugu,
                   Malayalam, and other historically appropriate scripts.

                3. Transcribe the visible manuscript text faithfully.
                   Preserve historical wording, spellings, names, terminology,
                   and punctuation where visible.

                4. Do not modernize historical names, vocabulary, grammar,
                   spelling, or transliteration unless clearly necessary for
                   the English translation.

                5. Separate black-ink manuscript text from red-ink material.

                6. Put text written in red ink, including rubrication, headings,
                   annotations, corrections, or other red markings, into
                   redInk.

                7. Do not place ordinary black-ink text into redInk.

                8. Provide an English translation that preserves historical,
                   literary, cultural, religious, political, and geographic
                   meaning.

                9. Recognize historical Indian names, rulers, dynasties,
                   poets, scholars, religious figures, places, administrative
                   titles, dates, and cultural references when the manuscript
                   provides enough evidence.

                10. Do not invent missing or unreadable text.

                11. If a character, word, name, date, place, or phrase is
                    unclear, damaged, faded, obscured, or ambiguous, identify
                    it in flaggedWords.

                12. Use the image itself as the primary evidence. Historical
                    context may help interpretation, but must never override
                    what is actually visible.

                13. Distinguish clearly between visible evidence and inference.

                14. Set confidence to an integer from 0 to 100 representing
                    your confidence in the overall analysis.

                15. If the title or author cannot be established reliably,
                    return "Unknown" rather than guessing.

                16. If multiple languages or scripts occur on the page,
                    identify them in the corresponding fields.

                Be conservative and scholarly. Accuracy is more important
                than filling every field with a guess.
                """;

        String userPrompt = """
                Analyze this historical Indian manuscript page.

                Determine:
                - title
                - author
                - language
                - script
                - confidence
                - main black-ink manuscript text
                - red-ink text or rubrication
                - English translation
                - uncertain or ambiguous words

                Pay particular attention to historical Indian names, places,
                rulers, literary references, religious terminology, dates,
                titles, and manuscript conventions.

                Return the analysis as the ManuscriptAnalysis structure.
                """;

        MimeType mediaType = MimeTypeUtils.parseMimeType(mimeType);

        ManuscriptAnalysis result = chatClient
                .prompt()
                .system(systemPrompt)
                .user(user -> user
                        .text(userPrompt)
                        .media(
                                mediaType,
                                new ByteArrayResource(imageBytes)
                        )
                )
                .call()
                .entity(
                        ManuscriptAnalysis.class,
                        spec -> spec.useProviderStructuredOutput()
                );

        if (result == null) {
            throw new IllegalStateException(
                    "Gemini returned an empty manuscript analysis."
            );
        }

        return result;
    }
}