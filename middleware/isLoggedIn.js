module.exports = function(req, res, next) {
    if(!req.user) {
        req.flash('error', 'Must be logged in to view')
        res.redirect('auth/login')
    } else {
        next()
    }
}