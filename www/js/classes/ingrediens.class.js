class Ingrediens{

    constructor(namn, mangd, mattenhet){
        
        this.namn=namn;
        this.mangd=mangd;
        this.mattenhet=mattenhet;
        this.naringsvarde=this.calculateNutrition();
        
    }

    calculateNutrition(){

        let namn=this.namn;
        let mangd=this.mangd/100;
        let naringsvarde=new Naringsvarde();

        $.ajax({
            'async': false,
            'global': false,
            'url':'/json/livsmedelsdata.json',
            'dataType': "json",
            'success': function(livsmedel){

                for( let lm of livsmedel){
                    
                    if(lm.Namn.toLowerCase()== namn){
        
                        for ( let nv of lm.Naringsvarden.Naringsvarde){

                            if( nv.Namn=='Energi (kJ)'){
                                naringsvarde.energiKJ=parseFloat(nv.Varde)*mangd;
                            }
                            if( nv.Namn=='Energi (kcal)'){
                                naringsvarde.energiKcal=parseFloat(nv.Varde)*mangd;
                            }
                            if( nv.Namn=='Kolhydrater'){
                                naringsvarde.kolhydrater=parseFloat(nv.Varde)*mangd;
                            }
                            if( nv.Namn=='Protein'){
                                naringsvarde.protein=parseFloat(nv.Varde)*mangd;
                            }
                            if( nv.Namn=='Fett'){
                                naringsvarde.fett=parseFloat(nv.Varde)*mangd;
                            }
                        }                    
                    }
                } 
            }
        });
        return naringsvarde; 
    }

   

}