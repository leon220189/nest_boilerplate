import { MigrationInterface, QueryRunner } from 'typeorm';

export class InitDatabase1718359986478 implements MigrationInterface {
	name = 'InitDatabase1718359986478';

	public async up(queryRunner: QueryRunner): Promise<void> {
		// Create Users Table
		await queryRunner.query(`
		    CREATE TABLE IF NOT EXISTS "Users" (
		        id SERIAL PRIMARY KEY,
		        email_address VARCHAR(150) NOT NULL UNIQUE,
		        first_name VARCHAR(255) NOT NULL,
		        last_name VARCHAR(255) NOT NULL,
		        password VARCHAR(255) NOT NULL,
		        device_id VARCHAR(255),
		        device_fcm_token VARCHAR(255),
		        area_code VARCHAR(3) NOT NULL,
		        mobile_number VARCHAR(16) NOT NULL UNIQUE,
		        status VARCHAR(255) NOT NULL DEFAULT 'ACTIVE',
		        is_verified BOOLEAN NOT NULL DEFAULT TRUE,
		        role VARCHAR(255) NOT NULL,
		        otp_key VARCHAR(255),
		        otp_number VARCHAR(255),
		        otp_requested_date TIMESTAMP,
		        otp_request_count INT DEFAULT 0,
		        profile_id INT,
		        created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
		        updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
		    );
		`);
		// Create Roles Table
		await queryRunner.query(`
		    CREATE TABLE IF NOT EXISTS "Roles" (
		        id SERIAL PRIMARY KEY,
		        name VARCHAR(255) NOT NULL,
		        parent_id INT
		    );
		`);
		// Create UserProfiles Table
		await queryRunner.query(`
		    CREATE TABLE IF NOT EXISTS "UserProfiles" (
		        id SERIAL PRIMARY KEY,
		        user_id INT UNIQUE NOT NULL,
		        bank_branch VARCHAR(255),
		        bank_name VARCHAR(255),
		        bank_number VARCHAR(255),
		        birth_date TIMESTAMP,
		        address VARCHAR(255),
		        gender VARCHAR(255) NOT NULL DEFAULT 'MALE',
		        tax VARCHAR(100),
		        created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
		        updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
		        CONSTRAINT fk_user FOREIGN KEY (user_id) REFERENCES "Users"(id)
		    );
		`);
		// Create UserRoles Table
		await queryRunner.query(`
		    CREATE TABLE IF NOT EXISTS "UserRoles" (
		        id SERIAL PRIMARY KEY,
		        user_id INT NOT NULL,
		        role_id INT NOT NULL,
		        CONSTRAINT fk_user_roles_user FOREIGN KEY (user_id) REFERENCES "Users"(id),
		        CONSTRAINT fk_user_roles_role FOREIGN KEY (role_id) REFERENCES "Roles"(id)
		    );
		`);
		// Foreign key for profile in Users table
		await queryRunner.query(`
		    ALTER TABLE "Users"
		    ADD CONSTRAINT fk_users_profile FOREIGN KEY (profile_id) REFERENCES "UserProfiles"(id);
		`);
	}

	public async down(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.query(`
            ALTER TABLE "UserRoles" DROP CONSTRAINT fk_user_roles_role;
            ALTER TABLE "UserRoles" DROP CONSTRAINT fk_user_roles_user;
            ALTER TABLE "UserProfiles" DROP CONSTRAINT fk_user;
            ALTER TABLE "Users" DROP CONSTRAINT fk_users_profile;
            DROP TABLE IF EXISTS "UserRoles";
            DROP TABLE IF EXISTS "UserProfiles";
            DROP TABLE IF EXISTS "Roles";
            DROP TABLE IF EXISTS "Users";
        `);
	}
}
