/**
 * Created by shuaigeng.zhao on 2016/2/22.
 */
var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/works');
var Schema = mongoose.Schema;

var positionSchema = new Schema({
    isVisible: Boolean,
    positionId: String,
    name: String,
    formatCreateTime: String,
    workYear: String,
    salary: String,
    education: String,
    jobNature: String,
    positionAdvantage: String,
    companyLabelList: [String],
    createTime: Date,
    timestamp: Date
}, {
    collection: 'position'
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
    positionModel.find({
        name: "前端开发工程师"
    },{}, {
        limit: 10,
        skip: 10
    }, function(err, positions){
        if (err) {
            console.log('get position error');
        } else {
            //console.log(positions);
            exports.positionList = positions;
        }
    });
//}

//get();