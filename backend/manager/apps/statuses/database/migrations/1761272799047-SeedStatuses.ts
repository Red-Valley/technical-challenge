import { MigrationInterface, QueryRunner } from "typeorm";

export class SeedStatuses1730000000000 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      INSERT INTO statuses (id, name, parent_id, "order")
      VALUES
        (uuid_generate_v4(), 'Scheduled', NULL, 1),
        (uuid_generate_v4(), 'Checked-In', NULL, 2),
        (uuid_generate_v4(), 'In Consultation', NULL, 3),
        (uuid_generate_v4(), 'Cancelled', NULL, 4),
        (uuid_generate_v4(), 'No-Show', NULL, 5);
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      DELETE FROM statuses WHERE name IN (
        'Scheduled', 'Checked-In', 'In Consultation', 'Cancelled', 'No-Show'
      );
    `);
  }
}