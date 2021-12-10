const app = require('express')();

const faunadb = require('faunadb');
const client = new faunadb.Client({ secret: 'fnAEaEBGqkACQTF9IMNY27HOuYmjxNYjXRfeXXOX' });

const {
    Paginate,
    Get,
    Select,
    Match,
    Index,
    Create,
    Collection,
    Lambda,
    Var,
    Join
} = faunadb.query;

app.listen(8000, () => console.log('API on port 8000'));