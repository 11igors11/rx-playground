var express = require('express');
var app = express();

app.get('/api/searchresult', function (req, res) {

    setTimeout(function () {
        if (Math.random() > 0.5) {
            var str = req.query.term.toString();
            res.send([str + str, str + str + str, str + str + str + str, str + str + str + str + str]);
        } else {
            res.status(500).send({error: 'Something failed!'});
        }
    }, Math.ceil(Math.random() * 1000) + 200);
});

app.listen(3000, function () {
    console.log('Example app listening on port 3000!');
});
