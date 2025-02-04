const express = require("express");
const app = express();
const mongoose = require("mongoose");
const Listing = require("../mine/models/listings");
const path = require("path");
const { render } = require("ejs");
const listing = require("../mine/models/listings");
const methodOverride = require("method-override");
const ejsMate = require("ejs-mate");

const MONGO_URL = "mongodb://127.0.0.1:27017/wanderlust" ;

async function main(){
    await mongoose.connect(MONGO_URL);
}

main().then(() =>{
    console.log("connected to DB");
}).catch(err =>{
    console.log("error catched");
})

app.use(express.urlencoded({extended:true}));

app.set("views",path.join(__dirname , "views"));
app.set("view engine" , "ejs");

app.use(methodOverride("_method"));
app.engine("ejs" , ejsMate);
app.use(express.static(path.join(__dirname , "/public")));

app.get("/" , (req,res) => {
    res.send("Hi! I am root.");
});

//index route

app.get("/listings", async(req,res) => {
   const allListings =  await Listing.find({});
    res.render("listings/index" , {allListings});
});


// New Route
app.get("/listings/new" , (req,res) =>{
    res.render("listings/new");
})


//show route
app.get("/listings/:id" , async(req,res)=>{
    let{id} = req.params;
    const listing = await Listing.findById(id);
    res.render("listings/show" , {listing});
})

//create route
// app.post("/listings",async(req,res)=>{
//     // let{tiltle,description,image,price,country,location} = req.body;
//     // let listing  = req.body;
//     // console.log(listing);

//     const newListing = new Listing(req.body.listing);
//     await newListing.save();
//     res.redirect("/listings");
// });

app.post("/listings", async (req, res) => {
  try {
    const newListing = new Listing(req.body.listing);
    await newListing.save();
    res.redirect("/listings");
  } catch (error) {
    // Render the error page with the validation error message
    res.status(400).render("listings/error", {
      errorMessage:
        "Please fill in all required fields: Title and Price are mandatory!",
    });
  }

});

//Edit route
app.get("/listings/:id/edit" ,async(req,res)=>{
    let{id} = req.params;
    const listing = await Listing.findById(id);
    res.render("listings/edit.ejs" , {listing})
})

// Update Route
app.put("/listings/:id" , async(req,res)=>{
    let{id} = req.params;
    await Listing.findByIdAndUpdate(id,{...req.body.listing});
    res.redirect(`/listings/${id}`);
});

//Delete route
app.delete("/listings/:id" , async(req,res) =>{
    let {id} = req.params;
    let deletedListing = await Listing.findByIdAndDelete(id);
    console.log(deletedListing);
    res.redirect("/listings");
})

// app.get("/testListing" ,async (req , res) =>{
//    let sampleListing = new listing({
//     title:"My  New Villa",
//     description:"By the beach",
//     price:1200,
//     location:"Calangute , Goa",
//     country:"India"
//    });

//    await sampleListing.save();
//    console.log("sample was saved");
//     res.send("successful testing");
// });



app.listen(8080,()=>{
    console.log("server is listening to port 8080");
}); 