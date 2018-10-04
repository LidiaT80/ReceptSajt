
const bodyParser= require('body-parser');
const livsmedel= require('../../json/livsmedelsdata.json');
let categories= require('../../json/kategorier');
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
        let jsonParser=bodyParser.json();

        this.app.post('/admin.html', upload.single('picture'), async (req, res) => {
            
            if(!(categories.mainCategories.includes(req.body.category))){
                categories.mainCategories.push(req.body.category);
                fs.writeFile('./www/json/kategorier.json', JSON.stringify( categories));
            }
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
            let answer=[];
    
            if(search==='all' && select==='all'){
                answer=await Recipe.createFileList();
            }
            else if(search==='all'){
                answer=await Recipe.findByCategory(select);
            }
            else {
                answer= await Recipe.findWord(search, select);
            }
            if (answer.length>1){
                res.json(answer);
            }
            else if(answer.length===1){
                res.json( answer[0]);
            }
            else{ 
                res.json('Not found');
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

        this.app.post('/kontakt.html', jsonParser, (req, res) => {
            console.log(req.body);
        });
    }
}