

let indexView=new Vue ({
    router,
    el: '#indexPage',
    created() {
        this.fetchData();	
    },
    data: {
        word: '',
        categories: []
    },
    methods: {
        fetchData() {
            axios.get('./json/kategorier.json').then(response => {
                this.categories =response.data.mainCategories;              
            });
        },
        login: function(){
            document.getElementById('password').classList.remove('hidden');
            document.getElementById('admin').classList.add('hidden');
        },
        toAdminPage: function(){
            
            if(this.word==='admin'){
                window.location.href='http://localhost:3000/admin.html';
            }
        },
        goToCat: function(c){
            let category=c.srcElement.textContent;
            window.location.href='http://localhost:3000/recept.html';
        }
    }
});
