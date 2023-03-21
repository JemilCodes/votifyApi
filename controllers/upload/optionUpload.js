const formidable = require("formidable");

const optionUpload = (req, res) => {
  const form = formidable({ multiples: false });

  form.parse(req, (err, fields, files) => {
    if (err) {
      throw new Error(err);
    }
    let theFilePath = files.files.filepath;
    res.json({ path: theFilePath, type: files.files.mimetype });
  });
};

module.exports = optionUpload;
