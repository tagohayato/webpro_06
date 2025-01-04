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
            bbs.innerHTML = ""; // 一度投稿をクリア
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
        });
}
