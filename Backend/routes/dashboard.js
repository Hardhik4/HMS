import { Router } from "express";
import { authenticateToken } from "../middleware/tokenAuthenticator.js";
import { allowRoles } from "../middleware/allowedRoles.js";

const router = Router();

router.get("/stats", authenticateToken, allowRoles("doctor"), (req, res) => {
  /*
    Retrieves aggregated data such as
    total appointments, pending appointments, approved appointments, and completed consultations.
  */
});

export default router;
