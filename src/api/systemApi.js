const axios = require('axios');
const yargs = require('yargs');

// Develop server URL
const postBaseUrl = 'http://localhost:3000/api';

// Staging server URL
// const postBaseUrl = 'http://weathermood-staging.us-west-2.elasticbeanstalk.com/api';

// Production server URL
// const postBaseUrl = 'http://brook-ichibang.ap-northeast-1.elasticbeanstalk.com/api';


const argv = yargs
.command('list', 'List all posts', {
}).argv;

var command = argv._[0];
console.log(`Processing command "${command}"`);

switch(command){
  case('list'):
    const id = 30, whose = 'others';
    let url = `${postBaseUrl}/posts`;
    let query = [];
    if (id) query.push(`id=${id}`);
    if (whose) query.push(`whose=${whose}`);
    if (query.length) url += '?' + query.join('&');

    console.log(`Making GET request to: ${url}`);

    return axios.get(url).then(function (res) {
      if (res.status !== 200)
        throw new Error(`Unexpected response code: ${res.status}`);
        console.log(res.data);
    });
  default :
    console.log('no this argument or under developing');
}