import Vehicle from "../models/vehicleModel";
import * as Joi from "joi";
import { createValidator } from "express-joi-validation";
import * as express from "express";

module.exports = (app) => {
  const validator = createValidator();
  var router = express.Router();

  const getResouceCode = (data) => {
    if (data === null) {
      return 204;
    } else {
      return 200;
    }
  };

  router.post("/vehicle", async (req, res) => {
    const { body } = req;

    const vehicleValidationScheema = Joi.object().keys({
      VRN: Joi.string().required(),
      nickName: Joi.string(),
      make: Joi.string().required(),
      model: Joi.string().required(),
      mfgYear: Joi.number().required(),
      vehicleType: Joi.number().required(),
      fuelType: Joi.array().min(1).items(Joi.number()).required(),
      isDeleted: Joi.boolean(),
    });

    try {
      const { error, value } = vehicleValidationScheema.validate(body);

      if (error) {
        res.status(500).send(error);
      } else {
        const vehicle = new Vehicle({
          VRN: req.body.VRN,
          nickName: req.body.nickName,
          make: req.body.make,
          model: req.body.model,
          mfgYear: req.body.mfgYear,
          vehicleType: req.body.vehicleType,
          fuelType: req.body.fuelType,
          isDeleted: req.body.isDeleted,
        });

        Vehicle.create(vehicle, (err, data) => {
          if (err) {
            res.status(500).send({
              message: err.message || "Cannot create Vehicle",
            });
          } else {
            res.status(201).send(data);
          }
        });
      }
    } catch (ex) {
      res.status(500).send(ex);
    }
  });

  router.get("/vehicles", (req, res) => {
    Vehicle.find({ isDeleted: false }, (err, data) => {
      if (err) {
        res.status(500).send({
          statusCode: 500,
          message: err,
        });
      } else {
        res.status(getResouceCode(data)).send(data);
      }
    });
  });

  router.get("/vehicle/:id", (req, res) => {
    Vehicle.findOne({ _id: req.params.id, isDeleted: false }, (err, data) => {
      if (err) {
        res.status(500).send({
          statusCode: 500,
          message: err,
        });
      } else {
        res.status(getResouceCode(data)).send(data);
      }
    });
  });

  router.put("/vehicle/:id", (req, res) => {
    Vehicle.findOneAndUpdate(
      { _id: req.params.id, isDeleted: false },
      req.body,
      {
        new: true,
      },
      (err, data) => {
        if (err) {
          res.status(500).send({
            statusCode: 500,
            message: err || `Cannot update Vehicle with id=${req.params.id}!`,
          });
        } else {
          res.status(getResouceCode(data)).send(data);
        }
      }
    );
  });

  router.delete("/vehicle/:id", (req, res) => {
    Vehicle.findOneAndUpdate(
      { _id: req.params.id, isDeleted: false },
      { isDeleted: true },
      (err, data) => {
        if (err) {
          res.status(404).send({
            statusCode: 404,
            message: err || `Cannot delete Vehicle with id=${req.params.id}!`,
          });
        } else {
          res.status(200).send({
            message: "Vehicle deleted successfully!",
          });
        }
      }
    );
  });

  app.use("/api", router);
};
