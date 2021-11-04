"use strict";
exports.__esModule = true;
exports.typeOrmConfig = void 0;
exports.typeOrmConfig = {
    type: 'postgres',
    host: 'localhost',
    port: 5432,
    username: 'conduit',
    password: 'root',
    database: 'conduit',
    entities: [__dirname + '/../**/*.entity{.ts,.js}'],
    synchronize: true,
    logging: true,
    logger: "advanced-console"
};
