import { Router } from "express";

const router = Router();

router.get("/", (req, res) => {
  /* Create a new appointment request by linking a patient with a doctor and a selected date. */
});

router.get("/patient/:id", (req, res) => {
  const patientId = req.params.id;
  /* Retrieves all appointments booked by a specific patient. */
});
router.get("/doctor/:id", (req, res) => {
  const doctorId = req.params.id;
  /* Retrieves all appointments assigned to a specific doctor. */
});
router.put("/:id/status", (req, res) => {
  const appointmentId = req.params.id;
  /* Updates the status of an appointment (such as Pending, Approved, or Completed). */
});

export default router;
