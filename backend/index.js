const express = require("express")
const cors = require("cors")
const mongoose = require("mongoose")
const userModel = require("./models/userModel")
const noteModel = require("./models/noteModel")
const jwt = require("jsonwebtoken")
const { authenticateToken } = require("./utils")
const app = express()

//mongoose
mongoose.connect("mongodb://127.0.0.1:27017/notesDB").then(() => {
    console.log("db connected")
}).catch((e) => {
    console.log("error", e)
})

app.use(express.json())
app.use(cors({
    origin: "*"
}))
app.get("/", (req, res) => {
    res.json({ data: "hello" })
})

//create
app.post("/create-account", async (req, res) => {
    const { fullname, email, password } = req.body
    if (!fullname) return res.status(400).json({ error: true, message: "fullname is required" })
    if (!email) return res.status(400).json({ error: true, message: "Email is required" })
    if (!password) return res.status(400).json({ error: true, message: "password is required" })

    const isUser = await userModel.findOne({ email: email })
    if (isUser) {
        return res.json({
            error: true,
            message: "user already exists"
        })
    }
    const user = new userModel({
        fullname,
        email,
        password
    });
    await user.save()
    const accessToken = jwt.sign({ user }, "secret", {
        expiresIn: "36000m"
    });
    return res.json({
        error: false,
        user,
        accessToken,
        message: "Registration succesfull"
    })
})
app.post("/login", async (req, res) => {
    const { email, password } = req.body
    if (!email) return res.status(400).json({ error: true, message: "Email is required" })
    if (!password) return res.status(400).json({ error: true, message: "password is required" })
    const userInfo = await userModel.findOne({ email: email })
    if (!userInfo) {
        return res.status(400).json({ message: "User not found" })
    }
    if (userInfo.email === email && userInfo.password === password) {
        const user = { user: userInfo }
        const accessToken = jwt.sign(user, "secret", {
            expiresIn: "36000m"
        })
        return res.json({
            error: false,
            message: "Login successfull",
            email,
            accessToken
        })
    } else {
        return res.status(400).json({
            error: true,
            message: "Invalid credentials"
        })
    }


})

app.post("/add-note", authenticateToken, async (req, res) => {
    const { title, content, tags } = req.body
    const { user } = req.user
    if (!title) {
        return res.status(400).json({ error: true, message: "title is requried" })
    }
    if (!content) {
        return res.status(400).json({ error: true, message: "content is required" })
    }
    try {
        const note = new noteModel({
            title,
            content,
            tags: tags || [],
            userId: user._id
        })
        await note.save()
        return res.json({
            error: false,
            note,
            message: "note added successfully"
        })
    } catch (error) {
        return res.status(500).json({
            error: false,
            message: "internal server error"
        })
    }
})
app.post("/edit-note/:noteId", authenticateToken, async (req, res) => {
    const { noteId } = req.params.noteId
    const { title, content, tags, isPinned } = req.body
    const { user } = req.user
    if (!title && !content && !tags) {
        return res.status(400).json({ error: true, message: "no changes provided" })
    }

    try {
        const note = await noteModel.findOne({ _id: noteId, userId: user._id })
        if (!note) {
            return res.status(404).json({ error: true, message: "note not found" })
        }
        if (title) note.title = title;
        if (content) note.content = content
        if (tags) note.tags = tags
        if (isPinned) note.isPinned = isPinned
        await note.save()
        return res.json({
            error: false,
            note,
            message: "note updated successfully"
        })
    } catch (error) {
        return res.status(500).json({
            error: true,
            message: "internal server error"
        })
    }
})
app.listen(3000, () => {
    console.log("server running")
})