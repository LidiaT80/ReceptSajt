class ReceptBearbetning{

    findRecipes(word, searchType){

        let recipes=[];
        $.ajax({
            'async': false,
            'global': false,
            'url':'/json/recepten.json',
            'dataType': "json",
            'success': function(recept){

                for( let rec of recept){
                    
                    if(rec[searchType].includes(word)){
                        
                        recipes.push(new Recept(rec.titel, rec.instruktion, rec.bild, rec.ingredienser, rec.tid, rec.nrPersoner, rec.kategori));
                    }
                }
            }
        });
      
        return recipes;
    }

    
}