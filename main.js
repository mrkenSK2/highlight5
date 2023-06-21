const input = document.querySelector('input[type="search"]');

input.addEventListener("search", () => {
    document.getElementById('h1').value = "content"
});

submit.addEventListener('click', function () {
	document.getElementById('h1') = "content"
});
/*let search = document.querySelector(`input[name='search']`);
//let submit = document.querySelector(`input[name='submit']`);

chrome.alarms.create({
    periodInMinutes: 1 / 60,
})

chrome.alarms.onAlarm.addListener((alarm) => {
    console.log("service-workerのテスト")
    console.log(this)
})

// いずれかのキーが離された時
search.addEventListener('keyup', function () {
    document.body.style.backgroundColor = "darkblue";
	//document.querySelector(`#output1`).innerHTML = search.value;
});

// Enterキーが押された時
search.addEventListener('change', function () {
	document.querySelector(`#output2`).innerHTML = search.value;
    //document.body.style.backgroundColor = "darkblue";
});

// submitボタンが押された時
submit.addEventListener('click', function () {
	document.querySelector(`#output3`).innerHTML = search.value;
});
/*var keyword = "検索キーワード";
var hiddenText = getHiddenElementText("hidden-element-id");

if (hiddenText.includes(keyword)) {
  console.log("キーワードが見つかりました。");
} else {
  console.log("キーワードは見つかりませんでした。");
}*/
