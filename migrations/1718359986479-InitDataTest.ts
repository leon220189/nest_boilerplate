import { MigrationInterface, QueryRunner } from 'typeorm';

export class InitDataTest1718359986479 implements MigrationInterface {
	name = 'InitDataTest1718359986479';

	public async up(queryRunner: QueryRunner): Promise<void> {
		// Insert initial data into the Users table
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

	public async down(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.query(`
            DELETE FROM "Users" WHERE email_address IN ('superadmin@example.com', 'leonadmin@example.com', 'locadmin@example.com', 'leostandard@example.com', 'bonstandard@example.com');
        `);
	}
}
