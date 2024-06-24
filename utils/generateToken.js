import jwt from "jsonwebtoken"


const generateTokenAndCookie = (userId, res) => { // olusturulan tokenler signup ve login islemlerinde kullanilir
    const token = jwt.sign({userId}, process.env.JWT_SECRET_KEY, { // token olusturulur user in idsine ve secret key e gore
        expiresIn : "15d"
    })

    res.cookie("jwt", token, { // olusturulan token cookie icinde jwt adi altinda tutulur
        maxAge : 15 * 24 * 60 * 60 * 1000, // MS
        httpOnly : true, //prevent XSS attacks cross-site scripting attacks guvenlik icin
        sameSite : "strict", //CSRF attacks cross-site request forgery attacks guvenlik icin 
        secure : process.env.NODE_ENV !== "development"
    })
}

export default generateTokenAndCookie;