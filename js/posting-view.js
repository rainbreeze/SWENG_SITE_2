const serverUrl = 'https://swengserver2-production.up.railway.app';  // 서버 URL

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
                    <div class="meta">
                        <span>작성자: ${post.author}</span>
                    </div>
                    <div class="actions">
                        <span>댓글: ${post.comment_num}</span>
                        <span>좋아요: <span id="like-count-${post.id}">${post.good}</span></span>
                    </div>
                    <button onclick="likePost(${post.id})" id="like-button-${post.id}">좋아요</button>
                    <button onclick="viewComments(${post.id})">댓글</button>
                `;
                postListContainer.appendChild(postItem);
            });
        })
        .catch(error => console.error('게시글 목록을 불러오는 데 실패했습니다.', error));
}

// 게시글 좋아요 추가
function likePost(postId) {
    const likeButton = document.getElementById(`like-button-${postId}`);
    const likeCountElement = document.getElementById(`like-count-${postId}`);

    // 이미 좋아요를 눌렀다면 더 이상 좋아요를 누를 수 없게 처리
    if (likeButton.disabled) {
        alert('이미 좋아요를 눌렀습니다.');
        return;
    }

    fetch(`${serverUrl}/postings/${postId}/like`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ postId: postId })
    })
        .then(response => response.json())
        .then(data => {
            if (data.message === '좋아요 수가 증가했습니다.') {
                // 좋아요가 정상적으로 추가되면 좋아요 수 업데이트
                let currentLikes = parseInt(likeCountElement.textContent);
                likeCountElement.textContent = currentLikes + 1;
                likeButton.disabled = true;  // 좋아요 버튼을 비활성화 (다시 눌리지 않도록)
                alert('좋아요를 추가했습니다.');
            } else {
                alert('좋아요 추가에 실패했습니다.');
            }
        })
        .catch(error => {
            console.error('좋아요 추가 실패:', error);
            alert('서버 오류로 좋아요 추가에 실패했습니다.');
        });
}
// 필터링 함수
function filterPostings() {
    fetchPostings();  // 필터링 후 게시글 목록을 다시 불러오기
}
// 댓글 조회 페이지로 이동
function viewComments(postId) {
    // 댓글 조회 페이지로 이동하면서 게시글 ID를 URL에 포함
    window.location.href = `comment.html?postId=${postId}`;
}

// 페이지 로드 시 게시글 목록 가져오기
window.onload = function () {
    fetchPostings();
};



