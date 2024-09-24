import { MigrationInterface, QueryRunner } from "typeorm";

export class Organization1725881874446 implements MigrationInterface {
    name = 'Organization1725881874446'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "team" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying NOT NULL, "departament_id" uuid, "sector_id" uuid, CONSTRAINT "PK_f57d8293406df4af348402e4b74" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TYPE "public"."member_role_enum" AS ENUM('head_of_project', 'head_of_sector', 'head_of_departament', 'hr', 'manager', 'employee')`);
        await queryRunner.query(`CREATE TABLE "member" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "profile_id" character varying NOT NULL, "role" "public"."member_role_enum" NOT NULL DEFAULT 'employee', "project_id" uuid, "departament_id" uuid, "sector_id" uuid, "team_id" uuid, CONSTRAINT "PK_97cbbe986ce9d14ca5894fdc072" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "project" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying NOT NULL, CONSTRAINT "PK_4d68b1358bb5b766d3e78f32f57" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "departament" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying NOT NULL, "project_id" uuid, CONSTRAINT "PK_421574e32347465bd3d720c55cf" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "sector" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying NOT NULL, "departament_id" uuid, CONSTRAINT "PK_668b2ea8a2f534425407732f3ab" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "team" ADD CONSTRAINT "FK_75569c1e161b9a16f7ec78bc720" FOREIGN KEY ("departament_id") REFERENCES "departament"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "team" ADD CONSTRAINT "FK_740fb2369abd5ec92a702732080" FOREIGN KEY ("sector_id") REFERENCES "sector"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "member" ADD CONSTRAINT "FK_87913eee42a32bebe9af67d7526" FOREIGN KEY ("project_id") REFERENCES "project"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "member" ADD CONSTRAINT "FK_98a934e6b7cbaa80f23cafb9d0e" FOREIGN KEY ("departament_id") REFERENCES "departament"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "member" ADD CONSTRAINT "FK_5f0ce91e3501f6a6e17f0d21135" FOREIGN KEY ("sector_id") REFERENCES "sector"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "member" ADD CONSTRAINT "FK_33b34d353655d8bb902a632b05e" FOREIGN KEY ("team_id") REFERENCES "team"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "departament" ADD CONSTRAINT "FK_b3ae10724f370c9aef263ebdde9" FOREIGN KEY ("project_id") REFERENCES "project"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "sector" ADD CONSTRAINT "FK_be2dc663e5b73509a34e9128d7d" FOREIGN KEY ("departament_id") REFERENCES "departament"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "sector" DROP CONSTRAINT "FK_be2dc663e5b73509a34e9128d7d"`);
        await queryRunner.query(`ALTER TABLE "departament" DROP CONSTRAINT "FK_b3ae10724f370c9aef263ebdde9"`);
        await queryRunner.query(`ALTER TABLE "member" DROP CONSTRAINT "FK_33b34d353655d8bb902a632b05e"`);
        await queryRunner.query(`ALTER TABLE "member" DROP CONSTRAINT "FK_5f0ce91e3501f6a6e17f0d21135"`);
        await queryRunner.query(`ALTER TABLE "member" DROP CONSTRAINT "FK_98a934e6b7cbaa80f23cafb9d0e"`);
        await queryRunner.query(`ALTER TABLE "member" DROP CONSTRAINT "FK_87913eee42a32bebe9af67d7526"`);
        await queryRunner.query(`ALTER TABLE "team" DROP CONSTRAINT "FK_740fb2369abd5ec92a702732080"`);
        await queryRunner.query(`ALTER TABLE "team" DROP CONSTRAINT "FK_75569c1e161b9a16f7ec78bc720"`);
        await queryRunner.query(`DROP TABLE "sector"`);
        await queryRunner.query(`DROP TABLE "departament"`);
        await queryRunner.query(`DROP TABLE "project"`);
        await queryRunner.query(`DROP TABLE "member"`);
        await queryRunner.query(`DROP TYPE "public"."member_role_enum"`);
        await queryRunner.query(`DROP TABLE "team"`);
    }

}
