const { Router } = require("express");
const {
  getRecipeHandler,
  getRecipesHandler,
  postRecipeHandler,
} = require("../handlers/UsersHandler");

const recipesRouter = Router();

recipesRouter.get("/", getRecipesHandler);
recipesRouter.get("/:id", getRecipeHandler);
recipesRouter.get("/?name", getRecipesHandler);
recipesRouter.post("/", postRecipeHandler);

module.exports = recipesRouter;