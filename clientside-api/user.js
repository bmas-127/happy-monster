const axios = require('axios');

// Develop server URL
let url = 'http://happy-monster-dev.ap-northeast-1.elasticbeanstalk.com/api/users';

// Staging server URL
// const postBaseUrl = 'http://weathermood-staging.us-west-2.elasticbeanstalk.com/api';

// Production server URL
// const postBaseUrl = 'http://brook-ichibang.ap-northeast-1.elasticbeanstalk.com/api';


function list(userid){
//      const id = 48, species = '', status='';
    let qurl = url + '?id=' + userid;

    console.log(`Making GET request to: ${qurl}`);

    return axios.get(qurl).then(function (res) {
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


module.exports = {
    create,
    list
}