//import express validator
const { body } = require("express-validator");

//import prisma
const prisma = require('../../prisma/client');

// Definisikan validasi create user
const validateUser = [
    body('name').notEmpty().withMessage('Name required'),
    body('email')
        .notEmpty().withMessage('Email is required')
        .isEmail().withMessage('Email is invalid')
        .custom(async (value) => {
            if (!value) {
                throw new Error('Email is required');
            }
            const user = await prisma.user.findUnique({ where: { email: value} });
            if (user) {
                throw new Error('Email already exists');
            }
            return true;
        }),
    body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters long'),
];

module.exports = { validateUser }