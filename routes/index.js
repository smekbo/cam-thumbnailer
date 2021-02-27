var express = require('express');
var router = express.Router();
var path = require('path');

const { spawn } = require('child_process');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/jpg/:channel', function(req, res, next)
{
  const ls = spawn('ffmpeg', ['-y', '-i', `rtsp://192.168.88.181:554/user=admin_password=_channel=${req.params.channel}_stream=0.sdp`, '-vframes', '1', `public/images/thumb${req.params.channel}.jpg`]);

  ls.stdout.on('data', (data) => {
    console.log(`stdout: ${data}`);
  });
  
  ls.stderr.on('data', (data) => {
    console.error(`stderr: ${data}`);
  });

  ls.on('close', (code) => {
    console.log(`child process exited with code ${code}`);
    res.sendFile(path.resolve(__dirname + `/../public/images/thumb${req.params.channel}.jpg`));
  });  
})

module.exports = router;
