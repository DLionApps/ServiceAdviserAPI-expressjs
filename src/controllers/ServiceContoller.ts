import Service from "../models/serviceModel";
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

  router.post(
    "/service",
    validator.body(
      Joi.object({
        mileage: Joi.number(),
        lastServiceMileage: Joi.number(),
        workingHours: Joi.number(),
        lastServiceHours: Joi.number(),
        lastServiceDate: Joi.string().required(),
        isDeleted: Joi.boolean(),
      })
    ),
    async (req, res) => {
      const service = new Service({
        mileage: req.body.mileage,
        lastServiceMileage: req.body.lastServiceMileage,
        workingHours: req.body.workingHours,
        lastServiceHours: req.body.lastServiceHours,
        lastServiceDate: req.body.lastServiceDate,
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
  );

  router.get("/services", (req, res) => {
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

  router.get("/service/:id", (req, res) => {
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

  router.put("/service/:id", (req, res) => {
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

  router.delete("/service/:id", (req, res) => {
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
