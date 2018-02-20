var fs=require('fs');
var express = require('express');
var multipart = require('connect-multiparty');
var exec = require('child_process').exec;
var execFile = require('child_process').execFile;

var app = express();
var num1, num2, result;

app.use(multipart({uploadDir: __dirname+'/upload'}));
app.get('/',function(request,response){
  fs.readFile('HTMLPage.html',function(error,data){
    response.send(data.toString());
  });
});

app.post('/',function(request,response){
  console.log(request.body);
  console.log(request.files);
  var comment= request.body.comment;
  var exe = request.files.exec;
  if(exe){
    var name = exe.name;
    var path = exe.path;
    var type = exe.type;

    var outputPath = __dirname + '/upload/homework';


    fs.rename(path,outputPath, function(error){
      var auth = exec('chmod 777 ./upload/homework', function(error, stdout, stderr){
        if(error) {
          console.error('stderr', stderr);
          throw error;
        }
        else{
          num1 = Math.floor(Math.random()*100)+1;
          num2 = Math.floor(Math.random()*100)+1;
          var child = execFile('./homework',[num1, num2], function(error, stdout, stderr){
            if(error) {
              console.error('stderr', stderr);
              throw error;
            }
            result = stdout;
            //console.log(num1+'+'+ num2+'= '+ stdout);
            if(stdout==num1+num2){
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

app.get('/result',function(request, response){
  //response.send('<h1>'+num1+'+'+num2+'= '+result+'</h1>');
  if(result == num1+num2)
    response.send('<h1>'+num1+'+'+num2+'= '+result+'</h1>'+'<h1>Correct</h1>');
  else {
    response.send('<h1>Incorrect</h1>');
  }
});

app.listen(3000,function(){
  console.log('Server running at http://127.0.0.1:3000');

});
