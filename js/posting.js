// 서버 URL
const serverUrl = 'https://swengserver2-production.up.railway.app';  // 서버 URL

// 게시글 추가하기
function addPosting() {
    const author = localStorage.getItem('username');
    const title = document.getElementById('title').value;
    const link = document.getElementById('link').value;
    const type = document.getElementById('type').value;

    if (!author || !title) {
        alert('저자와 제목은 필수 항목입니다.');
        return;
    }

    const newPosting = {
        author: author,
        title: title,
        link: link,
        type: type
    };

    fetch(`${serverUrl}/postings`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(newPosting)
    })
    .then(response => response.json())
    .then(data => {
        alert(data.message);
        fetchPostings();  // 게시글 목록을 다시 불러옵니다
    })
    .catch(error => {
        console.error('게시글 추가 실패:', error);
        alert('게시글 추가에 실패했습니다.');
    });
}

// 게시글 목록 불러오기
function fetchPostings() {
    const selectedType = document.getElementById('type-filter').value;

    let url = `${serverUrl}/postings`;  // 서버에서 전체 게시글을 불러옴

    fetch(url)
        .then(response => response.json())
        .then(data => {
            const postListContainer = document.getElementById('post-list-container');
            postListContainer.innerHTML = '';  // 기존 목록 초기화

            // 타입 필터링
            const filteredData = selectedType === 'all' 
                ? data  // '전체'인 경우 모든 게시글을 표시
                : data.filter(post => post.type === selectedType);  // 선택된 타입만 필터링

            // 필터링된 게시글 목록을 화면에 표시
            filteredData.forEach(post => {
                const postItem = document.createElement('div');
                postItem.classList.add('post-item');
                postItem.innerHTML = `
                    <div class="type">${post.type}</div>
                    <h3 class="title">${post.title}</h3>
                    <div class="link">
                        ${post.link ? `<a href="${post.link}" target="_blank">${post.link}</a>` : '링크 없음'}
                    </div>
                    <div class="meta">
                        <span>작성자: ${post.author}</span>
                    </div>
                    <div class="actions">
                        <span>댓글: ${post.comment_num}</span>
                        <span>좋아요: ${post.good}</span> <!-- 좋아요 수 추가 -->
                    </div>
                    <button onclick="deletePosting(${post.id})">삭제</button>
                `;
                postListContainer.appendChild(postItem);
            });
        })
        .catch(error => console.error('게시글 목록을 불러오는 데 실패했습니다.', error));
}

// 게시글 타입 필터링
function filterPostings() {
    fetchPostings();  // 필터링 후 게시글 목록을 다시 불러옵니다
}

// 게시글 타입 필터링
function filterPostings() {
    fetchPostings();  // 필터링 후 게시글 목록을 다시 불러옵니다
}

// 페이지 로드 시 게시글 목록 가져오기
window.onload = function() {
    fetchPostings();
};

// 게시글 삭제
function deletePosting(postId) {
    const username = localStorage.getItem('username');  // 로컬스토리지에서 현재 사용자 이름 가져오기

    if (!username) {
        alert('로그인 후 삭제할 수 있습니다.');
        return;
    }

    if (confirm('정말로 이 게시글을 삭제하시겠습니까?')) {
        fetch(`${serverUrl}/postings/${postId}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ username: username })  // 현재 사용자 이름을 함께 보내기
        })
        .then(response => response.json())
        .then(data => {
            if (data.message) {
                alert(data.message);
                if (data.message === '게시글이 삭제되었습니다.') {
                    fetchPostings();  // 게시글 목록을 다시 불러옵니다
                }
            }
        })
        .catch(error => {
            console.error('게시글 삭제 실패:', error);
            alert('게시글 삭제에 실패했습니다.');
        });
    }
}

// 게시글 타입 필터링
function filterPostings() {
    fetchPostings();  // 필터링 후 게시글 목록을 다시 불러옵니다
}

// 페이지 로드 시 게시글 목록 가져오기
window.onload = function() {
    fetchPostings();
};
