import express from "express";
import cors from "cors";

const app = express();

app.use(cors());
app.use(express.json());

let VarAvatar;
let ArrayDeUsuarios = [];
let ArrayDeTweets = [];

app.get("/tweets", (req, res) => {
    const page = parseInt(req.query.page);
    
    if (page < 1 ) {
        res.status(400).send('Informe uma página válida!');
        return;
    }
    const tweetsPorPagina = 10;
    const startIndex = page ? (page - 1) * tweetsPorPagina : tweets.length - tweetsPorPagina;
    const endIndex = page ? page * tweetsPorPagina : tweets.length;
    
    res.send(ArrayDeTweets.slice(startIndex, endIndex));
})

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