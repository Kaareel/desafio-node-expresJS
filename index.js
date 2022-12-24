const fs = require('fs')
const express = require('express')
const app = express()
const PORT = 3000

app.use(express.json());

app.listen(PORT, console.log('Servidor Corriendo'))

app.get("/", (req, res) => {
    res.sendFile(__dirname + "/index.html");
});

app.get("/canciones", (req, res) => {
    const songs = JSON.parse(fs.readFileSync("repertorio.json", "utf8"))
    res.json(songs)
})

app.post("/canciones", (req, res) => {
    const song = req.body
    const songs = JSON.parse(fs.readFileSync("repertorio.json", "utf8"))
    fs.writeFileSync("repertorio.json", JSON.stringify([...songs,song]))
    res.send("Canción agregado con éxito!")
})

app.put("/canciones/:id", (req, res) => {
    const { id } = req.params
    const song = req.body
    const songs = JSON.parse(fs.readFileSync("repertorio.json"))
    const index = songs.findIndex(s => s.id == id)
    songs[index] = song
    fs.writeFileSync("repertorio.json", JSON.stringify(songs))
    res.send("Canción modificada con éxito")
})

app.delete("/canciones/:id", (req, res) => {
    const { id } = req.params
    const songs = JSON.parse(fs.readFileSync("repertorio.json"))
    const index = songs.findIndex(p => p.id == id)
    songs.splice(index, 1)
    fs.writeFileSync("repertorio.json", JSON.stringify(songs))
    res.send("Canción eliminada con éxito")
})