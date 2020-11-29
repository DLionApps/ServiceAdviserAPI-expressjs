import Service from "../models/serviceModel";
import * as Joi from "joi";
import * as express from "express";
import validateToken from "../commonFunctions/TokenValidator";

module.exports = (app) => {
  var router = express.Router();

  const getResouceCode = (data) => {
    if (data === null) {
      return 204;
    } else {
      return 200;
    }
  };

  router.post("/service", validateToken, async (req, res) => {
    const { body } = req;

    const serviceValidationScheema = Joi.object().keys({
      mileage: Joi.number(),
      lastServiceMileage: Joi.number(),
      workingHours: Joi.number(),
      lastServiceHours: Joi.number(),
      lastServiceDate: Joi.string().required(),
      vehicleID: Joi.string().required(),
      isDeleted: Joi.boolean(),
    });

    try {
      const { error, value } = serviceValidationScheema.validate(body);

      if (error) {
        res.status(500).send(error);
      } else {
        const service = new Service({
          mileage: value.mileage,
          lastServiceMileage: value.lastServiceMileage,
          workingHours: value.workingHours,
          lastServiceHours: value.lastServiceHours,
          lastServiceDate: value.lastServiceDate,
          vehicleID: value.vehicleID,
          isDeleted: value.isDeleted,
        });

        Service.create(service, (err, data) => {
          if (err) {
            res.status(500).send({
              message: err.message || "Cannot create Service",
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

  router.get("/services", validateToken, (req, res) => {
    Service.find({ isDeleted: false }, (err, data) => {
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

  router.get("/service/:id", validateToken, (req, res) => {
    Service.findOne({ _id: req.params.id, isDeleted: false }, (err, data) => {
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

  router.put("/service/:id", validateToken, (req, res) => {
    Service.findOneAndUpdate(
      { _id: req.params.id, isDeleted: false },
      req.body,
      {
        new: true,
      },
      (err, data) => {
        if (err) {
          res.status(500).send({
            statusCode: 500,
            message: err || `Cannot update Service with id=${req.params.id}!`,
          });
        } else {
          res.status(getResouceCode(data)).send(data);
        }
      }
    );
  });

  router.delete("/service/:id", validateToken, (req, res) => {
    Service.findOneAndUpdate(
      { _id: req.params.id, isDeleted: false },
      { isDeleted: true },
      (err, data) => {
        if (err) {
          res.status(404).send({
            statusCode: 404,
            message: err || `Cannot delete Service with id=${req.params.id}!`,
          });
        } else {
          res.status(200).send({
            message: "Service deleted successfully!",
          });
        }
      }
    );
  });

  app.use("/api", router);
};
