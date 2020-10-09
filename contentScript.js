var dates = [];
var links = [];
var days = [];
var times = [];

var groupcheck = /GROUP (A|B|C|D)$/
var timecheck = /(?<=Cafeteria\s)[0-9.-\s]{0,15}(?=\s-)/
var idcheck = /(?<=href=")[a-z0-9?=]{0,50}(?=")/
var daycheck = /^(Mon|Tue|Wed|Thurs|Fri|Sat|Sun)/;

function geteventscore(links, answer) {
    if (links.length == 0) {
        console.log(answer);
    } else {
        $.get(links[0], processdates(links.slice(1), links[0], answer))
    }
}

function getevents(groupname) {
    var as = document.getElementsByTagName("a");
    for (let i = 0; i < as.length; i++) {
        const current = as[i];
        groupdata = groupcheck.exec(current.innerHTML);
        if (groupdata) {
            if (groupdata[1] == groupname.group) {
                var eventlink = idcheck.exec(current.outerHTML)[0];
                links.push(eventlink);
                current.style.backgroundColor = "#a6eded"; 
            }   
            else { current.style.backgroundColor = "#e6eded"; }
        }
    }
    geteventscore(links, []);
}

function processdates(links, link, answer) {
    return function(html) {
        var parsed = document.createElement('html');
        parsed.innerHTML = html;
        var titlestring = parsed.getElementsByTagName("h1")[0].innerText;
        var time = timecheck.exec(titlestring)[0];
        var possibledates = parsed.getElementsByTagName("a");
        for (let i = 0; i < possibledates.length; i++) {
            const current = possibledates[i];
            if (daycheck.test(current.innerHTML)) {
                answer.push({link: link, data: current.innerText, time: time});
            }
        }
        geteventscore(links, answer);
    }
}

chrome.storage.sync.get('group', getevents); // fetch global group variable and fills events array
