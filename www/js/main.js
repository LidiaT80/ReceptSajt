//let pm= new Ingrediens('potatismos', '300', 'g');

//console.log(pm);

//let kaka= new Recept('Kaka', 'baka i ugn', 'img', [new Ingrediens('vetemjöl', '200', 'g'), new Ingrediens('mörk choklad kakao >70 %', '300', 'g'), new Ingrediens("vispgrädde fett 40%", '200', 'g')],'50', 3,'kakor');

//console.log(kaka);


let recept=new ReceptBearbetning().findRecipes('lunch', 'kategori');
console.log(recept);