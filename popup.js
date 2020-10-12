'use strict';

chrome.storage.sync.get('group', gettable);

function gettable(group) {
    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
        chrome.tabs.sendMessage(tabs[0].id, { group: group.group }, maketable);
    });
}
function maketable(data) {
    // make the table
    let table = document.querySelector("table");
    for (let element of data) {
        let row = table.insertRow();

        let linknode = document.createElement("a")
        linknode.href = element.link 
        linknode.innerText = "<td>"+ element.date + "</td>" + " <td>" + processtime(element.time) + "</td>";
    }
}

function processtime(time) {
    if (time == '1230-1300') {
        return 'Early Lunch';
    }
    else if (time == '1320-1400') {
        return 'Late Lunch';
    }
    else if (time == '1800-1845') {
        return 'Early Dinner';
    }
    else if (time == '1915-2000') {
        return 'Late Dinner';
    }
    else {
        return 'Bruhhhhhhh'
    }
}