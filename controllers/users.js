var Joi = require('joi'),
    Boom = require('boom'),
    Common = require('./common'),
    Config = require('../config/settings'),
    Jwt = require('jsonwebtoken'),
    User = require('../models').User;

var privateKey = Config.key.privateKey;

exports.create = {
    validate: {
        payload: {
						firstname : Joi.string(),
						lastname : Joi.string(),
            username: Joi.string().email().required(),
            password: Joi.string().required()
        }
    },
    handler: function(request, reply) {
        request.payload.password = Common.encrypt(request.payload.password);
        User.create(request.payload)
				.then(function(user) {
                var tokenData = {
                    username: user.username,
                    id: user.id
                };
								var token = Jwt.sign(tokenData, privateKey);
                Common.sentMailVerificationLink(user,token);
                reply({ token : token}).code(201);
        }, function(err){
					console.log("Some error", err)
				});
    }
};

exports.login = {
    validate: {
        payload: {
            username: Joi.string().email().required(),
            password: Joi.string().required()
        }
    },
    handler: function(request, reply) {

        User.findOne({where : {username : request.payload.username}})
				.then(function(user) {
                if (request.payload.password === Common.decrypt(user.password)) {
										console.log(user)
                    if(!user.verified) return reply({ message : "Your email address is not verified. please verify your email address to proceed"}).code(200);

                    var tokenData = {
                        userName: user.userName,
                        scope: [user.scope],
                        id: user._id
                    };
                    var res = {
                        username: user.userName,
                        scope: user.scope,
                        token: Jwt.sign(tokenData, privateKey)
                    };

                    reply(res);
                } else reply(Boom.forbidden("invalid username or password"));
        })
				.catch(function(){
					return reply(Boom.forbidden("invalid username or password"));
				})
    }
};

exports.resendVerificationEmail = {
    validate: {
        payload: {
            userName: Joi.string().email().required(),
            password: Joi.string().required()
        }
    },
    handler: function(request, reply) {
        User.findUser(request.payload.userName, function(err, user) {
            if (!err) {
                if (user === null) return reply(Boom.forbidden("invalid username or password"));
                if (request.payload.password === Common.decrypt(user.password)) {

                    if(user.isVerified) return reply("your email address is already verified");

                     var tokenData = {
                        userName: user.userName,
                        scope: [user.scope],
                        id: user._id
                    };
                    Common.sentMailVerificationLink(user,Jwt.sign(tokenData, privateKey));
                    reply("account verification link is sucessfully send to an email id");
                } else reply(Boom.forbidden("invalid username or password"));
            } else {
                console.error(err);
                return reply(Boom.badImplementation(err));
            }
        });
    }
};

exports.forgotPassword = {
    validate: {
        payload: {
            userName: Joi.string().email().required()
        }
    },
    handler: function(request, reply) {
        User.findUser(request.payload.userName, function(err, user) {
            if (!err) {
                if (user === null) return reply(Boom.forbidden("invalid username"));
                Common.sentMailForgotPassword(user);
                reply("password is send to registered email id");
            } else {
                console.error(err);
                return reply(Boom.badImplementation(err));
             }
        });
    }
};

exports.verifyEmail = {
    handler: function(request, reply) {
        Jwt.verify(request.payload.token, privateKey, function(err, decoded) {
            if(decoded === undefined) return reply(Boom.forbidden("invalid verification link"));
						console.log("decoded",decoded)
						User.findAll({
							where : {
								id :decoded.id,
								username : decoded.username
							}
						})
						.then(function(users){
							if(users.length){
								users.forEach(function(u){
									u.update({verified : true})
								})
								return reply({message :  "account sucessfully verified"}).code(200);
							}else{
								return reply(Boom.forbidden("invalid verification link"));
							}
						})

        });
    }
};

exports.salute = {
	handler: function(request, reply) {
		reply('Hello, ' + encodeURIComponent(request.params.name) + '!');
	}
}
