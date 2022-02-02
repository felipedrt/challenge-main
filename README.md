# How To Execute

## Backend

- Access the folder API and execute `npm install` command.
- At the same API folder execute `node index.js` to start server locally.
- The database should be created automatically when the server started, if the database will not be created, open **challenge.sql** copy all the text and paste it in your local database.

At the first time when I started the backend the following error has been displayed:
`Error: ER_NOT_SUPPORTED_AUTH_MODE: Client does not support authentication protocol requested by server; consider upgrading MySQL client`.

If this error appear again, execute those commands in your local database:

`ALTER USER 'your_user'@'your_server_address' IDENTIFIED WITH mysql_native_password BY 'your_password';`
`flush privileges;`

## Frontend