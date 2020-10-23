const Database = require('../db');

const DataHandler = async (req, res, next) => {
    const data = await Database.get();
    res.json(data)
}



module.exports = DataHandler;