const statusCodes = require('http-status-codes')
const rateLimit = require('express-rate-limit');


const loginLimiter = rateLimit({
	windows: 60 * 1000,
	max: 5,
	messages: {message:'too many login attempts from this Ip, please try again after a 60 second pause'},
	handler: (req,res,next,options) => {
		res.status(statusCodes.UNAUTHORIZED).json(options.message)
	},
	standardHeaders: true, // return rate limit info in the `RateLimit-*` headers
	legacyHeaders: false,  // Disable the `X-rateLimit-*`. haeders
})

module.exports =loginLimiter

// I am not yet using this middleWare