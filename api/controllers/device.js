const deviceDao = require('../dao/device-dao')

module.exports = app => {
    app.get('/devices', (req, res) => {
        deviceDao.selectAll(res);
    })

    app.get('/devices/:id', (req, res) => {
        const id = parseInt(req.params.id);
        deviceDao.selectById(id, res);
    })

    app.post('/devices/insert', (req, res) => {
       const device = req.body
       deviceDao.insert(device, res)
    }) 

    app.patch('/devices/:id', (req, res) => {
        const id = parseInt(req.params.id)
        const device = req.body

        deviceDao.update(id, device, res)
    })

    app.delete('/devices/:id', (req, res) => {
        const id = parseInt(req.params.id)

        deviceDao.delete(id, res)
    })
}