const express = require('express');
const { default: mongoose } = require('mongoose');
const route = require('./routes/route')
const app = express();

app.use(express.json())
app.use(express.urlencoded({extended:true}))


mongoose.connect("mongodb+srv://AlphicsTech:alphicstech12345@cluster0.ageomo4.mongodb.net/?retryWrites=true&w=majority", {
      useNewUrlParser:true
})
.then(()=>console.log("Mongodb is connected"))
.catch(err=>console.log(err))

app.use('/', route)

 app.listen(process.env.PORT || 3000, function(){
       console.log('Express app running on port' + (process.env.PORT || 3000))
 });
