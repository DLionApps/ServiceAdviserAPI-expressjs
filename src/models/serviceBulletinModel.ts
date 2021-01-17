// import * as mongoose from "mongoose";
// import * as uuid from "uuid";

// const ServiceBulletinSchema = new mongoose.Schema({
//   _id: String,
//   title: String,
//   applicableVehicleTypes: [Number],
//   isDeleted: { type: Boolean, default: false },
// });

// ServiceBulletinSchema.pre("save", function (next) {
//   const doc = this;
//   if (doc.isNew) {
//     doc._id = uuid.v1();
//   }
//   next();
// });

// export default mongoose.model("serviceBulletin", ServiceBulletinSchema);
