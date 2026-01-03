var sheetId = '11UCGxa7EAQf_xTrIB2dLQ2zBqiCKZ7SOIylishPYbgs';

            

function getWords(sheetName, range){
    return new Promise(function(resolve, reject){
    let requestUri = 'https://sheets.googleapis.com/v4/spreadsheets/' + sheetId + '/values/' + sheetName + '!' + range + '?key=' + apiKey;

    let wordList = new Array();
    let request = new XMLHttpRequest();
    request.open('GET', requestUri, true);

    request.onload = function() {
        if (request.status >= 200 && request.status < 400) {
            // Success!
            let data = JSON.parse(request.responseText);
            console.log('Siker ' + data.values.length);
            if(data.values.length > 1){
              for(let i=1; i<data.values.length; i++){
                 wordList.push({en: data.values[i][0], hu: data.values[i][1]});
              }
            }
            console.log('words ' + JSON.stringify(wordList));
            resolve(wordList);
        } else {
            // We reached our target server, but it returned an error
            console.log('Error');
        }
     
    };

    request.onerror = function() {
    // There was a connection error of some sort
        alert('Shit happened!');
    };

    console.log('request uri: ' + requestUri);
    
    request.send();
    });
}

function shuffle(array) {
    let currentIndex = array.length;
    while (currentIndex != 0) {
        let randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex--;
        [array[currentIndex], array[randomIndex]] = [array[randomIndex], array[currentIndex]];
    }
}

function loadQueryParameters() {
    let queryParams = [];
    var query = window.location.search.substring(1);
    var vars = query.split('&');
    for (var i = 0; i < vars.length; i++) {
        var pair = vars[i].split('=');
        queryParams.push({key: pair[0], value: pair[1]});
    }
    return queryParams;
}