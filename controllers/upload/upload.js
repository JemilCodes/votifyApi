const formidable = require("formidable");
const fs = require("fs");

const uploadModel = require("../../models/uploadModel");

const upload = (req, res) => {
  const form = formidable({ multiples: false });

  form.parse(req, (err, fields, files) => {
    if (err) {
      throw new Error(err);
    }
    let theFilePath = files.files.filepath;

    let fileData = fs.readFileSync(theFilePath);
    const asyncer = async () => {
      const alreadyExist = await uploadModel.findOne({
        createdBy: req.headers.optionid,
      });
      if (alreadyExist) {
        await uploadModel.findOneAndUpdate(
          { createdBy: req.headers.optionid },
          {
            createdBy: req.headers.optionid,
            img: fileData,
            imgType: files.files.mimetype,
          }
        );
        return;
      } else {
        await uploadModel.create({
          createdBy: req.headers.optionid,
          img: fileData,
          imgType: files.files.mimetype,
        });
        return;
      }
    };
    asyncer();
    fs.unlink(theFilePath, (err) => {
      if (err) {
        throw new Error(err);
      }
      return;
    });
    res.json(theFilePath);
  });
};

module.exports = upload;
