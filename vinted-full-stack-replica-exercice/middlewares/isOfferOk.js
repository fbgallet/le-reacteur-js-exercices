const Offer = require("../models/Offer");

const isOfferOk = (req, res, next) => {
  const {
    product_name,
    product_description,
    product_price,
    MARQUE,
    TAILLE,
    ETAT,
    COULEUR,
    EMPLACEMENT,
  } = req.body;

  if (!product_name && !product_description && !product_price) {
    return res.status(401).json("Offer is not complete");
  }
  const newOffer = new Offer({
    product_name: product_name.slice(0, 50),
    product_description: product_description.slice(0, 500),
    product_price: product_price > 100000 ? 100000 : product_price,
    product_details: [
      { MARQUE },
      { TAILLE },
      { ETAT },
      { COULEUR },
      { EMPLACEMENT },
    ],
    owner: req.user._id,
  });
  req.body.offer = newOffer;
  next();
};

module.exports = isOfferOk;
