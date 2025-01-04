"use strict";

let number = 0;
const bbs = document.querySelector('#bbs');

// 投稿機能
document.querySelector('#post').addEventListener('click', () => {
    const name = document.querySelector('#name').value;
    const message = document.querySelector('#message').value;

    const params = {
        method: "POST",
        body: 'name=' + name + '&message=' + message,
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        }
    };

    const url = "/post";
    fetch(url, params)
        .then((response) => {
            if (!response.ok) {
                throw new Error('Error');
            }
            return response.json();
        })
        .then(() => {
            document.querySelector('#message').value = "";
        });
});

// 投稿チェック機能
document.querySelector('#check').addEventListener('click', () => {
    const params = {
        method: "POST",
        body: '',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        }
    };
    const url = "/check";
    fetch(url, params)
        .then((response) => {
            if (!response.ok) {
                throw new Error('Error');
            }
            return response.json();
        })
        .then((response) => {
            let value = response.number;
            if (number != value) {
                const params = {
                    method: "POST",
                    body: 'start=' + number,
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded'
                    }
                };
                const url = "/read";
                fetch(url, params)
                    .then((response) => {
                        if (!response.ok) {
                            throw new Error('Error');
                        }
                        return response.json();
                    })
                    .then((response) => {
                        number += response.messages.length;
                        for (let mes of response.messages) {
                            let cover = document.createElement('div');
                            cover.className = 'cover';
                            let name_area = document.createElement('span');
                            name_area.className = 'name';
                            name_area.innerText = mes.name;
                            let mes_area = document.createElement('span');
                            mes_area.className = 'mes';
                            mes_area.innerText = mes.message;
                            cover.appendChild(name_area);
                            cover.appendChild(mes_area);
                            let like_button = document.createElement('button');
                            like_button.innerText = "いいね";
                            like_button.onclick = () => likePost(mes.id);
                            cover.appendChild(like_button);
                            let like_count = document.createElement('span');
                            like_count.id = `likes-${mes.id}`;
                            like_count.innerText = `いいね: ${mes.likes || 0}`;
                            cover.appendChild(like_count);
                            let edit_button = document.createElement('button');
                            edit_button.innerText = "編集";
                            edit_button.onclick = () => editPost(mes.id);
                            cover.appendChild(edit_button);
                            bbs.appendChild(cover);
                        }
                    });
            }
        });
});

// 検索機能
function searchPosts() {
    const query = document.getElementById("searchInput").value;
    const url = `/bbs/search?query=${encodeURIComponent(query)}`;

    fetch(url)
        .then(response => {
            if (!response.ok) {
                throw new Error('Error');
            }
            return response.json();
        })
        .then(posts => {
            bbs.innerHTML = ""; // 既存の投稿をクリア
            if (posts.length === 0) {
                bbs.innerHTML = "<p>該当する投稿がありません。</p>";
            } else {
                for (let post of posts) {
                    let cover = document.createElement('div');
                    cover.className = 'cover';
                    let name_area = document.createElement('span');
                    name_area.className = 'name';
                    name_area.innerText = post.name;
                    let mes_area = document.createElement('span');
                    mes_area.className = 'mes';
                    mes_area.innerText = post.message;
                    cover.appendChild(name_area);
                    cover.appendChild(mes_area);
                    bbs.appendChild(cover);
                }
            }
        })
        .catch(error => console.error("エラー:", error));
}

function likePost(postId) {
    const url = `/bbs/${postId}/like`;
    fetch(url, { method: "POST" })
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                const likeSpan = document.getElementById(`likes-${postId}`);
                likeSpan.innerText = `いいね: ${data.likes}`;
            }
        });
}

function editPost(postId) {
    const newMessage = prompt("新しい内容を入力してください:");
    if (newMessage) {
        const url = `/bbs/${postId}`;
        const params = {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ message: newMessage })
        };
        fetch(url, params)
            .then(response => response.json())
            .then(data => {
                if (data.success) {
                    const postElement = document.getElementById(`post-${postId}`);
                    const messageElement = postElement.querySelector(".mes");
                    messageElement.innerText = newMessage; // 画面上で更新
                }
            });
    }
}
