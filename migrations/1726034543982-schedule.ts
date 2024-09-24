import { MigrationInterface, QueryRunner } from "typeorm";

export class Schedule1726034543982 implements MigrationInterface {
    name = 'Schedule1726034543982'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TYPE "public"."team_schedule_status_enum" AS ENUM('editing', 'in_review', 'published')`);
        await queryRunner.query(`CREATE TABLE "team_schedule" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "status" "public"."team_schedule_status_enum" NOT NULL DEFAULT 'editing', "period" character varying NOT NULL, "team_id" uuid, CONSTRAINT "PK_9d36326762f4ad471c8c3c03291" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "shift" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "start_time" character varying NOT NULL, "end_time" character varying NOT NULL, "break_time" character varying NOT NULL, "total_hours" integer NOT NULL, "color" character varying NOT NULL, "rate" character varying NOT NULL, "day_schedule_id" uuid, CONSTRAINT "PK_53071a6485a1e9dc75ec3db54b9" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TYPE "public"."day_schedule_type_enum" AS ENUM('family', 'vacation', 'hospital', 'day_off', 'working_day')`);
        await queryRunner.query(`CREATE TABLE "day_schedule" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "date" character varying NOT NULL, "type" "public"."day_schedule_type_enum" NOT NULL, "day_schedule_id" uuid, CONSTRAINT "PK_d50eb64c788390ba41d643c06a2" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "member_schedule" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "member_id" uuid, "team_schedule_id" uuid, CONSTRAINT "PK_281b3c96283c97e68bc0eada09a" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "team_schedule" ADD CONSTRAINT "FK_841fa234070047e07585fc87357" FOREIGN KEY ("team_id") REFERENCES "team"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "shift" ADD CONSTRAINT "FK_db7f4a457e19285a99d16db4b22" FOREIGN KEY ("day_schedule_id") REFERENCES "day_schedule"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "day_schedule" ADD CONSTRAINT "FK_d1d6c8df082ea3fefd12eddde7f" FOREIGN KEY ("day_schedule_id") REFERENCES "member_schedule"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "member_schedule" ADD CONSTRAINT "FK_bf5f8a1128156ef0184823b66b7" FOREIGN KEY ("member_id") REFERENCES "member"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "member_schedule" ADD CONSTRAINT "FK_0eb7a844610b52ef79a46484021" FOREIGN KEY ("team_schedule_id") REFERENCES "team_schedule"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "member_schedule" DROP CONSTRAINT "FK_0eb7a844610b52ef79a46484021"`);
        await queryRunner.query(`ALTER TABLE "member_schedule" DROP CONSTRAINT "FK_bf5f8a1128156ef0184823b66b7"`);
        await queryRunner.query(`ALTER TABLE "day_schedule" DROP CONSTRAINT "FK_d1d6c8df082ea3fefd12eddde7f"`);
        await queryRunner.query(`ALTER TABLE "shift" DROP CONSTRAINT "FK_db7f4a457e19285a99d16db4b22"`);
        await queryRunner.query(`ALTER TABLE "team_schedule" DROP CONSTRAINT "FK_841fa234070047e07585fc87357"`);
        await queryRunner.query(`DROP TABLE "member_schedule"`);
        await queryRunner.query(`DROP TABLE "day_schedule"`);
        await queryRunner.query(`DROP TYPE "public"."day_schedule_type_enum"`);
        await queryRunner.query(`DROP TABLE "shift"`);
        await queryRunner.query(`DROP TABLE "team_schedule"`);
        await queryRunner.query(`DROP TYPE "public"."team_schedule_status_enum"`);
    }

}
