export class AuthController {
    static getLoginPage(req, res) {
        res.render('login')
    }

    static getSuccesspage(req,res) {
        res.render('success')
    }
}