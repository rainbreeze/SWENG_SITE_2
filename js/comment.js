const serverUrl = 'https://swengserver2-production.up.railway.app';  // 서버 URL

// 댓글 목록을 가져오는 함수
function fetchComments(postId) {
    fetch(`${serverUrl}/comments/${postId}`)
        .then(response => {
            if (!response.ok) {
                return response.text().then(data => {
                    throw new Error(data); // HTML 응답을 텍스트로 받아 오류를 알림
                });
            }
            return response.json();
        })
        .then(data => {
            const commentListContainer = document.getElementById('comment-list-container');
            commentListContainer.innerHTML = '';  // 기존 목록 초기화

            if (Array.isArray(data.comments) && data.comments.length > 0) {  // 수정된 부분
                // 댓글 목록을 화면에 표시
                data.comments.forEach(comment => {
                    const commentItem = document.createElement('div');
                    commentItem.classList.add('comment-item');
                    commentItem.innerHTML = `
                        <div class="commentor">${comment.commentor}</div>
                        <p class="comment">${comment.comment}</p>
                        <div class="comment-date">${new Date(comment.date).toLocaleString()}</div>
                        <button class="delete-comment" onclick="deleteComment(${postId}, ${comment.id})">삭제</button>
                    `;
                    commentListContainer.appendChild(commentItem);
                });
            } else {
                commentListContainer.innerHTML = '<p>댓글이 없습니다.</p>';
            }
        })
        .catch(error => {
            console.error('댓글을 가져오는 데 실패했습니다:', error);
            alert(`오류 발생: ${error.message}`);  // 서버 오류 메시지 표시
        });
}

// 댓글을 추가하는 함수
function addComment(postId) {
    const commentor = localStorage.getItem('username');  // 현재 사용자 이름
    const comment = document.getElementById('comment-input').value;  // 댓글 내용

    if (!commentor || !comment) {
        alert('댓글 작성자와 내용을 모두 입력해야 합니다.');
        return;
    }

    const newComment = {
        commentor: commentor,
        comment: comment
    };

    fetch(`${serverUrl}/comments/${postId}`, {  // 경로 수정
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(newComment)
    })
    .then(response => response.json())
    .then(data => {
        alert(data.message);
        fetchComments(postId);  // 댓글 목록을 다시 불러옵니다.
        document.getElementById('comment-input').value = '';  // 입력란 초기화
    })
    .catch(error => {
        console.error('댓글 추가 실패:', error);
        alert('댓글 추가에 실패했습니다.');
    });
}

// 댓글을 삭제하는 함수
function deleteComment(postId, commentId) {
    if (!confirm('정말 이 댓글을 삭제하시겠습니까?')) return;

    fetch(`${serverUrl}/comments/${postId}/${commentId}`, {  // 경로 수정
        method: 'DELETE'
    })
    .then(response => response.json())
    .then(data => {
        alert(data.message);
        fetchComments(postId);  // 댓글 목록을 다시 불러옵니다.
    })
    .catch(error => {
        console.error('댓글 삭제 실패:', error);
        alert('댓글 삭제에 실패했습니다.');
    });
}

// 페이지 로드 시 댓글 목록 가져오기
window.onload = function() {
    const postId = getPostIdFromURL();  // URL에서 postId를 추출
    if (postId) {
        fetchComments(postId);  // 댓글을 가져옵니다
    } else {
        alert('잘못된 게시글 ID입니다.');
    }
};

// URL에서 게시글 ID를 추출하는 함수
function getPostIdFromURL() {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get('postId');
}

// 댓글 입력란과 버튼을 클릭했을 때 댓글 추가 기능을 실행
document.getElementById('submit-comment').addEventListener('click', function() {
    const postId = getPostIdFromURL();  // URL에서 postId 추출
    if (postId) {
        addComment(postId);  // 댓글 추가
    } else {
        alert('잘못된 게시글 ID입니다.');
    }
});
