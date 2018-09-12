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
                        
                        recipes.push(rec.titel);
                    }
                }
            }
        });
      
        return recipes;
    }
}