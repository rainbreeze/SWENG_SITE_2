const serverUrl = 'https://swengserver2-production.up.railway.app';  // 기존 API 서버 URL 그대로 유지

// 메모 목록 불러오기
async function loadMemos() {
    try {
        const response = await fetch(`${serverUrl}/memos`);
        const memos = await response.json();

        // 날짜를 기준으로 오름차순으로 정렬
        memos.sort((a, b) => {
            const dateA = new Date(a.memo_date);
            const dateB = new Date(b.memo_date);
            return dateA - dateB;  // 오름차순 정렬
        });

        const memoTableBody = document.getElementById('memo-table-body');
        memoTableBody.innerHTML = '';  // 기존 목록 초기화

        if (memos.length === 0) {
            document.getElementById('no-memos').style.display = 'block';
        } else {
            document.getElementById('no-memos').style.display = 'none'; 
        }

        memos.forEach(memo => {
            const row = memoTableBody.insertRow();
            row.innerHTML = `
                <td>${formatDate(memo.memo_date)}</td>
                <td>${memo.memo_content}</td>
                <td><a href="${memo.memo_pdf}" target="_blank">${memo.memo_pdf ? 'PDF 보기' : '없음'}</a></td>
            `;
        });
    } catch (err) {
        console.error('메모 목록 불러오기 오류:', err);
        alert('메모 목록 불러오기 실패');
    }
}

// 날짜 형식 변경 (YYYY-MM-DD -> MM-DD 형식)
function formatDate(dateString) {
    const date = new Date(dateString);
    const month = date.getMonth() + 1; // 월 (0부터 시작하므로 +1)
    const day = date.getDate(); // 일
    return `${month < 10 ? '0' + month : month}-${day < 10 ? '0' + day : day}`;
}

// 페이지 로드 시 메모 목록 불러오기
window.onload = loadMemos;
