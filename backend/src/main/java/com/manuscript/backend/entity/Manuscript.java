package com.manuscript.backend.entity;

import jakarta.persistence.CollectionTable;
import jakarta.persistence.Column;
import jakarta.persistence.ElementCollection;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.FetchType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.PrePersist;
import jakarta.persistence.Table;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

@Entity
@Table(name = "manuscripts")
public class Manuscript {

    @Id
    @Column(nullable = false, unique = true)
    private String id;

    @Column(length = 500)
    private String title;

    @Column(length = 500)
    private String author;

    @Column(length = 100)
    private String language;

    @Column(length = 200)
    private String script;

    private Integer confidence;

    // ==============================
    // ORIGINAL AI OUTPUT
    // ==============================

    @Column(columnDefinition = "TEXT")
    private String aiExtractedText;

    @Column(columnDefinition = "TEXT")
    private String aiRedInk;

    @Column(columnDefinition = "TEXT")
    private String aiTranslation;

    @ElementCollection(fetch = FetchType.EAGER)
    @CollectionTable(
            name = "manuscript_ai_flagged_words",
            joinColumns = @JoinColumn(name = "manuscript_id")
    )
    @Column(name = "flagged_word")
    private List<String> aiFlaggedWords = new ArrayList<>();

    // ==============================
    // HUMAN VERIFIED OUTPUT
    // ==============================

    @Column(columnDefinition = "TEXT")
    private String verifiedExtractedText;

    @Column(columnDefinition = "TEXT")
    private String verifiedRedInk;

    @Column(columnDefinition = "TEXT")
    private String verifiedTranslation;

    @ElementCollection(fetch = FetchType.EAGER)
    @CollectionTable(
            name = "manuscript_verified_flagged_words",
            joinColumns = @JoinColumn(name = "manuscript_id")
    )
    @Column(name = "flagged_word")
    private List<String> verifiedFlaggedWords = new ArrayList<>();

    // ==============================
    // VERIFICATION METADATA
    // ==============================

    @Enumerated(EnumType.STRING)
    @Column(nullable = false, length = 30)
    private ManuscriptStatus status = ManuscriptStatus.REVIEW_REQUIRED;

    private LocalDateTime verifiedAt;

    @Column(length = 255)
    private String verifiedBy;

    public Manuscript() {
    }

    @PrePersist
    public void generateId() {
        if (id == null || id.isBlank()) {
            id = UUID.randomUUID().toString();
        }

        if (status == null) {
            status = ManuscriptStatus.REVIEW_REQUIRED;
        }
    }

    // ==============================
    // BASIC METADATA
    // ==============================

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getAuthor() {
        return author;
    }

    public void setAuthor(String author) {
        this.author = author;
    }

    public String getLanguage() {
        return language;
    }

    public void setLanguage(String language) {
        this.language = language;
    }

    public String getScript() {
        return script;
    }

    public void setScript(String script) {
        this.script = script;
    }

    public Integer getConfidence() {
        return confidence;
    }

    public void setConfidence(Integer confidence) {
        this.confidence = confidence;
    }

    // ==============================
    // AI OUTPUT
    // ==============================

    public String getAiExtractedText() {
        return aiExtractedText;
    }

    public void setAiExtractedText(String aiExtractedText) {
        this.aiExtractedText = aiExtractedText;
    }

    public String getAiRedInk() {
        return aiRedInk;
    }

    public void setAiRedInk(String aiRedInk) {
        this.aiRedInk = aiRedInk;
    }

    public String getAiTranslation() {
        return aiTranslation;
    }

    public void setAiTranslation(String aiTranslation) {
        this.aiTranslation = aiTranslation;
    }

    public List<String> getAiFlaggedWords() {
        return aiFlaggedWords;
    }

    public void setAiFlaggedWords(List<String> aiFlaggedWords) {
        this.aiFlaggedWords = aiFlaggedWords != null
                ? aiFlaggedWords
                : new ArrayList<>();
    }

    // ==============================
    // VERIFIED OUTPUT
    // ==============================

    public String getVerifiedExtractedText() {
        return verifiedExtractedText;
    }

    public void setVerifiedExtractedText(String verifiedExtractedText) {
        this.verifiedExtractedText = verifiedExtractedText;
    }

    public String getVerifiedRedInk() {
        return verifiedRedInk;
    }

    public void setVerifiedRedInk(String verifiedRedInk) {
        this.verifiedRedInk = verifiedRedInk;
    }

    public String getVerifiedTranslation() {
        return verifiedTranslation;
    }

    public void setVerifiedTranslation(String verifiedTranslation) {
        this.verifiedTranslation = verifiedTranslation;
    }

    public List<String> getVerifiedFlaggedWords() {
        return verifiedFlaggedWords;
    }

    public void setVerifiedFlaggedWords(List<String> verifiedFlaggedWords) {
        this.verifiedFlaggedWords = verifiedFlaggedWords != null
                ? verifiedFlaggedWords
                : new ArrayList<>();
    }

    // ==============================
    // VERIFICATION METADATA
    // ==============================

    public ManuscriptStatus getStatus() {
        return status;
    }

    public void setStatus(ManuscriptStatus status) {
        this.status = status;
    }

    public LocalDateTime getVerifiedAt() {
        return verifiedAt;
    }

    public void setVerifiedAt(LocalDateTime verifiedAt) {
        this.verifiedAt = verifiedAt;
    }

    public String getVerifiedBy() {
        return verifiedBy;
    }

    public void setVerifiedBy(String verifiedBy) {
        this.verifiedBy = verifiedBy;
    }
}