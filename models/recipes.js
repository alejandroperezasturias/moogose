const mongoose = require('mongoose');
const recipeSchema = new mongoose.Schema(
	{
		userID: { type: String },
		id: { type: Number },
		vegan: { type: Boolean },
		vegetarian: { type: Boolean },
		veryHealthy: { type: Boolean },
		veryPopular: { type: Boolean },
		image: { type: String },
		score: { type: Number },
		name: { type: String },
		time: { type: Number },
		servings: { type: Number },
		instructions: { type: Array },
		ingredients: { type: Array },
	},
	{ timestamps: true }
);

module.exports = mongoose.model('Recipes', recipeSchema);
