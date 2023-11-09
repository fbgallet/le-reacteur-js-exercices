const express = require("express");
const fileUpload = require("express-fileupload");
// const cloudinary = require("cloudinary").v2;
// const convertToBase64 = require("../utils/convert");
const uploadToCloudinaryAngGetUrl = require("../utils/cloudinary");
const isAuthenticated = require("../middlewares/isAuthentificated");
const isOfferOk = require("../middlewares/isOfferOk");

// cloudinary.config({
//   cloud_name: "dzfqscodm",
//   api_key: "914797663638773",
//   api_secret: "5CQRFjjg5aS0DIr2kdXJ3PKGuFc",
// });
const router = express.Router();

const Offer = require("../models/Offer");
// const User = require("../models/User");

router.post(
  "/offer/publish",
  isAuthenticated,
  fileUpload(),
  isOfferOk,
  async (req, res) => {
    try {
      const newOffer = req.body.offer;
      // const result = await cloudinary.uploader.upload(
      //   convertToBase64(req.files.picture),
      //   uploadOptions
      // );
      newOffer.product_image.secure_url = await uploadToCloudinaryAngGetUrl(
        req.files.picture,
        {
          folder: `vinted/offers/${newOffer.owner}`,
        }
      );
      newOffer.save();
      const populatedNewOffer = await newOffer.populate("owner");
      newOffer.owner = {
        account: {
          username: populatedNewOffer.owner.account.username,
          avatar: populatedNewOffer.owner.account.avatar,
        },
      };
      res.status(201).json(newOffer);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }
);

router.put("/offer/update", isAuthenticated, fileUpload(), async (req, res) => {
  try {
    const offer = await Offer.findById(req.query.id).populate("owner");
    if (!offer) {
      return res
        .status(400)
        .json({ message: "No offer corresponding to this id" });
    }
    for (key in req.body) {
      if (key.slice(0, 8) === "product_") {
        offer[key] = req.body[key];
      } else {
        offer.product_details = offer.product_details.map((detail) => {
          if (detail[key]) detail[key] = req.body[key];
          return detail;
        });
      }
    }
    offer.product_image = req.files.picture && {
      secure_url: await uploadToCloudinaryAngGetUrl(req.files.picture, {
        folder: `vinted/offers/${offer.owner._id}`,
      }),
    };
    // console.log(offer);
    offer.save();
    res.status(201).json({
      message: `Offer updated !`,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.delete("/offer/delete/:id", isAuthenticated, async (req, res) => {
  try {
    const offer = await Offer.findByIdAndDelete(req.params.id);
    if (!offer) {
      return res
        .status(400)
        .json({ message: "No offer corresponding to this id" });
    }
    //
    // image is not deleted from Cloudinary
    //
    res.status(201).json({
      message: `Offer deleted !`,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
