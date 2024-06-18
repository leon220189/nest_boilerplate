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
            ALTER TABLE "Users"
            ADD CONSTRAINT "fk_profile" FOREIGN KEY ("profile") REFERENCES "UserProfiles"("id") ON DELETE NO ACTION ON UPDATE NO ACTION
        `);
		await queryRunner.query(`
            ALTER TABLE "UserProfiles"
            ADD CONSTRAINT "fk_user" FOREIGN KEY ("user_id") REFERENCES "Users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION
        `);
		await queryRunner.query(`
            ALTER TABLE "UserRoles"
            ADD CONSTRAINT "UserRoles_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "Users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION
        `);
		await queryRunner.query(`
            ALTER TABLE "UserRoles"
            ADD CONSTRAINT "UserRoles_role_id_fkey" FOREIGN KEY ("role_id") REFERENCES "Roles"("id") ON DELETE NO ACTION ON UPDATE NO ACTION
        `);
		await queryRunner.query(`
            ALTER TABLE "Users"
            ADD "provider" character varying(255)
        `);
		await queryRunner.query(`
            ALTER TABLE "Users"
            ADD "providerid" character varying(255)
        `);
		await queryRunner.query(`
            ALTER TABLE "UserProfiles"
            ADD "user_id" integer
        `);
		await queryRunner.query(`
            ALTER TABLE "UserProfiles" DROP COLUMN "user"
        `);
		await queryRunner.query(`
            ALTER TABLE "UserProfiles" DROP CONSTRAINT "UQ_b75e648d88ce03d265a7617964b"
        `);
		await queryRunner.query(`
            ALTER TABLE "Users"
            ALTER COLUMN "created_at" DROP NOT NULL
        `);
		await queryRunner.query(`
            ALTER TABLE "Users"
            ALTER COLUMN "created_at"
            SET DEFAULT CURRENT_TIMESTAMP
        `);
		await queryRunner.query(`
            ALTER TABLE "Users"
            ALTER COLUMN "updated_at" DROP NOT NULL
        `);
		await queryRunner.query(`
            ALTER TABLE "Users"
            ALTER COLUMN "updated_at"
            SET DEFAULT CURRENT_TIMESTAMP
        `);
		await queryRunner.query(`
            ALTER TABLE "Users"
            ADD "first_name" character varying(255) NOT NULL
        `);
		await queryRunner.query(`
            ALTER TABLE "Users" DROP COLUMN "first_name"
        `);
		await queryRunner.query(`
            ALTER TABLE "Users"
            ADD "last_name" character varying(255) NOT NULL
        `);
		await queryRunner.query(`
            ALTER TABLE "Users" DROP COLUMN "last_name"
        `);
		await queryRunner.query(`
            ALTER TABLE "Users"
            ADD "password" character varying(255) NOT NULL
        `);
		await queryRunner.query(`
            ALTER TABLE "Users" DROP COLUMN "password"
        `);
		await queryRunner.query(`
            ALTER TABLE "Users"
            ADD "status" character varying(255) DEFAULT 'ACTIVE'
        `);
		await queryRunner.query(`
            DROP TYPE "public"."Users_status_enum"
        `);
		await queryRunner.query(`
            ALTER TABLE "Users" DROP COLUMN "status"
        `);
		await queryRunner.query(`
            ALTER TABLE "Users"
            ALTER COLUMN "is_verified" DROP NOT NULL
        `);
		await queryRunner.query(`
            ALTER TABLE "Users"
            ADD "role" character varying(255) DEFAULT 'EMPLOYEE'
        `);
		await queryRunner.query(`
            DROP TYPE "public"."Users_role_enum"
        `);
		await queryRunner.query(`
            ALTER TABLE "Users" DROP COLUMN "role"
        `);
		await queryRunner.query(`
            ALTER TABLE "Users"
            ADD "otp_key" character varying(255)
        `);
		await queryRunner.query(`
            ALTER TABLE "Users" DROP COLUMN "otp_key"
        `);
		await queryRunner.query(`
            ALTER TABLE "Users"
            ADD "otp_number" character varying(255)
        `);
		await queryRunner.query(`
            ALTER TABLE "Users" DROP COLUMN "otp_number"
        `);
		await queryRunner.query(`
            ALTER TABLE "Users"
            ADD "otp_requested_date" TIMESTAMP
        `);
		await queryRunner.query(`
            ALTER TABLE "Users" DROP COLUMN "otp_requested_date"
        `);
		await queryRunner.query(`
            ALTER TABLE "Users"
            ALTER COLUMN "otp_request_count" DROP NOT NULL
        `);
		await queryRunner.query(`
            ALTER TABLE "Users" DROP CONSTRAINT "UQ_44941df132e002ffad73d0d168c"
        `);
		await queryRunner.query(`
            ALTER TABLE "UserProfiles"
            ALTER COLUMN "created_at" DROP NOT NULL
        `);
		await queryRunner.query(`
            ALTER TABLE "UserProfiles"
            ALTER COLUMN "created_at"
            SET DEFAULT CURRENT_TIMESTAMP
        `);
		await queryRunner.query(`
            ALTER TABLE "UserProfiles"
            ALTER COLUMN "updated_at" DROP NOT NULL
        `);
		await queryRunner.query(`
            ALTER TABLE "UserProfiles"
            ALTER COLUMN "updated_at"
            SET DEFAULT CURRENT_TIMESTAMP
        `);
		await queryRunner.query(`
            ALTER TABLE "UserProfiles"
            ADD "birth_date" TIMESTAMP
        `);
		await queryRunner.query(`
            ALTER TABLE "UserProfiles" DROP COLUMN "birth_date"
        `);
		await queryRunner.query(`
            ALTER TABLE "UserProfiles"
            ADD "gender" character varying(255) DEFAULT 'MALE'
        `);
		await queryRunner.query(`
            DROP TYPE "public"."UserProfiles_gender_enum"
        `);
		await queryRunner.query(`
            ALTER TABLE "UserProfiles" DROP COLUMN "gender"
        `);
		await queryRunner.query(`
            ALTER TABLE "UserRoles"
            ALTER COLUMN "created_at" DROP NOT NULL
        `);
		await queryRunner.query(`
            ALTER TABLE "UserRoles"
            ALTER COLUMN "created_at"
            SET DEFAULT CURRENT_TIMESTAMP
        `);
		await queryRunner.query(`
            ALTER TABLE "UserRoles"
            ALTER COLUMN "updated_at" DROP NOT NULL
        `);
		await queryRunner.query(`
            ALTER TABLE "UserRoles"
            ALTER COLUMN "updated_at"
            SET DEFAULT CURRENT_TIMESTAMP
        `);
		await queryRunner.query(`
            ALTER TABLE "Users"
            ALTER COLUMN "created_at" DROP NOT NULL
        `);
		await queryRunner.query(`
            ALTER TABLE "Users"
            ALTER COLUMN "created_at"
            SET DEFAULT CURRENT_TIMESTAMP
        `);
		await queryRunner.query(`
            ALTER TABLE "Users"
            ALTER COLUMN "updated_at" DROP NOT NULL
        `);
		await queryRunner.query(`
            ALTER TABLE "Users"
            ALTER COLUMN "updated_at"
            SET DEFAULT CURRENT_TIMESTAMP
        `);
		await queryRunner.query(`
            ALTER TABLE "Users"
            ALTER COLUMN "is_verified" DROP NOT NULL
        `);
		await queryRunner.query(`
            ALTER TABLE "Users"
            ALTER COLUMN "otp_request_count" DROP NOT NULL
        `);
		await queryRunner.query(`
            ALTER TABLE "Users" DROP CONSTRAINT "UQ_44941df132e002ffad73d0d168c"
        `);
		await queryRunner.query(`
            ALTER TABLE "UserProfiles"
            ALTER COLUMN "created_at" DROP NOT NULL
        `);
		await queryRunner.query(`
            ALTER TABLE "UserProfiles"
            ALTER COLUMN "created_at"
            SET DEFAULT CURRENT_TIMESTAMP
        `);
		await queryRunner.query(`
            ALTER TABLE "UserProfiles"
            ALTER COLUMN "updated_at" DROP NOT NULL
        `);
		await queryRunner.query(`
            ALTER TABLE "UserProfiles"
            ALTER COLUMN "updated_at"
            SET DEFAULT CURRENT_TIMESTAMP
        `);
		await queryRunner.query(`
            ALTER TABLE "Roles"
            ALTER COLUMN "created_at" DROP NOT NULL
        `);
		await queryRunner.query(`
            ALTER TABLE "Roles"
            ALTER COLUMN "created_at"
            SET DEFAULT CURRENT_TIMESTAMP
        `);
		await queryRunner.query(`
            ALTER TABLE "Roles"
            ALTER COLUMN "updated_at" DROP NOT NULL
        `);
		await queryRunner.query(`
            ALTER TABLE "Roles"
            ALTER COLUMN "updated_at"
            SET DEFAULT CURRENT_TIMESTAMP
        `);
		await queryRunner.query(`
            ALTER TABLE "Roles"
            ADD "name" character varying(255) NOT NULL
        `);
		await queryRunner.query(`
            ALTER TABLE "Roles" DROP COLUMN "name"
        `);
		await queryRunner.query(`
            DROP INDEX "public"."IDX_16d4f7d636df336db11d87413e"
        `);
		await queryRunner.query(`
            DROP INDEX "public"."IDX_6dda27017247be629540688a4f"
        `);
		await queryRunner.query(`
            DROP INDEX "public"."IDX_a44a2382829972daa2a31345f5"
        `);
		await queryRunner.query(`
            DROP INDEX "public"."IDX_efba48c6a0c7a9b6260f771b16"
        `);
		await queryRunner.query(`
            ALTER TABLE "Users" DROP CONSTRAINT "FK_44941df132e002ffad73d0d168c"
        `);
		await queryRunner.query(`
            ALTER TABLE "UserProfiles" DROP CONSTRAINT "FK_b75e648d88ce03d265a7617964b"
        `);
	}
}
