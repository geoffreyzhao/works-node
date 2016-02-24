/**
 * Created by shuaigeng.zhao on 2016/2/24.
 */
var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/works');
var Schema = mongoose.Schema;

var positionSchema = new Schema({
    name: String,
    salaryMin: Number,
    datetime: Date
}, {
    collection: 'position_info'
});

var positionModel = mongoose.model('Position', positionSchema);

positionModel
    .find({})
    .where('salaryMin').gte(10)
    .limit(2)
    .skip(3)
    //.select('name companyName')
    .sort('datetime')
    .exec(function(err, docs){
        if (err != null) {
            console.log(err);
        } else {
            for (var i = 0; i < docs.length; i++) {
                console.log(docs[i].name);
            }
        }
    });