let w = window.innerWidth;
let h = window.innerHeight;

function reject(){
    document.getElementById('age-modal-content').innerHTML = 
    '<p> Get Yo dumbass outta here </p>';
    setTimeout(function() {
        window.close();
    }, 3000); // 3 seconds delay
}


window.onload = function(){

    // Age verification logic
    if (!sessionStorage.getItem('ageVerified')) {
        const modal = document.getElementById('age-check-modal');
        modal.style.display = 'block';

        document.getElementById('confirm-age').addEventListener('click', function() {
            sessionStorage.setItem('ageVerified', 'true');
            modal.style.display = 'none';
        });
    }

    console.log("Width: "+ w + " | Height: "+ h);
    document.getElementById("flowerBg").style.backgroundImage = "url('images/flowersbg1.jpeg')";
    document.getElementById("grabaBg").style.backgroundImage = "url('images/grabaBg1.jpeg')";
}

