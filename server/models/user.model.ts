import { Model, model, Schema } from "mongoose";
import bcrypt from "bcrypt"
import { IUser } from "../interfaces/user.interface";

const UserSchema: Schema = new Schema({
    firstName: {
        type: String,
        required: [true, "First name is required"]
    },
    lastName: {
        type: String,
        required: [true, "Last name is required"]
    },
    email: {
        type: String,
        required: [true, "Email address is required"]
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
    if(this.password !== this.confirmPassword){
        this.invalidate("confirmPassword", "Passwords must match");
    }
    next();
})

UserSchema.pre("save", function(next){
        bcrypt.hash(this.password, 10)
            .then((hashedPassword : string)=>{
                this.password = hashedPassword;
            next();
            })
});

const User: Model<IUser> = model("User", UserSchema);

export default User;