const fs=require("fs");
const path=require("path");
const assert=require("assert");

var inf_filename="README.md";
var ouf_filename="rss_ssr";

console.log("Convertion started.");

var inf_cont=fs.readFileSync(inf_filename,"utf-8").toString();
var patt=RegExp("ssr://[a-zA-Z0-9]+","g");
var target_cont="";
var urlcnt=0;
while (true){
    var turl=patt.exec(inf_cont);
    if (!turl)
        break;
    target_cont=target_cont+turl+"\n";
    urlcnt++;
}

var target_b64=Buffer.from(target_cont).toString("base64");

var ouf_file=fs.openSync(ouf_filename,"w");
fs.writeSync(ouf_file,target_b64,"utf-8");
fs.closeSync(ouf_file);

console.log(`Convertion done. ${urlcnt} url(s) have been processed.`);
