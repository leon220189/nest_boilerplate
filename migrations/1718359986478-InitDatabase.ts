import { MigrationInterface, QueryRunner } from "typeorm";

export class InitDatabase1718359986478 implements MigrationInterface {
  name = "InitDatabase1718359986478";

  public async up(queryRunner: QueryRunner): Promise<void> {}

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
