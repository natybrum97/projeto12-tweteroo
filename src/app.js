import express from "express";

const app = express();


let ArrayDeUsuarios = [];
let ArrayDeTweets = [];

app.post("/sign-up", (req, res) => {

    const { username, avatar } = req.body;

    const novoUsuario = {username, avatar};

    ArrayDeUsuarios.push(novoUsuario);

    res.send("OK");

})


app.post("/tweets", (req, res) => {

    const { username, tweet } = req.body;

    const novoTweet = {username, tweet};

    ArrayDeTweets.push(novoTweet);

    res.send("OK");

})

const PORT = 5000;

app.listen(PORT, () => console.log(`O servidor está rodando na porta ${PORT}!`));