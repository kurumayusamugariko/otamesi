let express = require("express");
let app = express();
const bodyParser = require('body-parser');

app.use(express.urlencoded({ extended: true }));
app.use(express.static(__dirname + '/public'));
app.use(bodyParser.json());

app.get('/', (request, response) => {
  response.sendFile(__dirname + '/game.html');
});

app.get('/2', (request, response) => {
  response.sendFile(__dirname + '/game2.html');
});

app.use((req, res, next) => {
  res.status(404).send("<h1>ページが見つかりません</h1>");
});

app.listen(8080, () => {
  console.log("Start Server on port 8080!");
});