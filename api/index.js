const db = require('./infra/db');
const myExpress = require('./config/myExpress');
const initializedb = require('./infra/initializedb')

db.connect(error => {
    if(error) {
        console.log(`[ERROR]: Error to connect with mysql hosts: ${error}`);
    } else {
        console.log('[SUCCESS]: Connection successfully with MySQL hosts!');
        initializedb.initialize(db)
        
        const app = myExpress()
        app.listen(3000, () => console.log('Server running on port 3000...'));
    }
})
