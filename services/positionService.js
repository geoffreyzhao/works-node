/**
 * Created by shuaigeng.zhao on 2016/2/22.
 */
var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/works');
var Schema = mongoose.Schema;
var bodyParser = require('body-parser');

var positionSchema = new Schema({
    is_visible: Boolean,
    position_id: String,
    name: String,
    format_create_time: String,
    work_year: String,
    salary: String,
    education: String,
    job_nature: String,
    position_advantage: String,
    company_label_list: [String],
    position_desc: String,
    create_time: Date,
    company: {
        company_name: String,
        company_short_name: String,
        industry_field: String,
        finance_stage: String,
        company_size: String,
        logo_link: String,
        homepage: String,
        address: String
    },
    publisher: {
        name: String,
        title: String,
        timely_rate: String,
        avg_time: String
    },
    is_favorite: Boolean,
    timestamp: Date
}, {
    collection: 'positions'
});

var positionModel = mongoose.model('Position', positionSchema);

function findPosition(opts) {
    if (!opts) {
        opts = {};
        opts.curPage = 1;
        opts.pageSize = 10;
    } else {

    }
}

//function get() {
positionModel
    .find({})
    .where()
    .sort('create_time')
    .skip()
    .limit(10)
    .exec(function(err, docs){
        if (err != null) {
            console.log(err);
        } else {
            exports.positionList = docs;
            //for (var i = 0; i < docs.length; i++) {
            //    console.log(docs[i].company.company_short_name);
            //    console.log("========");
            //}
        }
    });
//}

//get();