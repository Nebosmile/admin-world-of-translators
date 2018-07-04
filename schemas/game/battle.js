const mongoose = require('mongoose');

const battleSchema = mongoose.Schema({
	players: {
		type: Array
	},
	creature: {
		type: Object
	},
	battleType: {
		type: String
	},
	location: {
		type: mongoose.Schema.ObjectId
	},
	createdAt: {
		type: Number
	},
	updatedAt: {
		type: Number
	}
})

battleSchema.pre('save', function(next) {
	let now = Number(new Date().getTime());
	if (!this.createdAt) {
		this.createdAt = now;
	}
	this.updatedAt = now;

	next();
});

battleSchema.pre('findOneAndUpdate', function(next) {
	let now = Number(new Date().getTime())
	if (!this.createdAt) {
		this.findOneAndUpdate({}, {
			$set: {
				createdAt: now
			}
		});
	}

	this.findOneAndUpdate({}, {
		$set: {
			updatedAt: now
		}
	});
	next();
});

module.exports = mongoose.model("battleSchema", battleSchema);
