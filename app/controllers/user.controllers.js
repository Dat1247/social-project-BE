const { userType, User } = require("../../models");
const { Op } = require("sequelize");
const bcryptjs = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { SECRET_KEY } = require("../../config/setting");
const gravatar = import("gravatar-url");

const getUserType = async (req, res) => {
	try {
		const listUserType = await userType.findAll();
		res.status(200).send({
			message: "Get user type successfully!",
			data: listUserType,
		});
	} catch (err) {
		res.status(500).send(err);
	}
};

const register = async (req, res) => {
	const { name, email, password, phoneNumber, userType } = req.body;
	try {
		const salt = bcryptjs.genSaltSync(15);
		const hashPassword = bcryptjs.hashSync(password, salt);
		let avatarUrl = "";
		await gravatar
			.then((gravatarUrl) => {
				avatarUrl = gravatarUrl.default(email);
			})
			.catch((error) => {
				console.log(error);
			});

		if (userType) {
			const newUser = await User.create({
				name,
				email,
				password: hashPassword,
				phoneNumber,
				avatar: avatarUrl,
				userType,
			});
			res.status(201).send({
				message: "User created successfully!",
				data: newUser,
			});
		} else {
			const newUser = await User.create({
				name,
				email,
				password: hashPassword,
				phoneNumber,
				avatar: avatarUrl,
			});
			res.status(201).send({
				message: "User created successfully!",
				data: newUser,
			});
		}
	} catch (err) {
		res.status(500).send(err);
	}
};

const login = async (req, res) => {
	const { email, password } = req.body;
	const user = await User.findOne({
		where: {
			email,
		},
	});
	if (user) {
		const isAuth = bcryptjs.compareSync(password, user.password);

		if (isAuth) {
			const token = jwt.sign(
				{
					id: user.id,
					name: user.name,
					avatar: user.avatar,
					phoneNumber: user.phoneNumber,
					email: user.email,
					userType: user.userType,
				},
				SECRET_KEY,
				{}
			);

			const userLogin = {
				id: user.id,
				name: user.name,
				avatar: user.avatar,
				phoneNumber: user.phoneNumber,
				email: user.email,
				userType: user.userType,
				accessToken: token,
			};
			res.status(200).send({
				message: "Log in successfully!",
				userLogin: userLogin,
			});
		} else {
			res.status(502).send("Email or password incorrect!");
		}
	} else {
		res.status(404).send("Email or password incorrect!");
	}
};

const getAllUser = async (req, res) => {
	try {
		const listUser = await User.findAll();
		res.status(200).send({
			message: "Get all user successfully!",
			data: listUser,
		});
	} catch (err) {
		res.status(500).send(err);
	}
};

const getUserById = async (req, res) => {
	try {
		res.status(200).send(req.item);
	} catch (err) {
		res.status(500).send(err);
	}
};

const findUser = async (req, res) => {
	const { name } = req.query;
	try {
		if (name || name === "") {
			const listUserFind = await User.findAll({
				where: {
					name: {
						[Op.like]: `%${name}%`,
					},
				},
			});
			res.status(200).send({
				message: "Search successfully!",
				data: listUserFind,
			});
		} else {
			res.status(200).send("No data found!");
		}
	} catch (err) {
		res.status(500).send(err);
	}
};

const updateUser = async (req, res, next) => {
	const { name, email, phoneNumber, userType } = req.body;
	const { id } = req.params;

	try {
		const user = await User.findOne({
			where: {
				id,
			},
		});

		if (userType !== user.userType) {
			req.userUpdate = user;
			next();
		} else {
			user.name = name;
			user.email = email;
			user.phoneNumber = phoneNumber;
			await user.save();

			res.status(200).send({
				message: "Update user successfully!",
				data: user,
			});
		}
	} catch (err) {
		res.status(500).send(err);
	}
};

const updateUserAndType = async (req, res) => {
	const { userUpdate } = req;
	const { name, email, phoneNumber, userType } = req.body;

	try {
		userUpdate.name = name;
		userUpdate.userType = userType;
		userUpdate.email = email;
		userUpdate.phoneNumber = phoneNumber;
		await userUpdate.save();

		res.status(200).send({
			message: "Update user successfully!",
			data: userUpdate,
		});
	} catch (err) {
		res.status(500).send(err);
	}
};

const deleteUser = async (req, res) => {
	const { id } = req.params;
	try {
		await User.destroy({
			where: {
				id,
			},
		});
		res.status(200).send(`Delete user with id ${id} successfully!`);
	} catch (err) {
		res.status(500).send(err);
	}
};

module.exports = {
	getUserType,
	register,
	getAllUser,
	getUserById,
	login,
	findUser,
	updateUser,
	updateUserAndType,
	deleteUser,
};
