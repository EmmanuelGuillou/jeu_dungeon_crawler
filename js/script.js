// Création de la grille

var map = document.getElementById("grille");
var hauteur_map = parseInt(map.style.height)/70;
var largeur_map = parseInt(map.style.width)/70;

function creation_case(){
	var cellule = document.createElement("DIV");
	
	grille.appendChild(cellule);
	cellule.className = "colonne ligne";
	cellule.id = "col"+y+" "+"lig"+x;
	cellule.style.backgroundImage = "url('img/couloir.svg')";
	cellule.style.left = y*70+("px");
	cellule.style.top = x*70+("px");
	cellule.style.margin = "0";
}

function ajout_de_case(){
	for(x=0;x<hauteur_map;x++){
		for(y=0;y<largeur_map;y++){
			creation_case();
			// pylone();
		}
	}
}

ajout_de_case();

// Obstacle et Mur

function pylone(){
	var colonne = Math.floor((Math.random() * largeur_map));
	var ligne =  Math.floor((Math.random() * hauteur_map));
	
	if((parseInt(cellule.style.left) == colonne*70) && (parseInt(cellule.style.top) == ligne*70)){
		cellule.className = "pylone";
		cellule.style.backgroundImage = "url('img/pylone.svg')";
		cellule.style.width = 70+"px";
		cellule.style.height = 70+"px";
		cellule.style.position = "absolute";
	}
}


// Personnage

function creation_personnage(){
	var personnage = document.createElement("DIV");
	
	action.appendChild(personnage);
	personnage.className = "personnage";
	personnage.id = "personnage";
	personnage.style.position = "absolute";
	personnage.style.top = 70+("px");
	personnage.style.left = 70+("px");
	personnage.style.width = 70+("px");
	personnage.style.height = 70+("px");
	
	personnage.style.backgroundImage = "url('img/template_male_face.svg')";
}

// Action du personnage

function creation_action(identifiant, haut, gauche){
	var mouvement = document.createElement("DIV");
	
	action.appendChild(mouvement);
	mouvement.className = "fleches";
	mouvement.id = identifiant;
	mouvement.style.position = "absolute";
	mouvement.style.top = haut+("px");
	mouvement.style.left = gauche+("px");
	mouvement.style.width = 70+("px");
	mouvement.style.height = 70+("px");
	mouvement.style.backgroundColor = "blue";
	mouvement.style.visibility = "hidden";
}

// Boite d'action

function option_action(){
	var boite_action = document.createElement("DIV");
	
	grille.appendChild(boite_action);
	boite_action.className = "action";
	boite_action.id = "action";
	boite_action.style.position = "absolute";
	boite_action.style.top = 70+("px");
	boite_action.style.left = 70+("px");
	boite_action.style.width = 210+("px");
	boite_action.style.height = 210+("px");
	
	creation_personnage();
	creation_action("haut", 0, 70);
	creation_action("gauche", 70, 0);
	creation_action("bas", 140, 70);
	creation_action("droite", 70, 140);
	mouvement()
}

option_action();

// Mouvement du personnage

function mouvement(){
	var haut = document.getElementById("haut");
	var gauche = document.getElementById("gauche");
	var bas = document.getElementById("bas");
	var droite = document.getElementById("droite");
	
	personnage.addEventListener("mouseover",function(event){
		var fleches = document.getElementsByClassName("fleches");
		for (i = 0; i < fleches.length; i++) {
			fleches[i].style.visibility = "visible";
			test_collision();
		};
	});
	
	personnage.addEventListener("mouseout",function(event){
		var fleches = document.getElementsByClassName("fleches");
		for (i = 0; i < fleches.length; i++) {
			fleches[i].style.visibility = "hidden";
		};
	});
	
	var fleches = document.getElementsByClassName("fleches");
	for (i = 0; i < fleches.length; i++) {
			
			fleches[i].addEventListener("mouseover",function(event){
				event.target.style.visibility = "visible";
				test_collision();
			});
			fleches[i].addEventListener("mouseout",function(event){
				event.target.style.visibility = "hidden";
			});
			fleches[i].addEventListener("click",function(event){
				var boite_action = document.getElementById("action");
				var y_haut = parseInt(boite_action.style.top);
				var x_gauche = parseInt(boite_action.style.left);
				switch(event.target.id){
					case "haut":
						boite_action.style.top = y_haut-70+("px");
						boite_action.style.transition = "all 0.5s";
						personnage.style.backgroundImage = "url('img/template_male_dos.svg')";						
						test_collision();
						break;
					case "gauche":
						boite_action.style.left = x_gauche-70+("px");
						boite_action.style.transition = "all 0.5s";
						personnage.style.backgroundImage = "url('img/template_male_profil_gauche.svg')";						
						test_collision();
						break;
					case "bas":
						boite_action.style.top = y_haut+70+("px");
						boite_action.style.transition = "all 0.5s";
						personnage.style.backgroundImage = "url('img/template_male_face.svg')";						
						test_collision();
						break;
					case "droite":
						boite_action.style.left = x_gauche+70+("px");
						boite_action.style.transition = "all 0.5s";
						personnage.style.backgroundImage = "url('img/template_male_profil_droit.svg')";						
						test_collision();
						break;
					default:
						break;
				}
				
			});
		};
}

// Collision

function test_collision(){
	var position_personnage = document.getElementById("action").style;
	
	
	console.log("position boite haut " + parseInt(position_personnage.top));
	console.log("map haut " + hauteur_map*70);
	
	// haut
	if(parseInt(position_personnage.top) == -70){
		haut.style.visibility= "hidden";
	}
	
	// bas
	if(parseInt(position_personnage.top) == (hauteur_map*70)-140){
		bas.style.visibility= "hidden";
	}
	
	// gauche
	if(parseInt(position_personnage.left) == -70){
		gauche.style.visibility= "hidden";
	}
	
	// droite
	if(parseInt(position_personnage.left) == (largeur_map*70)-140){
		droite.style.visibility= "hidden";
	}
}

