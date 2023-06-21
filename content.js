const before = 'a';
const after = '8月32日'; // beforeの部分文字列から構成してもいいかも

// HTMLノードを再帰的に探索して文字列置換をする関数
const recursiveReplace = (nodes) => {
  nodes.forEach(node => {
    // 子ノードがあったらその配列を引数にした自身を実行
    if (node.hasChildNodes()) recursiveReplace(node.childNodes);
    // テキストノードで中身があればreplaceを試みる
    if (node.nodeType === 3 && node.textContent) {
      const replaced = node.textContent.replace(before, after); // ここで8月延長
      node.textContent = replaced;
    }
  });
}

// ロード完了してから以下を実行
window.addEventListener('load', () => {
  // 静的HTML書き換え
  // body以下のscript以外のノードの中身をざっくりreplaceしてみる
  const childNodes = document.querySelectorAll('html body :not(script)');
  for (let i = 0; i < childNodes.length; i++) {
    const replaced = childNodes[i].innerHTML.replace(before, after); // ここで8月延長
    childNodes[i].innerHTML = replaced;
  }

  // 動的HTML書き換え
  // まずはObserverでDOM変化があった場合のコールバックを定義
  const observer = new MutationObserver(records => {
    // 追加を検知したノードの配列を再帰的文字列置換の関数に入れて実行する
    records.forEach(record => recursiveReplace(record.addedNodes));
  });
  // body全体から下のノード全てを監視対象にする
  observer.observe(document.querySelector('html body'), {
    childList: true,
    subtree: true,
  });
});