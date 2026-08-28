package com.manuscript.backend.service;

import com.manuscript.backend.dto.ManuscriptAnalysis;
import org.springframework.stereotype.Service;

import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;

@Service
public class PendingManuscriptStore {

    private final Map<String, ManuscriptAnalysis> pendingAnalyses =
            new ConcurrentHashMap<>();

    public void save(ManuscriptAnalysis analysis) {
        pendingAnalyses.put(analysis.id(), analysis);
    }

    public ManuscriptAnalysis find(String id) {
        return pendingAnalyses.get(id);
    }

    public ManuscriptAnalysis remove(String id) {
        return pendingAnalyses.remove(id);
    }

    public boolean exists(String id) {
        return pendingAnalyses.containsKey(id);
    }
}