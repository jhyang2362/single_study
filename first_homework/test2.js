var fs=require('fs');
var express = require('express');
var multipart = require('connect-multiparty');
var exec = require('child_process').exec;
var execFile = require('child_process').execFile;

var app = express();
var num1, num2, result;

app.use(multipart({uploadDir: __dirname}));
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
      //response.redirect('/');
    });
    //var cmd = 'chmod 777 ~/dev/개별연구/upload/homework';
    var auth = exec('chmod -R a+rwx '+outputPath, function(error, stdout, stderr){
      if(error) {
        console.error('stderr', stderr);
        throw error;
      }
    });
    num1 = Math.floor(Math.random()*100)+1;
    num2 = Math.floor(Math.random()*100)+1;
    var child = execFile('./upload/homework',[num1, num2],  function(error, stdout, stderr){
      if(error) {
        console.error('stderr', stderr);
        throw error;
      }
      result = stdout;
      //console.log(num1+'+'+ num2+'= '+ stdout);
      if(stdout==num1+num2){
        console.log("Correct");
      }
    });
    throw response.redirect('/result');
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

app.listen(52273,function(){
  console.log('Server running at http://127.0.0.1:52273');

});
