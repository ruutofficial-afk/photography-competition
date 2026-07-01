-- Photography Contest Submissions SQL Schema

-- 1. Create the submissions table
CREATE TABLE photography_contest_submissions (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    full_name VARCHAR(255) NOT NULL,
    mobile_number VARCHAR(20) NOT NULL,
    email VARCHAR(255) NOT NULL,
    dob DATE NOT NULL,
    story TEXT NOT NULL,
    location VARCHAR(255) NOT NULL,
    raw_image_url TEXT NOT NULL,
    edited_image_url TEXT NOT NULL,
    submission_status VARCHAR(50) DEFAULT 'submitted', -- 'submitted', 'approved', 'rejected'
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 2. Create indexes for performance and queries
CREATE INDEX idx_email ON photography_contest_submissions(email);
CREATE INDEX idx_created_at ON photography_contest_submissions(created_at);

-- Note on Supabase Storage:
-- You must create a storage bucket named "contest-submissions" (public or private).
-- Inside the bucket, the folders "raw-images" and "edited-images" will be created dynamically upon upload.
