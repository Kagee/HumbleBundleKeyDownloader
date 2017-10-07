function HumbleBundleExtractor(div) {

  window.history.replaceState(null, null, "/#Yes, look here for progress updates.");
  alert("Please look at the browser adress bar for progress updates.\nOpen the developer console for debug messages.")
  alert("This script runs for a long time, and rewriting it to use threads (workers) is ass.\nPlease tell chrome to \"Wait\" when it complains that the page is unreponsive.")
  window.history.replaceState(null, null, "/#Extracting Humble Bundre orders");
  var xhr = new XMLHttpRequest();
  xhr.open("GET", "https://www.humblebundle.com/api/v1/user/order", true);

  xhr.onload = function (e) {
      if (xhr.readyState === 4) {
              if (xhr.status === 200) {
        var resp = JSON.parse(xhr.responseText);
        //console.clear()
        if(resp.length > 0) {
            console.log(resp.length + " gamekeys found");
            var arrayLength = resp.length;
            output = "short_item_name\tshort_redeemed_key_val\tbundle_name\tkey_type\tsold_out\tfull_item_name\tfull_redeemed_key_val\n";

            for (var i = 0; i < arrayLength; i++) {
                  //if (resp[i].gamekey != 'F3xMAh3w6Z83fWTy' && resp[i].gamekey != 'GFFPZkuZthAydUwu') {
                  //  continue
                  //}
                  console.log("Key " + (i+1) + " of " + arrayLength  + " processed");
                    window.history.replaceState(null, null, "/#Processing order " + (i+1) + " of " + arrayLength);
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
                            /* "bundle_name\t
                             * key_type\t
                             * short_item_name\t
                             * short_redeemed_key_val\t
                             * sold_out\t
                             * item_name\t
                             * redeemed_key_val\n";
                             * 
                             * */
                            output = output + ((data["tpkd_dict"]["all_tpks"][j]["human_name"] == null) ? 'No name defined' : data["tpkd_dict"]["all_tpks"][j]["human_name"] ).substring(0, 35) + "\t"
                                            + ((data["tpkd_dict"]["all_tpks"][j]["redeemed_key_val"] == null) ? 'Not redeemed':data["tpkd_dict"]["all_tpks"][j]["redeemed_key_val"]).substring(0, 35) + "\t"
                                            + data["product"]["human_name"] + "\t"
                                            + data["tpkd_dict"]["all_tpks"][j]["key_type_human_name"] + "\t"
                                            + ((data["tpkd_dict"]["all_tpks"][j]["sold_out"] == null) ?'true':'false') + "\t"
                                            + data["tpkd_dict"]["all_tpks"][j]["human_name"] + "\t"
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
            window.history.replaceState(null, null, "/#Creating download humblebundle.csv");
            //await wait(500);
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
    
    window.history.replaceState(null, null, "/");
    console.log("HumbleBundleExtractor complete.")
   }}
xhr.send();
}

var where = "" + document.location;
if (where.indexOf('humblebundle.com') !== -1) {
  spans = document.getElementsByClassName("navbar-item-text");
  span_count = spans.length;
  login_found=false;
  for (var k = 0; k < span_count; k++) {
     if (spans[k].innerHTML.indexOf('Sign up') !== -1) { login_found = true; }
  }
  if (login_found) {
      alert("You must be logged in for this to work!")
  } else {
    //setTimeout(HumbleBundleExtractor, 100);
    HumbleBundleExtractor();
  }
} else {
  alert("You must be logged inn on humblebundle.com for this to work!")
}

