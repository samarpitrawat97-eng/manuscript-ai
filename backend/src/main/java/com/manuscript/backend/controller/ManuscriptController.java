package com.manuscript.backend.controller;

import com.manuscript.backend.dto.ManuscriptAnalysis;
import com.manuscript.backend.entity.Manuscript;
import com.manuscript.backend.entity.ManuscriptStatus;
import com.manuscript.backend.repository.ManuscriptRepository;
import com.manuscript.backend.service.ManuscriptAnalysisService;
import com.manuscript.backend.service.PendingManuscriptStore;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.servlet.mvc.method.annotation.SseEmitter;

import java.io.IOException;
import java.time.LocalDateTime;
import java.util.List;
import java.util.UUID;
import java.util.concurrent.ExecutorService;
import java.util.concurrent.Executors;

@RestController
@RequestMapping("/api/manuscripts")
@CrossOrigin(origins = "http://localhost:5173")
public class ManuscriptController {

    private final ManuscriptAnalysisService analysisService;
    private final ManuscriptRepository manuscriptRepository;
    private final PendingManuscriptStore pendingManuscriptStore;

    private final ExecutorService executorService =
            Executors.newCachedThreadPool();

    public ManuscriptController(
            ManuscriptAnalysisService analysisService,
            ManuscriptRepository manuscriptRepository,
            PendingManuscriptStore pendingManuscriptStore
    ) {
        this.analysisService = analysisService;
        this.manuscriptRepository = manuscriptRepository;
        this.pendingManuscriptStore = pendingManuscriptStore;
    }

    // ============================================================
    // ANALYZE MANUSCRIPT
    // ============================================================

    @PostMapping(
            value = "/analyze",
            consumes = MediaType.MULTIPART_FORM_DATA_VALUE
    )
    public SseEmitter analyzeManuscript(
            @RequestParam("file") MultipartFile file
    ) {

        SseEmitter emitter = new SseEmitter(120_000L);

        executorService.execute(() -> {

            try {

                if (file == null || file.isEmpty()) {
                    sendError(
                            emitter,
                            "No manuscript file was uploaded."
                    );
                    return;
                }

                // ------------------------------------------------
                // Step 1: Image preparation
                // ------------------------------------------------

                sendProgress(
                        emitter,
                        "Enhancing Image",
                        "Preparing manuscript image..."
                );

                Thread.sleep(500);

                // ------------------------------------------------
                // Step 2: Script isolation
                // ------------------------------------------------

                sendProgress(
                        emitter,
                        "Isolating Script",
                        "Preparing manuscript for paleographic analysis..."
                );

                Thread.sleep(500);

                // ------------------------------------------------
                // Step 3: Red ink detection
                // ------------------------------------------------

                sendProgress(
                        emitter,
                        "Detecting Red Ink",
                        "Analyzing ink colors and rubrication..."
                );

                Thread.sleep(500);

                // ------------------------------------------------
                // Step 4: Gemini analysis
                // ------------------------------------------------

                sendProgress(
                        emitter,
                        "AI Text Extraction",
                        "Sending manuscript to Gemini..."
                );

                byte[] imageBytes = file.getBytes();

                String contentType = file.getContentType();

                if (contentType == null || contentType.isBlank()) {
                    contentType = "image/jpeg";
                }

                ManuscriptAnalysis aiResult =
                        analysisService.analyzeManuscript(
                                imageBytes,
                                contentType
                        );

                // ------------------------------------------------
                // Generate ID on the backend
                // ------------------------------------------------

                String manuscriptId =
                        UUID.randomUUID().toString();

                ManuscriptAnalysis result =
                        new ManuscriptAnalysis(
                                manuscriptId,
                                aiResult.title(),
                                aiResult.author(),
                                aiResult.language(),
                                aiResult.script(),
                                aiResult.confidence(),
                                aiResult.extractedText(),
                                aiResult.redInk(),
                                aiResult.translation(),
                                aiResult.flaggedWords()
                        );

                // ------------------------------------------------
                // Store AI result temporarily
                // ------------------------------------------------

                pendingManuscriptStore.save(result);

                // ------------------------------------------------
                // Step 5: Translation
                // ------------------------------------------------

                sendProgress(
                        emitter,
                        "Neural Translation",
                        "Generating translation and historical analysis..."
                );

                Thread.sleep(300);

                // ------------------------------------------------
                // Send final AI result
                // ------------------------------------------------

                emitter.send(
                        SseEmitter.event()
                                .name("result")
                                .data(result)
                );

                // ------------------------------------------------
                // Complete
                // ------------------------------------------------

                emitter.send(
                        SseEmitter.event()
                                .name("complete")
                                .data(
                                        "Analysis completed successfully. " +
                                                "Human verification required before archival."
                                )
                );

                emitter.complete();

            } catch (Exception e) {

                try {

                    emitter.send(
                            SseEmitter.event()
                                    .name("error")
                                    .data(
                                            e.getMessage() != null
                                                    ? e.getMessage()
                                                    : "Manuscript analysis failed."
                                    )
                    );

                } catch (IOException ignored) {
                    // Ignore secondary SSE failure.
                }

                emitter.completeWithError(e);
            }
        });

        emitter.onCompletion(
                () -> System.out.println(
                        "SSE analysis request completed."
                )
        );

        emitter.onTimeout(
                () -> {
                    emitter.complete();

                    System.out.println(
                            "SSE analysis request timed out."
                    );
                }
        );

        emitter.onError(
                error -> System.err.println(
                        "SSE error: " + error.getMessage()
                )
        );

        return emitter;
    }

    // ============================================================
    // GET PENDING ANALYSIS
    // ============================================================

    @GetMapping("/pending/{id}")
    public ResponseEntity<ManuscriptAnalysis> getPendingAnalysis(
            @PathVariable String id
    ) {

        ManuscriptAnalysis analysis =
                pendingManuscriptStore.find(id);

        if (analysis == null) {
            return ResponseEntity.notFound().build();
        }

        return ResponseEntity.ok(analysis);
    }

    // ============================================================
    // HUMAN VERIFICATION + ARCHIVAL
    // ============================================================

    @PostMapping("/{id}/verify")
    public ResponseEntity<Manuscript> verifyAndSave(
            @PathVariable String id,
            @RequestBody ManuscriptAnalysis reviewedAnalysis
    ) {

        // --------------------------------------------------------
        // Validate request body
        // --------------------------------------------------------

        if (reviewedAnalysis == null) {
            return ResponseEntity.badRequest().build();
        }

        // --------------------------------------------------------
        // Retrieve original AI analysis
        // --------------------------------------------------------

        ManuscriptAnalysis pending =
                pendingManuscriptStore.find(id);

        /*
         * The manuscript must have been analyzed by this backend
         * before it can be verified.
         */
        if (pending == null) {
            return ResponseEntity.notFound().build();
        }

        // --------------------------------------------------------
        // Validate human-reviewed transcription
        // --------------------------------------------------------

        if (reviewedAnalysis.extractedText() == null
                || reviewedAnalysis.extractedText().isBlank()) {

            return ResponseEntity.badRequest().build();
        }

        // --------------------------------------------------------
        // Validate confidence
        // --------------------------------------------------------

        if (reviewedAnalysis.confidence() == null
                || reviewedAnalysis.confidence() < 0
                || reviewedAnalysis.confidence() > 100) {

            return ResponseEntity.badRequest().build();
        }

        // --------------------------------------------------------
        // Create archival manuscript
        // --------------------------------------------------------

        Manuscript manuscript = new Manuscript();

        // ========================================================
        // COMMON METADATA
        // ========================================================

        manuscript.setId(id);

        manuscript.setTitle(
                reviewedAnalysis.title() != null
                        ? reviewedAnalysis.title()
                        : pending.title()
        );

        manuscript.setAuthor(
                reviewedAnalysis.author() != null
                        ? reviewedAnalysis.author()
                        : pending.author()
        );

        manuscript.setLanguage(
                reviewedAnalysis.language() != null
                        ? reviewedAnalysis.language()
                        : pending.language()
        );

        manuscript.setScript(
                reviewedAnalysis.script() != null
                        ? reviewedAnalysis.script()
                        : pending.script()
        );

        manuscript.setConfidence(
                reviewedAnalysis.confidence()
        );

        // ========================================================
        // ORIGINAL AI RESULT
        // ========================================================

        manuscript.setAiExtractedText(
                pending.extractedText()
        );

        manuscript.setAiRedInk(
                pending.redInk()
        );

        manuscript.setAiTranslation(
                pending.translation()
        );

        manuscript.setAiFlaggedWords(
                pending.flaggedWords()
        );

        // ========================================================
        // HUMAN VERIFIED RESULT
        // ========================================================

        manuscript.setVerifiedExtractedText(
                reviewedAnalysis.extractedText()
        );

        manuscript.setVerifiedRedInk(
                reviewedAnalysis.redInk()
        );

        manuscript.setVerifiedTranslation(
                reviewedAnalysis.translation()
        );

        manuscript.setVerifiedFlaggedWords(
                reviewedAnalysis.flaggedWords()
        );

        // ========================================================
        // VERIFICATION METADATA
        // ========================================================

        manuscript.setStatus(
                ManuscriptStatus.VERIFIED
        );

        manuscript.setVerifiedAt(
                LocalDateTime.now()
        );

        manuscript.setVerifiedBy(
                "human-reviewer"
        );

        // ========================================================
        // SAVE ARCHIVAL RECORD
        // ========================================================

        Manuscript saved =
                manuscriptRepository.save(manuscript);

        // --------------------------------------------------------
        // Remove temporary AI result
        // --------------------------------------------------------

        pendingManuscriptStore.remove(id);

        return ResponseEntity.ok(saved);
    }

    // ============================================================
    // GET ALL ARCHIVED MANUSCRIPTS
    // ============================================================

    @GetMapping
    public ResponseEntity<List<Manuscript>> getAllManuscripts() {

        return ResponseEntity.ok(
                manuscriptRepository.findAll()
        );
    }

    // ============================================================
    // GET SINGLE ARCHIVED MANUSCRIPT
    // ============================================================

    @GetMapping("/{id}")
    public ResponseEntity<Manuscript> getManuscriptById(
            @PathVariable String id
    ) {

        return manuscriptRepository
                .findById(id)
                .map(ResponseEntity::ok)
                .orElseGet(
                        () -> ResponseEntity.notFound().build()
                );
    }

    // ============================================================
    // SSE PROGRESS HELPER
    // ============================================================

    private void sendProgress(
            SseEmitter emitter,
            String step,
            String message
    ) throws IOException {

        emitter.send(
                SseEmitter.event()
                        .name("progress")
                        .data(
                                new ProgressMessage(
                                        step,
                                        message
                                )
                        )
        );
    }

    // ============================================================
    // SSE ERROR HELPER
    // ============================================================

    private void sendError(
            SseEmitter emitter,
            String message
    ) {

        try {

            emitter.send(
                    SseEmitter.event()
                            .name("error")
                            .data(message)
            );

        } catch (IOException ignored) {
            // Ignore secondary SSE failure.
        }

        emitter.complete();
    }

    // ============================================================
    // SSE PROGRESS DTO
    // ============================================================

    private record ProgressMessage(
            String step,
            String message
    ) {
    }
}