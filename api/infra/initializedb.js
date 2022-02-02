const TABLE_NAME = require('./tables');

class InitializeDb {
    initialize(connection) {
        this.connection = connection;

        this.createTbCategory();
        this.createTbDevice();
    }

    createTbCategory() {
        const query = `
            create table if not exists ${TABLE_NAME.tbCategory}
            (
	            id   int          not null auto_increment,
                name varchar(128) not null default '',
                primary key(id)
            );`

        this.connection.query(query, error => {
            if (error) {
                console.log(`[ERROR]: Failed to created tbcategory: ${error}`);
            } else {
                console.log('[SUCCESS]: tbcategory created!');
            }
        });
    }

    createTbDevice() {
        const query = `
            create table if not exists ${TABLE_NAME.tbDevice}
            (
	            id         int         not null auto_increment,
	            categoryId int         not null default 0,
	            color      varchar(16) not null default '',
	            partNumber int         not null default 0,
                primary key(id)
            );`

        this.connection.query(query, error => {
            if (error) {
                console.log(`[ERROR]: Failed to created tbdevice: ${error}`);
            } else {
                console.log('[SUCCESS]: tbdevice created!');
            }
        });
    }
}

module.exports = new InitializeDb