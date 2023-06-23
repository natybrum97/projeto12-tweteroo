import express from "express";
import cors from "cors";

const app = express();

app.use(cors());
app.use(express.json());

let VarAvatar;
let ArrayDeUsuarios = [];
let ArrayDeTweets = [];

app.get("/tweets", (req, res) => {
    res.send(ArrayDeTweets.slice(-10));
})

app.post("/sign-up", (req, res) => {


    const { username, avatar } = req.body;

    VarAvatar = avatar;

    const novoUsuario = {username, avatar: VarAvatar};

    ArrayDeUsuarios.push(novoUsuario);

    res.send("OK");

})


app.post("/tweets", (req, res) => {

    if(ArrayDeUsuarios.length === 0){
        return res.status(401).send("Unauthorized");
    }

    const { username, tweet } = req.body;

    const novoTweet = {username, avatar: VarAvatar, tweet};

    ArrayDeTweets.push(novoTweet);

    res.send("OK");

})

const PORT = 5000;

app.listen(PORT, () => console.log(`O servidor está rodando na porta ${PORT}!`));