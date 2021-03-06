'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	Schema = mongoose.Schema;

/**
 * Domain Schema
 */
var DomainSchema = new Schema({
	name: {
		type: String,
		default: '',
		required: 'Please fill Domain name',
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

mongoose.model('Domain', DomainSchema);