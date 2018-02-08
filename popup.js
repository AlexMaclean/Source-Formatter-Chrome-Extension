/*
function saveUserInfo() {
    var username = document.getElementById("user").value;
    var password = document.getElementById("pass").value;
    var enabled = document.getElementById("check").checked;
    var items = {};
    var json = { "username" : username, "password" : password, "enabled" : enabled };
    items["userInfo"] = json;
    document.getElementById("text1").innerHTML = JSON.stringify(items);
    chrome.storage.sync.set(items);
}
*/

function initializePopup() {
    /*
    var saveButton = document.getElementById('saveData');
    saveButton.addEventListener('click', saveUserInfo);

    chrome.storage.sync.get("userInfo", (store) => {
        var userInfo = store.userInfo;
        document.getElementById("user").value = userInfo.username;
        document.getElementById("pass").value = userInfo.password;
        document.getElementById("check").checked = userInfo.enabled;
    });
    */
    const disableButton = document.getElementById("disable-button");
    const enabledStatus = document.getElementById('enabled-status');
    disableButton.onclick = () => {
        chrome.storage.local.get("isEnabled", res => {
            chrome.storage.local.set({isEnabled: !res.isEnabled}, window.location.reload);
        });
    };
    chrome.storage.local.get("isEnabled", res => {
        enabledStatus.innerText = res.isEnabled ? "Enabled" : "Disabled";
    });
}

document.addEventListener('DOMContentLoaded', function() {
    initializePopup();
});