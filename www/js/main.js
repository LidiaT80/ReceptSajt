
let receptBearbetning=new ReceptBearbetning();


let ingForm= new Vue({
    el: '#form',
    data: {
        title: '',
        description: '',
        picture: '',
        time: '',
        persons: '',
        category: '',
        name: '',
        quantity: '',
        unit: '',
        match: [],
        ingredients: []
    },
    methods: {
        autocomplete: function(){
            
            if(this.name.length>0){
                this.match=receptBearbetning.autocompleteIngredient(this.name);
            }
            else{
                this.match=[];
            }         
        },
        getChoice: function(m) {
            this.name=m.srcElement.textContent;
            this.name=this.name.trim();
            this.match=[];
        },
        add: function(){
            
            let ingredient=new Ingrediens(this.name, this.quantity, this.unit);
            this.ingredients.push(ingredient);
            this.name='';
            this.quantity='';
            this.unit='';
        },
        save: function(){
            let recept=new Recept(this.title, this.description, this.picture, this.ingredients, this.time, this.persons, this.category);
            this.title='';
            this.description='';
            this.picture='';
            this.ingredients=[];
            this.time='';
            this.persons='';
            this.category='';
            console.log(recept);
        }
    }

});




