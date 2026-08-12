const express = require('express');
const Student = require('../models/student');
const router = express.Router();


router.get('/', async (req, res) => {
  try {
    const students = await Student.find().sort({ id: 1 });

    res.status(200).json(students);
  } catch (error) {
    console.error('GET students error:', error);

    res.status(500).json({
      message: 'Failed to fetch students',

      error: error.message,
    });
  }
});

router.post('/', async (req, res) => {
  try {


    const lastStudent = await Student.findOne().sort({ id: -1 });
    const nextId = lastStudent ? lastStudent.id + 1 : 1
    const student = new Student({
      ...req.body,

      id: nextId,
    });

    const savedStudent = await student.save();
    res.status(201).json(savedStudent);
  } catch (error) {
    console.error('POST student error:', error);

    res.status(500).json({
      message: 'Failed to add student',

      error: error.message,
    });
  }
});

router.put('/:id', async (req, res) => {
  try {
    const student = await Student.findOneAndUpdate(
      {
        id: Number(req.params.id),
      },

      req.body,

      {
        new: true,

        runValidators: true,
      },
    );

    if (!student) {
      return res.status(404).json({
        message: 'Student not found',
      });
    }

    res.status(200).json(student);
  } catch (error) {
    console.error('PUT student error:', error);

    res.status(500).json({
      message: 'Failed to update student',
      error: error.message,
    });
  }
});


router.delete('/:id', async (req, res) => {
  try {
    const student = await Student.findOneAndDelete({
      id: Number(req.params.id),
    });

    if (!student) {
      return res.status(404).json({
        message: 'Student not found',
      });
    }
    res.status(200).json({
      message: 'Student deleted successfully',
    });
  } catch (error) {
    console.error('DELETE student error:', error);

    res.status(500).json({
      message: 'Failed to delete student',
      error: error.message,
    });
  }
});
module.exports = router;
