const mongo = require("../connect");
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken");

exports.signup = async(req,res) => {

    try{

        //Email Validation

        const existUser = await mongo.selectedDb.collection("users").findOne({ email: req.body.email });
        if(existUser){
            return res.status(400).send({ msg: "You are already a registered User" });
        }

        //Confirm password checking

        const checkPassword = async(password,confirmPassword) =>{
            return password!==confirmPassword ? false : true;
        };

        const isSamePassword = await checkPassword(req.body.password, req.body.confirmPassword);

        if(!isSamePassword){
            return res.status(500).send({ msg: "Password doesn't match" });
        }
        else delete req.body.confirmPassword;
    
        //Password Hash

        const randomString = await bcrypt.genSalt(10);
        req.body.password = await bcrypt.hash(req.body.password,randomString);

        // Save in DB

        const insertedResponse = await mongo.selectedDb.collection("users").insertOne({...req.body});
        res.send(insertedResponse);

    }
    catch(err){
        console.log(err);
        res.status(500).send(err);
    }
}

exports.signin = async(req,res) => {

    //Email Validation: You are not a registered user. Please signup to register

    const existUser = await mongo.selectedDb.collection("users").findOne({ email: req.body.email });

    if(!existUser) {
        return res.status(500).send({ msg: "You are not a registered user. Please signup to register" });
    }

    //Password Incorrect

    const isValid = await bcrypt.compare(req.body.password, existUser.password);

    if(!isValid){
        return res.status(500).send({ msg: "Incorrect Password" });
    }

    //Generate and send token as a response

    const token = jwt.sign(existUser, process.env.SECRET_KEY, {
        expiresIn: "24hr",
    });

    res.send(token);

};