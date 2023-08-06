import { Schema, model, models } from "mongoose";

const UserSchema = new Schema({
  userName: {
    type: String,
    require: [true, "eail is required"],
  },
  password: {
    type: String,
    require: [true, "password is required"],
  },
  role: {
    type: String,
    default: "user",
  },
});

const User = models.User || model("User", UserSchema);

export default User;
