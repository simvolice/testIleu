/**
 * Created by Moon on 27.08.2015.
 */
var CronJob = require('cron').CronJob;



var jobIdprocess = new CronJob({
  cronTime: '1 * * * * *',
  onTick: function() {
    console.log('hello');
  },
  start: false
});


return jobIdprocess

console.log('start');

job.start();
