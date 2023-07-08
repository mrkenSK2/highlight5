chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
    if (request.button_id == 10){
        console.log("fafoajfioj")
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
        console.log(before);
        // console.log(node.parentNode.innerHTML);
        if (node.parentNode === null) return;
        const replaced = node.parentNode.innerHTML.replace(reg, last[0]);
        console.log(replaced);
        node.parentNode.innerHTML = replaced;
    }

    console.log(node);
    console.log(node.id);
    //const replaced = node.innerHTML.replace(reg, last[0]);
    //console.log(replaced);
    //node.innerHTML = replaced;  
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
            /*if (markId.indexOf(childNodes[i].id)) {
                if (childNodes[i].parentNode !== null) {
                    const replaced = childNodes[i].parentNode.innerHTML.replace(reg, `<span id="${markId[id]}" style="background-color: ${color[id]};">` + highlight + '</span>');
                }
            } else {*/
                const replaced = childNodes[i].innerHTML.replace(reg, `<span id="${markId[id]}" style="background-color: ${color[id]};">` + highlight + '</span>');
                //console.log(replaced);
                childNodes[i].innerHTML = replaced; 
                //childNodes[i].innerHTML = 'secondddd';
            //}
            /*if (id == 1) {
            last[0] = highlight;
            const replaced = childNodes[i].innerHTML.replace(reg, '<span style="background-color: red;">' + highlight + '</span>');
            childN
                
                    for (let i = 0; i < len; i++) {
            if (checkLeafNodes(childNodes[i])) {
                // nodeList.push(childNodes[i]);
                console.log(childNodes[i].parentNode);
                //console.log(childNodes[i].innerHTML);
                childNodes[i].innerHTML = 'first';
                for (let i = 0; i < childNodes.length; i++) {
                    if (id == 1) {
                        let before = '<span style="background-color: red;">' + last[0] + '</span>';
                        // console.log(before)
                        // 前のを戻す
                        substr = before.replace(/[\\\/\*\+\.?\^${}\[\]()|\-]/g, '\\$&');
                        let reg = new RegExp(substr, 'g');
                        //const childNodes = document.querySelectorAll('html body :not(script):not(a[href])');
                        const replaced = childNodes[i].innerHTML.replace(reg, last[0]);
                        childNodes[i].innerHTML = replaced;                
                    }    
                    
                    */
        }
    }
}

    /*if (last[0] != null) {
        for (let i = 0; i < childNodes.length; i++) {
            if (id == 1) {
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
    } */
    
    /*else {
        last[id] = highlight;
        for (let i = 0; i < nodeList.length; i++) {
            const replaced = nodeList[i].innerHTML.replace(reg, `<span style="background-color: ${last[id]};">` + highlight + '</span>');
            nodeList[i].innerHTML = replaced; 
            /*if (id == 1) {
            last[0] = highlight;
            const replaced = childNodes[i].innerHTML.replace(reg, '<span style="background-color: red;">' + highlight + '</span>');
            childNodes[i].innerHTML = replaced;
        } 
        /*
        else if (id == 2){
            const replaced = childNodes[i].innerHTML.replace(reg, '<span style="background-color: orange;">' + highlight + '</span>');
            childNodes[i].innerHTML = replaced;
        } 
        }*/

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
