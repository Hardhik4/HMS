import express from "express";
import rateLimit from "express-rate-limit";
import cors from "cors";
import dotenv from "dotenv";
import Joi from "joi";

const app = express();
const PORT = process.env.PORT || 3000;
const JWT_USER_SECRET = process.env.JWT_USER_SECRET || "example";
const JWT_ADMIN_SECRET = process.env.JWT_ADMIN_SECRET || "axample";
app.set("trust proxy", 1);

app.use(
  cors({
    origin: "*",
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  }),
);

const LoginSchema = Joi.object({
  username: Joi.string().alphanum().min(3).max(30).required(),
  password: Joi.string().min(6).max(128).required(),
});


import pingRoutes from './routes/ping';
app.use("/ping",pingRoutes);

//Auth routes

import patientAuthRoutes from './routes/auth/patient';
app.use("/api/patients",patientAuthRoutes);
import doctorAuthRoutes from './routes/auth/doctor';
app.use("/api/doctors",doctorAuthRoutes);

//Appointment routes

import appointmentRoutes from './routes/appointments';
app.use("/api/appointments",appointmentRoutes)

//Prescription routes

import prescriptionRoutes from './routes/prescription';
app.use("/api/prescriptions",prescriptionRoutes);

//Dashboard routes
import dashboardRoutes from './routes/dashboard';
app.use("/api/dashboard",dashboardRoutes);