const yargs = require('yargs');

const animalApi = require('./animal.js')
const postApi = require('./post.js')
const userApi = require('./user.js')
const system = require('./system.js')

const argv = yargs
.command('list', 'List all posts', {
}).argv;

var command = argv._[0];
console.log(`Processing command "${command}"`);

let userid = 69, animalSpecies = '', animalStatus = '', animalid = 304;
let whose = 'others';

let postid = 208, text = 'bla bra bza';
let score;
let ts = 1624694500;

switch(command){
    case 'list-animal':
        /* userid must have value */
        animalApi.list(userid, animalSpecies='', animalStatus='death').then(post =>{
            console.log(post);
        }).catch(err => console.log(err));
        break;
    case 'create-animal':
        /* userid and animalSpecies must have value */
        animalApi.create(userid, animalSpecies).then(post =>{
            console.log(post);
        }).catch(err => console.log(err));
        break;
    case 'update-animal':
        /* animalid must have value */
        animalApi.update(animalid, animalStatus).then(post =>{
            console.log(post);
        })
        break;
    case 'list-post':
        postApi.list(user=1, whose='myself', ts).then(post => 
            console.log(post)
        );
        break;
    case 'create-post':
        /* userid and animalSpecies must have value */
        postApi.create(userid = 1, score = 10, text = 'today is a good day').then(post =>{
            console.log(post);
        }).catch(err => console.log(err));
        break;
    case 'update-post':
        /* userid and animalSpecies must have value */
        postApi.update(postid = 208, text = 'today is a gooood day').then(post =>{
            console.log(post);
        }).catch(err => console.log(err));
        break;
    case 'create-user':
        userApi.create(userid = "wer7").then(post =>{
            console.log(post);
        }).catch(err => console.log(err));
        break;
    case 'list-user':
        userApi.list(userid = 88).then(post =>{
            console.log(post);
        }).catch(err => console.log(err));
        break;
    case 'system-update':
        system.update().then(
            console.log('update successfully')
        ).catch(err => console.log(err));
        break;

  default :
    console.log('no this argument or under developing');
}