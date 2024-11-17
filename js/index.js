// 페이지 로드 시 로그인 상태 확인
window.onload = function () {
    const loggedInUser = localStorage.getItem('username');
    const statusMessage = document.getElementById('status-message');
    const logoutButton = document.getElementById('logout-button');
    
    // 로그인 상태 확인 후 home.html로 리디렉션
    if (loggedInUser) {
        // 로그인 상태라면 home.html로 이동
        window.location.href = '/html/home.html';
        return; // 더 이상 코드 실행하지 않도록 종료
    }
    
    // 로그인되지 않았다면 상태 메시지 및 버튼 표시
    statusMessage.innerText = '로그인하지 않았습니다.';
    logoutButton.style.display = 'none';
};

// 회원가입 처리
document.getElementById('register-form').addEventListener('submit', async function (event) {
    event.preventDefault();  // 폼 제출 기본 동작 방지

    const username = document.getElementById('register-username').value;
    const password = document.getElementById('register-password').value;
    const role = document.getElementById('register-role').value;

    try {
        const response = await fetch('https://swengserver2-production.up.railway.app/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ username, password, role })
        });

        const data = await response.json();
        
        if (response.ok) {
            alert(data.message);  // 성공 메시지 표시
        } else {
            throw new Error(data.message);  // 오류 발생 시 예외 처리
        }
    } catch (error) {
        document.getElementById('error-message').innerText = `회원가입 실패: ${error.message}`;
    }
});

// 로그인 처리
document.getElementById('login-form').addEventListener('submit', async function (event) {
    event.preventDefault();  // 폼 제출 기본 동작 방지

    const username = document.getElementById('login-username').value;
    const password = document.getElementById('login-password').value;

    try {
        const response = await fetch('https://swengserver2-production.up.railway.app/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ username, password })
        });

        const data = await response.json();

        if (response.ok) {
            alert(data.message);  // 로그인 성공 메시지
            // 로그인 성공 시 로컬 스토리지에 사용자 정보 저장
            localStorage.setItem('username', username);
            localStorage.setItem('role', data.role);  // 로그인한 사용자의 역할도 저장
            // 상태 메시지 업데이트 및 로그인 상태로 변경
            window.location.href = 'html/home.html';  // 로그인 후 home.html로 리디렉션
        } else {
            throw new Error(data.message);  // 로그인 실패 시 오류 처리
        }
    } catch (error) {
        document.getElementById('error-message').innerText = `로그인 실패: ${error.message}`;
    }
});

// 로그아웃 처리
document.getElementById('logout-button').addEventListener('click', function () {
    localStorage.removeItem('username');  // 로컬 스토리지에서 사용자 정보 삭제
    localStorage.removeItem('role');      // 역할 정보도 삭제
    window.onload();  // 로그인 상태 다시 확인
});
