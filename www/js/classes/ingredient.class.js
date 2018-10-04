
let NutritionValue=require('./nutritionValue.class');
const mattOmvandling= require('../../json/mattomvandling.json');

module.exports= class Ingredient{

    constructor(name, quantity, unit, livsmedel){
        
        this.name=name;
        this.quantity=quantity;
        this.unit=unit;
        this.nutritionValue=this.calculateNutrition(livsmedel);
        
    }

    setQuantity(){

        let quantity;
        let unitLC=this.unit.toLowerCase();
        let ing=mattOmvandling.filter( item => item.namn===this.name);
        if(ing.length===0){
            return 0;
        }
     
        if(unitLC==='kg'){
            quantity=this.quantity*1000;
        }
        if(unitLC==='dl'){
            quantity=this.quantity*ing[0].gPerDl;                
        }
        else if(unitLC==='tsk'){
            quantity=0.05*this.quantity*ing[0].gPerDl;
        }
        else if(unitLC==='msk'){
            quantity=0.15*this.quantity*ing[0].gPerDl;
        }
        else if(unitLC==='krm'){
            quantity=0.01*this.quantity*ing[0].gPerDl;
        }
        else if(unitLC==='st' || unitLC==='styck'){
            quantity=this.quantity*ing[0].gPerSt;
        }
        else if(unitLC==='klyfta' || unitLC==='klyftor'){
            quantity=this.quantity*ing[0].gPerKlyfta;
        }
        return quantity;
    }

    calculateNutrition(livsmedel){

        let name=this.name;
        let quantity;
        if(!(this.unit==='g' || this.unit==='gram')){
            quantity=this.setQuantity();
        }
        else{
            quantity=this.quantity;
        }
        quantity/=100;
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