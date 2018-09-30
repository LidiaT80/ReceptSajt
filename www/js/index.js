


let indexView=new Vue ({
    router,
    el: '#indexHeader',
    data: {
        word: ''
    },
    methods: {
        toAdminPage: function(){
            
            if(this.word==='adminpage'){
                window.location.href='http://localhost:3000/admin.html';
            }
        }
    }

});
