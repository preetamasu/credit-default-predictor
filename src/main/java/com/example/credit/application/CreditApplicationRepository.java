package com.example.credit.application;

import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Collection;
import java.util.List;
import java.util.UUID;

public interface CreditApplicationRepository extends JpaRepository<CreditApplication, UUID> {
    List<CreditApplication> findByCustomerId(UUID id);
}
