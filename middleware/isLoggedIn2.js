module.exports = function(req, res, next) {
    if(req.user.admin !== 'false' ) {
        req.flash('error', 'Must be logged in to view')
        res.redirect('login')
    } else {
        next()
    }
}