chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
    if ('button_id' in request){
        let id = request.button_id;
        if (last[id] != null) {
            const childNodes = document.querySelectorAll('html body :not(script)');
            let len = childNodes.length;
        
            for (let i = 0; i < len; i++) {
                if (checkLeafNodes(childNodes[i])) {
                    reset(childNodes[i], id);
                }
            }
        }
        return true;
    }
    staticRecursiveReplace(request.val, request.id);
    sendResponse('accepted'); // 送信側に送り返したい情報を記入する
    return true;
});

function checkLeafNodes(node) {
    return node.childNodes.length ==1 && node.childNodes[0].childNodes.length == 0;
}

let last = [null, null, null, null, null];
let color = ['red', 'orange', 'yellow', 'green', 'blue'];
let markId = ['mark1', 'mark2', 'mark3', 'mark4', 'mark5'];

function reset(node, id) {
    let before = `<span id="${markId[id]}" style="background-color: ${color[id]};">` + last[id] + '</span>';
    let substr = before.replace(/[\\\/\*\+\.?\^${}\[\]()|\-]/g, '\\$&');
    let reg = new RegExp(substr, 'g');
    if (node.id === markId[id]) {
        if (node.parentNode === null) return;
        const replaced = node.parentNode.innerHTML.replace(reg, last[id]);
        console.log(replaced);
        node.parentNode.innerHTML = replaced;
    }
}

function staticRecursiveReplace(highlight, id) {
    substr = highlight.replace(/[\\\/\*\+\.?\^${}\[\]()|\-]/g, '\\$&');
    let reg = new RegExp(substr, 'g');

    const childNodes = document.querySelectorAll('html body :not(script)');
    let len = childNodes.length;

    if (last[id] != null) {
        for (let i = 0; i < len; i++) {
            if (checkLeafNodes(childNodes[i])) {
                //console.log(childNodes[i].innerHTML);
                //console.log(childNodes[i]);
                reset(childNodes[i], id);
            }
        } 
    }
    last[id] = highlight;
    for (let i = 0; i < len; i++) {
        if (checkLeafNodes(childNodes[i])) {
            if (markId.indexOf(childNodes[i].id) !== -1) {
                if (childNodes[i].parentNode !== null) {
                    const replaced = childNodes[i].parentNode.innerHTML.replace(reg, `<span id="${markId[id]}" style="background-color: ${color[id]};">` + highlight + '</span>');
                    childNodes[i].parentNode.innerHTML = replaced;
                }
            } else {
                const replaced = childNodes[i].innerHTML.replace(reg, `<span id="${markId[id]}" style="background-color: ${color[id]};">` + highlight + '</span>');
                childNodes[i].innerHTML = replaced; 
            }
        }
    }
}
