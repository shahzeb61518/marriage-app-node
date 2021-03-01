const stripe = require("stripe")(
  "sk_test_51HM7HFEUwirnzbs9cgkyOhqAzJNz80OkNFP2kCcnVke91OUjNW3JH6xDTPyY8eqDIL190Lv9vKUPW9JSnHJn3KCc00TOQOFZJ3"
);
const { v4: uuid } = require("uuid");

exports.payment = (req, res) => {
  console.log("hit here>>>");
  let { products, token } = req.body;
  const idempontencyKey = uuid();
  return stripe.customers
    .create({
      email: token.email,
      source: token.id,
    })
    .then((customer) => {
      stripe.charges.create(
        {
          amount: products.price * 100,
          currency: "usd",
          customer: customer.id,
          receipt_email: token.email,
          description: products.name,
          shipping: {
            name: token.card.name,
            address: {
              country: token.card.address_country,
            },
          },
        },
        { idempontencyKey }
      );
    })
    .then((result) => {
      res.status(200).json(result);
    })
    .catch((error) => {
      console.log("This is error in stripe :: ", error);
    });
};
