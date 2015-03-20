var express = require('express');
var router = express.Router();
var tequila = require('../lib/tequila');
var db = require('../lib/db');


router.get('/', function(req, res) {
    db.pollsAnswer.mapReduce(
        function(){
            var points = this.order.length;
            for (var i in this.order){
                emit(this.order[i], points--);
            }
        },
        function(key, values){
            return Array.sum(values);
        },
        {
            query: {},
            out: {inline: 1}  //  "scores"
        },
        function (err, mapReduced){
            res.render('result', { title: 'Results', results: mapReduced });
        }
    );
});
module.exports.router = router;
