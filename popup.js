'use strict';

chrome.storage.sync.get('group', gettable);

function gettable(group) {
    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
        chrome.tabs.sendMessage(tabs[0].id, { group: group }, maketable);
    });
}
function maketable(data) {
    // make the table
    let table = document.querySelector("table");
    for (let i = 0; i < data.length; i++) {
        let element = data[i];
        let row = table.insertRow();

        row.innerHTML = " <td>" + processtime(element.time) + "</td> <td> on </td> <td>" + element.date + "</td> ";
    }
}

function processtime(time) {
    if (time == '12.30 - 13.00') {
        return 'Early Lunch';
    }
    else if (time == '13.20 - 14.00') {
        return 'Late Lunch';
    }
    else if (time == '18.00 - 18.45') {
        return 'Early Dinner';
    }
    else if (time == '19.15 - 20.00') {
        return 'Late Dinner';
    }
    else {
        return 'Bruhhhhhhh'
    }
}