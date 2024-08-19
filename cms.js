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
    }else if (layoutSelect === "C") {
        layoutFields.innerHTML = `
            <input type="text" id="image-url" placeholder="画像URL"><br>
            <input type="text" id="link-image" placeholder="画像のリンクURL">
        `;
    }
}

function addContent() {
    const layoutSelect = document.getElementById("layout-select").value;

    let title = '';
    let content = '';
    let imageUrl = '';
    let altText = '';
    let linkTitle = '';
    let linkContent = '';
    let linkImage = '';

    if (layoutSelect === "A" || layoutSelect === "B") {
        title = document.getElementById('page-title').value;
        content = document.getElementById('page-content').value;
        linkTitle = document.getElementById('link-title').value;
        linkContent = document.getElementById('link-content').value;
    }

    if (layoutSelect === "A" || layoutSelect === "C") {
        imageUrl = document.getElementById('image-url') ? document.getElementById('image-url').value : '';
        altText = document.getElementById('alt-text') ? document.getElementById('alt-text').value : '';
        linkImage = document.getElementById('link-image') ? document.getElementById('link-image').value : '';
    }

    if (title && content || imageUrl) {
        const contentObject = { layout: layoutSelect, title, content, imageUrl, altText, linkTitle, linkContent, linkImage };
        contentArray.push(contentObject);
        updatePreview();
    } else {
        alert('タイトルとコンテンツを入力してください。');
    }
}
function addContent() {
    const layoutSelect = document.getElementById("layout-select").value;

    let title = '';
    let content = '';
    let imageUrl = '';
    let altText = '';
    let linkTitle = '';
    let linkContent = '';
    let linkImage = '';

    if (layoutSelect === "A" || layoutSelect === "B") {
        title = document.getElementById('page-title').value;
        content = document.getElementById('page-content').value;
        linkTitle = document.getElementById('link-title').value;
        linkContent = document.getElementById('link-content').value;
    }

    if (layoutSelect === "A" || layoutSelect === "C") {
        imageUrl = document.getElementById('image-url') ? document.getElementById('image-url').value : '';
        altText = document.getElementById('alt-text') ? document.getElementById('alt-text').value : '';
        linkImage = document.getElementById('link-image') ? document.getElementById('link-image').value : '';
    }

    if (title && content || imageUrl) {
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
            let imageHtml = content.imageUrl 
                ? `<a href="${content.linkImage}"><table width="600" border="0" cellpadding="0" cellspacing="0" class="clmn wd_s">
                   <tr>
                     <td align="center" style="padding:0 0 10px;">
                       <img src="${content.imageUrl}" alt="${content.altText}" width="450" class="clmn_s6 wd_s6" style="display: block;">
                     </td>
                   </tr>
                   </table></a>` 
                : '';
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
        } else if (content.layout === "C") {
            let imageHtml = content.imageUrl 
                ? `<a href="${content.linkImage}"><table width="600" border="0" cellpadding="0" cellspacing="0" class="clmn wd_s">
                   <tr>
                     <td align="center" style="padding:0 0 10px;">
                       <img src="${content.imageUrl}" alt="${content.altText}" width="450" class="clmn_s6 wd_s6" style="display: block;">
                     </td>
                   </tr>
                   </table></a>` 
                : '';
            section.innerHTML = `
                ${imageHtml}
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
            let imageHtml = content.imageUrl ? `<a href="${content.linkImage}"><table width="600" border="0" cellpadding="0" cellspacing="0" class="clmn wd_s">
<tr>
<td align="center" style="padding:0 0 10px;"><img src="${content.imageUrl}" alt="${content.altText}" width="450" class="clmn_s6 wd_s6" style="display: block;"></td>
</tr>
</table></a>` : '';
            return `<h3>${titleHtml}</h3><p>${contentHtml}</p>${imageHtml}`;
        } else if (content.layout === "B") {
            return `<h3>${titleHtml}</h3><p>${contentHtml}</p>`;
        } else if (content.layout === "C") {
            let imageHtml = content.imageUrl ? `<a href="${content.linkImage}"><table width="600" border="0" cellpadding="0" cellspacing="0" class="clmn wd_s">
<tr>
<td align="center" style="padding:0 0 10px;"><img src="${content.imageUrl}" alt="${content.altText}" width="450" class="clmn_s6 wd_s6" style="display: block;"></td>
</tr>
</table></a>` : '';
            return `${imageHtml}`;
        }
    }).join("\n");

    const fullHtml = `
<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html lang="ja">
<head>
<meta name="robots" content="noindex, nofollow">
<meta http-equiv="Content-Type" content="text/html; charset=iso-2022-jp">
<meta name="viewport" content="width=device-width, initial-scale=1">
<meta name="x-apple-disable-message-reformatting">
<meta http-equiv="X-UA-Compatible" content="IE=edge">
<meta name="format-detection" content="telephone=no">

<title>【NISA】今年もあと半年、上手に使おう！｜ＳＭＢＣ日興証券</title>

<style type="text/css">
/* CSSスタイルの内容は省略 */
</style>
</head>
<body bgcolor="#ffffff" text="#333333" leftmargin="0" topmargin="0" marginwidth="0" marginheight="0" bottommargin="0" style="margin:0 auto;">
<table border="0" cellpadding="0" cellspacing="0" width="100%">
    <tr>
      <td bgcolor="#ffffff" align="center">
<!-- Contents -->
${htmlContent}
      </td>
    </tr>
</table>
<custom name="opencounter" type="tracking"/>
</body>
</html>`;

    let blob = new Blob([fullHtml], { type: "text/html" });
    let link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = "content.html";
    link.click();
}
