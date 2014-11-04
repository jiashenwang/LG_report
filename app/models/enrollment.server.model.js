'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	Schema = mongoose.Schema;

/**
 * Enrollment Schema
 */
var EnrollmentSchema = new Schema({
	name: {
		type: String,
		default: '',
		required: 'Please fill Enrollment name',
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

mongoose.model('Enrollment', EnrollmentSchema);