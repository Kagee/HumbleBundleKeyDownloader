function HumbleBundleExtractor(div) {

window.history.replaceState(null, null, "/#Yes, look here for progress updates.");
alert("Please look at the browser adress bar for progress updates.")
window.history.replaceState(null, null, "/#Extracting Humble Bundre orders");
var xhr = new XMLHttpRequest();
xhr.open("GET", "https://www.humblebundle.com/api/v1/user/order", false);
xhr.send(null);
console.log(xhr)

if (xhr.readyState == 4) {
        var resp = JSON.parse(xhr.responseText);
        console.clear()
        if(resp.length > 0) {
            console.log(resp.length + " gamekeys found");
            var arrayLength = resp.length;
            output = "bundle_name\tkey_type\titem_name\tsold_out\tredeemed_key_val\n";

            for (var i = 0; i < arrayLength; i++) {
                //if (resp[i].gamekey == 'F3xMAh3w6Z83fWTy' || resp[i].gamekey == 'GFFPZkuZthAydUwu') {
                  console.log("Key " + (i+1) + " of " + arrayLength  + " processed");
                    window.history.replaceState(null, null, "/#Processing order " + (i+1) + " of " + arrayLength  + " processed");
                    //div.innerHTML = "Key " + (i+1) + " of " + arrayLength  + " processed";
                  // F3xMAh3w6Z83fWTy / https://www.humblebundle.com/downloads?key=F3xMAh3w6Z83fWTy / Yogscast Jingle Jam 2016
                  // GFFPZkuZthAydUwu // https://www.humblebundle.com/downloads?key=GFFPZkuZthAydUwu / Humble Indie Bundle 18
                  gamekey_json_url = 'https://www.humblebundle.com/api/v1/order/' + resp[i].gamekey + '?all_tpkds=true';
                  console.log(gamekey_json_url)
                  var xhr_tmp = new XMLHttpRequest();
                  xhr_tmp.open("GET", gamekey_json_url, false);
                  xhr_tmp.send(null);
                  if (xhr_tmp.status === 200) {
                        //console.log(xhr_tmp.responseText);
                        var data = JSON.parse(xhr_tmp.responseText);
                        console.log(data["product"]["human_name"])
                        //                  "sold_out": false,
                        //                  "redeemed_key_val" may be empty
                        var num_tpks = data["tpkd_dict"]["all_tpks"].length;

                        for (var j = 0; j < num_tpks; j++) {
                            console.log(data["tpkd_dict"]["all_tpks"][j]["key_type_human_name"]+ ": "+ data["tpkd_dict"]["all_tpks"][j]["human_name"])
                            output = output + data["product"]["human_name"] + "\t"
                                            + data["tpkd_dict"]["all_tpks"][j]["key_type_human_name"] + "\t"
                                            + data["tpkd_dict"]["all_tpks"][j]["human_name"] + "\t"
                                            + ((data["tpkd_dict"]["all_tpks"][j]["sold_out"] == null) ?'true':'false') + "\t"
                                            + ((data["tpkd_dict"]["all_tpks"][j]["redeemed_key_val"] == null) ? 'Not redeemed':data["tpkd_dict"]["all_tpks"][j]["redeemed_key_val"]) + "\t"
                                            + "\n";
                        }
                  } else {
                    console.log("Status for url " + gamekey_json_url + " was not 200, le bailing out!");
                    window.history.replaceState(null, null, "/#" + "Status for url " + gamekey_json_url + " was not 200, le bailing out!");
                    break;
                  }
                //}
            }
            var blob = new Blob(
                    // I'm using page innerHTML as data
                    // note that you can use the array
                    // to concatenate many long strings EFFICIENTLY
                    [output],
                    // Mime type is important for data url
                    {type : 'text/html'}
            ); 
            // This FileReader works asynchronously, so it doesn't lag
            // the web application
            window.history.replaceState(null, null, "/#Creating download humblebundle.csv");
            var a = new FileReader();
            a.onload = function(e) {
             // Capture result here
                console.log(e.target);
                var link = document.createElement("a");
                link.download = "humblebundle.csv";
                link.href = e.target.result;
                document.body.appendChild(link);
                link.click();
                document.body.removeChild(link);
                delete link;
            };
            a.readAsDataURL(blob);
        } else {
            console.log(resp.length + " orders found, user no orders or something is wrong. le bailing out!");
        }
    }
    window.history.replaceState(null, null, "/#" + "HumbleBundleExtractor complete.");
    console.log("HumbleBundleExtractor complete.")
}
HumbleBundleExtractor();

