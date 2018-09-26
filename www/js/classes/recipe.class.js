
const pm = require("promisemaker");
const fs = pm(
    require('fs'), 
    { rejectOnErrors: false }
);
const path = require('path');
let NutritionValue=require('./nutritionValue.class');
let Ingredient=require('./ingredient.class');


module.exports=class Recipe{

    constructor(props, ingredients, livsmedel){
     
        Object.assign(this, props);
        this.ingredients=ingredients;
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
        }
        return nutritionValue;

    }

    recalculateRecipe(nrPersons){

        let nr=nrPersons/this.nrPersons;

        for( let ing of this.ingredients){
            ing.quantity*=nr;
        }
        
    }

    static createFilePath(recipeName){
       
        recipeName = recipeName.toLowerCase().replace(/![a-z]/g,'');
        
        return path.join(__dirname, '../../json', 'recept', recipeName + '.json');
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
          return {error: 'A recipe with that name already exists! Cannot create the recipe!'}
        }
        await fs.writeFile(
          filePath,
          JSON.stringify(this, null, '  '),
          'utf-8'
        );
        // assume it worked
        return {success: 'Recipe created!'}
      }
     

    
}