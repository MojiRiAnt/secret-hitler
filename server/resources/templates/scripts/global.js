function httpGet(url, callback)
{
    var x = new XMLHttpRequest();
    x.onreadystatechange = function() { 
        if (x.readyState == 4 && x.status == 200)
            callback(x.responseText);
    }
    x.open("GET", url, true);
    x.send(null)
}
