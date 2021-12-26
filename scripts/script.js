//desactivation du div input and winnerDiv
hideDiv();
// $("#nameWinnerInputDiv").show();
// $("#simpleWinner").hide();
// $("#bestWinner").hide();
buttonRePlay();

///////////////////////////////////////////////////////////////////
//localStorage.clear();

/////////////////////////////////////////////////////////////////////////////
//Création du tableau html des meilleurs scores
// const generateTableWinner = () =>{

//     let tableofBetter = $("<table>");

//     let thead = $("<thead>");
//     let trh = $("<tr>");
//     let tdh1 = $("<td>").text("Ranking");
//     let tdh2 = $("<td>").text("Name");
//     let tdh3 = $("<td>").text("nbPenality");
//     let tdh4 = $("<td>").text("gameTime");

//     thead.append(trh.append(tdh1, tdh2, tdh3, tdh4));

//     let tbody = $("<tbody>");

//     for(let index = 0; index < 5; index++){
//         let tr = $("<tr>");
//         tr.attr("id", "tr"+index);

//         let td1 = $("<td>").text(index+1);
//         let td2 = $("<td>").text("-");
//         let td3 = $("<td>").text("-");
//         let td4 = $("<td>").text("-");
//         tbody.append(tr.append(td1, td2, td3, td4));
//     }
//     $("#tableBestWin").append(tableofBetter.append(thead, tbody));
//     tableofBetter.css('text-align', 'center');
// }
/////////////////////////////////////////////////////////////////////////////////////////////
//declaration de variables
let letterRandom, wordCompute = [], wordUser = "";
let indexArrayAlphabet;

/////////////////////////////////////////////////////////////////////////////
//initialisation du tableau des meilleurs vainqueurs
// function playerWin(){
//     this.name="";
//     this.penality=10000;
//     this.time=10000;
// } 
//tableau stockant le nom des 10 meilleures score
initBestPlayerArray();
// const initBestPlayerArray = () =>{  
//     let bestPlayer = [];
//     //initialisation du tableau
//     for (let i=0;i<5;i++)     
//         bestPlayer[i] = new playerWin();

//     console.log(bestPlayer);
// }

//////////////////////////////////////////////////////////////
//initialisation du mot avec des "_"
// const initWordCompute = () =>{
//     for(let index=0; index < wordUser.length; index++)
//     wordCompute[index]= "_";
//     console.log(wordCompute.join(" "));
// }
/////////////////////////////////////////////////////////////
//generation du tableau des meilleurs au debut
let size = 5;
generateTableWinner(size);

//////////////////////////////////////////////////////////////
//programme principal
$(document).ready(function(){
    //init : $(".hideCanva").hide(), nbChange, wordUser or wordCompute (wordArray), motRandom or letterRandom (random), 
    //nbPenality, message html of nbChange ($("#message").html('<h4>'+'nombre de coup : '+nbChange+'</h4>'))
    //and display hidden word ($("#hiddenWord").text(wordCompute.join(" ")))
    hideAndInit(15, wordCompute, letterRandom);

    // //hideCanva
    // $(".hideCanva").hide();
    // nbChange = 15;
    // wordCompute = [];
    // //countLetter = 0;
    // letterRandom="";
    // nbPenality = 0;
    // console.log("word utili : "+wordCompute);
        
    // $("#message").html('<h4>'+'nombre de coup : '+nbChange+'</h4>');

    // $("#hiddenWord").text(wordCompute.join(" "));
    $("#nameWinnerInput").change(function(){
        wordUser = $("#nameWinnerInput").val();
        console.log("lettre : "+wordUser);
        $("#nameWinnerInput").val("");
        $("#nameWinnerInputDiv").hide();

        //initialisation du mot avec des "_"
        initWord(wordUser, wordCompute);
        $("#hiddenWord").text(wordCompute.join(" "));

        //debut du temps de jeu
        beginGameTime = new Date();
        setInterval(function(){verifieLettre()}, 500);
        // verifieLettre();
        
    });   
});
//////////////////////////////////////////////////////////////////////////////
//verification de la lettre
const verifieLettre = () => {
            if(nbChange==0 || wordCompute.join("")==wordUser){
                return;
            }

            indexArrayAlphabet = Math.floor(Math.random() * alphabet.length);
            letterRandom = alphabet[indexArrayAlphabet];
            console.log("lettre ordi : "+letterRandom)
            
            checkLettersWordHidden(letterRandom, wordUser);
            // lettreOk = false;
            // for(let index=0; index < wordUser.length; index++){
            //     if(letterRandom == wordUser[index]){
            //         // letterWinDisable.css("background-color", "green");
            //         console.log("index : "+index+" : "+wordUser[index]);
            //         wordCompute[index] = wordUser[index];
            //         lettreOk = true;
            //         $("#hiddenWord").text(wordCompute.join(" "));
            //     }           
            // }

            // if(lettreOk == false){
            //     $("."+canvaDuPendus[indexCanvaDuPendus]).show();
            //     indexCanvaDuPendus++;
            //     nbChange--;
            //     nbPenality++;
            //     console.log("nb change "+nbChange);
            //     $("#message").html('<h4>'+'nombre de coup : '+nbChange+'</h4>');
            // }
            // console.log("user word "+wordCompute.join(" "));
            // statuJeu();   
}
///////////////////////////////////////////////////////////////////////////////////
//verification du statut du joueur : win or lost
const statuJeu = () =>{
    if (nbChange==0){
        console.log("perdu !"+"\n"+"C'était : "+wordUser);
        $("#message").html('<h4>'+"Dommage, il a raté ! C'était : "+'<span style="color: blue">'+wordUser+'</span>'+'</h4>');
        // $(".alphabetKey").attr("disabled", true);
        return false;
    }
    if(wordCompute.join("")==wordUser){
        //fin du temps de jeu et calcul du temps de jeu du vainqueur
        timePlaying = Math.round((new Date() - beginGameTime.getTime())/1000);

        $("#penduLost").hide();

        console.log("gagné !");
        // $(".alphabetKey").attr("disabled", true);
        if(nbPenality <= bestPlayer[4].penality){

            $("#bestWinner").show();
            $("#message").html('<h4 id="centerMsg">'+'Ooooh Yes, il a trouvé ! <br/>il fait parties des 5 meilleurs performances'+'</h4>');
            BestMachinesWinner();
        }

        else {
            $("#simpleWinner").show();
            $("#message").html('<h4 id="centerMsg">'+'Yes, il a trouvé ! <br/>Mais, dommage il ne fait pas partie des 5 meilleurs.'+
                                '<br/><span>nbPenalités = '+nbPenality+' | temps de jeu = '+timePlaying+'</span></h4>');
        }

        return true;
    }
}
/////////////////////////////////////////////////////////////////////////////////////
//recupération du nom du gagnant et ajout dans le tableau des 10 meilleurs
const BestMachinesWinner = () =>{

        //Choix du nom de la machine gagnante
        indexArrayMachine = Math.floor(Math.random() * nameWinnerCompute.length);

        bestPlayer[4].name = nameWinnerCompute[indexArrayMachine];
        bestPlayer[4].penality = nbPenality;
        bestPlayer[4].time = timePlaying;
        
        console.log("Winner : "+bestPlayer[4].name);
        console.log("penality : "+bestPlayer[4].penality);
        console.log("time : "+bestPlayer[4].time);

        //trie du tableau
        bestPlayer.sort(function(a, b){
            if(a.penality == b.penality)
                return a.time - b.time;
            return a.penality - b.penality;
        });

        displayTenBestWinner();
        localStorage["savePerson"] = JSON.stringify(bestPlayer);      
}
/////////////////////////////////////////////////////////////////////////////////////////
const displayTenBestWinner = ()=>{
    //affichage du tableau des 10 meilleurs scores
    for(let i=0; i<bestPlayer.length; i++)
        if(bestPlayer[i].name !="")
            $("#tr"+i).html('<td>'+(i+1)+'</td><td>'+bestPlayer[i].name+'</td><td>'+bestPlayer[i].penality+'</td><td>'+bestPlayer[i].time+'</td>'); 
}

//////////////////////////////////////////////////////////
//chargement du tableau meilleurs
if(localStorage["savePerson"]!=undefined){
    bestPlayer = JSON.parse(localStorage["savePerson"]);
    displayTenBestWinner();
}

//////////////////////////////////////////////////////////////
//rechargement de la page
$("#play").click(function(){
    location.reload(true);
});
