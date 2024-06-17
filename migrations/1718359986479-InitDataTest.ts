import { MigrationInterface, QueryRunner } from "typeorm";

export class InitData1718359986479 implements MigrationInterface {
  name = "InitData1718359986479";

  public async up(queryRunner: QueryRunner): Promise<void> {
    // Check if the Users table is empty
    const usersExist = await queryRunner.query(`SELECT 1 FROM "Users" LIMIT 1`);
    if (usersExist.length === 0) {
      // Only insert if no users exist
      // password is  [password: hashedpassword]
      await queryRunner.query(`
                INSERT INTO "Users" (email_address, first_name, last_name, password, area_code, mobile_number, status, is_verified, role, created_at, updated_at)
                VALUES
                ('superadmin@example.com', 'Super', 'Admin', '$2a$10$mSD0XaDysAM134gp63KcduDrW5lEXfmAuo8tgH1O8zs0BBsovjwuO', '000', '1234567890', 'Active', TRUE, 'Admin', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
                ('leonadmin@example.com', 'Leon', 'Admin', '$2a$10$mSD0XaDysAM134gp63KcduDrW5lEXfmAuo8tgH1O8zs0BBsovjwuO', '000', '1234567891', 'Active', TRUE, 'Admin', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
                ('locadmin@example.com', 'Loc', 'Admin', '$2a$10$mSD0XaDysAM134gp63KcduDrW5lEXfmAuo8tgH1O8zs0BBsovjwuO', '000', '1234567892', 'Active', TRUE, 'Manager', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
                ('leostandard@example.com', 'Leo', 'Standard', '$2a$10$mSD0XaDysAM134gp63KcduDrW5lEXfmAuo8tgH1O8zs0BBsovjwuO', '000', '1234567893', 'Active', TRUE, 'Supervisor', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
                ('bonstandard@example.com', 'Bon', 'Standard', '$2a$10$mSD0XaDysAM134gp63KcduDrW5lEXfmAuo8tgH1O8zs0BBsovjwuO', '000', '1234567894', 'Active', TRUE, 'Employee', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP)
                ON CONFLICT DO NOTHING;
            `);
    }
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    // Optionally add logic to remove these users if necessary
  }
}
