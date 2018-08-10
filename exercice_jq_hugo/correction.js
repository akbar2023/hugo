$(function(params){
    // alert('Hello !')

// Déclare mon tableau
var tableauContact = [];

//vérifier l'addresse email
function emailValide(email){
    // La regex est une expression régulière ou exression normal ou expression rationnelle ou motif qui s'écrit selon une syntaxe précise , un ensemble de chaîne de caractère possible
    var reg = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    
    return reg.test(String(email).toLowerCase());
}

// Vérifier le téléphone
var telephone = tel => {
    var telReg = new RegExp("(0|\\+33|0033)[1-9][0-9]{8}");
    return telReg.test(tel);
}

$('#contact').on('submit', function(e) {
   e.preventDefault(); 

//    Récupère les champs à vérifier
    var nom = $('#nom'),
    prenom = $('#prenom'),
    email = $('#email'),
    tel = $('#tel');

    // Vérification des informations
    var mesInformationsSontValides = true;

    // Vérification nom
    if(nom.val().length === 0) {
        // Le champs est incorrect car vide
        mesInformationsSontValides = false;
    }

    // Vérification email
    if(!emailValide(email.val())) {
        mesInformationsSontValides = false;
    }

    // Vérification tel
    if(!telephone(tel.val())) {
        mesInformationsSontValides = false;
    }

    if (mesInformationsSontValides) {
        // Une fois qu'on tous vérifié on créé l'objet contact
        var Contact = {
            //Clé          //Valeur
            nom:        nom.val(),
            prenom:   prenom.val(),
            email:      email.val(),
            tel:           tel.val()
        };

        // Verifie si un contact est présent
        var leContactEstDejaPresent = false;


        // Parcourir le tableau de contact
        for(var i = 0; i < tableauContact.length; i++) {
            if (Contact.email === tableauContact[i].email) {
                leContactEstDejaPresent = true;
                break;
            }
        }


        if (!leContactEstDejaPresent) {
            // Ajoute le contact
            tableauContact.push(Contact);

            // Mettre à joutr le tableau HTML

            $('.aucuncontact').hide();


            $(`<tr>
                    <td>${Contact.nom}</td>
                    <td>${Contact.prenom}</td>
                    <td>${Contact.email}</td>
                    <td>${Contact.tel}</td>
                </tr>`
            ).appendTo($('#LesContacts > tbody'));


            // Rénitialiser le formulaire

            $('#contact')[0].reset();
            $('#contact').get(0).reset();
            $('#contact').trigger('reset');
            $('#contact .form-control').val('');
            document.getElementById('contact').reset();


            $('.alert-contact').fadeIn().delay(4000).fadeOut();
        } else {
            alert('Ce contact existe déjà !!!');
            $('#contact').get(0).reset();
        }
    } else {
        alert('Veuillez renseigné tous les champs !!');
    }



});





});  // fin doc ready