const fs = require("fs");

const deleteOptionUpload = async (req, res) => {
  const { imgpath } = req.headers;
  console.log(imgpath);
  fs.unlink(imgpath, (err) => {
    if (err) {
      throw new Error(err);
    }
    return;
  });
  res.end();
};

module.exports = deleteOptionUpload;
