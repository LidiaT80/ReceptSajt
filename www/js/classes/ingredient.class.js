
let NutritionValue=require('./nutritionValue.class');

module.exports= class Ingredient{

    constructor(name, quantity, unit, livsmedel){
        
        this.name=name;
        this.quantity=quantity;
        this.unit=unit;
        this.nutritionValue=this.calculateNutrition(livsmedel);
        
    }

    calculateNutrition(livsmedel){

        let name=this.name;
        let quantity=this.quantity/100;
        let nutritionValue=new NutritionValue();

        for( let lm of livsmedel){
                    
            if(lm.Namn.toLowerCase()== name){
                        
                for ( let nv of lm.Naringsvarden.Naringsvarde){
                
                    if( nv.Namn=='Energi (kcal)'){
                        nutritionValue.energiKcal=this.stringToNr(nv.Varde)*quantity;
                    }
                    if( nv.Namn=='Kolhydrater'){
                        nutritionValue.kolhydrater=this.stringToNr(nv.Varde)*quantity;
                    }
                    if( nv.Namn=='Protein'){
                        nutritionValue.protein=this.stringToNr(nv.Varde)*quantity;
                    }
                    if( nv.Namn=='Fett'){
                        nutritionValue.fett=this.stringToNr(nv.Varde)*quantity;
                    }
                    if( nv.Namn=='Salt'){
                        nutritionValue.salt=this.stringToNr(nv.Varde)*quantity;
                    }
                }                    
            }
        } 
        return nutritionValue; 
    }

    stringToNr(str){

        let nr=str.replace(",",".");
        
        return parseFloat(nr);
    }

   
   

}