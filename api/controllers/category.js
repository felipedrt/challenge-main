const categoryDao = require('../dao/category-dao')

module.exports = app => {
    app.get('/categories', (req, res) => {
        categoryDao.selectAll(res);
    })

    app.post('/categories', (req, res) => {
       const category = req.body
       categoryDao.insert(category, res)
    }) 

    app.patch('/categories/:id', (req, res) => {
        const id = parseInt(req.params.id)
        const category = req.body

        categoryDao.update(id, category, res)
    })

    app.delete('/categories/:id', (req, res) => {
        const id = parseInt(req.params.id)

        categoryDao.delete(id, res)
    })
}