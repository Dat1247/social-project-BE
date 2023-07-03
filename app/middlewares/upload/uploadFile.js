const mkdirp = require("mkdirp");
const multer = require("multer");

const uploadFile = (type) => {
	const made = mkdirp.sync(`./public/${type}`);
	const storage = multer.diskStorage({
		destination: function (req, file, callback) {
			callback(null, `./public/${type}`); // set up cho can luu file
		},
		filename: function (req, file, cb) {
			cb(null, Date.now() + "_" + file.originalname); // dat lai ten cho file
		},
	});
	const upload = multer({
		storage: storage,
		fileFilter: function (req, file, cb) {
			const extensionImageList = [".mp4", ".ogg", ".png", ".jpg"];
			const extension = file.originalname.slice(-4);
			const check = extensionImageList.includes(extension);
			if (check) {
				cb(null, check);
			} else {
				cb(new Error("Extension invalid!"));
			}
		},
	});

	return upload.array(type, 3);
};
module.exports = {
	uploadFile,
};
