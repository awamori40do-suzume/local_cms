let contentArray = [];

document.addEventListener("DOMContentLoaded", function() {
    updateLayout(); // ページロード時にレイアウトAの入力欄を表示
});

function updateLayout() {
    const layoutSelect = document.getElementById("layout-select").value;
    const layoutFields = document.getElementById("layout-specific-fields");
    
    layoutFields.innerHTML = ''; // 既存の入力欄をクリア

    if (layoutSelect === "A") {
        layoutFields.innerHTML = `
            <input type="text" id="page-title" placeholder="タイトル"><br>
            <textarea id="page-content" placeholder="コンテンツ"></textarea><br>
            <input type="text" id="image-url" placeholder="画像URL"><br>
            <input type="text" id="alt-text" placeholder="altテキスト"><br>
            <input type="text" id="link-title" placeholder="タイトルのリンクURL"><br>
            <input type="text" id="link-content" placeholder="コンテンツのリンクURL"><br>
            <input type="text" id="link-image" placeholder="画像のリンクURL">
        `;
    } else if (layoutSelect === "B") {
        layoutFields.innerHTML = `
            <input type="text" id="page-title" placeholder="タイトル"><br>
            <textarea id="page-content" placeholder="コンテンツ"></textarea><br>
            <input type="text" id="link-title" placeholder="タイトルのリンクURL"><br>
            <input type="text" id="link-content" placeholder="コンテンツのリンクURL">
        `;
    }
}

function addContent() {
    const layoutSelect = document.getElementById("layout-select").value;
    let title = document.getElementById('page-title').value;
    let content = document.getElementById('page-content').value;
    let imageUrl = document.getElementById('image-url') ? document.getElementById('image-url').value : '';
    let altText = document.getElementById('alt-text') ? document.getElementById('alt-text').value : '';
    let linkTitle = document.getElementById('link-title').value;
    let linkContent = document.getElementById('link-content').value;
    let linkImage = document.getElementById('link-image') ? document.getElementById('link-image').value : '';

    if (title && content) {
        const contentObject = { layout: layoutSelect, title, content, imageUrl, altText, linkTitle, linkContent, linkImage };
        contentArray.push(contentObject);
        updatePreview();
    } else {
        alert('タイトルとコンテンツを入力してください。');
    }
}

function updatePreview() {
    const preview = document.getElementById("preview");
    preview.innerHTML = "";

    contentArray.forEach((content, index) => {
        let section = document.createElement("div");
        section.className = "content-section";
        
        let titleHtml = content.linkTitle ? `<a href="${content.linkTitle}">${content.title}</a>` : content.title;
        let contentHtml = content.linkContent ? `<a href="${content.linkContent}">${content.content}</a>` : content.content;
        
        if (content.layout === "A") {
            let imageHtml = content.imageUrl ? `<a href="${content.linkImage}"><img src="${content.imageUrl}" alt="${content.altText}"></a>` : '';
            section.innerHTML = `
                <h3>${titleHtml}</h3>
                <p>${contentHtml}</p>
                ${imageHtml}
            `;
        } else if (content.layout === "B") {
            section.innerHTML = `
                <h3>${titleHtml}</h3>
                <p>${contentHtml}</p>
            `;
        }

        let clearButton = document.createElement("button");
        clearButton.innerText = "クリア";
        clearButton.onclick = function() {
            contentArray.splice(index, 1);
            updatePreview();
        };

        section.appendChild(clearButton);
        preview.appendChild(section);
    });
}

function clearAll() {
    contentArray = [];
    updatePreview();
}

function saveAllContent() {
    const htmlContent = contentArray.map(content => {
        let titleHtml = content.linkTitle ? `<a href="${content.linkTitle}">${content.title}</a>` : content.title;
        let contentHtml = content.linkContent ? `<a href="${content.linkContent}">${content.content}</a>` : content.content;

        if (content.layout === "A") {
            let imageHtml = content.imageUrl ? `<a href="${content.linkImage}"><img src="${content.imageUrl}" alt="${content.altText}"></a>` : '';
            return `<h3>${titleHtml}</h3><p>${contentHtml}</p>${imageHtml}`;
        } else if (content.layout === "B") {
            return `<h3>${titleHtml}</h3><p>${contentHtml}</p>`;
        }
    }).join("\n");

    let blob = new Blob([htmlContent], { type: "text/html" });
    let link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = "content.html";
    link.click();
}
