// 페이지 로드 시 로그인 상태 확인
window.onload = function () {
    const username = localStorage.getItem('username');
    const role = localStorage.getItem('role');
    
    // 사용자 이름과 역할이 로컬 스토리지에 있는지 확인
    if (username && role) {
        // 사용자 이름과 역할 표시
        document.getElementById('username').innerText = username;
        document.getElementById('role').innerText = role;
        
        // 역할에 따라 버튼 텍스트 변경
        const button1 = document.getElementById('button-1');
        const button2 = document.getElementById('button-2');
        const button3 = document.getElementById('button-3');
        const button4 = document.getElementById('button-4');
        const button5 = document.getElementById('button-5');
        const button6 = document.getElementById('button-6');
        
        // 멘토일 경우 버튼 이름 설정
        if (role === '멘토') {
            button1.innerText = '포스팅 공유';   // 멘토는 포스팅 공유
            button2.innerText = '수업 메모 관리'; // 멘토는 수업 메모 관리
            button3.innerText = '영상 자료'; // 멘토는 영상 자료 업로드
            button4.innerText = '과제/시험';  // 멘토는 과제/시험 관리
            button5.innerText = '상담 관리';  // 멘토는 상담 관리
            button6.innerText = '질문 답변';   // 멘토는 질문 답변
        } 
        
        // 멘티일 경우 버튼 이름 설정
        else if (role === '멘티') {
            button1.innerText = '포스팅 보기';   // 멘티는 포스팅 보기
            button2.innerText = '수업 메모 보기'; // 멘티는 수업 메모 보기
            button3.innerText = '영상 자료'; // 멘티는 영상 자료 보기
            button4.innerText = '과제/시험'; // 멘티는 과제/시험 확인
            button5.innerText = '상담 요청'; // 멘티는 상담 요청
            button6.innerText = '질문 작성';   // 멘티는 질문 작성
        }
        
    } else {
        // 로그인되지 않았으면 로그인 페이지로 리디렉션
        window.location.href = '/index.html';
    }
};

// 버튼 클릭 이벤트 처리
document.getElementById('button-1').addEventListener('click', function() {
    const role = localStorage.getItem('role');
    
    if (role === '멘토') {
        // 멘토일 경우 'posting.html'로 이동
        window.location.href = '/html/posting.html';
    } else if (role === '멘티') {
        // 멘티일 경우 포스팅 보기 페이지로 이동
        window.location.href = '/html/posting-view.html';
    }
});

// 버튼 2: 수업 메모
document.getElementById('button-2').addEventListener('click', function() {
    const role = localStorage.getItem('role');
    
    if (role === '멘토') {
        // 멘토일 경우 수업 메모 관리 페이지로 이동
        window.location.href = '/html/class-notes-manage.html';
    } else if (role === '멘티') {
        // 멘티일 경우 수업 메모 보기 페이지로 이동
        window.location.href = '/html/class-notes-view.html';
    }
});

// 버튼 3: 영상 자료
document.getElementById('button-3').addEventListener('click', function() {
    const role = localStorage.getItem('role');
    
    if (role === '멘토') {
        // 멘토일 경우 영상 자료 업로드 페이지로 이동
        window.location.href = '/html/video-materials-view.html';
    } else if (role === '멘티') {
        // 멘티일 경우 영상 자료 보기 페이지로 이동
        window.location.href = '/html/video-materials-view.html';
    }
});

// 버튼 4: 과제/시험
document.getElementById('button-4').addEventListener('click', function() {
    const role = localStorage.getItem('role');
    
    if (role === '멘토') {
        // 멘토일 경우 과제/시험 관리 페이지로 이동
        window.location.href = '/html/assignments-exams.html';
    } else if (role === '멘티') {
        // 멘티일 경우 과제/시험 확인 페이지로 이동
        window.location.href = '/html/assignments-exams.html';
    }
});

// 버튼 5: 상담
document.getElementById('button-5').addEventListener('click', function() {
    const role = localStorage.getItem('role');
    
    if (role === '멘토') {
        // 멘토일 경우 상담 관리 페이지로 이동
        window.location.href = '/html/counseling-manage.html';
    } else if (role === '멘티') {
        // 멘티일 경우 상담 요청 페이지로 이동
        window.location.href = '/html/counseling-request.html';
    }
});

// 버튼 6: 질문 게시판
document.getElementById('button-6').addEventListener('click', function() {
    const role = localStorage.getItem('role');
    
    if (role === '멘토') {
        // 멘토일 경우 질문 답변 페이지로 이동
        window.location.href = '/html/question-board-answer.html';
    } else if (role === '멘티') {
        // 멘티일 경우 질문 작성 페이지로 이동
        window.location.href = '/html/question-board-ask.html';
    }
});

// 로그아웃 처리
document.getElementById('logout-button').addEventListener('click', function () {
    localStorage.removeItem('username');  // 로컬 스토리지에서 사용자 정보 삭제
    localStorage.removeItem('role');      // 역할 정보도 삭제
    window.location.href = '/index.html';  // 로그인 페이지로 리디렉션
});
