const aminoacizi = [
    {nume: 'Gly', c: 2, selected: true, strc:'CH2' },
    {nume: 'Ala', c: 3, selected: true, strc: 'CH(CH3)'},
    {nume: 'Ser', c: 3, selected: true, strc: 'CH(CH2-OH)'},
    {nume: 'Cys', c: 3, selected: true, strc: 'CH(CH2-SH)'},
    {nume: 'Asp', c: 4, selected: true, strc: 'CH(CH2-COOH)'},
    {nume: 'Val', c: 5, selected: true, strc: 'CH(CH(CH3)2)'},
    {nume: 'Orn', c: 5, selected: true, strc: 'CH(CH2-CH2-CH2-NH2)'},
    {nume: 'Glu', c: 5, selected: true, strc: 'CH(CH2-CH2-COOH)'},
    {nume: 'Leu', c: 6, selected: true, strc: 'CH(CH2-CH(CH3)2)'},
    {nume: 'Ile', c: 6, selected: true, strc: 'CH(CH(CH3)-CH2-CH3)'},
    {nume: 'Lys', c: 6, selected: true, strc: 'CH(CH2-CH2-CH2-CH2-NH2)'}
]

let peptidememorie=[];

function sliderVal(val){
    document.getElementById('carbonVal').innerText=val;
}

function genereazaCheckboxuri(){
    const container = document.getElementById('aminoacidsContainer');
    container.innerHTML = '';
    
    aminoacizi.forEach((aa) => {
        const label = document.createElement('label');
        label.className = 'checkbox-label';
        
        const checkbox = document.createElement('input'); //cream un element de input
        checkbox.type = 'checkbox'; //il facem de tip checkbox
        checkbox.checked = aa.selected;
        checkbox.onchange = function() {
            aa.selected = this.checked;
        };
        
        label.appendChild(checkbox); //bagam checkbox-ul in label
        label.appendChild(document.createTextNode(aa.nume)); //bagam si numele in label
        container.appendChild(label);
    });
}

function genereaza(){
    const nrC=parseInt(document.getElementById('carbonslider').value);

    if (isNaN(nrC)) {
        console.error("Eroare: Nu s-a putut citi numărul de carboni!");
        return;
    }

    const rezultate=[];
    
    const aminoaciziSelectati = aminoacizi.filter(aa => aa.selected);
    
    if (aminoaciziSelectati.length === 0) {
        const mesajElement=document.getElementById('mesajNumar');
        const cutieElement=document.getElementById('cutieRezultate');
        mesajElement.innerText = "Selectati cel putin un aminoacid!";
        mesajElement.style.color="#740000";
        cutieElement.innerText="";
        return;
    }
    
    function back(curentC, anterioriC){ //anterioriC e un vector unde tinem minte ce C am pus deja in secventa
        if(curentC==nrC){
            rezultate.push(anterioriC.join('-'));
            return;
        }
        if(curentC>nrC)return;
        for(let i=0; i<aminoaciziSelectati.length; i++){
            anterioriC.push(aminoaciziSelectati[i].nume);
            back(curentC+aminoaciziSelectati[i].c, anterioriC);
            anterioriC.pop();
        }
    }
    back(0, []);
    afisare(rezultate);
}

function afisare(rez){
    const mesajElement=document.getElementById('mesajNumar');
    const cutieElement=document.getElementById('cutieRezultate');
    if(rez.length===0){
        mesajElement.innerText ="Nu s-au gasit combinatii exacte!";
        mesajElement.style.color="#740000";
        cutieElement.innerText="";
        return;
    }
    mesajElement.style.color = "#15063d";
    peptidememorie = [];
    document.getElementById('inputIndex').value = '';
    document.getElementById('AlegeriText').innerText = '';

    if(rez.length===1){
        mesajElement.innerText="S-a gasit o peptida:";
    } else {mesajElement.innerText = "S-au gasit " + rez.length + " peptide:";}

    let textFinalLista="";
    for(let i=0; i<rez.length; i++){
        peptidememorie.push({numar:i+1, formula:rez[i]});
        textFinalLista += (i+1) + ". " + rez[i]+ "\n";
    }

    cutieElement.innerText=textFinalLista;
}

function valideazaSiGenereaza(val){
    const inputEl=document.getElementById('inputIndex');
    const textEl=document.getElementById('AlegeriText');

    if(peptidememorie.length===0){
        inputEl.value='';
        textEl.innerText="Mai intai genereaza peptidele!";
        return;
    }
    let x=parseInt(val);
    if(isNaN(x)){
        textEl.innerText='';
        return;
    }
    const max=peptidememorie.length;
    if(x>max)x=max;
    if(x<1)x=1;
    inputEl.value=x;
    GenForm(x);
}

function GenForm(x){
    x=x-1; //ajustam la index
    const textEl=document.getElementById('AlegeriText');

    if (!peptidememorie[x]) {
        textEl.innerText = "Numarul introdus nu este valid sau nu exista în lista!";
        return;
    }

    const listaAmino=peptidememorie[x].formula.split('-');
    let partiFormula=[];
    for(let i=0; i<listaAmino.length; i++)
    {
        const dateAmino= aminoacizi.find(
            function(aa){
                return aa.nume === listaAmino[i]; //dateAmino va lua valoarea obiectului care are acelasi nume cu listaAmino[i]
            }
        )
        let structChim='';
        if(dateAmino){
            structChim = dateAmino.strc;
        } else {structChim='';}

        if(listaAmino.length===1){
            partiFormula.push("H2N-"+structChim+"-COOH");
        }
        else if(i===0){
            partiFormula.push("H2N-"+structChim+"-CO");
        }
        else if(i===listaAmino.length-1){
            partiFormula.push("NH-"+structChim+"-COOH");
        }
        else{
            partiFormula.push("NH-"+structChim+"-CO");
        }
    }
    const textFinal=partiFormula.join('-');
    textEl.innerText=textFinal;
}

// initialize checkboxes when page loads
document.addEventListener('DOMContentLoaded', genereazaCheckboxuri);
