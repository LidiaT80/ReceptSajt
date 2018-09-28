
const router = new VueRouter();

let ingForm= new Vue({
    router,
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
        ingredients: [],
        info: '',
        answer: ''
    },
    methods: {
        autocomplete: function(){
            if(this.name.length>1){
                router.push({ path: '/autocomplete/'+this.name});
                axios.get('http://localhost:3000/admin.html/autocomplete/'+this.name)
                .then( response => this.match=response.data);
            }
        },
        getChoice: function(m) {
            this.name=m.srcElement.textContent;
            this.name=this.name.trim();
            this.match=[];
        },
        add: function(){
            
            let ingredient=new IngredientBr(this.name, this.quantity, this.unit);
            this.ingredients.push(ingredient);
            this.name='';
            this.quantity='';
            this.unit='';
        },
        save: function(){
            let data= JSON.stringify({title: this.title, description: this.description, picture: this.picture, 
                ingredients: this.ingredients, time: this.time, nrPersons: this.persons, category: this.category});
                
            axios.post('/admin.html', data, { headers: {
                'Content-type': 'application/json',
                }})              
                .then( response => {
                   
                    console.log(response.status);
                    console.log(response.data);
                    this.answer=JSON.parse(response.data);
                })
                .catch( error=> console.log(error));
         
            this.title='';
            this.description='';
            this.picture='';
            this.ingredients=[];
            this.time='';
            this.persons='';
            this.category='';
        }
    }

});

let recipeView=new Vue({
    router,
    el: '#recipeMain',
    data: {
        search: '',
        title: '',
        description: '',
        picture: '',
        ingredients: [],
        time: '',
        nrPersons: '',
        category: '',
        nutritionValue: {},
        portions: '',
        categories: [ 'frukost', 'förrätt', 'lunch', 'efterrätt', 'kvällsmat'],
        selected: ''
    },
    methods: {
        findRecipe: function(){
            let recipe=this;
            if(this.search==='')
                this.search='all';
            if(this.selected==='')
                this.selected='all';
            router.push({path: '/'+this.search+'&'+this.selected});
            axios.get('http://localhost:3000/recept.html/'+this.search+'&'+this.selected)               
            .then( response => {
                document.getElementById('details1').classList.remove('hidden');
                document.getElementById('details2').classList.remove('hidden');
                document.getElementById('details3').classList.remove('hidden');
                let data=response.data;
                recipe.title=data.title;
                recipe.description=data.description;
                recipe.picture=data.picture;
                recipe.ingredients=data.ingredients;
                recipe.time=data.time;
                recipe.nrPersons=data.nrPersons;
                recipe.category=data.category;
                recipe.nutritionValue=data.nutritionValue;
              
            })
            .catch( error=> console.log(error));
        },

        recalculate: function(){

            let nr=this.portions/this.nrPersons;
            this.nrPersons=this.portions;
            for( let ing of this.ingredients){
                ing.quantity*=nr;
            }
        }

    }
});





