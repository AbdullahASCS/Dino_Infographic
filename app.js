

    // Create Dino Constructor
    function dinoConstructor(species,weight,height,diet,where,when,fact){
        this.species= species;
        this.weight = weight;
        this.height = height;
        this.diet = diet;
        this.where = where;
        this.when = when;
        this.fact = fact;
        this.image = `./images/${this.species.toLowerCase()}`
    }
   
    // Create Dino Objects
    const dinos =[];
    fetch("./dino.json").then((result) => result.json())
    .then((result) => {
    result.Dinos.forEach((dino) => {
        dinos.push(new dinoConstructor(dino.species,dino.weight,dino.height,dino.diet,dino.where,dino.when,dino.fact));
    });
  });
    // Create Human Object
    let human ={}
    // Use IIFE to get human data from form
    const getFormData = function () {
        humanName = document.getElementById('name').value;
        feet = parseInt(document.getElementById('feet').value);
        inches =  parseInt(document.getElementById('inches').value);
        weight =  parseInt(document.getElementById('weight').value);
        diet = document.getElementById('diet').value;
        return{
            humanName,
            feet,
            inches, 
            weight,
            height :feet * 12 + inches,
            diet,
        }
    };
    
    
    // Create Dino Compare Method 1
    dinoConstructor.prototype.compareHeight= function(human){
        const number = (this.height/human.height).toFixed(2);
        if (number>1){
            return `${this.species} is ${number} times taller than you`
        }
        else{
            return `${this.species} is ${number} times shorter than you`
        }
    } 

    
    // Create Dino Compare Method 2
    // NOTE: Weight in JSON file is in lbs, height in inches.
    dinoConstructor.prototype.compareWeight= function(human){
        const number = (this.weight/human.weight).toFixed(2);
        if (number>1){
            return `${this.species} is ${number} times heavier than you`
        }
        else{
            return `${this.species} is ${number} times lighter than you`
        }
    } 
    
    // Create Dino Compare Method 3
    // NOTE: Weight in JSON file is in lbs, height in inches.
    dinoConstructor.prototype.compareDiet= function(human){
        return `${this.species} has ${this.diet} diet, where you have ${human.diet} diet `
    } 
    function generateTile(species,image,fact){
        const dinoTile = document.createElement('div');
        dinoTile.className = 'grid-item';
        dinoTile.innerHTML = `<h3>${species}</h3><img src="${image}.png"><p>${fact}</p>`;
        document.getElementById('grid').appendChild(dinoTile);
    }
    function randomFact(dino,human){
        if(dino.species == 'Pigeon'){
            return dino.fact;
        }
        switch(Math.floor(Math.random() * 6)){
            case 0:
                return dino.compareHeight(human);
            case 1:
                return dino.compareWeight(human);
            case 2:
                return dino.compareDiet(human);
            case 3:
                return `${dino.species} lived in ${dino.where}.`;
            case 4:
                return `${dino.species} lived in ${dino.when}.`;
            case 5:
                return dino.fact;
        }
    }
    // Generate Tiles for each Dino in Array
    function appendTiles(dinos,human){
        dinos.forEach((dino, index) =>{
            if(index == 4){
                const humanTile = document.createElement('div');
                humanTile.className = 'grid-item';
                humanTile.innerHTML = `<h3>${human.humanName}</h3><img src="images/human.png">`;
                document.getElementById('grid').appendChild(humanTile);
            }
            const fact = randomFact(dino,human)
            generateTile(dino.species,dino.image,fact);
        })
    }
        // Add tiles to DOM

    // Remove form from screen
    document.getElementById("btn").addEventListener("click", function () {
      human = getFormData();
      document.getElementById("dino-compare").style.display = "none";
      appendTiles(dinos, human);
    });

// On button click, prepare and display infographic
 