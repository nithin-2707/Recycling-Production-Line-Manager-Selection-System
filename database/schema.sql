-- ============================================
-- Recycling Production Line Manager Selection System
-- MySQL Database Schema
-- ============================================

-- Drop existing tables if they exist
DROP TABLE IF EXISTS rankings;
DROP TABLE IF EXISTS evaluations;
DROP TABLE IF EXISTS candidate_certifications;
DROP TABLE IF EXISTS candidate_skills;
DROP TABLE IF EXISTS candidates;

-- ============================================
-- Table: candidates
-- Stores basic candidate information
-- ============================================
CREATE TABLE candidates (
    id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    phone VARCHAR(20),
    experience_years INT NOT NULL CHECK (experience_years >= 0),
    location VARCHAR(255),
    education VARCHAR(255),
    current_role VARCHAR(255),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    
    INDEX idx_email (email),
    INDEX idx_experience (experience_years),
    INDEX idx_created_at (created_at)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ============================================
-- Table: candidate_skills
-- Stores skills for each candidate (many-to-many relationship)
-- ============================================
CREATE TABLE candidate_skills (
    id INT PRIMARY KEY AUTO_INCREMENT,
    candidate_id INT NOT NULL,
    skill_name VARCHAR(255) NOT NULL,
    
    FOREIGN KEY (candidate_id) REFERENCES candidates(id) ON DELETE CASCADE,
    INDEX idx_candidate_id (candidate_id),
    INDEX idx_skill_name (skill_name)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ============================================
-- Table: candidate_certifications
-- Stores certifications for each candidate
-- ============================================
CREATE TABLE candidate_certifications (
    id INT PRIMARY KEY AUTO_INCREMENT,
    candidate_id INT NOT NULL,
    certification_name VARCHAR(255) NOT NULL,
    issue_date DATE,
    expiry_date DATE,
    
    FOREIGN KEY (candidate_id) REFERENCES candidates(id) ON DELETE CASCADE,
    INDEX idx_candidate_id (candidate_id),
    INDEX idx_certification_name (certification_name)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ============================================
-- Table: evaluations
-- Stores AI evaluation scores for each candidate
-- ============================================
CREATE TABLE evaluations (
    id INT PRIMARY KEY AUTO_INCREMENT,
    candidate_id INT NOT NULL,
    crisis_management_score DECIMAL(5,2) NOT NULL CHECK (crisis_management_score >= 0 AND crisis_management_score <= 100),
    sustainability_score DECIMAL(5,2) NOT NULL CHECK (sustainability_score >= 0 AND sustainability_score <= 100),
    team_motivation_score DECIMAL(5,2) NOT NULL CHECK (team_motivation_score >= 0 AND team_motivation_score <= 100),
    overall_score DECIMAL(5,2) GENERATED ALWAYS AS (
        (crisis_management_score * 0.35 + 
         sustainability_score * 0.35 + 
         team_motivation_score * 0.30)
    ) STORED,
    evaluation_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    evaluator_type ENUM('AI', 'Human', 'Hybrid') DEFAULT 'AI',
    notes TEXT,
    
    FOREIGN KEY (candidate_id) REFERENCES candidates(id) ON DELETE CASCADE,
    INDEX idx_candidate_id (candidate_id),
    INDEX idx_overall_score (overall_score),
    INDEX idx_evaluation_date (evaluation_date)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ============================================
-- Table: rankings
-- Auto-updated rankings based on evaluation scores
-- ============================================
CREATE TABLE rankings (
    id INT PRIMARY KEY AUTO_INCREMENT,
    candidate_id INT NOT NULL UNIQUE,
    rank_position INT NOT NULL,
    overall_score DECIMAL(5,2) NOT NULL,
    category ENUM('Exceptional', 'Excellent', 'Very Good', 'Good', 'Acceptable', 'Not Recommended') NOT NULL,
    last_updated TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    
    FOREIGN KEY (candidate_id) REFERENCES candidates(id) ON DELETE CASCADE,
    INDEX idx_rank_position (rank_position),
    INDEX idx_category (category),
    INDEX idx_overall_score (overall_score)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ============================================
-- Trigger: Auto-update rankings after evaluation insert/update
-- ============================================
DELIMITER $$

CREATE TRIGGER update_rankings_after_evaluation_insert
AFTER INSERT ON evaluations
FOR EACH ROW
BEGIN
    -- Delete existing ranking for this candidate
    DELETE FROM rankings WHERE candidate_id = NEW.candidate_id;
    
    -- Insert new ranking
    INSERT INTO rankings (candidate_id, rank_position, overall_score, category)
    SELECT 
        NEW.candidate_id,
        0, -- Will be updated by the ranking procedure
        NEW.overall_score,
        CASE 
            WHEN NEW.overall_score >= 90 THEN 'Exceptional'
            WHEN NEW.overall_score >= 85 THEN 'Excellent'
            WHEN NEW.overall_score >= 80 THEN 'Very Good'
            WHEN NEW.overall_score >= 75 THEN 'Good'
            WHEN NEW.overall_score >= 70 THEN 'Acceptable'
            ELSE 'Not Recommended'
        END;
    
    -- Recalculate all rank positions
    SET @rank = 0;
    UPDATE rankings r
    INNER JOIN (
        SELECT candidate_id, @rank := @rank + 1 AS new_rank
        FROM rankings
        ORDER BY overall_score DESC
    ) ranked ON r.candidate_id = ranked.candidate_id
    SET r.rank_position = ranked.new_rank;
END$$

CREATE TRIGGER update_rankings_after_evaluation_update
AFTER UPDATE ON evaluations
FOR EACH ROW
BEGIN
    -- Update ranking score and category
    UPDATE rankings 
    SET 
        overall_score = NEW.overall_score,
        category = CASE 
            WHEN NEW.overall_score >= 90 THEN 'Exceptional'
            WHEN NEW.overall_score >= 85 THEN 'Excellent'
            WHEN NEW.overall_score >= 80 THEN 'Very Good'
            WHEN NEW.overall_score >= 75 THEN 'Good'
            WHEN NEW.overall_score >= 70 THEN 'Acceptable'
            ELSE 'Not Recommended'
        END
    WHERE candidate_id = NEW.candidate_id;
    
    -- Recalculate all rank positions
    SET @rank = 0;
    UPDATE rankings r
    INNER JOIN (
        SELECT candidate_id, @rank := @rank + 1 AS new_rank
        FROM rankings
        ORDER BY overall_score DESC
    ) ranked ON r.candidate_id = ranked.candidate_id
    SET r.rank_position = ranked.new_rank;
END$$

DELIMITER ;

-- ============================================
-- Stored Procedure: Get Top N Candidates
-- ============================================
DELIMITER $$

CREATE PROCEDURE GetTopCandidates(IN top_n INT)
BEGIN
    SELECT 
        r.rank_position,
        c.id,
        c.name,
        c.email,
        c.phone,
        c.experience_years,
        c.location,
        c.education,
        c.current_role,
        e.crisis_management_score,
        e.sustainability_score,
        e.team_motivation_score,
        r.overall_score,
        r.category,
        GROUP_CONCAT(DISTINCT cs.skill_name ORDER BY cs.skill_name SEPARATOR ', ') AS skills,
        GROUP_CONCAT(DISTINCT cc.certification_name ORDER BY cc.certification_name SEPARATOR ', ') AS certifications
    FROM rankings r
    INNER JOIN candidates c ON r.candidate_id = c.id
    INNER JOIN evaluations e ON c.id = e.candidate_id
    LEFT JOIN candidate_skills cs ON c.id = cs.candidate_id
    LEFT JOIN candidate_certifications cc ON c.id = cc.candidate_id
    WHERE r.rank_position <= top_n
    GROUP BY r.rank_position, c.id, c.name, c.email, c.phone, c.experience_years, 
             c.location, c.education, c.current_role, e.crisis_management_score,
             e.sustainability_score, e.team_motivation_score, r.overall_score, r.category
    ORDER BY r.rank_position;
END$$

DELIMITER ;

-- ============================================
-- Stored Procedure: Get Candidate Details
-- ============================================
DELIMITER $$

CREATE PROCEDURE GetCandidateDetails(IN candidate_id_param INT)
BEGIN
    SELECT 
        c.id,
        c.name,
        c.email,
        c.phone,
        c.experience_years,
        c.location,
        c.education,
        c.current_role,
        e.crisis_management_score,
        e.sustainability_score,
        e.team_motivation_score,
        e.overall_score,
        e.evaluation_date,
        e.evaluator_type,
        e.notes,
        r.rank_position,
        r.category,
        GROUP_CONCAT(DISTINCT cs.skill_name ORDER BY cs.skill_name SEPARATOR ', ') AS skills,
        GROUP_CONCAT(DISTINCT cc.certification_name ORDER BY cc.certification_name SEPARATOR ', ') AS certifications
    FROM candidates c
    LEFT JOIN evaluations e ON c.id = e.candidate_id
    LEFT JOIN rankings r ON c.id = r.candidate_id
    LEFT JOIN candidate_skills cs ON c.id = cs.candidate_id
    LEFT JOIN candidate_certifications cc ON c.id = cc.candidate_id
    WHERE c.id = candidate_id_param
    GROUP BY c.id, c.name, c.email, c.phone, c.experience_years, 
             c.location, c.education, c.current_role, e.crisis_management_score,
             e.sustainability_score, e.team_motivation_score, e.overall_score,
             e.evaluation_date, e.evaluator_type, e.notes, r.rank_position, r.category;
END$$

DELIMITER ;

-- ============================================
-- View: Leaderboard View
-- Materialized view for quick leaderboard access
-- ============================================
CREATE OR REPLACE VIEW vw_leaderboard AS
SELECT 
    r.rank_position,
    c.id,
    c.name,
    c.current_role,
    c.experience_years,
    c.location,
    e.crisis_management_score,
    e.sustainability_score,
    e.team_motivation_score,
    r.overall_score,
    r.category,
    COUNT(DISTINCT cs.id) AS skill_count,
    COUNT(DISTINCT cc.id) AS certification_count
FROM rankings r
INNER JOIN candidates c ON r.candidate_id = c.id
INNER JOIN evaluations e ON c.id = e.candidate_id
LEFT JOIN candidate_skills cs ON c.id = cs.candidate_id
LEFT JOIN candidate_certifications cc ON c.id = cc.candidate_id
GROUP BY r.rank_position, c.id, c.name, c.current_role, c.experience_years,
         c.location, e.crisis_management_score, e.sustainability_score,
         e.team_motivation_score, r.overall_score, r.category
ORDER BY r.rank_position;

-- ============================================
-- Indexes for Performance Optimization
-- ============================================
CREATE INDEX idx_composite_candidate_evaluation ON evaluations(candidate_id, overall_score DESC);
CREATE INDEX idx_composite_ranking ON rankings(rank_position, overall_score DESC);

-- ============================================
-- Comments for Documentation
-- ============================================
ALTER TABLE candidates 
    COMMENT = 'Stores candidate personal and professional information';

ALTER TABLE evaluations 
    COMMENT = 'Stores AI-generated evaluation scores with auto-calculated overall score';

ALTER TABLE rankings 
    COMMENT = 'Auto-updated rankings based on evaluation scores with triggers';

ALTER TABLE candidate_skills 
    COMMENT = 'Many-to-many relationship for candidate skills';

ALTER TABLE candidate_certifications 
    COMMENT = 'Stores candidate certifications with optional expiry tracking';
