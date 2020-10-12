'use strict';

chrome.storage.sync.get('group', gettable);

function gettable(group) {
    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
        chrome.tabs.sendMessage(tabs[0].id, { group: group }, maketable);
    });
}

function openLink(href) {
    return function() {    
        chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
            var tab = tabs[0];
            chrome.tabs.update(tab.id, { url: href });
        });
    }
}

document.getElementById("options").addEventListener('click', openLink("/options.html"));

function maketable(data) {
    // make the table
    let table = document.querySelector("table");
    for (let i = 0; i < data.length; i++) {
        let element = data[i];
        let row = table.insertRow();
        row.addEventListener('click', openLink(element.link));
        let timenode = document.createElement("td");
        timenode.innerText = processtime(element.time);
        timenode.className='time';
        
        let onnode = document.createElement("td");
        onnode.innerText = "on";
        onnode.className='on';

        let daynode = document.createElement("td");
        daynode.innerText = element.date.slice(0,3);
        daynode.className='day';

        let datenode = document.createElement("td");
        datenode.innerText = element.date.slice(4, );
        datenode.className='date';

        row.appendChild(timenode);
        row.appendChild(onnode);
        row.appendChild(daynode);
        row.appendChild(datenode);
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