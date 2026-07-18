const mongoose = require("mongoose");
const Service = require("../models/service");

const getAllServices = async (req, res) => {
  try {
    const services = await Service.find();
    res.status(200).json(services);
  } catch (error) {
    res.status(500).json({
      message: "Error retrieving services.",
      error: error.message,
    });
  }
};

const getServiceById = async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        message: "Invalid service ID.",
      });
    }

    const service = await Service.findById(id);

    if (!service) {
      return res.status(404).json({
        message: "Service not found.",
      });
    }

    res.status(200).json(service);
  } catch (error) {
    res.status(500).json({
      message: "Error retrieving service.",
      error: error.message,
    });
  }
};

const createService = async (req, res) => {
  try {
    const service = new Service(req.body);
    const savedService = await service.save();

    res.status(201).json({
      id: savedService._id,
    });
  } catch (error) {
    if (error.name === "ValidationError") {
      return res.status(400).json({
        message: "Validation failed.",
        errors: Object.values(error.errors).map((err) => err.message),
      });
    }

    res.status(500).json({
      message: "Error creating service.",
      error: error.message,
    });
  }
};

const updateService = async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        message: "Invalid service ID.",
      });
    }

    const updatedService = await Service.findByIdAndUpdate(id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!updatedService) {
      return res.status(404).json({
        message: "Service not found.",
      });
    }

    res.status(204).send();
  } catch (error) {
    if (error.name === "ValidationError") {
      return res.status(400).json({
        message: "Validation failed.",
        errors: Object.values(error.errors).map((err) => err.message),
      });
    }

    res.status(500).json({
      message: "Error updating service.",
      error: error.message,
    });
  }
};

const deleteService = async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        message: "Invalid service ID.",
      });
    }

    const deletedService = await Service.findByIdAndDelete(id);

    if (!deletedService) {
      return res.status(404).json({
        message: "Service not found.",
      });
    }

    res.status(200).json({
      message: "Service deleted successfully.",
    });
  } catch (error) {
    res.status(500).json({
      message: "Error deleting service.",
      error: error.message,
    });
  }
};

module.exports = {
  getAllServices,
  getServiceById,
  createService,
  updateService,
  deleteService,
};