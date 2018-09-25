
const bodyParser= require('body-parser');
const livsmedel= require('../../json/livsmedelsdata.json');
let recipeFile=require('../../json/recepten.json');
let Recipe= require('./recipe.class');
let Ingredient= require('./ingredient.class');
let NutritionValue= require('./nutritionValue.class');

module.exports= class Routes{

    constructor(app){
        this.app=app;
        this.list= livsmedel.map( lm => lm.Namn.toLowerCase());
        this.setRoutes();
    }

    setRoutes(){

        let urlencodedParser=bodyParser.urlencoded({extended:false});
        let jsonParser=bodyParser.json();
               
        this.app.post('/admin.html',jsonParser, (req, res) => {
            
            let ingredients=[];
            for( let ing of req.body.ingredients){
                let ingredient= new Ingredient(ing.name, ing.quantity, ing.unit, livsmedel);
                ingredients.push(ingredient);
            }
            let recipe= new Recipe(req.body, ingredients, livsmedel);  
            console.log(recipe);
                       
        });

        this.app.post('/recept.html', urlencodedParser, (req, res) => {
            let search= req.body.search;
            let foundRecipe= recipeFile.filter( rec => rec.titel==search);
            res.json(foundRecipe[0]);
                
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