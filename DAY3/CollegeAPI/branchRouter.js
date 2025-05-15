const express = require('express');
const Branch = require('./models/Branch');
const db = require('./db');
const router = express.Router();

router.get('/', async (request, response) => {
    try {
        const branches = await Branch.find({});
        response.status(200).json(branches);
    } catch (error) {
        response.status(500).json(error);
    }
})

router.get('/:id', async (request, response) => {
    try {
        const branch = await Branch.findById(request.params.id);
        response.status(200).json(branch);
    } catch (error) {
        response.status(500).json(error);
    }
})

router.post('/', async (request, response) => {
    try {
        const branch = new Branch(request.body);
        await branch.save();
        response.status(200).json(branch);
    } catch (error) {
        response.status(500).json(error);
    }
})

router.put('/:id', async (request, response) => {
    try {
        const branch = await Branch.findByIdAndUpdate(request.params.id, request.body, { new: true });
        response.status(200).json(branch);
    } catch (error) {
        response.status(500).json(error);
    }
})

router.delete('/:id', async (request, response) => {
    try {
        const branch = await Branch.findByIdAndDelete(request.params.id);
        response.status(200).json(branch);
    } catch (error) {
        response.status(500).json(error);
    }
})

module.exports = router;