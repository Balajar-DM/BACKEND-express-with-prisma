//import express
const express = require("express");

//import prisma client
const prisma = require("../prisma/client");

//import validationResult
const { validationResult } = require("express-validator");

const bcrypt = require("bcryptjs");

//function findUsers
const findUsers = async (req, res) => {

    try {

        //get all users from database
        const users = await prisma.user.findMany({
            select: {
                id: true,
                name: true,
                email: true,
            },
            orderBy: {
                id: "desc",
            }
        });

        res.status(200).send({
            success: true,
            message: "Get all users berhasil",
            data: users,
        });
        
    } catch (error) {
        res.status(500).send({
            success: false,
            message: "Internal server error",
        });
    }
};

//function CreateUser
const createUser = async (req, res) => {
    
    // Periksa hasil validasi
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        // Jika ada error, kembalikan error ke pengguna
        return res.status(422).json({
            success: false,
            message: "Validation error",
            errors: errors.array(),
        });
    }

    //hash password
    const hashedPassword = await bcrypt.hash(req.body.password, 10);   

    try {
        //insert data
        const user = await prisma.user.create({
            data: {
                name: req.body.name,
                email: req.body.email,
                password: hashedPassword,
            },
        });
        
        //return response json
        res.status(201).send({
            success: true,
            message: "User berhasil dibuat",
            data: user,
        });
        
    } catch (error) {
        res.status(500).send({
            success: false,
            message: "Internal server error",
        });
    }
}

const findUserById = async (req, res) => {
    
    //get ID from params
    const { id } = req.params;

    try {

        //get user by ID
        const user = await prisma.user.findUnique({
            where: {
                id: Number(id),
            },
            select: {
                id: true,
                name: true,
                email: true,
            }
        });

        //send response
        res.status(201).send({
            success: true,
            message: `Get user by ID: ${id}`,
            data: user,
        });
        
    } catch (error) {
        res.status(500).send({
            success: false,
            message: "Internal server error",
        });
    }
}

module.exports = { findUsers, createUser, findUserById };