import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateStatusesTable1729999999999 implements MigrationInterface {
  name = 'CreateStatusesTable1729999999999';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
    `);

    await queryRunner.query(`
      CREATE TABLE public.statuses (
        id uuid DEFAULT uuid_generate_v4() NOT NULL,
        name varchar(100) NOT NULL,
        parent_id uuid NULL,
        "order" int4 DEFAULT 0 NOT NULL,
        CONSTRAINT "PK_2fd3770acdb67736f1a3e3d5399" PRIMARY KEY (id)
      );
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      DROP TABLE IF EXISTS public.statuses;
    `);
  }
}