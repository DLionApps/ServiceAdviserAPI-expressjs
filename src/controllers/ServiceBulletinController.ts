// import ServiceBulletinModel from "../models/serviceBulletinModel";
// import * as Joi from "joi";
// import * as express from "express";
// import validateToken from "../commonFunctions/TokenValidator";

// module.exports = (app) => {
//   var router = express.Router();

//   const getResouceCode = (data) => {
//     if (data === null) {
//       return 204;
//     } else {
//       return 200;
//     }
//   };

//   router.post("/serviceBulletin", validateToken, async (req, res) => {
//     const { body } = req;

//     const serviceBulletinValidationScheema = Joi.object().keys({
//       title: Joi.string().required(),
//       applicableVehicleTypes: Joi.array().min(1).items(Joi.number()).required(),
//       isDeleted: Joi.boolean(),
//     });

//     try {
//       const { error, value } = serviceBulletinValidationScheema.validate(body);

//       if (error) {
//         res.status(500).send(error);
//       } else {
//         const serviceBulletin = new ServiceBulletinModel({
//           title: value.title,
//           applicableVehicleTypes: value.applicableVehicleTypes,
//           isDeleted: value.isDeleted,
//         });

//         ServiceBulletinModel.create(serviceBulletin, (err, data) => {
//           if (err) {
//             res.status(500).send({
//               message: err.message || "Cannot create Bulletin",
//             });
//           } else {
//             res.status(201).send(data);
//           }
//         });
//       }
//     } catch (ex) {
//       res.status(500).send(ex);
//     }
//   });

//   router.get("/serviceBulletin/:applicableIDs", validateToken, (req, res) => {
//     ServiceBulletinModel.find(
//       { isDeleted: false, applicableVehicleTypes: req.params.applicableIDs },
//       (err, data) => {
//         if (err) {
//           res.status(500).send({
//             statusCode: 500,
//             message: err,
//           });
//         } else {
//           res.status(getResouceCode(data)).send(data);
//         }
//       }
//     );
//   });
//   app.use("/api", router);
//   //temp
// };
