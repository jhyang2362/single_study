var fs = require('fs');
var express = require('express');
var router = express.Router();
var multipart = require('connect-multiparty');
var exec = require('child_process').exec;
var execFile = require('child_process').execFile;
var dir = require('path');
var variables = require('../variable.js');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index')
});

router.post('/',function(request,response){
  console.log(request.body);
  console.log(request.files);
  var comment= request.body.comment;
  var exe = request.files.exec;
  if(exe){
    var name = exe.name;
    var path = exe.path;
    var type = exe.type;

    var outputPath = dir.join(__dirname,'../upload/homework');
    console.log(outputPath);

    fs.rename(path,outputPath, function(error){
      var auth = exec('chmod 777 ../upload/homework', function(error, stdout, stderr){
        if(error) {
          console.error('stderr', stderr);
          throw error;
        }
        else{
          //num1 = Math.floor(Math.random()*100)+1;
          //num2 = Math.floor(Math.random()*100)+1;
          var child = execFile('../upload/homework',[variables.num1, variables.num2], function(error, stdout, stderr){
            if(error) {
              console.error('stderr', stderr);
              throw error;
            }
            variables.result = stdout;
            //console.log(num1+'+'+ num2+'= '+ stdout);
            if(stdout==variables.num1+variables.num2){
              console.log("Correct");

            }
            response.redirect('/result');
          });
        }
      });
    //  var cmd = '~/dev/studyfirst_homework/upload/homework';


    });
  }else{
    response.sendStatus(404);
  }


  //response.redirect('/');
});

module.exports = router;
