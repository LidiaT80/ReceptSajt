
const pm = require("promisemaker");
const fs = pm(
    require('fs'), 
    { rejectOnErrors: false }
);
const path = require('path');
let NutritionValue=require('./nutritionValue.class');
let Ingredient=require('./ingredient.class');


module.exports=class Recipe{


    constructor(props, ingredients, picture, livsmedel){
     
        Object.assign(this, props);
        this.ingredients=ingredients;
        this.picture=picture;
        this.nutritionValue=this.calculateNutrPerPerson(livsmedel);
    }

    calculateNutrPerPerson(livsmedel){

        let nutritionValue=new NutritionValue();

        for(let ing of this.ingredients){
            
            let ingredient= new Ingredient(ing.name, ing.quantity, ing.unit, livsmedel);
           
            nutritionValue.energiKcal+=ingredient.nutritionValue.energiKcal;
            nutritionValue.kolhydrater+=ingredient.nutritionValue.kolhydrater;
            nutritionValue.protein+=ingredient.nutritionValue.protein;
            nutritionValue.fett+=ingredient.nutritionValue.fett;
            nutritionValue.salt+=ingredient.nutritionValue.salt;
        }
        for( let property in nutritionValue){
            nutritionValue[property]=nutritionValue[property]/this.nrPersons;
            nutritionValue[property]=nutritionValue[property].toFixed(4);
        }
        return nutritionValue;

    }

    static createFilePath(recipeName){
       
        recipeName = recipeName.toLowerCase().replace(/![a-z]/g,'');
        
        return path.join(__dirname, '../../json', 'recept', recipeName + '.json');
    }

    static async createFileList(){
        let directoryPath= path.join(__dirname, '../../json/recept');
        let fileList=[];
        let newList=[];
        await fs.readdir(directoryPath, function(err, items){
            fileList= items.map( item => item.substring(0, item.indexOf('.')));
        });
        for (let recipe of fileList){
            recipe= await Recipe.readFromFile(recipe);
            newList.push(recipe)
        }
        return newList;
    }

    static async findByCategory(category){
        let allRecipes=await Recipe.createFileList();
        let recipes=allRecipes.filter( recipe => recipe.category===category);
        return recipes;
    }

    static async findWord(word, category){
        let allRecipes=await Recipe.createFileList();
        let recipes=[];
        let cat;
        
        for (let recipe of allRecipes){
            if ( category==='all'){
                cat=true;
            }
            else{
                cat=(recipe.category===category);
            }
            if( ((recipe.title.includes(word) || recipe.description.includes(word)) && cat)){
                recipes.push(recipe);
            }
        }
        return recipes;
    }
     
    static async readFromFile(recipeName){
        let filePath = Recipe.createFilePath(recipeName);
        let contents = await fs.readFile(filePath, 'utf-8');
        // if the file doesn't exist we get an error
        if(contents instanceof Error){
          return {error: contents};
        }
        // otherwise we get JSON data that
        // we'll convert to a Recipe instance
        let data = JSON.parse(contents);
        return data;
    }
     
    async writeToFile(){

        let filePath =  Recipe.createFilePath(this.title);
        // check if the file exists
        let fileExists = !((await fs.stat(filePath)) instanceof Error);
        // if the file exists - return an error
        if(fileExists){
          return {error: 'Det finns redan ett recept med namnet.'}
        }
        await fs.writeFile(
          filePath,
          JSON.stringify(this, null, '  '),
          'utf-8'
        );
        // assume it worked
        return  'Recept sparat!';
    }
     

    
}