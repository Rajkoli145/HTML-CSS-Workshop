const express = require('express');
const Student = require('./models/Student');
const db = require('./db');
const router = express.Router();

router.get('/', async (request, response) => {
    try {
        const students = await Student.find({});
        response.status(200).json(students);
    } catch (error) {
        response.status(500).json(error);
    }
})

router.get('/:id', async (request, response) => {
    try {
        const student = await Student.findById(request.params.id);
        response.status(200).json(student);
    } catch (error) {
        response.status(500).json(error);
    }
})

router.post('/', async (request, response) => {
    try {
        const student = new Student(request.body);
        await student.save();
        response.status(200).json(student);
    } catch (error) {
        response.status(500).json(error);
    }
})

router.put('/:id', async (request, response) => {
    try {
        const student = await Student.findByIdAndUpdate(request.params.id, request.body, { new: true });
        response.status(200).json(student);
    } catch (error) {
        response.status(500).json(error);
    }
})

router.delete('/:id', async (request, response) => {
    try {
        const student = await Student.findByIdAndDelete(request.params.id);
        response.status(200).json(student);
    } catch (error) {
        response.status(500).json(error);
    }
})

module.exports = router;