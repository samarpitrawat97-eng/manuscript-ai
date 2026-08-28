package com.manuscript.backend.dto;

import java.util.List;

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