var Promise = require('bluebird');
var request = require('request');
var fs = require('fs');
var async = require('async');
var cheerio = require('cheerio');

var oiaBase = 'http://www.oia.ntu.edu.tw';
var schoolList = '/ch/outgoing/school.list';
var detailsPrefix = '/ch/outgoing/view/sn/';
var countries = {};
var countriesDict = {};

console.log('Retrieving school list from OIA website...');
request.get(oiaBase + schoolList, function(err, res, body) {
    if(err) return console.log(err);
    console.log('School list retrieved.');
    var $ = cheerio.load(body);
    $('#country_sn').children().each(function(i, elem) {
        countries[$(this).attr('value')] = $(this).text();
        countriesDict[$(this).text()] = parseInt($(this).attr('value'));
    });
    fs.writeFileSync(
        'data/countries.json',
        JSON.stringify(countries, null, 2),
        {
            encoding: 'utf8'
        }
    );
    console.log('Country list saved.');
    var currentCountry = '';
    var schools = [];
    $('.forms_content_State').first().children('tbody').children('tr').each(function(i, elem) {
        if($(this).attr('class') == 'odd') return;
        var s = {};
        var cols = $(this).children();
        currentCountry = cols.eq(0).text().trim() || currentCountry;
        s.countryCode = countriesDict[currentCountry];
        var schoolNameData = cols.eq(1).text().trim();
        s.schoolName = schoolNameData.split(' ')[0];
        s.schoolUrl = cols.eq(1).find('a').attr('href') || '';
        if (s.schoolUrl.length != 0 && !s.schoolUrl.match(/^[a-zA-Z]+:\/\//)) s.schoolUrl = 'http://' + s.schoolUrl;
        s.startYear = parseInt(schoolNameData.replace(/\D+/g, ''));
        s.contractQuota = parseInt(cols.eq(2).text()) || 0;
        s.selectQuota = parseInt(cols.eq(3).text()) || 0;
        s.selectQuotaTotal = parseInt(cols.eq(4).text()) || 0;
        s.oiaId = parseInt(cols.eq(5).find('a').attr('href').split('/').pop());
        schools.push(s);
    });
    fs.writeFileSync(
        'data/schools.json',
        JSON.stringify(schools, null, 2),
        {
            encoding: 'utf8'
        }
    );
    console.log('School list saved.');
});
