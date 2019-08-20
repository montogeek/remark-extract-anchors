var remark = require("remark");
var report = require("vfile-reporter");
var extractAnchors = require("./src");
var fs = require("fs");

const file = fs.readFileSync("./test.md", "utf-8");

let anchors = [];

remark()
  .use(extractAnchors, {anchors})
  .process(file, function(err, file) {
    console.error(report(err || file));
    console.log(String(file));
  });

console.log(anchors);
