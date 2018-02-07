var execFile = require('child_process').execFile;

var num1 = Math.floor(Math.random()*100)+1;
var num2 = Math.floor(Math.random()*100)+1;

var child = execFile('./upload/homework',[num1, num2], function(error, stdout, stderr){
  if(error) {
    console.error('stderr', stderr);
    throw error;
  }
  console.log(num1+'+'+ num2+ '='+ stdout);
  if(stdout==num1+num2){
    console.log("Correct");
  }
});
