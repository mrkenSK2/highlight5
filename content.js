chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
    if (request.button_id == 10){
        console.log("fafoajfioj")
        return true;
    }
    recursiveReplace(request.val, request.id);
    sendResponse('accepted'); // 送信側に送り返したい情報を記入する
    return true;
});

let last = [null, null, null, null, null]

function staticRecursiveReplace(highlight, id) {
    substr = highlight.replace(/[\\\/\*\+\.?\^${}\[\]()|\-]/g, '\\$&');
    let reg = new RegExp(substr, 'g');

    // ここの並列設定がよくわからん
    const childNodes = document.querySelectorAll('html body :not(script)');

    if (last[0] != null) {
        for (let i = 0; i < childNodes.length; i++) {
            if (id == 1){
                let before = '<span style="background-color: red;">' + last[0] + '</span>';
                // console.log(before)
                // 前のを戻す
                substr = before.replace(/[\\\/\*\+\.?\^${}\[\]()|\-]/g, '\\$&');
                let reg = new RegExp(substr, 'g');
                //const childNodes = document.querySelectorAll('html body :not(script):not(a[href])');
                const replaced = childNodes[i].innerHTML.replace(reg, last[0]);
                childNodes[i].innerHTML = replaced;                
            }
        }
    }

    for (let i = 0; i < childNodes.length; i++) {
        if (id == 1) {
            last[0] = highlight;
            const replaced = childNodes[i].innerHTML.replace(reg, '<span style="background-color: red;">' + highlight + '</span>');
            childNodes[i].innerHTML = replaced;
        } else if (id == 2){
            const replaced = childNodes[i].innerHTML.replace(reg, '<span style="background-color: orange;">' + highlight + '</span>');
            childNodes[i].innerHTML = replaced;
        } else if (id == 3){
            const replaced = childNodes[i].innerHTML.replace(reg, '<span style="background-color: yellow;">' + highlight + '</span>');
            childNodes[i].innerHTML = replaced;
        } else if (id == 4){
            const replaced = childNodes[i].innerHTML.replace(reg, '<span style="background-color: green;">' + highlight + '</span>');
            childNodes[i].innerHTML = replaced;
        } else if (id == 5){
            const replaced = childNodes[i].innerHTML.replace(reg, '<span style="background-color: blue;">' + highlight + '</span>');
            childNodes[i].innerHTML = replaced;
        }
    }
}

const replaceNodes = (nodes, highlight) => {
    substr = highlight.replace(/[\\\/\*\+\.?\^${}\[\]()|\-]/g, '\\$&');
    let reg = new RegExp(substr, 'g');
    nodes.forEach(node => {
        // 子ノードがあったらその配列を引数にした自身を実行
        if (node.hasChildNodes()) replaceNodes(node.childNodes, highlight);
        // テキストノードで中身があればreplaceを試みる
        if (node.nodeType === 3 && node.textContent) {
            //const replaced = node.textContent.replace(highlight, 'change'); // ここで8月延長
            const replaced = node.innerHTML.replace(reg, '<span style="background-color: yellow;">' + highlight + '</span>');
            node.innerHTML = replaced;
        }
    });
}
function recursiveReplace(highlight, id) {
    staticRecursiveReplace(highlight, id);

    // 動的HTML書き換え
    // まずはObserverでDOM変化があった場合のコールバックを定義
    //const observer = new MutationObserver(records => {
        // 追加を検知したノードの配列を再帰的文字列置換の関数に入れて実行する
    //    records.forEach(record => replaceNodes(record.addedNodes, highlight));
    //});
    // body全体から下のノード全てを監視対象にする
    //observer.observe(document.querySelector('html body'), {
    //    childList: true,
    //    subtree: true,
    //});
}
