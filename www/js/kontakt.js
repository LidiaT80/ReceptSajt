
let contactView=new Vue({
    router,
    el: '#contactMain',
    data: {
        name: '',
        message: ''
    }, 
    methods:{
        sendMessage: function(){
            let data=new ContactForm(this.name, this.message);
            axios.post('/kontakt.html', data, { headers: {
                'Content-type': 'application/json'
                }})              
                .then( response => {
                    console.log(response.data);
                })
                .catch( error=> console.log(error));
        }
    }
}); 