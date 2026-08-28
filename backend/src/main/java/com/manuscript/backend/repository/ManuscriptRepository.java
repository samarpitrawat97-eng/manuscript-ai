package com.manuscript.backend.repository;

import com.manuscript.backend.entity.Manuscript;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ManuscriptRepository extends JpaRepository<Manuscript, String> {
}