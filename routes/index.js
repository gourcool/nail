var express = require('express');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var router = express.Router();
mongoose.connect("mongodb://localhost/nailDB",{
    useNewUrlParser:true,
    useUnifiedTopology:true
});

var app = express();
app.use(bodyParser.json());

var SchemaMine = mongoose.Schema({
    size:String,
    day:{
       two_f:String,
       five_f:String,
       one_kg:String
    }

}); 

 var nailModel = mongoose.model('nailModel', SchemaMine);
  
router.get('/post/:size', function(req, res){
    var size2 = req.params.size;
    nailModel.find({size:size2}, function(err, data){
        if(err){
            console.log(err);
            res.status(500).send();
        }
        else{
            res.json(data);
            console.log(data);
        }
    })
});

/* router.put('/update/:id', function(req, res){
    var id = req.params.id;
    nailModel.findOne({_id:id}, function(err, data){
        if(err){
            console.log(err);
            res.status(500).send();
        }
        else{
            if(!data){
                res.status(404).send();
            }
            else{
                nailModel.size = "200";
                data.save();
            }
        }
    })
}) */

router.put('/update/:id', function(req, res){
    var ids = req.params.id;
    //var newModel1 = new nailModel();
     nailModel.findById(req.params.id,(err, book)=>{
         book.size = "1023"
         book.save()
         res.json(book)
     } )
})


//delete
router.delete('/delete/:id', function(req, res){
    var ids = req.params.id;
    //var newModel1 = new nailModel();
     nailModel.findById(req.params.id,(err, book)=>{
          book.remove(err=>{
              if(err){
                  res.status(500).send(err);
              }
              else{
                  res.status(204).send('removed');
              }
          })
     } )
})


router.get('/data/:any/:thing', function(req, res){
    var choice = req.params.any;
    var chop = req.params.thing;
    var chee = {message: 'I love ' + choice + '  very much' + chop};
    res.send(chee);
});

router.post('/posting/:size/:price1/:price2/:price3', function(req, res){
     var size1 = req.params.size;
     var prices1 = req.params.price1;
     var prices2 = req.params.price2;
     var prices3 = req.params.price3;
     var newModel = new nailModel();
     newModel.size = size1;
     newModel.day.two_f = prices1;
     newModel.day.five_f = prices2;
     newModel.day.one_kg = prices3;
     newModel.save(function(err, savedObject){
         if(err){
             console.log(err);
             res.status(500).send();
         }
         else{
             res.send(savedObject);
         }
     })
})

module.exports = router;