let ingForm= new Vue({
    router,
    el: '#form',
    created() {
        this.fetchData();	
    },
    data: {
        title: '',
        description: '',
        picture: {},
        time: '',
        persons: '',
        category: '',
        name: '',
        quantity: '',
        unit: '',
        match: [],
        ingredients: [],
        info: '',
        answer: '',
        categories: [],
        newCat: ''
    },
    methods: {
        fetchData() {
            axios.get('./json/kategorier.json').then(response => {
                this.categories =response.data.mainCategories;              
            });
        },
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
            let ing;
            if(!(ingredient.unit==='g')){
                axios.get('./json/mattomvandling.json').then( response => {
                    ing=response.data.filter( item => item.namn===ingredient.name);
                    if(ing.length===0){
                        alert('Det gick inte att räkna om måttenhet. Ange mängd i gram.');
                    }
                    else{
                        this.ingredients.push(ingredient);
                    }
                });                
            }
            else{
                this.ingredients.push(ingredient);
            }            
            this.name='';
            this.quantity='';
            this.unit='';
        },
        uploadImage : function(event){

            this.picture=event.target.files[0];
        },
        removeImg: function(){
            this.picture={};
        },
        save: function(){
            
            if(this.newCat){
                this.category=this.newCat;
            }
            let data=new FormData();
            data.append('title', this.title);
            data.append('description', this.description);
            data.append('ingredients', JSON.stringify(this.ingredients));
            data.append('time', this.time);
            data.append('nrPersons', this.persons);
            data.append('category', this.category);
            data.append('picture', this.picture);
            let recipe=this;    
            axios.post('/admin.html', data, { headers: {
                'Content-type': 'multipart/form-data'
                }})              
                .then( response => {
                   
                    console.log(response.status);
                    console.log(response.data);
                    recipe.answer=JSON.parse(response.data);
                })
                .catch( error=> console.log(error));
         
            this.title='';
            this.description='';
            this.picture='';
            this.ingredients=[];
            this.time='';
            this.persons='';
            this.category='';
            this.newCat= '';
        },
        addCategory: function(){
            document.getElementById('newCatInput').classList.remove('hidden');
        }
    }
});