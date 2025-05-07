const express = require('express');
const path = require('path');
const cors = require('cors');

const app = express();
const port = 5500;

app.use(cors());

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../public1/orders.html'));
});

app.get('/api/users', (req, res) => {
    let test = [{
        id: '1',
        name: 'dully1',
    },  {
        id: '2',
        name: 'dully2',
    },  {
        id: '3',
        name: 'dully3',
    }];

    res.json(test);
}
);

app.listen(port, () => {
    console.log('Server running on port ' + port);
});
