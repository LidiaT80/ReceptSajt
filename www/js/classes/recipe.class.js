
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

    
}