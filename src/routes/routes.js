// ------------------------------------------------------------------------------
//  ROUTING
// ------------------------------------------------------------------------------
const {fork} = require('child_process');

function getRoot(req, res) {
    res.render('main')
}

function getLogin(req, res) {
    if (req.isAuthenticated()) {
        res.redirect('profile')
    } else {
        res.render('login');
    }
}

function getSignup(req, res) {
    res.render('signup');
}

function postLogin (req, res) {
    if (req.isAuthenticated()) {
        res.redirect('profile')
    } else {
        res.redirect('login')
    }
}

function postSignup (req, res) {
    if (req.isAuthenticated()) {
        res.redirect('profile')
    } else {
        res.redirect('login')
    }
}

function getProfile (req, res) {
    if (req.isAuthenticated()) {
        let user = req.user;
        res.render('profileUser', { user: user, isUser:true })
    } else {
        res.redirect('login')
    }
}

function getFaillogin (req, res) {
    console.log('error en login');
    res.render('login-error', {});
}

function getFailsignup (req, res) {
    console.log('error en signup');
    res.render('signup-error', {});
}

function getLogout (req, res) {
    req.logout( (err) => {
        if (!err) {
            res.render('main');
        } 
    });
}

function getInfo(req , res){
    res.render('info', {process})
}


function failRoute(req, res){
    res.status(404).render('routing-error', {});
}

function checkAuthentication(req, res, next) {
    if (req.isAuthenticated()) {
        //req.isAuthenticated() will return true if user is logged in
        next();
    } else {
        res.redirect("/login");
    }
}

function getRandoms(req,res){

    //console.log(req.params);
//const num = req.params || 100;
//const num = parseInt(req.params.num)
//console.log(num);
 const randoms = fork("./random.js");

 randoms.send("start");

//  randoms.on("error", (err) => {

//  console.log(`Error en child process 'random' ${err}`);

//  });

 randoms.on("message", (obj) => {

 return res.json(obj);

 });

}


module.exports = {
    getRoot,
    getInfo,
    getLogin,
    postLogin,
    getFaillogin,
    getLogout,
    failRoute,
    getSignup,
    postSignup,
    getFailsignup,
    checkAuthentication,
    getProfile,
    getRandoms
    
}
  