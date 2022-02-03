const TABLE_NAME = require('../infra/tables');
const db = require('../infra/db');

class CategoryDao {

    //#region Constructor

    constructor() {
    }

    //#endregion

    //#region Methods

    //#region Select

    selectAll(res) {
        const sql = `
                select
                    id,
                    name
                from
                ${TABLE_NAME.tbCategory}`;
        
        db.query(sql, (error, result) => {
            if (error) {
                res.status(400).json({
                    hasError: true,
                    msg: error,
                    items: []
                });
            } else {
                res.status(200).json({
                    hasError: false,
                    msg: '',
                    items: result
                });
            }
        });
    }

    selectById(id, res) {
        const sql = `
        select
            id
            ,name
        from
            ${TABLE_NAME.tbCategory}
        where
            id = ?`;
        
        db.query(sql, id, (error, result) => {
            if (error) {
                res.status(400).json({
                    hasError: true,
                    msg: error,
                    items: []
                });
            } else {
                res.status(200).json({
                    hasError: false,
                    msg: '',
                    items: result[0]
                });
            }
        });
    }

    //#endregion

    //#region Insert

    insert(category, res) {
        const sql = `
        insert into ${TABLE_NAME.tbCategory}
        (
            name
        )
        values
        (
            ?
        );`
        
        const parameters = [category.name];
        db.query(sql, parameters, (error) => {
            if (error) {
                res.status(400).json({
                    hasError: true,
                    msg: error,
                    items: []
                });
            } else {
                res.status(200).json({
                    hasError: false,
                    msg: '',
                    items: [{...category}]
                });
            }
        });
    }

    //#endregion

    //#region Update

    update(id, category, res) {
        const sql = `
        update ${TABLE_NAME.tbCategory}
        set
            name = ?
        where
            id = ?;`
        
        const parameters = [category.name, id];
        db.query(sql, parameters, (error) => {
            if (error) {
                res.status(400).json({
                    hasError: true,
                    msg: error,
                    items: []
                });
            } else {
                res.status(200).json({
                    hasError: false,
                    msg: '',
                    items: [{...category}]
                });
            }
        });
    }

    //#endregion

    //#region Delete

    delete(id, res) {
        const sql = `
        delete from
            ${TABLE_NAME.tbCategory}
        where
            id = ?;`
        
        const parameters = [id];
        db.query(sql, parameters, (error) => {
            if (error) {
                res.status(400).json({
                    hasError: true,
                    msg: error,
                    items: []
                });
            } else {
                res.status(200).json({
                    hasError: false,
                    msg: error,
                    items: []
                });
            }
        });
    }

    //#endregion

    //#endregion
}

module.exports = new CategoryDao;