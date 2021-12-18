import { Model, model, Schema } from "mongoose";
import bcrypt from "bcrypt"
import { IUser } from "../interfaces/user.interface";

const UserSchema: Schema = new Schema({
    email: {
        type: String,
        required: [true, "Email address is required"],
        unique: true
    },
    password: {
        type: String,
        required: [true, "Password is required"],
        minLength: [8, "Passwords MUST be at least 8 characters"]
    },
}, { timestamps: true });

const self : any = this;

UserSchema.virtual("confirmPassword")
    .get(()=>self._confirmPassword)
    .set((value : string)=> self._confirmPassword = value)

UserSchema.pre("validate", function(next){
    console.log("in validate");

    if(this.password !== this.confirmPassword){
        this.invalidate("confirmPassword", "Passwords must match");
        console.log("didnt match");
    }
    console.log(this.password, this.confirmPassword);
    next();
})

UserSchema.pre("save", function(next){
    console.log("in pre save");
        bcrypt.hash(this.password, 10)
            .then((hashedPassword : string)=>{ 
                console.log("in hash");
                this.password = hashedPassword;
            next();
            })
});

const User: Model<IUser> = model("User", UserSchema);

export default User;