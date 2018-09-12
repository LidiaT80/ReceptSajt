class Recept{

    constructor(titel, instruktion,bild, ingredienser, tid, kategori){
        
        this.titel=titel;
        this.instruktion=instruktion;
        this.bild=bild;
        this.ingredienser=ingredienser;
        this.tid=tid;
        this.kategori=kategori;
        this.naringsvarde=this.calculateNutrPerPerson();
    }

    calculateNutrPerPerson(){

        let naringsvarde=new Naringsvarde();
        for(let ing of this.ingredienser){

            naringsvarde.energiKJ+=ing.naringsvarde.energiKJ;
            naringsvarde.energiKcal+=ing.naringsvarde.energiKcal;
            naringsvarde.kolhydrater+=ing.naringsvarde.kolhydrater;
            naringsvarde.protein+=ing.naringsvarde.protein;
            naringsvarde.fett+=ing.naringsvarde.fett;
        }
        return naringsvarde;

    }

    
}