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



