var checkButton = document.getElementById('checkButton');
var modal = document.getElementById('modal');


let nameText = document.getElementById('nameText');
let msg = document.getElementById('msg');


/**/
checkButton.addEventListener('click', function() {
    modal.style.display = 'block';
    console.log(nameText.value);
    msg.innerHTML = nameText.value;
});



/**/ 
window.addEventListener('click', function(e) {
    if (e.target == modal) {
        modal.style.display = 'none';
    }
});


/*happiness*/
var happiness = document.getElementById('happiness');
var modal_sound_happiness = document.getElementById('modal-sound-happiness');

happiness.addEventListener('click', function() {
    modal_sound_happiness.style.display = 'block';
});

window.addEventListener('click', function(e) {
    if (e.target == modal_sound_happiness) {
        modal_sound_happiness.style.display = 'none';
    }
});


/*excite*/
var excite = document.getElementById('excite');
var modal_sound_excite = document.getElementById('modal-sound-excite');

excite.addEventListener('click', function() {
    modal_sound_excite.style.display = 'block';
});

window.addEventListener('click', function(e) {
    if (e.target == modal_sound_excite) {
        modal_sound_excite.style.display = 'none';
    }
});


/*laugh*/
var laugh = document.getElementById('laugh');
var modal_sound_laugh = document.getElementById('modal-sound-laugh');

laugh.addEventListener('click', function() {
    modal_sound_laugh.style.display = 'block';
});

window.addEventListener('click', function(e) {
    if (e.target == modal_sound_laugh) {
        modal_sound_laugh.style.display = 'none';
    }
});


/*ovation*/
var ovation = document.getElementById('ovation');
var modal_sound_ovation = document.getElementById('modal-sound-ovation');

ovation.addEventListener('click', function() {
    modal_sound_ovation.style.display = 'block';
});

window.addEventListener('click', function(e) {
    if (e.target == modal_sound_ovation) {
        modal_sound_ovation.style.display = 'none';
    }
});


/*discouragement*/
var discouragement = document.getElementById('discouragement');
var modal_sound_discouragement = document.getElementById('modal-sound-discouragement');

discouragement.addEventListener('click', function() {
    modal_sound_discouragement.style.display = 'block';
});

window.addEventListener('click', function(e) {
    if (e.target == modal_sound_discouragement) {
        modal_sound_discouragement.style.display = 'none';
    }
});





