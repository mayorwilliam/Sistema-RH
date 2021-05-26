module.exports = {
    isLoggedIn(request,response,next){
        if(request.isAuthenticated()){
            return next()
        }else{
            return response.redirect('/req/signin')
        }
    },
    isNotLoggedIn(request,response,next){
        if(!request.isAuthenticated()){
            return next()
        }else{
            return response.redirect('/')
        }
    }
}