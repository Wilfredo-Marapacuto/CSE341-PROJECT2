const mongoose = require("mongoose");
const Client = require("../models/Client");

const getAllClients = async (req, res) => {
  try {
    const clients = await Client.find();
    res.status(200).json(clients);
  } catch (error) {
    res.status(500).json({
      message: "Error retrieving clients.",
      error: error.message,
    });
  }
};

const getClientById = async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        message: "Invalid client ID.",
      });
    }

    const client = await Client.findById(id);

    if (!client) {
      return res.status(404).json({
        message: "Client not found.",
      });
    }

    res.status(200).json(client);
  } catch (error) {
    res.status(500).json({
      message: "Error retrieving client.",
      error: error.message,
    });
  }
};

const createClient = async (req, res) => {
  try {
    const client = new Client(req.body);
    const savedClient = await client.save();

    res.status(201).json({
      id: savedClient._id,
    });
  } catch (error) {
    if (error.name === "ValidationError") {
      return res.status(400).json({
        message: "Validation failed.",
        errors: Object.values(error.errors).map((err) => err.message),
      });
    }

    res.status(500).json({
      message: "Error creating client.",
      error: error.message,
    });
  }
};

const updateClient = async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        message: "Invalid client ID.",
      });
    }

    const updatedClient = await Client.findByIdAndUpdate(id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!updatedClient) {
      return res.status(404).json({
        message: "Client not found.",
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
      message: "Error updating client.",
      error: error.message,
    });
  }
};

const deleteClient = async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        message: "Invalid client ID.",
      });
    }

    const deletedClient = await Client.findByIdAndDelete(id);

    if (!deletedClient) {
      return res.status(404).json({
        message: "Client not found.",
      });
    }

    res.status(200).json({
      message: "Client deleted successfully.",
    });
  } catch (error) {
    res.status(500).json({
      message: "Error deleting client.",
      error: error.message,
    });
  }
};

module.exports = {
  getAllClients,
  getClientById,
  createClient,
  updateClient,
  deleteClient,
};