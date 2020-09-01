import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddUserRoleColumn1598990055598 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE user ADD roles varchar(255) AFTER password`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE user DROP COLUMN roles`);
    }

}
