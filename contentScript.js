var groupcheck = /GROUP (A|B|C|D)$/
var timecheck = /(?<=Cafeteria\s)[0-9.-\s]{0,15}(?=\s-)/
var idcheck = /(?<=href=")[a-z0-9?=]{0,50}(?=")/
var daycheck = /^(Mon|Tue|Wed|Thurs|Fri|Sat|Sun)/;

function geteventscore(links, answer) {
    // Runs process dates on each link
    if (links.length == 0) {
        console.log(answer);
    } else {
        $.get(links[0], processdates(links.slice(1), links[0], answer))
    }
}

function getevents(groupname) {
    // finds all the link's to events (and colours the links) then starts geteventscore
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
    // Wraper for process dates so it can be passed data from outside the $.get
    return function(html) {
        // gets the events then passes control back to geteventscore
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
