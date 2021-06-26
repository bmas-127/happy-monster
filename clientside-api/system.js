const axios = require('axios');

// Develop server URL
let url = 'http://http://happy-monster-dev.ap-northeast-1.elasticbeanstalk.com/api/systems';

// Staging server URL
// const postBaseUrl = 'http://weathermood-staging.us-west-2.elasticbeanstalk.com/api';

// Production server URL
// const postBaseUrl = 'http://brook-ichibang.ap-northeast-1.elasticbeanstalk.com/api';



function update() {
//      const userid = 66, species = 'cat';
    console.log(`Making POST request to: ${url}`);

    return axios
    .post(url, {})
    .then(function (res) {
        if (res.status !== 200)
        throw new Error(`Unexpected response code: ${res.status}`);

        return res.data;
    });

}


module.exports = {
    update,
}