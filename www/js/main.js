
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
        info: ''
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
            
            let ingredient=new Ingrediens(this.name, this.quantity, this.unit);
            this.ingredients.push(ingredient);
            this.name='';
            this.quantity='';
            this.unit='';
        },
        save: function(){
            let data= JSON.stringify({title: this.title, description: this.description, picture: this.picture, ingredients: this.ingredients,
                time: this.time, persons: this.persons, category: this.category});
                
            axios.post('/admin.html', data, { headers: {
                'Content-type': 'application/json',
                }})               
                .then( response => console.log(response))
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






