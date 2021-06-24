const axios = require('axios');

// Develop server URL
let url = 'http://happy-monster-dev.ap-northeast-1.elasticbeanstalk.com/api/animals';

// Staging server URL
// const postBaseUrl = 'http://weathermood-staging.us-west-2.elasticbeanstalk.com/api';

// Production server URL
// const postBaseUrl = 'http://brook-ichibang.ap-northeast-1.elasticbeanstalk.com/api';


function list(id, species = '', status = ''){
//      const id = 48, species = '', status='';
    let query = [];
    if (id) query.push(`id=${id}`);
    if (species) query.push(`species=${species}`);
    if (status) query.push(`status=${status}`);
    if (query.length) url += '?' + query.join('&');

    console.log(`Making GET request to: ${url}`);

    return axios.get(url).then(function (res) {
    if (res.status !== 200)
        throw new Error(`Unexpected response code: ${res.status}`);
        return res.data;
    });
}

function create(userid, species) {
//      const userid = 66, species = 'cat';
    console.log(`Making POST request to: ${url}`);

    return axios
    .post(url, {
        userid,
        species
    })
    .then(function (res) {
        if (res.status !== 200)
        throw new Error(`Unexpected response code: ${res.status}`);

        return res.data;
    });

}
    
function update(aid, update) {
//      const aid = 56, update = 'death';
    const updateUrl = url + '/update';
    console.log(`Making POST request to: ${updateUrl}`);

    return axios
    .post(updateUrl, {
        aid,
        update
    })
    .then(function (res) {
        if (res.status !== 200)
        throw new Error(`Unexpected response code: ${res.status}`);

        return res.data;
    });
}

module.exports = {
    create,
    update,
    list
}