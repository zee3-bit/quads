

// Get the button that opens the modal
let btn = document.getElementById("myBtn");
var images =[];
var names = [];
var prices = [];
var weights = [];
var quantities = [];

var totalWeight = 0;
var totalPrice = 0;

let kushName = [];
    let kushImage = [];
    let kushTHC = [];
    let kushStrain = [];
    let kush35Price = [];
    let kush7Price = [];
    let kush14Price = [];
    let kush28Price = [];
    let kushModal = [];
    let adjPrice = 0;

// When the user clicks the button, open the modal 
function openModal(dest) {

    // Use fetch to load the external HTML into the div
    fetch(dest)
        .then(response => {
            // Catch if the response is OK (status 200)
            if(!response.ok){
                throw new Error('Network response was not ok')
            }
            return response.text();
        })
        .then(data => {
            // Rewplace the innerHTML of the target element with the fetched HTML
            document.getElementById("myModal").innerHTML = data;
        })
        .catch(error => {
            console.error('There was a problem with the fetch operation:', error)
        }
    );
    
    //document.getElementById("car-info").style.display = "none";
    document.getElementById("myModal").style.display = "block";
}

function subtract(dest, weight, pricetag){ 
    console.log('Subtracting');
    let amount = document.getElementById(dest).innerText;
    let equal;
    if(amount > 1){
        equal = Number(amount) - 1;
        document.getElementById(dest).innerText = equal;
        console.log(equal);

        let x = document.getElementById(weight).selectedIndex;
    let itemVal = document.getElementById(weight).options[x].value;
    switch(x){
        case 0:
            var tmpVal7g = document.getElementById(weight).options[x+1].value;
            var tmpVal14g = document.getElementById(weight).options[x+2].value;
            var tmpVal28g = document.getElementById(weight).options[x+3].value;

            var ttlPrice = calc35gPrice(equal, itemVal, tmpVal7g, tmpVal14g, tmpVal28g);
            document.getElementById(pricetag).innerText = ttlPrice;
            break;
        case 1:
            var tmpVal14g = document.getElementById(weight).options[x+1].value;
            var tmpVal28g = document.getElementById(weight).options[x+2].value;

            var ttlPrice = calc7gPrice(equal, itemVal, tmpVal14g, tmpVal28g);
            document.getElementById(pricetag).innerText = ttlPrice;
            break;
        case 2:
            var tmpVal28g = document.getElementById(weight).options[x+1].value;

            var ttlPrice = calc14gPrice(equal, itemVal, tmpVal28g);
            document.getElementById(pricetag).innerText = ttlPrice;
            break;
        case 3:
            var ttlPrice = itemVal * equal;
            document.getElementById(pricetag).innerText = ttlPrice;
            break;
        default:
            console.log('Error: Invalid weight selected');
            break;
    }
    }else{
        equal = 1;
    }
}

function addition(dest, weight, pricetag){
    console.log('Adding');
    let amount = document.getElementById(dest).innerText;
    let equal = Number(amount) + 1;
    document.getElementById(dest).innerHTML = equal;
    console.log(equal);

    let x = document.getElementById(weight).selectedIndex;
    let itemVal = document.getElementById(weight).options[x].value;
    switch(x){
        case 0:
            var tmpVal7g = document.getElementById(weight).options[x+1].value;
            var tmpVal14g = document.getElementById(weight).options[x+2].value;
            var tmpVal28g = document.getElementById(weight).options[x+3].value;

            var ttlPrice = calc35gPrice(equal, itemVal, tmpVal7g, tmpVal14g, tmpVal28g);
            document.getElementById(pricetag).innerText = ttlPrice;
            break;
        case 1:
            var tmpVal14g = document.getElementById(weight).options[x+1].value;
            var tmpVal28g = document.getElementById(weight).options[x+2].value;

            var ttlPrice = calc7gPrice(equal, itemVal, tmpVal14g, tmpVal28g);
            document.getElementById(pricetag).innerText = ttlPrice;
            break;
        case 2:
            var tmpVal28g = document.getElementById(weight).options[x+1].value;

            var ttlPrice = calc14gPrice(equal, itemVal, tmpVal28g);
            document.getElementById(pricetag).innerText = ttlPrice;
            break;
        case 3:
            var ttlPrice = itemVal * equal;
            document.getElementById(pricetag).innerText = ttlPrice;
            break;
        default:
            console.log('Error: Invalid weight selected');
            break;
    }
}

function calc35gPrice(count, itemVal, tmpVal7g, tmpVal14g, tmpVal28g){
    let total = 0;
    while (count > 0){
        if(count >= 8){
            let num = Math.floor(count/8);
            count = count % 8;
            total = total + (tmpVal28g * num)
        }
        else if(count >= 4){
            let num = Math.floor(count/4);
            count = count % 4;
            total = total + (tmpVal14g * num)
        }
        else if(count >= 2){
            let num = Math.floor(count/2);
            count = count % 2;
            total = total + (tmpVal7g * num)
        }
        else{
            total = total + (itemVal * count);
            count = 0;
        }
    }
    return total;
}

function calc7gPrice(count, itemVal, tmpVal14g, tmpVal28g){
    let total = 0;
    while (count > 0){
        if(count >= 4){
            let num = Math.floor(count/4);
            count = count % 4;
            total = total + (tmpVal28g * num)
        }
        else if(count >= 2){
            let num = Math.floor(count/2);
            count = count % 2;
            total = total + (tmpVal14g * num)
        }
        else{
            total = total + (itemVal * count);
            count = 0;
        }
    }
    return total;
}

function calc14gPrice(count, itemVal, tmpVal28g){
    let total = 0;
    while (count > 0){
        if(count >= 2){
            let num = Math.floor(count/2);
            count = count % 2;
            total = total + (tmpVal28g * num)
        }
        else{
            total = total + (itemVal * count);
            count = 0;
        }
    }
    return total;
}

function reject(){
    document.getElementById('age-modal-content').innerHTML = 
    '<p> Get Yo dumbass outta here </p>';
    setTimeout(function() {
        window.close();
    }, 3000); // 3 seconds delay
}

function changePrice(tag, priceID){
    let x = event.target.selectedIndex;
    let itemVal = event.target.options[x].value;
    console.log(itemVal);
    let c = document.getElementById(tag).innerText;
    
    document.getElementById(priceID).innerText = itemVal * c;
    
}


// When the user clicks the exit button or anywhere outside of the modal, close it
window.onclick = function(event) {
  if (event.target == document.getElementById("myModal")|| event.target == document.getElementById("clsbtn")) {
    document.getElementById("myModal").style.display = "none";

  }
}

//////////////////////////////////////////////////////////////////////////////


function sidePanel(){

    document.getElementById("sidePanel").style.width = "30%";
    document.getElementById("sidePanel").style.padding = "10px";
    document.getElementById("sidePanel").style.fontSize = "15pt";
    document.getElementById("shopcartHolder").style.marginRight = "-100px";
    document.getElementById("body").style.width = "70%";
    document.getElementById("body").style.marginLeft = "30%";
    document.getElementById("total-holder").style.width = "30%";
    document.getElementById("total").innerHTML = totalPrice;
}

function hidePanel(ting){
    document.getElementById("sidePanel").style.width = "0";
    document.getElementById("sidePanel").style.padding = "0";
    document.getElementById("sidePanel").style.fontSize = "0";
    document.getElementById("body").style.width = "100%";
    document.getElementById("body").style.marginLeft = "0";
    document.getElementById("total-holder").style.width = "0";
    if(ting){
        document.getElementById("shopcartHolder").style.marginRight = "20px";
    }
    
}

function showCart(image, name, weight, price, quanatity){

    let widx = document.getElementById(weight).selectedIndex;
    let w1 = document.getElementById(weight).options[widx].innerHTML;
    let x = document.getElementById(weight).selectedIndex;
    let itemVal = document.getElementById(weight).options[x].value;
    pr1 = document.getElementById(price).innerText;
    q1 = document.getElementById(quanatity).innerText;
    n1 = document.getElementById(name).innerText;

    // MAke sure the total weight does not exceed 56g
    if( Number(w1 * q1) > 56 || Number(w1 * q1) + Number(totalWeight) > 56 || totalWeight == 56){
        console.log('Max scale reached ');
    }else{
        totalWeight += Number(w1 * q1);   
        totalPrice += Number(pr1);
        console.log(totalWeight);
        if(names.length < 1){
            // Add items to the array
            images.push(image);     
            names.push(n1);
            weights.push(w1);
            prices.push(pr1);
            quantities.push(q1);
    
            // Update the cart count
            let count = document.getElementById("cartCount").innerText;
            count = Number(count) + Number(1);
            console.log(images, names, weights, prices, quantities, count, totalWeight);
            document.getElementById("cartCount").innerHTML = count.toString();
            document.getElementById("shopcartHolder").style.marginRight = "20px";    // Show the cart icon
        }else{
            // Check if the item is already in the cart
            if(names.includes(n1) && weights.includes(w1)){
                let indx = names.indexOf(n1);
                let newQuan = Number(quantities[indx]) + Number(q1);
                // Increse the Price accorting to the total weight of the iTem
                switch(x){
                    case 0:
                        var tmpVal7g = document.getElementById(weight).options[x+1].value;
                        var tmpVal14g = document.getElementById(weight).options[x+2].value;
                        var tmpVal28g = document.getElementById(weight).options[x+3].value;
            
                        var newPrice = calc35gPrice(newQuan, itemVal, tmpVal7g, tmpVal14g, tmpVal28g);
                        break;
                    case 1:
                        var tmpVal14g = document.getElementById(weight).options[x+1].value;
                        var tmpVal28g = document.getElementById(weight).options[x+2].value;
            
                        var newPrice = calc7gPrice(newQuan, itemVal, tmpVal14g, tmpVal28g);
                        document.getElementById(pricetag).innerText = newPrice;
                        break;
                    case 2:
                        var tmpVal28g = document.getElementById(weight).options[x+1].value;
            
                        var newPrice = calc14gPrice(newQuan, itemVal, tmpVal28g);
                        document.getElementById(pricetag).innerText = newPrice;
                        break;
                    case 3:
                        var newPrice = itemVal * newQuan;
                        document.getElementById(pricetag).innerText = newPrice;
                        break;
                    default:
                        console.log('Error: Invalid weight selected');
                        break;
                }
                console.log(newQuan, newPrice);
                quantities[indx] = newQuan.toString();
                prices[indx] = newPrice.toString();
                console.log(quantities, prices);
            }else{
                images.push(image);
                names.push(n1);
                weights.push(w1);
                prices.push(pr1);
                quantities.push(q1);
                
                let count = document.getElementById("cartCount").innerText;
                count = Number(count) + Number(1);
                document.getElementById("cartCount").innerHTML = count.toString();
                console.log(images, names, weights, prices, quantities, count, totalWeight);
            }
        }     
    }
    
    reloadCart();
}

function reloadCart(){
    document.getElementById("cart-info").innerHTML = "";    // Clear the cart info
    totalPrice = 0;
    for(let i = 0; i < prices.length; i++){
        totalPrice += Number(prices[i]);
    }
    adjPrice = 0;
    document.getElementById("total").innerHTML = totalPrice;

    if(names.length > 1){
        if(totalWeight >= 14 && totalWeight < 28){
            document.getElementById("total").style.textDecorationLine = "line-through";
            adjPrice = totalPrice - Number(15);
            document.getElementById("adjTotal").innerHTML = ' $' + adjPrice;
            document.getElementById("adjTotal").style.color = "green";
    
        }
        else if(totalWeight >= 28 && totalWeight < 42){
            document.getElementById("total").style.textDecorationLine = "line-through";
            adjPrice = totalPrice - Number(30);
            document.getElementById("adjTotal").innerHTML = ' $' + adjPrice;
            document.getElementById("adjTotal").style.color = "green";
        }
        else if(totalWeight >= 42 && totalWeight < 56){
            document.getElementById("total").style.textDecorationLine = "line-through";
            adjPrice = totalPrice - Number(45);
            document.getElementById("adjTotal").innerHTML = ' $' + adjPrice;
            document.getElementById("adjTotal").style.color = "green";
        
        }else {
            document.getElementById("total").style.textDecorationLine = "none";
            document.getElementById("adjTotal").innerHTML = '';
            document.getElementById("adjTotal").style.color = "red";
        }
    }else{
        document.getElementById("total").style.textDecorationLine = "none";
        document.getElementById("adjTotal").innerHTML = '';
        document.getElementById("adjTotal").style.color = "red";
    }
    document.getElementById("totalWeight").innerHTML = totalWeight;   // Update the total weight

    // Save the cart items to local storage
    localStorage.setItem('images', JSON.stringify(images));
    localStorage.setItem('names', JSON.stringify(names));
    localStorage.setItem('prices', JSON.stringify(prices));
    localStorage.setItem('weights', JSON.stringify(weights));
    localStorage.setItem('quantities', JSON.stringify(quantities));
    localStorage.setItem('totalWeight', totalWeight);
    localStorage.setItem('totalPrice', totalPrice);

    for( let i=0; i<names.length; i++){
        document.getElementById("cart-info").innerHTML += 
        '<div class=\"cart-info-item\">' +
            '<div class=\"cart-info-item-name\">' +
                '<h3>'+names[i]+'</h3>' +
                '<p> Weight: '+weights[i]+'g</p>' +
                '<p> Quantity: '+quantities[i]+'</p>' +
                '<div class=\"cart-info-item-price\">' +
                    '<p>Price: $'+prices[i]+'</p>' +
                '</div>' +
                '<button class=\"cart-info-item-remove\" onclick=\"removeItem('+i+')\">Remove</button>' +
            '</div>' +
            '<img class=\"cart-info-item-img\" src='+images[i]+'>' +
        '</div>';
    } 
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
    let count = document.getElementById("cartCount").innerText;
    count = Number(count) - Number(1);
    document.getElementById("cartCount").innerHTML = count.toString();
    reloadCart();
    console.log(images, names, weights, prices, quantities, count, totalWeight);
    document.getElementById("total").innerHTML = totalPrice;    // Update the total price
    if(count == 0){
        document.getElementById("shopcartHolder").style.marginRight = "-100px";
        hidePanel(false);
    } 
}

function checkout(){
    console.log('Checking out');

    // Save the cart items to local storage
    localStorage.setItem('images', JSON.stringify(images));
    localStorage.setItem('names', JSON.stringify(names));
    localStorage.setItem('prices', JSON.stringify(prices));
    localStorage.setItem('weights', JSON.stringify(weights));
    localStorage.setItem('quantities', JSON.stringify(quantities));
    localStorage.setItem('totalWeight', totalWeight);

    // If the Price is Adjusted, then we pass the adjusteed price to the checkout page
    if(adjPrice > 0){
        localStorage.setItem('totalPrice', adjPrice);
    }else{
    localStorage.setItem('totalPrice', totalPrice);
    }
    // Clear the cart items from local storage

    // Load the checkout page
    hidePanel(true);
    window.location.href = "checkout.html";
}

function opModl(idx){
    document.getElementById("myModal").innerHTML = '';     // Clear the modal content

    document.getElementById("myModal").innerHTML =
    `<div class="modal-content" id="modal-content">
    <!-- Modal content -->
        <div class="close" id="clsbtn" >&times;</div>
        <div class="modal-car" id="modal-car">
            <div  class="modal-car-details1">
                <img class="modal-car-img" src=${kushImage[idx]}>
                <div class="modal-car-name">
                <h1><span id="name">${kushName[idx]}</span></h1>
                </div>
            </div>   
            <div class=" modal-car-details2">
                <div class="flower-det">
                    <div class="info-item">
                        <img class="info-item-img" src="images/icons/category.webp">
                        <p> ${kushStrain[idx]} </p>
                    </div>
                    <div class="info-item">
                        <img class="info-item-img" src="images/icons/percent.webp">
                        <p> ${kushTHC[idx]} </p>
                    </div>
                    <div class="info-item">
                        <img class="info-item-img" src="images/icons/price_tag.webp">
                        <label for="weight"> Weight: </label>
                        <select id="weight" onchange="changePrice('quant1', 'price')">
                            <option value=${kush35Price[idx]}> 3.5 </option>
                            <option value=${kush7Price[idx]}> 7 </option>
                            <option value=${kush14Price[idx]}> 14 </option>
                            <option value=${kush28Price[idx]}> 28 </option>
                        </select>
                    </div>
                </div>
                                
                <div class="flower-description">
                    <p>
                        Brief description of the kush
                    </p>
                </div>
                                
                <div class="add-section">
                    <div class="priceDiv">
                        Price : $<span class="price" id="price" value="35">${kush35Price[idx]}</span>
                    </div>
                    <div>Quantity: <span> <button class="quantBtn" onclick="subtract('quant1', 'weight', 'price')"> - </button> <span id="quant1" value="test" > 1 </span> <button class="quantBtn" onclick="addition('quant1', 'weight', 'price')"> + </button> </span></div>
                    <button class="cartBtn" id="add-to-cart" onclick="showCart('images/flower1.png','name', 'weight', 'price', 'quant1' )"> Add to Cart</button>
                </div>
            </div>   
        </div>
    </div>`

    document.getElementById("myModal").style.display = "block";
}

window.onload = function(event){

    // Age verification logic
    if (!sessionStorage.getItem('ageVerified')) {
        const modal = document.getElementById('age-check-modal');
        modal.style.display = 'block';

        document.getElementById('confirm-age').addEventListener('click', function() {
            sessionStorage.setItem('ageVerified', 'true');
            modal.style.display = 'none';
        });
    }
    
    event.preventDefault();

    

    fetch('flowers.txt')
        .then(response => {
            // Catch if the response is OK (status 200)
            if(!response.ok){
                throw new Error('Network response was not ok')
            }
            return response.text();
        })
        .then(data => {
            // Rewplace the innerHTML of the target element with the fetched HTML
            let thing = data.split('\n');
            for(let i=0; i<thing.length; i++){
                let word = thing[i].split('; ');
                kushName.push(word[0].split(': ')[1]);
                kushImage.push(word[1].split(': ')[1]);
                kushTHC.push(word[2].split(': ')[1]);
                kushStrain.push(word[3].split(': ')[1]);
                kush35Price.push(word[4].split(': ')[1]);
                kush7Price.push(word[5].split(': ')[1]);
                kush14Price.push(word[6].split(': ')[1]);
                kush28Price.push(word[7].split(': ')[1]);
                kushModal.push(word[8].split(': ')[1]);
                /*for(let a = 0; a < word.length; a++){
                    console.log(word[a].split(': ')[1]);
                }*/
            }
            console.log(kushName, kushImage, kushTHC, kushStrain, kush35Price, kush7Price, kush14Price, kush28Price);

            document.getElementById("card-holder").innerHTML = "<div id=\"myModal\" class=\"modal\"> </div>";    // Clear the cart info
            for( let i=0; i<kushName.length; i++){
                
                document.getElementById("card-holder").innerHTML += 
                    '<div class=\"brabus-card\" >'+
                        '<div class=\"img-holder\" onclick=\"opModl('+i+')\">' +
                            '<img class=\"brabus-card-img\" src='+ kushImage[i] +'>' +
                        '</div>'+
                        '<div class=\"car-info\" id=\"car-info\">'+
                            '<table>'+
                                '<tr >'+
                                    '<td class=\"lft-colm\">'+
                                        'Name :'+
                                    '</td>'+
                                    '<td class=\"right-colm\">'+
                                        '<span id=\"name'+(i+1)+'\">'+ kushName[i] +'</span>'+
                                    '</td>'+
                                '</tr>'+
                                '<tr>'+
                                    '<td class=\"lft-colm\">'+
                                        'THC :'+
                                    '</td>'+
                                    '<td class=\"right-colm\">'+
                                         kushTHC[i] +
                                    '</td>'+
                                '</tr>'+
                                '<tr>'+
                                    '<td class=\"lft-colm\">'+
                                        'Strain Type :'+
                                    '</td>'+
                                    '<td class=\"right-colm\">'+
                                         kushStrain[i] +
                                    '</td>'+
                                '</tr>'+
                                '<tr>'+
                                    '<td class=\"lft-colm\">'+
                                        '<label for=\"weight\"> Weight: </label>'+
                                    '</td>'+
                                    '<td class=\"right-colm\">'+
                                        '<select class=\"weights\" id=\"weight'+(i+1)+'\" onchange=\"changePrice(\'quantt'+(i+1)+'\', \'pricetag'+(i+1)+'\')\">'+
                                            '<option value='+kush35Price[i]+'>3.5</option>'+
                                            '<option value='+kush7Price[i]+'>7</option>'+
                                            '<option value='+kush14Price[i]+'>14</option>'+
                                            '<option value='+kush28Price[i]+'>28</option>'+
                                        '</select>'+
                                    '</td>'+
                                '</tr>'+
                                '<tr>'+
                                    '<td class=\"lft-colm\">'+
                                        'Price :'+
                                    '</td>'+
                                    '<td class=\"right-colm\">'+
                                        '$ <span id=\"pricetag'+(i+1)+'\">'+kush35Price[i]+'</span>'+
                                    '</td>'+
                                '</tr>'+
                            '</table>'+
                            '<div class=\"mini-add-section\">'+
                                '<div>Quantity: <span> <button class=\"quantBtn\" onclick=\"subtract(\'quantt'+(i+1)+'\', \'weight'+(i+1)+'\', \'pricetag'+(i+1)+'\')\"> - </button> <span id=\"quantt'+(i+1)+'\" value=\"test\" > 1 </span> <button class=\"quantBtn\" onclick=\"addition(\'quantt'+(i+1)+'\', \'weight'+(i+1)+'\', \'pricetag'+(i+1)+'\')\"> + </button> </span></div>'+
                                '<button class=\"cartBtn\" id=\"add-to-cart\" onclick=\"showCart(\''+ kushImage[i] +'\', \'name'+(i+1)+'\', \'weight'+(i+1)+'\', \'pricetag'+(i+1)+'\', \'quantt'+(i+1)+'\')"> Add to Cart</button>'+
                            '</div>'+
                        '</div>'+
                    '</div>'
            }
        })
        .catch(error => {
            console.error('There was a problem with the fetch operation:', error)
        }
    );

    if(names == null){
        images = JSON.parse(localStorage.getItem('images'));
        names = JSON.parse(localStorage.getItem('names'));
        prices = JSON.parse(localStorage.getItem('prices'));
        weights = JSON.parse(localStorage.getItem('weights'));
        quantities = JSON.parse(localStorage.getItem('quantities'));
        totalWeight = Number(localStorage.getItem('totalWeight'));
        totalPrice = Number(localStorage.getItem('totalPrice'));
        console.log(images, names, prices, weights, quantities, totalWeight, '$'+totalPrice);

        if(names.length >= 1){
            document.getElementById("shopcartHolder").style.marginRight = "20px";    // Show the cart icon
            document.getElementById("cartCount").innerHTML = names.length.toString();    // Update the cart count
            document.getElementById("cart-info").innerHTML = "";    // Clear the cart info
            for( let i=0; i<names.length; i++){
                
                document.getElementById("cart-info").innerHTML += 
                '<div class=\"cart-info-item\">' +
                    '<div class=\"cart-info-item-name\">' +
                        '<h3>'+names[i]+'</h3>' +
                        '<p> Weight: '+weights[i]+'g</p>' +
                        '<p> Quantity: '+quantities[i]+'</p>' +
                        '<div class=\"cart-info-item-price\">' +
                            '<p>Price: $'+prices[i]+'</p>' +
                        '</div>' +
                        '<button class=\"cart-info-item-remove\" onclick=\"removeItem('+i+')\">Remove</button>' +
                    '</div>' +
                    '<img class=\"cart-info-item-img\" src='+images[i]+'>' +
                '</div>';
            }     
        }    
    }

}

