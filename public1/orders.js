
let Names = [];
let Prices = [];
let Emails = [];
let Items = [];
let Phones = [];
let Dates = [];
let Comp = [];


let holder = null;  // Used to hold event target for the delete function
let  data = [];
let srtMode = 'Name'; // Used to hold the current sort mode

// Function to fetch orders from the api endpoint
async function test(mode){
    //const fetch = require('node-fetch');

    const url = 'http://localhost:5500/api/users';

    try {
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body:   JSON.stringify({
                inf : mode
            })
        });  // Fetch data from the api endpoint
        const info = await response.json(); // Convert the data to json that allows it toe be parsed easi
        tst = info.test; // Get the data from the response
        compIDs = info.comp; // Get the number of completed orders
        //console.log(data, compIDs);
        
        data = tst; // Assign the data to the global variable
        /*Names = data.name;
        Prices = data.price;
        Emails = data.email;
        Items = data.items;
        Phones = data.phone;
        Dates = data.date;
        Comp = data.comp;*/

        //console.log(Names, Prices, Emails, Items, Phones, Dates);
        sortTable('Name'); // Call the function to sort the table
        
    } catch (error) {
    console.error(error);
    }
}

function sortTable(sub) {
    const ordersTableBody = document.getElementById("orders-table-body");
        ordersTableBody.innerHTML = ""; // Clear the table body before adding new rows
        data.sort((a, b) => {     
            // Sort the data based on the selected column
            // Check the current sort mode and toggle it
            // If the current sort mode is the same as the selected column, toggle the sort order      
            switch(sub){
                case 'Name':
                    let tng = 0;
                    if(srtMode == 'Name'){
                        srtMode = 'Name';
                        tng++;
                    }
                    if(tng % 2 == 0)
                        return a.Name.localeCompare(b.Name);
                    else
                        return b.Name.localeCompare(a.Name);
                    
                case 'Email':
                     tng = 0;
                    if(srtMode == 'Email'){
                        srtMode = 'Email';
                        tng++;
                    }
                    if(tng % 2 == 0)
                        return a.Email.localeCompare(b.Email);
                    else
                        return b.Email.localeCompare(a.Email);

                case 'Phone':
                    tng = 0;
                    if(srtMode == 'Phone'){
                        srtMode = 'Phone';
                        tng++;
                    }
                    if(tng % 2 == 0)
                        return a.Phone.localeCompare(b.Phone);
                    else
                        return b.Phone.localeCompare(a.Phone);

                case 'Price':
                    tng = 0;
                    if(srtMode == 'Price'){
                        srtMode = 'Price';
                        tng++;
                    }
                    if(tng % 2 == 0)
                        return a.Price - b.Price;
                    else
                        return b.Price - a.Price;
                
                default:
                    return 0;
            }
        });
        for(var i=0; i<data.length; i++){
            // Convert the iTems array into List items for display
            var itemsList = "";
            for(var j=0; j<data[i].Items.length; j++){
                itemsList+=  '<li>'+data[i].Items[j]+'</li>';
            }
            let filler = "";
            if(!compIDs.includes(data[i]._id)){
                filler = `
                    <td>
                        <select id=\"order-status\" class=\"status-select\" onchange=\"DeleteCell(\'order-row${i + 1}\')\" >
                            <option value=\"pending\" data-color=\"yellow\">Pending</option>
                            <option value=\"shipped\" data-color=\"lightblue\">Shipped</option>
                            <option value=\"delivered\" data-color=\"lightgreen\">Delivered</option>
                            <option value=\"cancelled\" data-color=\"lightcoral\">Cancelled</option>
                        </select>
                    </td>`;
            }else{
                filler =  "<td>Completed</td>";
            }
            ordersTableBody.innerHTML += 
                `<tr id=\'order-row${i + 1}\'>
                    <td>${i + 1}</td>
                    <td id=\'order-name\'>${data[i].Name}</td>
                    <td>${data[i].Email}</td>
                    <td>123 eld blvd</td>
                    <td>${data[i].Phone}</td>
                    <td><ul>${itemsList}</ul></td>
                    <td>${data[i].Price}</td>`  
                    +filler+                  
                ` </tr>`;
        }
}

// Function to delete a row from the table
function DeleteCell(inf){

    holder = inf;
    let $target = event.target;
    let x = $target.selectedIndex;
    let itemVal = $target.options[x].value;
    if(itemVal == "cancelled"){
        
        const modal = document.getElementById('cancelled-confirmation');
        modal.style.display = 'block';

        // If user clicks (NO) on the modal, close the modal and change the status back to pending
        document.getElementById('cancelled-decline').addEventListener('click', function(){
            modal.style.display = 'none';
            $target.value = "pending";
        });
            
    }else if(itemVal == "delivered"){
        const modal = document.getElementById('delivered-modal');
        modal.style.display = 'block';

        // If user clicks (NO) on the modal, close the modal and change the status back to pending
        document.getElementById('delivered-decline').addEventListener('click', function(){
            modal.style.display = 'none';
            $target.value = "pending";
        });
    }else{
        console.log("Order Status Changed");
    }
}

function filterOrders(){
    let x = event.target.selectedIndex;
    let currVal = event.target.options[x].value;

    test(currVal);
}

window.onload = function(){
    test(0);

    // Function to close the modal and remove that order from the DB
    document.getElementById('cancelled-confirm').addEventListener('click', async function() {
        document.getElementById('cancelled-confirmation').style.display = 'none';
        console.log("Order Cancelled");
        let a1 = document.getElementById(holder).children[0].innerText;   // Get the order number
        a1 = Number(a1) - 1;   // Convert the order number to an index
        const itmID = data[a1]._id;  // Get the order ID    
        console.log(itmID);

        // Send a request to the backend server to delete the order
        const url = 'http://localhost:5500/api/delete';
        try{
            const response = await fetch(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body:   JSON.stringify({
                    itemID : itmID
                })
            });
            console.log(a1);
            const data = await response.text();
            console.log(data);
            window.location.reload();

        }catch(error){
            console.error(error);
        }
    });

    // Function to close the modal and remove that order from the DB
    document.getElementById('delivered-confirm').addEventListener('click', async function() {
        document.getElementById('delivered-modal').style.display = 'none';
        console.log("Order Cancelled");
        let a2 = document.getElementById(holder).children[0].innerText;   // Get the order number
        a2 = Number(a2) - 1;   // Convert the order number to an index
        const itmID2 = data[a2]._id;  // Get the order ID    
        console.log(itmID2);

        // Send a request to the backend server to move the order
        const url = 'http://localhost:5500/api/move';
        try{
            const response = await fetch(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body:   JSON.stringify({
                    itemID : itmID2
                })
            });
            console.log("Moved Order Number: " + itmID2);
            const data = await response.text();
            console.log(data);
            window.location.reload();

        }catch(error){
            console.error(error);
        }
    });
    
    console.log("Done");
}
