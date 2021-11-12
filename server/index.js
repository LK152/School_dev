import Express  from 'express';

const app = Express();
const port = 8000;

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});