import * as mongoose from "mongoose";
import * as uuid from "uuid";

const ServiceSchema = new mongoose.Schema({
  _id: String,
  mileage: Number,
  lastServiceMileage: Number,
  workingHours: Number,
  lastServiceHours: Number,
  lastServiceDate: String,
  isDeleted: { type: Boolean, default: false },
  vehicleID: String,
});

ServiceSchema.pre("save", function (next) {
  const doc = this;
  if (doc.isNew) {
    doc._id = uuid.v1();
  }
  next();
});

export default mongoose.model("service", ServiceSchema);
