import User from "../model/user.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs"

// new user sign up
export const signUp = async (req, res) => {
    const { firstname, lastname, email, password, confirm_password} = req.body

    if(!firstname && lastname && email && password && confirm_password){
        return res.status(400).send("All inputs are required");
    }

    // olduser 
    const Olduser = await User.findOne({ email: email })

    if(Olduser != null){
        return res.status(409).json({
            status: false,
            message:"User already exists"
        });
    }
    
    if( password !== confirm_password){
        return res.status(409).json({
            status: false,
            message:"Password and confirm password does not match"
        });
        
    }

    // encrypt user password
    const encryptedPassword = await bcrypt.hash(password, 12)

    // create new user
    const newUser = await User.create({
        firstname: firstname,
        lastname: lastname,
        email: email,
        password: encryptedPassword
    })

    const jwt_token = jwt.sign({
        user_id: newUser._id,
        email: email
    }, process.env.JWT_TOKEN_KEY, {
        expiresIn: "10m",
    })
    
    return res.status(200).json({
        status: true,
        message:"New user created succesfully",
        access_token: jwt_token
    });
}

// signin 
export const signIn = async (req, res) =>{
    
    const { email, password } = req.body

    const user = await User.findOne({email: email});

    // validating user input
    if (!(email && password)) {
        return res.status(400).send("All inputs are required");
      }


      if(user == null){
        return res.status(409).json({
            status: false,
            message:"Incorrect email or password"
        });
    }
    
    if (user.email && (await bcrypt.compare(password, user.password))) {
        const jwt_token = jwt.sign({
            user_id: user._id,
            email: email
        }, process.env.JWT_TOKEN_KEY, {
            expiresIn: "10m",
        })
        
        return res.status(200).json({
            status: true,
            message:"user signed in succesfully",
            access_token: jwt_token
        }); 
    }
    return res.status(409).json({
        status: false,
        message:"Incorrect email or password"
    });
    
}
