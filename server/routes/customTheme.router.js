import { Router } from "express";
import customThemeController from "../controller/customTheme.controller.js";

const customThemeRouter = Router();

customThemeRouter.get("/", customThemeController.getAll);
customThemeRouter.post("/", customThemeController.createCustomTheme);
customThemeRouter.get("/:id", customThemeController.getCustomTheme);
customThemeRouter.delete("/:id", customThemeController.deletePreset);
customThemeRouter.put('/SetOwner/:id', customThemeController.setNewOwner)
export default customThemeRouter;
