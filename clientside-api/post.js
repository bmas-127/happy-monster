const axios = require('axios');

// Develop server URL
//let url = 'http://localhost:3000/api/posts';

// Staging server URL
const url = 'http://happy-monster-dev.ap-northeast-1.elasticbeanstalk.com/api/posts';

// Production server URL
// let url = 'http://brook-ichibang.ap-northeast-1.elasticbeanstalk.com/api';


function list(id, task = '', ts) {
    let query = [];
    if (id) query.push(`id=${id}`);
    if (task) query.push(`task=${task}`);
    if (ts) query.push(`ts=${ts}`);
    const qurl = (query.length) ? url + '?' + query.join('&') : url;

    console.log(`Making GET request to: ${qurl}`);

    return axios.get(qurl).then(function (res) {
    if (res.status !== 200)
        throw new Error(`Unexpected response code: ${res.status}`);
        return res.data;
    });
}


function update(postid, text){
    console.log(`Making POST request to: ${url + "/update"}`);

    return axios
    .post(url + "/update", {
        postid,
        text,
    })
    .then(function (res) {
        if (res.status !== 200)
        throw new Error(`Unexpected response code: ${res.status}`);

        console.log(res.data);
    });
}

function create(uid, score, text){
    console.log(`Making POST request to: ${url}`);

    return axios
    .post(url, {
        uid,
        score,
        text,
    })
    .then(function (res) {
        if (res.status !== 200)
        throw new Error(`Unexpected response code: ${res.status}`);

        console.log(res.data);
    });
}

module.exports = {
    create,
    update,
    list
}