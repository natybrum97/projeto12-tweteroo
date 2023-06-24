import express from "express";
import cors from "cors";

const app = express();

app.use(cors());
app.use(express.json());

let VarAvatar;
let ArrayDeUsuarios = [];
let ArrayDeTweets = [];

app.get("/tweets", (req, res) => {
    const { page } = req.query;
  
    if (!page) {
      // Se a página não for fornecida, retornar os últimos 10 tweets
      return res.status(200).send(ArrayDeTweets.slice(-10));
    }
  
    const pageNumber = parseInt(page);
  
    if (isNaN(pageNumber) || pageNumber <= 0) {
      // Se a página não for um número válido ou for menor ou igual a zero, retornar erro 400
      return res.status(400).send("Dados de página inválidos. Informe uma página válida!");
    }
  
    if (pageNumber === 1) {
      res.send(ArrayDeTweets.slice(-10));
    } else {
      const startIndex = (-pageNumber * 10);
      const endIndex = (-pageNumber * 10) + 8;
      res.send(ArrayDeTweets.slice(startIndex, endIndex));
    }
  });

app.get("/tweets/:username", (req, res) => {
    const { username } = req.params;
    const tweetsPorUser = ArrayDeTweets.filter(element => element.username === username.toString())
    res.send(tweetsPorUser);
})

app.post("/sign-up", (req, res) => {


    const { username, avatar } = req.body;

    VarAvatar = avatar;

    const novoUsuario = {username, avatar: VarAvatar};

    if(!username || !avatar || typeof username !== "string" || typeof avatar !== "string"){
        return res.status(400).send("Todos os campos são obrigatórios!");
    }

    ArrayDeUsuarios.push(novoUsuario);

    res.status(201).send("OK");

})


app.post("/tweets", (req, res) => {

    if(ArrayDeUsuarios.length === 0){
        return res.status(401).send("Unauthorized");
    }

    const { tweet } = req.body;
    const { user } = req.headers;
    const username = user;

    if(!username || !tweet || typeof username !== "string" || typeof tweet !== "string"){
        return res.status(400).send("Todos os campos são obrigatórios!");
    }

    const novoTweet = {username, avatar: VarAvatar, tweet};

    ArrayDeTweets.push(novoTweet);

    res.status(201).send("OK");

})

const PORT = 5000;

app.listen(PORT, () => console.log(`O servidor está rodando na porta ${PORT}!`));