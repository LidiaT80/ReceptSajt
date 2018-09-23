
const bodyParser= require('body-parser');
let recipes=require('../../json/recepten.json');

module.exports= class Routes{

    constructor(app, list){
        this.app=app;
        this.list=list;
        this.setRoutes();
    }

    setRoutes(){

        let urlencodedParser=bodyParser.urlencoded({extended:false});
        let jsonParser=bodyParser.json();
               
        this.app.post('/admin.html',jsonParser, (req, res) => {
                        
            console.log(req.body);
        });

        this.app.post('/recept.html', urlencodedParser, (req, res) => {
            let search= req.body.search;
            let recipe= recipes.filter( recipe => recipe.titel==search);
            res.json(recipe[0]);
                
        });

        this.app.get('/admin.html/autocomplete/:startOfName', (req, res) => {
            
              let start = req.params.startOfName.toLowerCase();              
              let result = this.list.filter(
                item => item.indexOf(start) == 0
              );
              res.json(result);
            }
          );
        
    }
}