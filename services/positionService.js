/**
 * Created by shuaigeng.zhao on 2016/2/22.
 */
var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/works');
var Schema = mongoose.Schema;

var _ = require('underscore');

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

exports.findPosition = function(opts, callback) {

    var defaultOptions = {
        workYear: ['不限', '1-3年', '3-5年'],
        salary: '12',
        address: "",
        timelyRate: 0,
        avgTime: 9,

        curPage: 1,
        pageSize: 10,

        sortField: "_id",
        sortOrder: 1
    };

    var options = _.extend(defaultOptions, opts || {});

    var arr =  options.salary.split('');
    var salaryRegex = "";

    if (arr.length == 1) {
        salaryRegex = '^[' + arr[0] + '-9]|^[1-2][0-9]k'
    } else if (arr.length == 2) {
        salaryRegex = '^[' + arr[0] + '-9][' + arr[1] + '-9]k'
    }

    var sort = options.sortOrder < 0 ? '-' + options.sortField
        : options.sortField;

    positionModel
        .find({
            'company.address': {$regex: options.address},
            'work_year': {$in: options.workYear},
            'salary': {$regex: salaryRegex},
            'publisher.timely_rate': {$gte: options.timelyRate + '%'},
            'publisher.avg_time': {$lte: options.avgTime + '天'}
        })
        .sort(sort)
        .skip((options.curPage - 1) * options.pageSize)
        .limit(options.pageSize)
        .exec(callback);
}