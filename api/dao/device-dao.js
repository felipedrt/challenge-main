const TABLE_NAME = require('../infra/tables');
const db = require('../infra/db');

class DeviceDao {

    //#region Constructor

    constructor() {
    }

    //#endregion

    //#region Methods

    //#region Select

    selectAll(res) {
        const sql = `
        select
            d.id
            ,d.categoryId
            ,ifnull(c.name, '') as name
            ,d.color
            ,d.partNumber
        from
            ${TABLE_NAME.tbDevice} as d
        left outer join ${TABLE_NAME.tbCategory} as c
            on c.id = d.categoryId`;
        
        db.query(sql, (error, result) => {
            if (error) {
                res.status(400).status({
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

    //#endregion

    //#region Insert

    insert(device, res) {
        const sql = `
        insert into ${TABLE_NAME.tbDevice}
        (
            categoryId
            ,color
            ,partNumber
        )
        values
        (
            ?
            ,?
            ,?
        );`
        
        const parameters = [
            device.categoryId
            ,device.color
            ,device.partNumber
        ];
        db.query(sql, parameters, (error) => {
            if (error) {
                res.status(400).status({
                    hasError: true,
                    msg: error,
                    items: []
                });
            } else {
                res.status(200).status({
                    hasError: true,
                    msg: error,
                    items: [{...device}]
                });
            }
        });
    }

    //#endregion

    //#region Update

    update(id, device, res) {
        const sql = `
            update ${TABLE_NAME.tbDevice}
        set
            categoryId  = ?
            ,color      = ?
            ,partNumber = ?
        where
            id = ?;`
        
        const parameters = [
            device.categoryId
            ,device.color
            ,device.partNumber
            ,id
        ];
        db.query(sql, parameters, (error) => {
            if (error) {
                res.status(400).status({
                    hasError: true,
                    msg: error,
                    items: []
                });
            } else {
                res.status(200).status({
                    hasError: true,
                    msg: error,
                    items: [{...device}]
                });
            }
        });
    }

    //#endregion

    //#region Delete

    delete(id, res) {
        const sql = `
        delete from
            ${TABLE_NAME.tbDevice}
        where
            id = ?;`
        
        const parameters = [id];
        db.query(sql, parameters, (error) => {
            if (error) {
                res.status(400).status({
                    hasError: true,
                    msg: error,
                    items: []
                });
            } else {
                res.status(200).status({
                    hasError: true,
                    msg: error,
                    items: []
                });
            }
        });
    }

    //#endregion

    //#endregion
}

module.exports = new DeviceDao;