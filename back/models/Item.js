const mongoose = require("mongoose");

const itemSchema = new mongoose.Schema({
    
        image: {
          img1: {
            type: String,
            required: true
          },
          img2: {
            type: String,
            required: false
          },
          img3: {
            type: String,
            required: false
          },
          img4: {
            type: String,
            required: false
          },
          img5: {
            type: String,
            required: false
          },
          img6: {
            type: String,
            required: false
          },
          img7: {
            type: String,
            required: false
          },
          img8: {
            type: String,
            required: false
          },
          img9: {
            type: String,
            required: false
          },
          img10: {
            type: String,
            required: false
          },
          img11: {
            type: String,
            required: false
          },
          img12: {
            type: String,
            required: false
          },
          img13: {
            type: String,
            required: false
          },
          img14: {
            type: String,
            required: false
          },
          img15: {
            type: String,
            required: false
          },
          img16: {
            type: String,
            required: false
          },
          img17: {
            type: String,
            required: false
          },
          img18: {
            type: String,
            required: false
          },
          img19: {
            type: String,
            required: false
          },
          img20: {
            type: String,
            required: false
          }
        },
        title: {
          type: String,
          required: true
        },
        marca: {
          type: String,
          required: false
        },
        details: String,
        precio: {
          type: String,
          required: true
        },
        instock: {
          type: String,
          required: true
        },
      
});

module.exports = mongoose.model("Item", itemSchema);
