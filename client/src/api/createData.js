import { client, q } from '../config/db';

const createData = text => client.query(
    q.Create(
        q.Collection('students'),
        {
            data: {
                text
            },
        },
    )
)
    .then(ret => ret)
    .catch(err => console.warn(err));

export default createData;