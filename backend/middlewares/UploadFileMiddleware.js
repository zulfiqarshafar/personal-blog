import multer from "multer";

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "/tmp/uploads");
  },
  filename: (req, file, cb) => {
    cb(null, file.fieldname + "-" + file.originalname + "-" + Date.now());
  },
});

const upload = multer({ storage });

export default upload;
