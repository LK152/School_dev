const app = require('express')();

const faunadb = require('faunadb');
const client = new faunadb.Client({ secret: 'fnAEaEBGqkACQTF9IMNY27HOuYmjxNYjXRfeXXOX' });

const {
    Paginate,
    Get, 
    Ref, 
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

app.get('/students/:id', async (req, res) => {
    const doc = await client.query(
        Get(
            Ref(
                Collection('students'),
                req.params.id
            )
        )
    )

    res.send(doc);
})

app.post('/students', async (req, res) => {

    const data = {
        user: Select('ref', Get(Match(Index('students_by_name'), 'fireship_dev'))),
        text: 'Hola Mundo!'
    }

    const doc = await client.query(
        Create(
            Collection('students'),
            { data }
        )
    )

    res.send(doc)
});