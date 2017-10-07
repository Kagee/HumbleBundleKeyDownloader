# HumbleBundleKeyDownloader
Horribly written Chrome extension that allows you to get a file with tab-separated values about all your Humble Bundle keys (Steam, Origin, etc). This includes redeem-status.

***How to add to Chrome:***
* Meny -> More tools -> Extentions
* Check of "Developer mode"
* Click "Load unpacked extension..." and select the code folder

***IMPORTANT:***
* Please look at the browser adress bar for progress updates.
  * Open the developer console for debug messages

* This script runs for a long time, and rewriting it to use threads (workers) is ass.
  * Please tell chrome to \"Wait\" when it complains that the page is unreponsive.")

***Browser usage:***
* Login on www.humblebundle.com
* Press the "H" that should appear in the top-right corner of the browser (where extention buttons normally appear)

***Using tab-delimited file:***
* Open in i.e. Libreoffice calc
* The data can easily be sorted using Data -> AutoFilter
* Select "short_redeemed_key_val" = "Not redeemed" to list only keys you have not redeemed. 

