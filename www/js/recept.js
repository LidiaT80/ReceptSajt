
let recipeView=new Vue({
    router,
    el: '#recipeMain',
    created() {
        this.fetchData();	
    },
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
        categories: [],
        selected: '',
        recipeList: []
    },
    methods: {
        fetchData() {
            axios.get('./json/kategorier.json').then(response => {
                this.categories =response.data.mainCategories;              
            });
        },
        findRecipe: function(){
            let recipe=this;
            if(this.search==='')
                this.search='all';
            if(this.selected==='')
                this.selected='all';
            router.push({path: '/'+this.search+'&'+this.selected});
            axios.get('http://localhost:3000/recept.html/'+this.search+'&'+this.selected)               
            .then( response => {
                let data=response.data;
                if( Array.isArray(data)){
                    document.getElementById('list').classList.remove('hidden');
                    document.getElementById('details1').classList.add('hidden');
                    document.getElementById('details2').classList.add('hidden');
                    document.getElementById('details3').classList.add('hidden');
                    recipe.recipeList=data;
                }
                else{
                    document.getElementById('details1').classList.remove('hidden');
                    document.getElementById('details2').classList.remove('hidden');
                    document.getElementById('details3').classList.remove('hidden');
                    document.getElementById('list').classList.add('hidden');
                    recipe.title=data.title;
                    recipe.description=data.description;
                    recipe.picture=data.picture;
                    recipe.ingredients=data.ingredients;
                    recipe.time=data.time;
                    recipe.nrPersons=data.nrPersons;
                    recipe.category=data.category;
                    recipe.nutritionValue=data.nutritionValue;
                } 
                recipe.search='';
                recipe.selected='';        
            })
            .catch( error=> console.log(error));
        },
        showSelected: function(name){
            this.search=name.srcElement.textContent.trim();
            this.recipeList=[];
            this.findRecipe();
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