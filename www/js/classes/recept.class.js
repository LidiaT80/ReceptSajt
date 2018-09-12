class Recept{

    constructor(titel, instruktion,bild, ingredienser, tid, nrPersoner, kategori){
        
        this.titel=titel;
        this.instruktion=instruktion;
        this.bild=bild;
        this.ingredienser=ingredienser;
        this.tid=tid;
        this.nrPersoner=nrPersoner;
        this.kategori=kategori;
        this.naringsvarde=this.calculateNutrPerPerson();
    }

    calculateNutrPerPerson(){

        let naringsvarde=new Naringsvarde();

        for(let ing of this.ingredienser){
            ing=new Ingrediens(ing.namn, ing.mangd, ing.mattenhet);
            naringsvarde.energiKJ+=ing.naringsvarde.energiKJ;
            naringsvarde.energiKcal+=ing.naringsvarde.energiKcal;
            naringsvarde.kolhydrater+=ing.naringsvarde.kolhydrater;
            naringsvarde.protein+=ing.naringsvarde.protein;
            naringsvarde.fett+=ing.naringsvarde.fett;
        }
        for( let property in naringsvarde){
            naringsvarde[property]=naringsvarde[property]/this.nrPersoner;
        }
        return naringsvarde;

    }

    recalculateRecipe(nrPersoner){

        let nr=nrPersoner/this.nrPersoner;

        for( let ing of this.ingredienser){
            ing.mangd*=nr;
        }
        
    }

    
}