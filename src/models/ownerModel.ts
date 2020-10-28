import * as mongoose from "mongoose";
import * as uuid from "uuid";

const OwnerSchema = new mongoose.Schema({
  _id: String,
  email: String,
  fName: String,
  lName: String,
  contactNumber: String,
  password: String,
  isDeleted: { type: Boolean, default: false },
  //   vehicle array
});

OwnerSchema.pre("save", function (next) {
  const doc = this;
  if (doc.isNew) {
    doc._id = uuid.v1();
  }
  next();
});

export default mongoose.model("owner", OwnerSchema);
