import Owner from "../models/ownerModel";
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

  router.post("/owner", async (req, res) => {
    const { body } = req;

    const ownerValidationScheema = Joi.object().keys({
      email: Joi.string().required(),
      fName: Joi.string().required(),
      lName: Joi.string().required(),
      contactNumber: Joi.string().required(),
      password: Joi.string().required(),
      isDeleted: Joi.boolean(),
    });

    try {
      const { error, value } = ownerValidationScheema.validate(body);

      if (error) {
        res.status(500).send(error);
      } else {
        const owner = new Owner({
          email: value.email,
          fName: value.fName,
          lName: value.lName,
          contactNumber: value.contactNumber,
          password: value.password,
          isDeleted: value.isDeleted,
        });
        Owner.create(owner, (err, data) => {
          if (err) {
            res.status(500).send({
              message: err.message || "Cannot create Owner",
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

  router.get("/owners", (req, res) => {
    Owner.find({ isDeleted: false }, (err, data) => {
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

  router.get("/owner/:id", (req, res) => {
    Owner.findOne({ _id: req.params.id, isDeleted: false }, (err, data) => {
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

  router.put("/owner/:id", (req, res) => {
    Owner.findOneAndUpdate(
      { _id: req.params.id, isDeleted: false },
      req.body,
      {
        new: true,
      },
      (err, data) => {
        if (err) {
          res.status(500).send({
            statusCode: 500,
            message: err || `Cannot update Owner with id=${req.params.id}!`,
          });
        } else {
          res.status(getResouceCode(data)).send(data);
        }
      }
    );
  });

  router.delete("/owner/:id", (req, res) => {
    Owner.findOneAndUpdate(
      { _id: req.params.id, isDeleted: false },
      { isDeleted: true },
      (err, data) => {
        if (err) {
          res.status(404).send({
            statusCode: 404,
            message: err || `Cannot delete Owner with id=${req.params.id}!`,
          });
        } else {
          res.status(200).send({
            message: "Owner deleted successfully!",
          });
        }
      }
    );
  });

  app.use("/api", router);
};
