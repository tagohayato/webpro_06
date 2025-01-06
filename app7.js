"use strict";
const express = require("express");
const app = express();

let bbs = []; // 投稿データを保持する配列

app.use("/public", express.static(__dirname + "/public"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// 投稿送信
app.post("/post", (req, res) => {
    const name = req.body.name;
    const message = req.body.message;
    bbs.push({ id: bbs.length + 1, name, message, likes: 0 });
    res.json({ success: true });
});

// 投稿チェック
app.post("/check", (req, res) => {
    res.json({ number: bbs.length });
});

// 投稿取得
app.post("/read", (req, res) => {
    const start = Number(req.body.start);
    res.json({ messages: start === 0 ? bbs : bbs.slice(start) });
});

// 検索機能 (POSTメソッド)
app.post("/search", (req, res) => {
    const query = req.body.query?.toLowerCase() || "";
    const results = bbs.filter(post =>
        post.name.toLowerCase().includes(query) || 
        post.message.toLowerCase().includes(query)
    );
    res.json(results);
});

// いいね機能 (POSTメソッド)
app.post("/bbs/:id/like", (req, res) => {
    const id = parseInt(req.params.id, 10);
    const post = bbs.find(p => p.id === id);
    if (post) {
        post.likes += 1;
        res.json({ success: true, likes: post.likes });
    } else {
        res.status(404).json({ success: false, message: "投稿が見つかりません" });
    }
});

// 編集機能 (POSTメソッド)
app.post("/bbs/:id/edit", (req, res) => {
    const id = parseInt(req.params.id, 10);
    const post = bbs.find(p => p.id === id);
    if (post) {
        post.message = req.body.message;
        res.json({ success: true });
    } else {
        res.status(404).json({ success: false, message: "投稿が見つかりません" });
    }
});

app.listen(8080, () => console.log("Example app listening on port 8080!"));

