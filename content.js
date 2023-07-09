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
    sendResponse('accepted');
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
        //console.log(replaced);
        node.parentNode.innerHTML = replaced;
    }
}

function staticRecursiveReplace(highlight, id) {
    let substr = highlight.replace(/[\\\/\*\+\.?\^${}\[\]()|\-]/g, '\\$&');
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
                    let org = childNodes[i].parentNode.innerHTML;
                    // console.log(childNodes[i].parentNode.innerHTML);
                    let preoffset = 0, postoffset = 0;
                    let textArr = [];
                    let target, rest = org;
                    while (preoffset = rest.indexOf('<') !== -1) {
                        target = rest.substring(0, preoffset); // > hoge < のhoge, ><は含まない（最後に配列を合体するから）
                        rest = rest.substr(preoffset); // < 以降, <は含む
                        textArr.push(target.replace(reg, `<span id="${markId[id]}" style="background-color: ${color[id]};">` + highlight + '</span>'));
                        //< > を飛ばす・<>は含む
                        postoffset = rest.indexOf('>');
                        textArr.push(rest.substring(0, postoffset + 1));
                        rest = rest.substr(postoffset + 1);
                    }
                    // 最後のタグ以降
                    textArr.push(rest.replace(reg, `<span id="${markId[id]}" style="background-color: ${color[id]};">` + highlight + '</span>'));
                    childNodes[i].parentNode.innerHTML = textArr.join('');
                }
            } else {
                const replaced = childNodes[i].innerHTML.replace(reg, `<span id="${markId[id]}" style="background-color: ${color[id]};">` + highlight + '</span>');
                childNodes[i].innerHTML = replaced; 
            }
        }
    }
}
