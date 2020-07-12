module.exports = function(req, res, next) {
    if(!req.user || req.user.admin !== '1' ) {
        req.flash('error', 'Must be admin to view')
        res.redirect('login')
    } else {
        next()
    }
}