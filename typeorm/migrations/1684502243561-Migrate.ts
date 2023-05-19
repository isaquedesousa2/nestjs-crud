import { MigrationInterface, QueryRunner, Table } from "typeorm"

export class Migrate1684502243561 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(new Table({
            name: "users",
            columns: [{
                name: "id",
                type: "int",
                isPrimary: true,
                unsigned: true,
                isGenerated:true,
                generationStrategy: 'increment'
            },{
                name: "nome",
                type: 'varchar',
                length: '63',
            },{
                name: 'email',
                type: 'varchar',
                length: '127',
                isUnique: true
            },{
                name: 'password',
                type: 'varchar',
                length: '127'
            },{
                name: 'birthAt',
                type: 'date',
                default: '1900-01-01'
            },{
                name: 'role',
                type: 'int',
                default: '1'
            },{
                name: 'createAt',
                type: 'timestamp',
                default: 'CURRENT_TIMESTAMP'
            },{
                name: 'updateAt',
                type: 'timestamp',
                default: 'CURRENT_TIMESTAMP'
            }]
        }))
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable('users')
    }

}
