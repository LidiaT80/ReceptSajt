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

    createIngredientList(){

        let ingrediensLista=[];

        $.ajax({
            'async': false,
            'global': false,
            'url':'/json/livsmedelsdata.json',
            'dataType': "json",
            'success': function(livsmedel){

                for( let lm of livsmedel){

                    ingrediensLista.push(lm.Namn.toLowerCase());
                }
            }
        });

        return ingrediensLista;
    }

    autocompleteIngredient(str){

        let lista=this.createIngredientList();
            
        let match=lista.filter(ing => str=== ing.substring(0,str.length));
       
        return match;
    }

}

    
