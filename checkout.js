(function() {
    // https://dashboard.emailjs.com/admin/account
    emailjs.init({
      publicKey: "80i0KcimT2y-vtR0u",
    });
})();

var images;
var names;
var prices;
var weights;
var quantities;
var totalWeight = 0;
var totalPrice = 0;
var DiscountPrice =0;

const Codes = ["123456"];
const codeOwner = ["Muiz"];
var usePromo = false;
var referedBy = "None";
const msg = document.querySelector(".form-message");
const form = document.querySelector(".chckoutForm");

/*let autocomplete;
let address1Field;
let address2Field;
let postalField;

function initAutocomplete() {
    // Create the autocomplete object, restricting the search predictions to geographical
    // location types.
    address1Field = document.getElementById("address1");
    address2Field = document.getElementById("address2");
    postalField = document.getElementById("postal");
    autocomplete = new google.maps.places.Autocomplete( address1Field, {
        componentRestrictions: {country: "ca"},
        fields: ["address_components", "geometry"],
        types: ["address"]
    });


    // When the user selects an address from the dropdown, populate the address fields in
    // the form.
    autocomplete.addListener("place_changed", fillInAddress);
}

function fillInAddress() {
    // Get the place details from the autocomplete object.
    const place = autocomplete.getPlace();
    let address1 = "";
    let postcode = "";



    // Get the address components
    for(const component of place.address_components){
        const componentType = component.types[0];

        switch(componentType) {
            case "street_number":
                address1 = '$(component.long_name) $(address1)';
                break;
            case "route":
                address1 += component.short_name;
                break;
            case "postal_code":
                postcode = component.long_name + postcode;
                break;
            case "postal_code_suffix":
                postcode = postcode + component.long_name;
                break;
            case "locality":
                document.querySelector("#locality").value = component.long_name;
                break;
            case "administrative_area_level_1":
                document.querySelector("#state").value = component.long_name;
                break;
            case "country":
                document.querySelector("#country").value = component.long_name;
                break;
        }
    }

    address1Field.value = address1;
    postalField.value = postcode;
    // After filling the form with address components from the Autocomplete
    // prediction, set cursor focus on the second address line to encourage
    // entry of subpremise information such as apartment, unit, or floor number.
    address2Field.focus();
}*/



async function sendInfo(){
    const url = 'http://localhost:5500/api/orders';
    const name = document.querySelector(".name").value;
    const email = document.querySelector(".email").value;
    const address = document.querySelector("#address1").value;
    const phone = document.querySelector(".phoneNumber").value

    // Gather data from checkout-items
    try{
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                name: name,
                email: email,
                address: address,
                phone: Number(phone),
                items: names,
                price: usePromo ? Number(DiscountPrice) : Number(totalPrice),
            }),
        });
        const data = await response.text();
        console.log(data);
    }
    catch(error){
        console.log(error);
    }
}

function sendMail() {
    const name = document.querySelector(".name").value;
    const email = document.querySelector(".email").value;
    const address = document.querySelector("#address1").value;
    const phoneNumber = document.querySelector(".phoneNumber").value;
    const deliveryDetails = document.querySelector(".deliveryDets").value;

    // Gather data from checkout-items
    var itemsHtml = "";
    
    //totalPrice = 0;
    for( let i=0; i<names.length; i++){
        totalWeight += weights[i]*quantities[i];
        //totalPrice += Number(prices[i]);
        itemsHtml += '<div class=\"checkout-item\">'
                    + '<h3>'+names[i]+'</h3>' 
                    + '<p> Weight: '+weights[i]+'g</p>' 
                    + '<p> Quantity: '+quantities[i]+'</p>'
                    + '<p> Price: $'+prices[i]+'</p>'
                    + '</div>';
    }
    if(usePromo){
        itemsHtml += '<div style=\"text-align: center;\"> <h3>Total Price: $'+DiscountPrice+'</h3> </div>';
    }
    else{
        itemsHtml += '<div style=\"text-align: center;\"> <h3>Total Price: $'+totalPrice+'</h3> </div>';
    }

    const templateParams = {
        name: name,
        email: email,
        address: address,
        phoneNumber: phoneNumber,
        deliveryDets: deliveryDetails,
        refered : referedBy,
        items: itemsHtml
    };

    emailjs.send('service_k6awj9u', 'template_py1bxaj', templateParams)
    .then(() => {
        console.log('SUCCESS!');
        document.getElementById('contact-form').reset();
        document.querySelector('.loader').style.display = 'none';
        msg.innerHTML = "";
        msg.innerHTML = "<span class='success'>Message sent successfully!</span>";
        msg.style.display = 'block';
        setTimeout(() => {      // Hide the message after 2 seconds
            msg.style.display = 'none';
        }, 2000);

        // Append the order data to the orders array in sessionStorage
        const orders = JSON.parse(sessionStorage.getItem('orders')) || [];
        const newOrder = {
            name: name,
            email: email,
            address: address,
            phoneNumber: phoneNumber,
            items: names,
            totalPrice: usePromo ? DiscountPrice : totalPrice

        };
        orders.push(newOrder);
        sessionStorage.setItem('orders', JSON.stringify(orders));

        localStorage.clear();   // Clear the cart after sending the order   
        document.getElementById('contact-form').reset();
        document.getElementById("checkout-items").innerHTML = "";    // Clear the cart info
        document.getElementById("check-total").innerHTML = 0;    // Update the total price
        window.alert("Order sent successfully!, keep an eye on your email for further details");
    }, function (error){
        msg.innerHTML = "<span class='error-msg'>Failed to send message</span>";
        document.querySelector('.loader').style.display = 'none';
        msg.style.display = 'block';   
    });
}

function reloadCart(){
    document.getElementById("checkout-items").innerHTML = "";    // Clear the cart info

    // Save the cart items to local storage
    localStorage.setItem('images', JSON.stringify(images));
    localStorage.setItem('names', JSON.stringify(names));
    localStorage.setItem('prices', JSON.stringify(prices));
    localStorage.setItem('weights', JSON.stringify(weights));
    localStorage.setItem('quantities', JSON.stringify(quantities));
    localStorage.setItem('totalWeight', totalWeight);

    // Calculate the total price and save it to local storage
    totalPrice = 0; 
    for( let x of prices){
        totalPrice += Number(x);
    }
    localStorage.setItem('totalPrice', totalPrice);

    for( let i=0; i<names.length; i++){
        document.getElementById("checkout-items").innerHTML += 
        '<div class=\"checkout-item\">' +
            '<div class=\"checkout-item-name\">' +
                '<h3>'+names[i]+'</h3>' +
                '<p> Weight: '+weights[i]+'g</p>' +
                '<p> Quantity: '+quantities[i]+'</p>' +
                '<div class=\"checkout-item-price\">' +
                    '<p>Price: $'+prices[i]+'</p>' +
                '</div>' +
                '<button class=\"checkout-item-remove\" onclick=\"removeItem('+i+')\">Remove</button>' +
            '</div>' +
            '<img class=\"checkout-item-img\" src='+images[i]+'>' +
        '</div>';
    } 
    document.getElementById("check-total").innerHTML = totalPrice;
    
}

function removeItem(index){
    console.log('Removing item');
    totalWeight = Number(totalWeight) - Number(weights[index] * quantities[index]);
    totalPrice = Number(totalPrice) - Number(prices[index]);
    images.splice(index, 1);
    names.splice(index, 1);
    weights.splice(index, 1);
    prices.splice(index, 1);
    quantities.splice(index, 1);
    reloadCart();
    console.log(images, names, weights, prices, quantities, totalWeight);
}

function nterPromo(){
    document.getElementById("promoField").style.display = 'block';
    document.getElementById('promoBtn1').style.display = 'none';
    document.getElementById('promoBtn2').style.display = 'block';

}

function sumitPromo(){
    document.getElementById("promoField").style.display = 'none';
    document.getElementById('promoBtn1').style.display = 'block';
    document.getElementById('promoBtn2').style.display = 'none';

    var inp = document.querySelector("#promoField").value;
    
    for(var i=0; i<Codes.length; i++){
        if(inp == Codes[i]){
            document.getElementById('promoOwner').innerHTML = "Thanks for using "+codeOwner[i]+"'s referral !!";
            usePromo = true;
            DiscountPrice = totalPrice * 0.9;
            document.getElementById("check-total").style.textDecoration = 'line-through';
            document.getElementById('total').innerHTML += " = $"+DiscountPrice;    // Update the total price
            referedBy = codeOwner[i];
            break;
        }
    }
    if(!usePromo){
        document.getElementById('promoOWner').innerHTML = "That code is not valid";
    }
    console.log("DO thing");
}
//window.initAutocomplete = initAutocomplete;
window.onload = function(){

    images = JSON.parse(localStorage.getItem('images'));
    names = JSON.parse(localStorage.getItem('names'));
    prices = JSON.parse(localStorage.getItem('prices'));
    weights = JSON.parse(localStorage.getItem('weights'));
    quantities = JSON.parse(localStorage.getItem('quantities'));
    totalWeight = localStorage.getItem('totalWeight');
    totalPrice =localStorage.getItem('totalPrice');

    console.log(images, names, prices, weights, quantities, totalWeight, '$'+totalPrice);

    document.getElementById("checkout-items").innerHTML = "";    // Clear the cart info
    if(names != null){
        for( let i=0; i<names.length; i++){
        
            document.getElementById("checkout-items").innerHTML += 
            '<div class=\"checkout-item\">' +
                '<div class=\"checkout-item-name\">' +
                    '<h3>'+names[i]+'</h3>' +
                    '<p> Weight: '+weights[i]+'g</p>' +
                    '<p> Quantity: '+quantities[i]+'</p>' +
                    '<div class=\"checkout-item-price\">' +
                        '<p>Price: $'+prices[i]+'</p>' +
                    '</div>' +
                    '<button class=\"checkout-item-remove\" onclick=\"removeItem('+i+')\">Remove</button>' +
                '</div>' +
                '<img class=\"checkout-item-img\" src='+images[i]+'>' +
            '</div>';
        }
    }
    document.getElementById("check-total").innerHTML = (totalPrice == null)? 0 : totalPrice;    // Update the total price

    document.getElementById('contact-form').addEventListener('submit', function(event) {
        event.preventDefault();
        document.querySelector('.loader').style.display = 'block';
        // these IDs from the previous steps
        /*emailjs.sendForm('service_k6awj9u', 'template_py1bxaj', this)
            .then(() => {
                console.log('SUCCESS!');
                document.getElementById('contact-form').reset();
                document.querySelector('.loader').style.display = 'none';
                msg.innerHTML = "";
                msg.innerHTML = "<span class='success'>Message sent successfully!</span>";
                msg.style.display = 'block';
                setTimeout(() => {      // Hide the message after 2 seconds
                    msg.style.display = 'none';
                }, 2000);
            }, function (error){
                msg.innerHTML = "<span class='error-msg'>Failed to send message</span>";
                document.querySelector('.loader').style.display = 'none';
                msg.style.display = 'block';   
            }
        );*/

        if(names.length >= 1 && names != null){
            sendMail();
            sendInfo();
        }
        
    });
}