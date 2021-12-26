//desactivation du div input and winnerDiv
const hideDiv = () =>{
    $("#nameWinnerInputDiv").show();
    $("#simpleWinner").hide();
    $("#bestWinner").hide();
}

/////////////////////////////////////////////////////////////////////////////
//Création du tableau html des meilleurs scores
const generateTableWinner = (size) =>{

    let tableofBetter = $("<table>");

    let thead = $("<thead>");
    let trh = $("<tr>");
    let tdh1 = $("<td>").text("Ranking");
    let tdh2 = $("<td>").text("Name");
    let tdh3 = $("<td>").text("nbPenality");
    let tdh4 = $("<td>").text("gameTime");

    thead.append(trh.append(tdh1, tdh2, tdh3, tdh4));

    let tbody = $("<tbody>");

    for(let index = 0; index < size; index++){
        let tr = $("<tr>");
        tr.attr("id", "tr"+index);

        let td1 = $("<td>").text(index+1);
        let td2 = $("<td>").text("-");
        let td3 = $("<td>").text("-");
        let td4 = $("<td>").text("-");
        tbody.append(tr.append(td1, td2, td3, td4));
    }
    $("#tableBestWin").append(tableofBetter.append(thead, tbody));
    tableofBetter.css('text-align', 'center');
}

//declaration de variables
var lettreOk, nbPenality;
var beginGameTime, timePlaying;
var indexCanvaDuPendus = 0;
var nbChange;
var bestPlayer;

//nameButtonPlay
const buttonRePlay = ()=>{
    $("#play").text("Essayer un autre mot");
}

/////////////////////////////////////////////////////////////////////////////
//initialisation du tableau des meilleurs vainqueurs
function playerWin(){
    this.name="";
    this.penality=10000;
    this.time=10000;
} 

const initBestPlayerArray = () =>{  
    bestPlayer = [];
    //initialisation du tableau
    for (let i=0;i<5;i++)     
        bestPlayer[i] = new playerWin();

    console.log(bestPlayer);
}

//////////////////////////////////////////////////////////////
//initialisation du mot avec des "_"
const initWord = (word, wordHidden) =>{
    for(let index=0; index < word.length; index++)
    wordHidden[index]= "_";
    console.log(wordCompute.join(" "));
}

///////////////////////////////////////////////////
//init : $(".hideCanva").hide(), nbChange, wordUser or wordCompute (wordArray), motRandom or letterRandom (random), 
//nbPenality, message html of nbChange ($("#message").html('<h4>'+'nombre de coup : '+nbChange+'</h4>'))
//and display hidden word ($("#hiddenWord").text(wordCompute.join(" ")))
const hideAndInit = (nbChangeValue, wordArray, randomWordOrLetter) =>{
     //hideCanva
     $(".hideCanva").hide();
     nbChange = nbChangeValue;
     wordArray = [];
     //countLetter = 0;
     randomWordOrLetter="";
     nbPenality = 0;
     console.log("word utili : "+wordCompute);
         
     $("#message").html('<h4>'+'nombre de coup : '+nbChange+'</h4>');
 
     $("#hiddenWord").text(wordCompute.join(" "));
}

//sous fonction de verification : parcour des lettres du mots a trouvé
const checkLettersWordHidden = (randomWordOrLetter, word) =>{
    lettreOk = false;
    for(let index=0; index < wordUser.length; index++){
        if(randomWordOrLetter == word[index]){
            // letterWinDisable.css("background-color", "green");
            console.log("index : "+index+" : "+word[index]);
            wordCompute[index] = word[index];
            lettreOk = true;
            $("#hiddenWord").text(wordCompute.join(" "));
        }           
    }

    if(lettreOk == false){
        $("."+canvaDuPendus[indexCanvaDuPendus]).show();
        indexCanvaDuPendus++;
        nbChange--;
        nbPenality++;
        console.log("nb change "+nbChange);
        $("#message").html('<h4>'+'nombre de coup : '+nbChange+'</h4>');
    }
    console.log("user word "+wordCompute.join(" "));
    statuJeu();   
}