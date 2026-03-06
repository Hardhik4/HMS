import { Router } from "express";

const router = Router();

router.post("/", (req, res) => {
  /* Allows doctors to add diagnosis and prescribed medications for a completed appointment. */
});

router.get("/api/prescriptions/:id", (req, res) => {
  /* Retrieves the prescription associated with a specific appointment. */
});

export default router;
