require('forever-monitor').start(['yarn', 'speed'], {
  max: 1,
  silent: false
});