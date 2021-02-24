module.exports = (router) =>{
    router.get('/testAPI', function(req, res, next) {
        res.send('API is working properly');
    });
}
