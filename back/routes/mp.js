const express = require("express");
const router = express.Router();
const bodyParser = require("body-parser");
const app = express();

router.use(bodyParser.urlencoded({ extended: false }));
router.use(bodyParser.json());
router.use(express.json());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// SDK de Mercado Pago
const mercadopago = require("mercadopago");
// Agrega credenciales
mercadopago.configure({
  access_token:
    "TEST-372249204163393-022619-689f38881370789e12b0b341b3bcf36b-323854585",
});

/* RUTA MERCADOPAGO */

router.post("/", (req, res) => {
  let preference = {
    items: [
      {
        title: req.body.title,
        unit_price: Number(req.body.unit_price),
        quantity: 10,
      },
    ],
  };
  mercadopago.preferences
    .create(preference)
    .then(function (response) {
      res.redirect(response.body.init_point);
    })
    .catch(function (error) {
      console.log(error);
    }); 
});
module.exports = router;
