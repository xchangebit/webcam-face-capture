'use strict';

const fs = require('fs');

const router = require('express').Router();

const multiparty = require('multiparty');

const STORAGE_DIRECTORY = process.env.STORAGE || __dirname + '/data'

router.post('/', function (req, res) {
    var form = new multiparty.Form();
    
    form.on('field', (name, value) => {

        if(name == 'data') {

            const filename = `${STORAGE_DIRECTORY}/${Date.now()}.png`;
            const data = value.replace(/^data:image\/\w+;base64,/, "");

            fs.writeFile(filename, data, 'base64', (err, file) => {
                if(err) {
                    res.status(500).json({error: err});
                } else {
                    res.status(200).json({result:'ok'});
                }
            });
        }
    });

    form.parse(req);
})

module.exports = router;
