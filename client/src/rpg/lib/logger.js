const loglevel = ['server', 'ui', 'event', 'network']

var log = function(errorlevel, ...msg) {
    console.log(Date.now(), loglevel[errorlevel], ...msg)
}

export default log