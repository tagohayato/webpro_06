"use strict";

let number = 0;
const bbs = document.querySelector('#bbs');

// 投稿送信機能
document.querySelector('#post').addEventListener('click', () => {
    const name = document.querySelector('#name').value;
    const message = document.querySelector('#message').value;

    const params = {
        method: "POST",
        body: `name=${encodeURIComponent(name)}&message=${encodeURIComponent(message)}`,
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        }
    };

    fetch("/post", params)
        .then(response => response.json())
        .then(() => {
            document.querySelector('#message').value = "";
        });
});

// 投稿チェック機能
document.querySelector('#check').addEventListener('click', () => {
    fetch("/read", {
        method: "POST",
        body: "start=0",
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        }
    })
        .then(response => response.json())
        .then(data => {
            bbs.innerHTML = ""; // 投稿リストをクリア
            data.messages.forEach(post => {
                const cover = document.createElement('div');
                cover.className = 'cover';
                const nameArea = document.createElement('span');
                nameArea.className = 'name';
                nameArea.innerText = post.name;
                const messageArea = document.createElement('span');
                messageArea.className = 'mes';
                messageArea.innerText = post.message;
                cover.appendChild(nameArea);
                cover.appendChild(messageArea);
                bbs.appendChild(cover);
            });
        });
});

// 検索機能
function searchPosts() {
    const query = document.getElementById("searchInput").value;
    fetch(`/bbs/search?query=${encodeURIComponent(query)}`)
        .then(response => response.json())
        .then(posts => {
            bbs.innerHTML = "";
            if (posts.length === 0) {
                bbs.innerHTML = "<p>該当する投稿がありません。</p>";
            } else {
                posts.forEach(post => {
                    const cover = document.createElement('div');
                    cover.className = 'cover';
                    const nameArea = document.createElement('span');
                    nameArea.className = 'name';
                    nameArea.innerText = post.name;
                    const messageArea = document.createElement('span');
                    messageArea.className = 'mes';
                    messageArea.innerText = post.message;
                    cover.appendChild(nameArea);
                    cover.appendChild(messageArea);
                    bbs.appendChild(cover);
                });
            }
        });
}
