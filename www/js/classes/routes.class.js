
const bodyParser= require('body-parser');
const livsmedel= require('../../json/livsmedelsdata.json');
let Recipe= require('./recipe.class');
let Ingredient= require('./ingredient.class');

module.exports= class Routes{

    constructor(app){
        this.app=app;
        this.list= livsmedel.map( lm => lm.Namn.toLowerCase());
        this.setRoutes();
    }

    setRoutes(){

        let urlencodedParser=bodyParser.urlencoded({extended:false});
        let jsonParser=bodyParser.json();
               
        this.app.post('/admin.html',jsonParser, async (req, res) => {
            
            let ingredients=[];
            for( let ing of req.body.ingredients){
                let ingredient= new Ingredient(ing.name, ing.quantity, ing.unit, livsmedel);
                ingredients.push(ingredient);
            }
            let recipe= new Recipe(req.body, ingredients, livsmedel);  
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