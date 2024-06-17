-- Connect to the database
\c leonle_dev_db;

-- Create UserProfiles table first
CREATE TABLE IF NOT EXISTS "UserProfiles" (
    id SERIAL PRIMARY KEY,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    bank_branch VARCHAR(255),
    bank_name VARCHAR(255),
    bank_number VARCHAR(255),
    birth_date TIMESTAMP,
    address VARCHAR(255),
    gender VARCHAR(255) DEFAULT 'MALE',
    tax VARCHAR(100),
    user_id INTEGER
);

-- Create Users table after UserProfiles
CREATE TABLE IF NOT EXISTS "Users" (
    id SERIAL PRIMARY KEY,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    email_address VARCHAR(150) NOT NULL UNIQUE,
    first_name VARCHAR(255) NOT NULL,
    last_name VARCHAR(255) NOT NULL,
    password VARCHAR(255) NOT NULL,
    device_id VARCHAR(255),
    device_fcm_token VARCHAR(255),
    area_code VARCHAR(3) NOT NULL,
    mobile_number VARCHAR(16) NOT NULL UNIQUE,
    status VARCHAR(255) DEFAULT 'ACTIVE',
    is_verified BOOLEAN DEFAULT TRUE,
    role VARCHAR(255) DEFAULT 'EMPLOYEE',
    otp_key VARCHAR(255),
    otp_number VARCHAR(255),
    otp_requested_date TIMESTAMP,
    otp_request_count INTEGER DEFAULT 0,
    provider VARCHAR(255),
    providerId VARCHAR(255),
    profile INTEGER
);

-- Create Roles table
CREATE TABLE IF NOT EXISTS "Roles" (
    id SERIAL PRIMARY KEY,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    name VARCHAR(255) NOT NULL,
    parent_id INTEGER DEFAULT NULL
);

-- Create UserRoles table
CREATE TABLE IF NOT EXISTS "UserRoles" (
    id SERIAL PRIMARY KEY,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    user_id INTEGER NOT NULL,
    role_id INTEGER NOT NULL,
    FOREIGN KEY (user_id) REFERENCES "Users"(id),
    FOREIGN KEY (role_id) REFERENCES "Roles"(id)
);

-- Add foreign key constraints
ALTER TABLE "Users"
ADD CONSTRAINT fk_profile
FOREIGN KEY (profile) REFERENCES "UserProfiles"(id);

ALTER TABLE "UserProfiles"
ADD CONSTRAINT fk_user
FOREIGN KEY (user_id) REFERENCES "Users"(id);

-- Insert roles into Roles table
INSERT INTO "Roles" (name, created_at, updated_at)
VALUES ('SuperAdmin', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP)
ON CONFLICT DO NOTHING;

INSERT INTO "Roles" (name, created_at, updated_at)
VALUES ('Admin', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP)
ON CONFLICT DO NOTHING;

INSERT INTO "Roles" (name, created_at, updated_at)
VALUES ('Standard', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP)
ON CONFLICT DO NOTHING;

-- Insert users into Users table [password: hashedpassword]
INSERT INTO "Users" (email_address, first_name, last_name, password, area_code, mobile_number, status, is_verified, role, created_at, updated_at)
VALUES ('superadmin@example.com', 'Super', 'Admin', '$2a$10$mSD0XaDysAM134gp63KcduDrW5lEXfmAuo8tgH1O8zs0BBsovjwuO', '000', '1234567890', 'ACTIVE', TRUE, 'SuperAdmin', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP)
ON CONFLICT DO NOTHING;

INSERT INTO "Users" (email_address, first_name, last_name, password, area_code, mobile_number, status, is_verified, role, created_at, updated_at)
VALUES ('leonadmin@example.com', 'Leon', 'Admin', '$2a$10$mSD0XaDysAM134gp63KcduDrW5lEXfmAuo8tgH1O8zs0BBsovjwuO', '000', '1234567891', 'ACTIVE', TRUE, 'Admin', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP)
ON CONFLICT DO NOTHING;

INSERT INTO "Users" (email_address, first_name, last_name, password, area_code, mobile_number, status, is_verified, role, created_at, updated_at)
VALUES ('locadmin@example.com', 'Loc', 'Admin', '$2a$10$mSD0XaDysAM134gp63KcduDrW5lEXfmAuo8tgH1O8zs0BBsovjwuO', '000', '1234567892', 'ACTIVE', TRUE, 'Admin', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP)
ON CONFLICT DO NOTHING;

INSERT INTO "Users" (email_address, first_name, last_name, password, area_code, mobile_number, status, is_verified, role, created_at, updated_at)
VALUES ('leostandard@example.com', 'Leo', 'Standard', '$2a$10$mSD0XaDysAM134gp63KcduDrW5lEXfmAuo8tgH1O8zs0BBsovjwuO', '000', '1234567893', 'ACTIVE', TRUE, 'Standard', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP)
ON CONFLICT DO NOTHING;

INSERT INTO "Users" (email_address, first_name, last_name, password, area_code, mobile_number, status, is_verified, role, created_at, updated_at)
VALUES ('bonstandard@example.com', 'Bon', 'Standard', '$2a$10$mSD0XaDysAM134gp63KcduDrW5lEXfmAuo8tgH1O8zs0BBsovjwuO', '000', '1234567894', 'ACTIVE', TRUE, 'Standard', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP)
ON CONFLICT DO NOTHING;
