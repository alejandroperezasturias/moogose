const router = require('express').Router();
// const verify = require('./verifyToken')
const Recipes = require('../models/recipes');

router.post('/', async (req, res) => {
	const rescipeAlreadyExists = await Recipes.findOne({ id: req.body.id });
	if (rescipeAlreadyExists)
		return res.status(400).send('Recipe Already Exists');

	const recipe = new Recipes({
		id: req.body.id,
		vegan: req.body.vegan,
		vegetarian: req.body.vegetarian,
		veryHealthy: req.body.veryHealthy,
		veryPopular: req.body.veryPopular,
		image: req.body.image,
		score: req.body.score,
		name: req.body.name,
		time: req.body.time,
		servings: req.body.servings,
		instructions: req.body.instructions,
		ingredients: req.body.ingredients,
	});

	try {
		const savedRecipe = await recipe.save();
		res.json({ Recipe: savedRecipe.id });
	} catch (ERR) {
		res.send(ERR);
	}
});

router.get('/', async (req, res) => {
	const recipes = await Recipes.find();
	try {
		res.send(recipes);
	} catch (ERR) {
		res.send(ERR);
	}
});

router.delete('/', async (req, res) => {
	try {
		await Recipes.remove({ id: req.body.id });
		res.json(`${req.body.id} Deleted`);
	} catch (ERR) {
		res.send(ERR);
	}
});

router.put('/', async (req, res) => {
	const rescipeExists = await Recipes.findOne({ id: req.body.id });
	if (!rescipeExists) return res.status(400).send('Recipe Does not Exit');

	const recipe = {
		id: req.body.id,
		vegan: req.body.vegan,
		vegetarian: req.body.vegetarian,
		veryHealthy: req.body.veryHealthy,
		veryPopular: req.body.veryPopular,
		image: req.body.image,
		score: req.body.score,
		name: req.body.name,
		time: req.body.time,
		servings: req.body.servings,
		instructions: req.body.instructions,
		ingredients: req.body.ingredients,
	};

	try {
		await Recipes.findOneAndUpdate({ id: req.body.id }, recipe).then(
			function () {
				Recipes.findOne({ id: req.body.id }).then(function (recipe) {
					res.send(recipe);
				});
			}
		);
	} catch (ERR) {
		res.send(ERR);
	}
});

module.exports = router;
