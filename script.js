const aminoacizi = [
    {nume: 'Gly', c: 2 },
    {nume: 'Ala', c: 3 },
    {nume: 'Ser', c: 3 },
    {nume: 'Cys', c: 3 },
    {nume: 'Asp', c: 4 },
    {nume: 'Val', c: 5 },
    {nume: 'Orn', c: 5 },
    {nume: 'Glu', c: 5 },
    {nume: 'Leu', c: 6 },
    {nume: 'Ile', c: 6 },
    {nume: 'Lys', c: 6 }
]

function sliderVal(val){
    document.getElementById('carbonVal').innerText=val;
}

function genereaza(){
    const nrC=parseInt(document.getElementById('carbonslider').value);

    if (isNaN(nrC)) {
        console.error("Eroare: Nu s-a putut citi numărul de carboni!");
        return;
    }

    const rezultate=[];
    function back(curentC, anterioriC){ //anterioriC e un vector unde tinem minte ce C am pus deja in secventa
        if(curentC==nrC){
            rezultate.push(anterioriC.join('-'));
            return;
        }
        if(curentC>nrC)return;
        for(let i=0; i<aminoacizi.length; i++){
            anterioriC.push(aminoacizi[i].nume);
            back(curentC+aminoacizi[i].c, anterioriC);
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
        mesajElement.innerText ="Nu s-au gasit combinatii exacte";
        mesajElement.style.color="red";
        cutieElement.innerText="";
        return;
    }
    mesajElement.style.color = "#15063d";
    mesajElement.innerText = "S-au gasit " + rez.length + " peptide:";
    const text = rez.join('\n');
    cutieElement.innerText=text;
}

const rezultatePentru5 = genereaza(5);

console.log("S-au găsit " + rezultatePentru5.length + " combinații:");
console.log(rezultatePentru5);