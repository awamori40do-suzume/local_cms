document.addEventListener("DOMContentLoaded", function() {
    loadContent();
});

function saveContent() {
    let title = document.getElementById('page-title').value;
    let content = document.getElementById('page-content').value;
    
    if (title && content) {
        localStorage.setItem('pageTitle', title);
        localStorage.setItem('pageContent', content);
        alert('コンテンツが保存されました！');
        loadContent();
    } else {
        alert('タイトルとコンテンツを入力してください。');
    }
}

function loadContent() {
    let title = localStorage.getItem('pageTitle');
    let content = localStorage.getItem('pageContent');
    
    if (title && content) {
        document.getElementById('display-title').innerText = title;
        document.getElementById('display-content').innerText = content;
    }
}