var links = document.getElementsByTagName("a");
var dates = [];

var groupcheck = /GROUP (A|B|C|D)$/
var timecheck = /(?<=Cafeteria\s)[0-9.-\s]{0,15}(?=\s-)/
var idcheck = /(?<=href=")[a-z0-9?=]{0,50}(?=")/
var daycheck = /^(Mon|Tue|Wed|Thurs|Fri|Sat|Sun)/;

function getevents(groupname) {
    for (let i = 0; i < links.length; i++) {
        const current = links[i];
        groupdata = groupcheck.exec(current.innerHTML);
        if (groupdata && groupdata[1] == groupname.group) {
            var eventlink = idcheck.exec(current.outerHTML) [0];
            $.get(eventlink, processdates);
            current.style.backgroundColor = "#a6eded"; 
        }   
        else { current.style.backgroundColor = "#e6eded"; }
    };
}

chrome.storage.sync.get('group', getevents); // fetch global group variable and fills events array

function processdates(html) {
    var parsed = document.createElement('html');
    parsed.innerHTML = html;
    var titlestring = parsed.getElementsByTagName("h1")[0].innerText;
    var time = timecheck.exec(titlestring)[0];
    var possibledates = parsed.getElementsByTagName("a");
    for (let i = 0; i < possibledates.length; i++) {
        const current = possibledates[i];
        if (daycheck.test(current.innerHTML)) {
            dates.push([current.innerText, time]);
        }
    }
}

console.log(dates)


