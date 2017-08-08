var nom = document.getElementById('nom');
var prenom = document.getElementById('prenom');
var mail = document.getElementById('mail');
var msgDef = document.getElementById('msg');
var form = document.getElementById('form');
var msgOk = document.getElementById('msgOk');
var closeMsg = document.getElementById('closeMsg');
var continent = document.getElementById('continent');
var pays = document.getElementById('pays');
var regEmail = new RegExp('^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$','i');

// Affiche un message si un des champs est non valide
function ctrlForm(){
  msgDef.textContent= (nom.value == '') ?
      msgDef.textContent=`Veuillez indiquer votre nom`:
      (prenom.value == '') ?
          msgDef.textContent=`Veuillez indiquer votre prénom`:
          (mail.value == '') ?
              msgDef.textContent=`Veuillez indiquer votre mail`:
                (!regEmail.test(mail.value)) ?
                    'Votre mail n\'est pas valide' : '';
  nom.style.backgroundColor = (nom.value == '') ? '#FAA' : 'white';
  prenom.style.backgroundColor = (prenom.value == '') ? '#FAA' : 'white';
  mail.style.backgroundColor = (mail.value == '')||(!regEmail.test(mail.value)) ? '#FAA' : 'white';
}
//Affiche une validation si les champs sont OK
function displayMsg(event){
  event.preventDefault();
  if(msgDef.textContent===''){
      msgOk.style.display = 'block';
  }
}
//Ferme la validation
function fctCloseMsg(event){
  msgOk.style.display = 'none';
}
//Charge les pays du contient sélectionné
function chgContinent(){
  //initialise la liste déroulante
  pays.innerHTML = "";
  //ajoute les nouvelles valeurs
  ajaxGet(`http://localhost/${continent.value}.json`, function (response)
  {
  	// Transforme la réponse en tableau d'objets JavaScript
  	var selectedCountry = JSON.parse(response);
  	// Affiche le titre de chaque tableau
  	selectedCountry.forEach(function (country){
        pays.innerHTML +=`<option value="${country.nom}">${country.nom}</option>`;
  	})
  });
}
nom.addEventListener("blur", ctrlForm);
prenom.addEventListener("blur", ctrlForm);
mail.addEventListener("blur", ctrlForm);

form.addEventListener("submit", displayMsg);
closeMsg.addEventListener("click", fctCloseMsg);
continent.addEventListener("change", chgContinent);
