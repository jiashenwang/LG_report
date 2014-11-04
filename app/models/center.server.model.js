'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	Schema = mongoose.Schema;

/**
 * Center Schema
 */
var CenterSchema = new Schema({
	name: {
		type: String,
		default: '',
		required: 'Please fill Center name',
		trim: true
	},
	created: {
		type: Date,
		default: Date.now
	},
	user: {
		type: Schema.ObjectId,
		ref: 'User'
	}
});

mongoose.model('Center', CenterSchema);