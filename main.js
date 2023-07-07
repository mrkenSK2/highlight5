for (let i = 1; i <= 5; i++) {
    let search = document.getElementById(`typed${i}`);
    let submit = document.querySelector(`input[name='submit${i}']`);
    search.addEventListener('change', function () {
        chrome.tabs.query({ active: true, currentWindow: true }, function(tabs) {
            chrome.tabs.sendMessage(
                tabs[0].id,
                {
                    val: search.value,
                    id: i
                },
                function(response) {
                    console.log(response);
                }
            );
        })
    })
}

let button = document.getElementById('button1');
button.addEventListener('click', function () {
    chrome.tabs.query({ active: true, currentWindow: true }, function(tabs) {
        chrome.tabs.sendMessage(
            tabs[0].id,
            {
                button_id: 10
            },
            function(response) {
                console.log(response);
            }
        );
    })
});
