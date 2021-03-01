const Model = require("../models/chat-model");

exports.createChat = (messageObj) => {
  console.log("messageObj", messageObj);

  return new Promise((resolve, reject) => {
    let {
      message,
      senderId,
      senderName,
      // senderImage,
      toId,
      toName,
      // toImage,
      read,
      created_at,
    } = messageObj;
    const model = new Model({
      message: message,
      senderId: senderId,
      senderName: senderName,
      // senderImage: senderImage,
      toId: toId,
      toName: toName,
      // toImage: toImage,
      read: read,
      created_at: created_at,
    });
    model
      .save()
      .then((msgCreated) => {
        console.log("Msg saved", msgCreated);
        resolve(msgCreated);
      })
      .catch((msgError) => {
        reject(msgError);
        console.log("chatMessage saving error", msgError);
      });
  });
};

exports.create = async (req, res, next) => {
  console.log("body", req.body);
  const model = new Model({
    fromId: req.body.fromId,
    fromName: req.body.fromName,
    toId: req.body.toId,
    toName: req.body.toName,
    toImage: req.body.toImage,
    message: req.body.message,
  });
  await model
    .save()
    .then((createdObject) => {
      console.log(createdObject);
      res.status(201).json({
        message: "Created successfully",
        model: createdObject,
      });
    })
    .catch((error) => {
      console.log(error);
      res.status(500).json({
        message: "Creation failed!",
      });
    });
};

exports.getPreChat = (req, res, next) => {
  console.log("hit here>");
  Model.find()
    .then((documents) => {
      documents = documents.filter(
        (obj) =>
          (obj.senderId === req.body.senderId ||
            obj.toId === req.body.senderId) &&
          (obj.senderId === req.body.toId || obj.toId === req.body.toId)
      );
      res.status(200).json({
        message: "Data fetched!!!",
        list: documents,
      });
    })
    .catch((error) => {
      res.status(500).json({
        message: "Getting data failed!",
      });
    });
};

// Get
exports.get = (req, res, next) => {
  Model.find()
    .then((documents) => {
      res.status(200).json({
        message: "Data fetched!!!",
        list: documents,
      });
    })
    .catch((error) => {
      res.status(500).json({
        message: "Getting data failed!",
      });
    });
};

exports.getUserChat = (req, res, next) => {
  Model.find({ toId: req.body.id })
    // .populate("senderId")
    .then((documents) => {
      console.log("get chat users>>.", documents);
      res.status(200).json({
        message: "Data fetched!!!",
        list: documents,
      });
    })
    .catch((error) => {
      res.status(500).json({
        message: "Getting data failed!",
      });
    });
};

exports.getById = (req, res, next) => {
  Model.find({ userId: req.body.userId })
    .then((documents) => {
      res.status(200).json({
        message: "Data fetched!!!",
        list: documents,
      });
    })
    .catch((error) => {
      res.status(500).json({
        message: "Getting data failed!",
      });
    });
};

// // Delete
exports.delete = (req, res, next) => {
  Model.deleteOne({ _id: req.body.id })
    .then((result) => {
      if (result.n > 0) {
        res.status(200).json({ message: "Deletion successful!" });
      } else {
        res.status(401).json({ message: "Not deleted!" });
      }
    })
    .catch((error) => {
      res.status(500).json({
        message: "Deletion failed!",
      });
    });
};

exports.update = (req, res, next) => {
  // console.log(req.body)
  const model = new Model({
    _id: req.body.id,
    fromId: req.body.fromId,
    fromName: req.body.fromName,
    ustoId: req.body.ustoId,
    toName: req.body.toName,
    toImage: req.body.toImage,
    message: req.body.message,
  });
  Model.updateOne({ _id: req.body.id }, model)
    .then((result) => {
      console.log(result);
      if (result.nModified > 0) {
        res.status(200).json({ message: "Update successful!" });
      } else {
        res.status(401).json({ message: "Not authorized!" });
      }
    })
    .catch((err) => {
      console.log(err);
      return res.status(401).json({
        message: "No updated!",
      });
    });
};
