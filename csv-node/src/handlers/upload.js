const Busboy = require('busboy');
const csv = require('fast-csv');
const moment = require('moment');

const Database = require('../db');

const UploadHandler = (req, res, next) => {
    const errors = [];
    const busBoy = new Busboy({
        headers: req.headers
    });

    busBoy.on('file', function (fieldname, file, filename, encoding, mimetype) {
        const errors = [];
        file.pipe(csv.parse())
            .on('error', error => {
                errors.push(error)
            })
            .on('data', row => {
                const [id, ammount, duedate] = row;
                if (isNaN(id) || isNaN(ammount) || !/\d{4}-\d{2}-\d{2}/.test(duedate)) {
                    errors.push({
                        error: 'Invalid row',
                        row: row
                    })
                }
                else {
                    Database.add({
                        id,
                        ammount: calculateSellingPrice(ammount, duedate),
                        duedate
                    });
                }
            })
            .on('close', () => {
                res.status(200).json({
                    errors
                })
            })
    });
    req.pipe(busBoy);
}

const calculateSellingPrice = (ammount, dueDate) => {
    if (Math.abs(moment(dueDate).diff(moment(), 'days')) >= 30) {
        return ammount * 0.5
    }
    else return ammount * 0.3
}

module.exports = UploadHandler;
exports.calculateSellingPrice = calculateSellingPrice;