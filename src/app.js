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
  
    if (!page || page <= 0 || isNaN(page)) {
      return res.status(400).send("Informe uma página válida!");
    }
  
    const pageNumber = parseInt(page);
  
    if (pageNumber === 1) {
        res.status(200).send(ArrayDeTweets.slice(-10));
    } else {
      const startIndex = -pageNumber * 10;
      const endIndex = startIndex + 10;
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

    const { username, tweet } = req.body;

    if(!username || !tweet || typeof username !== "string" || typeof tweet !== "string"){
        return res.status(400).send("Todos os campos são obrigatórios!");
    }

    const novoTweet = {username, avatar: VarAvatar, tweet};

    ArrayDeTweets.push(novoTweet);

    res.status(201).send("OK");

})

const PORT = 5000;

app.listen(PORT, () => console.log(`O servidor está rodando na porta ${PORT}!`));