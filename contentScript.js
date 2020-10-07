// reads site data and sends to popup

$.get("?event=1117", (data) => { alert(data) });

// Highlight group buttons

var links = document.getElementsByTagName("a");

chrome.storage.sync.get('group', function (data) {
  var c = data.group;
  for (let i = 0; i < links.length; i++) {
    const element = links[i];
    let re = /GROUP (A|B|C|D)$/;
    var val = re.exec(element.innerHTML)
    if (val) {
      if (val[1] == c) { element.style.backgroundColor = "#a6eded"; } else { element.style.backgroundColor = "#e6eded"; } 
    }
  }
});
