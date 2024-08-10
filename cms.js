let contents = [];

document.addEventListener("DOMContentLoaded", function() {
    loadContent();
});

function addContent() {
    let title = document.getElementById('page-title').value;
    let content = document.getElementById('page-content').value;
    let layout = document.querySelector('input[name="layout"]:checked').value;
    
    if (title && content) {
        const newContent = { title: title, content: content, layout: layout };
        contents.push(newContent);
        displayContent(newContent);
    } else {
        alert('タイトルとコンテンツを入力してください。');
    }
}

function displayContent(contentData) {
    const displayArea = document.getElementById('content-display');

    let contentDiv = document.createElement('div');
    contentDiv.className = contentData.layout;
    
    let titleElement = document.createElement('h3');
    titleElement.innerText = contentData.title;

    let contentElement = document.createElement('p');
    contentElement.innerText = contentData.content;

    contentDiv.appendChild(titleElement);
    contentDiv.appendChild(contentElement);

    displayArea.appendChild(contentDiv);
}

function saveContent() {
    localStorage.setItem('contents', JSON.stringify(contents));
    alert('コンテンツが保存されました！');
    writeContentToFile();
}

function loadContent() {
    const savedContents = JSON.parse(localStorage.getItem('contents')) || [];
    contents = savedContents;

    for (let content of contents) {
        displayContent(content);
    }
}

function writeContentToFile() {
    let htmlContent = "<html><head><title>保存されたコンテンツ</title></head><body>";

    for (let content of contents) {
        htmlContent += `<div class="${content.layout}"><h3>${content.title}</h3><p>${content.content}</p></div>`;
    }

    htmlContent += "</body></html>";

    const blob = new Blob([htmlContent], { type: 'text/html' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = 'saved_content.html';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
}
