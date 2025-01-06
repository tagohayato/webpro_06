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

                // いいね機能
                const likeButton = document.createElement('button');
                likeButton.innerText = "いいね";
                likeButton.onclick = () => likePost(post.id);
                const likeCount = document.createElement('span');
                likeCount.id = `likes-${post.id}`;
                likeCount.innerText = ` いいね: ${post.likes}`;

                // 編集機能
                const editButton = document.createElement('button');
                editButton.innerText = "編集";
                editButton.onclick = () => editPost(post.id);

                cover.appendChild(nameArea);
                cover.appendChild(messageArea);
                cover.appendChild(likeButton);
                cover.appendChild(likeCount);
                cover.appendChild(editButton);
                bbs.appendChild(cover);
            });
        });
});

// いいね機能
function likePost(postId) {
    fetch(`/bbs/${postId}/like`, { method: "POST" })
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                const likeCount = document.getElementById(`likes-${postId}`);
                likeCount.innerText = ` いいね: ${data.likes}`;
            }
        });
}

// 編集機能
function editPost(postId) {
    const newMessage = prompt("新しいメッセージを入力してください:");
    if (newMessage) {
        fetch(`/bbs/${postId}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ message: newMessage })
        })
            .then(response => response.json())
            .then(data => {
                if (data.success) {
                    alert("投稿を編集しました");
                    document.querySelector('#check').click(); // 投稿リストを更新
                }
            });
    }
}
