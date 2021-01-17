// import * as mongoose from "mongoose";
// import * as uuid from "uuid";

// const VehicleSchema = new mongoose.Schema({
//   _id: String,
//   VRN: String,
//   nickName: { type: String, default: undefined },
//   make: String,
//   model: String,
//   mfgYear: Number,
//   vehicleType: Number,
//   fuelType: [Number],
//   isDeleted: { type: Boolean, default: false },
//   ownerID: String,
// });

// VehicleSchema.pre("save", function (next) {
//   const doc = this;
//   if (doc.isNew) {
//     doc._id = uuid.v1();
//   }
//   next();
// });

// export default mongoose.model("vehicle", VehicleSchema);
