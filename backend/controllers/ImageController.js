import fs from "fs";

const imageController = {};

imageController.post_image = async (req, res) => {
  const oldPath = req.file.path;
  const newPath = "/uploads/images/" + req.file.filename;

  fs.rename(oldPath, newPath, (err) => {
    if (err) throw err;
    return res
      .status(200)
      .json({ path: newPath, msg: "File moved succesfully!" });
  });
};

export default imageController;
