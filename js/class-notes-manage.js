const serverUrl = 'https://swengserver2-production.up.railway.app';  // 기존 API 서버 URL 그대로 유지

// 메모 추가
async function submitMemo(event) {
    event.preventDefault(); // 폼 제출 기본 동작 막기

    const memo_date = document.getElementById('memo_date').value;
    const memo_content = document.getElementById('memo_content').value;
    const memo_pdf = document.getElementById('memo_pdf').value || null;

    // form 요소를 가져옵니다.
    const form = document.getElementById('memo-form');  // 폼 요소를 가져옵니다.

    try {
        const response = await fetch(`${serverUrl}/memos`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                memo_date: memo_date,
                memo_content: memo_content,
                memo_pdf: memo_pdf
            })
        });

        const result = await response.json();

        if (response.ok) {
            if (result.message) {
                alert(result.message);
                loadMemos();  // 메모 추가 후 폼 초기화
            } else {
                alert('메모 추가 실패: ' + result.message);
            }
        } else {
            alert('메모 추가 실패: 서버 오류');
        }

    } catch (err) {
        console.error('메모 추가 오류:', err);
        alert('메모 추가 실패: ' + err.message);
    }
}

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
                <td>
                    <button onclick="deleteMemo(${memo.id})">삭제</button>
                </td>
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

// 메모 삭제
async function deleteMemo(id) {
    if (confirm('정말로 삭제하시겠습니까?')) {
        try {
            const response = await fetch(`${serverUrl}/memos/${id}`, {
                method: 'DELETE',
            });
            const result = await response.json();
            alert(result.message);
            loadMemos();  // 삭제 후 목록 새로고침
        } catch (err) {
            console.error('메모 삭제 오류:', err);
            alert('메모 삭제 실패');
        }
    }
}

// 페이지 로드 시 메모 목록 불러오기
window.onload = () => {
    loadMemos();

    // 날짜 선택 제한: 10월 22일부터 12월 31일까지
    const memoDateInput = document.getElementById('memo_date');
    memoDateInput.min = '2024-10-22';  // 최소 날짜
    memoDateInput.max = '2024-12-31';  // 최대 날짜

    // 날짜 변경 시 화요일과 목요일만 선택 가능하도록 설정
    memoDateInput.addEventListener('input', function () {
        const selectedDate = new Date(memoDateInput.value);
        const dayOfWeek = selectedDate.getDay();  // 0: 일요일, 1: 월요일, ..., 6: 토요일

        // 화요일(2)과 목요일(4)만 허용
        if (dayOfWeek !== 2 && dayOfWeek !== 4) {
            alert('화요일과 목요일만 선택 가능합니다.');
            memoDateInput.value = '';  // 날짜 초기화
        }
    });
};
