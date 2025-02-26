// controllers/resourceController.js
import Resource from '../models/Resource.js';

export const createResource = async (req, res, next) => {
  try {
    const newResource = new Resource({ ...req.body, user: req.user.id });
    await newResource.save();
    res.status(201).json(newResource);
  } catch (error) {
    next(error);
  }
};

export const getResources = async (req, res, next) => {
  try {
    const resources = await Resource.find({ user: req.user.id });
    res.json(resources);
  } catch (error) {
    next(error);
  }
};

export const getResourceById = async (req, res, next) => {
  try {
    const resource = await Resource.findById(req.params.id);
    if (!resource) return res.status(404).json({ message: 'Resource not found' });
    res.json(resource);
  } catch (error) {
    next(error);
  }
};

export const updateResource = async (req, res, next) => {
  try {
    const updatedResource = await Resource.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(updatedResource);
  } catch (error) {
    next(error);
  }
};

export const deleteResource = async (req, res, next) => {
  try {
    await Resource.findByIdAndDelete(req.params.id);
    res.json({ message: 'Resource deleted' });
  } catch (error) {
    next(error);
  }
};