
const bodyParser= require('body-parser');
const livsmedel= require('../../json/livsmedelsdata.json');
let Recipe= require('./recipe.class');
let Ingredient= require('./ingredient.class');
const multer  = require('multer');
const pm = require("promisemaker");
const fs = pm(
    require('fs'), 
    { rejectOnErrors: false }
);

module.exports= class Routes{

    constructor(app){
        this.app=app;
        this.list= livsmedel.map( lm => lm.Namn.toLowerCase());
        this.setRoutes();
    }

    setRoutes(){

        let urlencodedParser=bodyParser.urlencoded({extended:false});
        let jsonParser=bodyParser.json();
        let storage = multer.diskStorage({  
            destination: function (req, file, cb) { 
                cb(null, './www/img/')
            },
            filename: function(req, file, callback) {
                callback(null, Date.now() + file.originalname);
            }
        });
        let upload = multer({storage: storage});
        let picture;

        this.app.post('/admin.html', upload.single('picture'), async (req, res) => {
           
            if(!req.file){
                picture='';
            }
            else{
                picture=req.file.filename;
            }
            let ingredients=[];
            for( let ing of JSON.parse(req.body.ingredients)){
                let ingredient= new Ingredient(ing.name, ing.quantity, ing.unit, livsmedel);
                ingredients.push(ingredient);
            }
            let recipe= new Recipe(req.body, ingredients, picture, livsmedel);  
            let answer= await recipe.writeToFile();
            res.json(answer);
        });

        this.app.get('/recept.html/:search&:select', async (req, res) => {
           
            let search= req.params.search.toLowerCase();
            let select= req.params.select.toLowerCase();
            
            if(search==='all' && select==='all'){
                let allRecipes=await Recipe.createFileList();
                res.json(allRecipes);
            }
            else if(search==='all'){
                let recipesByCategory=await Recipe.findByCategory(select);
                res.json(recipesByCategory);
            }
            else {
                let foundRecipe= await Recipe.readFromFile(search);
                res.json(foundRecipe);
            }
             
            
                
        });

        this.app.get('/admin.html/autocomplete/:startOfName', (req, res) => {
            
              let start = req.params.startOfName.toLowerCase();              
              let result = this.list.filter(
                item => item.indexOf(start) == 0
              );
              res.json(result);
            }
          );
        
    }
}