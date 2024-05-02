var bouton_id = document.getElementById('bouton_id')
var nom = document.getElementById('nom')
var nature = document.getElementById('nature')
var box = document.getElementById('box')
var pdf_box = document.getElementById('pdf_box')

bouton_id.onclick = function(){
    if(nom.value.length > 0){
        if(nom.value.length < 50){
            //Generer le codeBarre
            box.innerHTML = "<svg id='barcode'></svg>";
            JsBarcode("#barcode", nature.value+nom.value,{
                displayValue: false
            });
            box.style.border = '1px solid #999';

            //Creer un bouton de telechargement du code
            pdf_box.innerHTML = "<button onclick='genererPDF()'>Télécharger le Code Barre</button>";
            pdf_box.style.marginTop="10px";
            pdf_box.style.display="flex";

        }else{
            box.style.border = "0";
            box.innerHTML="<p class='error'>Le texte trop long !</p>";
            pdf_box.style.display = "none";
        }
    }else{
        box.style.border = "0";
        box.innerHTML="<p class='error'>Remplissez le champ</p>";
        pdf_box.style.display = "none";
    }
}
function genererPDF(){
    var opt = {
    margin:       1,
    filename:     `${nature.value}${nom.value}.pdf`,
    image:        { type: 'jpeg', quality: 0.98 },
    html2canvas:  { scale: 2 },
    jsPDF:        { unit: 'in', format: 'letter', orientation: 'l' }
    };

    // New Promise-based usage:
    html2pdf().set(opt).from(box).save();

    // Old monolithic-style usage:
    //html2pdf(box, opt);
}
