const mongoose = require("mongoose");
const Schema = mongoose.Schema;

 const listingSchema = new Schema({
    title:{ type: String, required:true,},
    description : String,
    image :{
      filename:{
         type:String,
         default:"listingimage",
      },
      url:{
         type: String,
         default:"https://tse4.mm.bing.net/th?id=OIP.eGpwaVxhf3ZLac_Om3pJmQAAAA&pid=Api&P=0&h=180",
         set:(v) => v === "" ? "https://tse4.mm.bing.net/th?id=OIP.eGpwaVxhf3ZLac_Om3pJmQAAAA&pid=Api&P=0&h=180":v,

      }
         },
    price: {required:true, type:Number } ,
    location:String,
    country:String,
 });

 const listing = mongoose.model("listing" , listingSchema);
 module.exports = listing;