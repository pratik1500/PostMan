console.log('This is my project 6 from java script course');

// utility function
// 1. utility funciton to  get DOM fucntion from string
function getElementFromString(string) {
    let div = document.createElement('div');
    div.innerHTML = string;
    return div.firstElementChild;
}


//  intialize no of parameters
let addedParamsCount =0;
// hide the parameters box intially
let parametersBox = document.getElementById('parametersBox');
parametersBox.style.display = 'none';

// If the user clicks on params box, hide the json box
let paramsRadio = document.getElementById('paramsRadio');
paramsRadio.addEventListener('click', () => {
    document.getElementById('requestJsonBox').style.display = 'none';
    document.getElementById('parametersBox').style.display = 'block';
})

// If the user clicks on json box, hide the params box
let jsonRadio = document.getElementById('jsonRadio');
jsonRadio.addEventListener('click', function() {
    document.getElementById('requestJsonBox').style.display = 'block';
    document.getElementById('parametersBox').style.display = 'none';
})

// If the user clicks on + button add more parameters

let addParam = document.getElementById("addParam");
addParam.addEventListener('click',()=>{
    let params = document.getElementById('params');
    let string = `<div class="form-row my-2">
                        <label for="url" class="col-sm-2 col-form-label">Parameter ${addedParamsCount+2}</label>
                        <div class=" col-md-4">
                        <input type="text" class="form-control" id="parameterKey${addedParamsCount+2}" placeholder="Enter Parameter ${addedParamsCount+2} key">
                        </div>
                        <div class=" col-md-4">
                        <input type="text" class="form-control" id="parameterValue${addedParamsCount+2}" placeholder="Enter Parameter ${addedParamsCount+2} Value">
                        </div>
                        <button class="btn btn-primary deleteParam">-</button>
                    </div>
                `
    addedParamsCount++;
    // convert the element string to dom node
    let paramElement = getElementFromString(string);
    params.appendChild(paramElement)
    // add an event listner to remove the parameters on clicking - button
    let deleteParam = document.getElementsByClassName('deleteParam');
    for(item of deleteParam){
        // add a confirmation box t oconfirm parameter deletion
        item.addEventListener('click',(e)=>{
            e.target.parentElement.remove();
        })
    }
})

//  if the user clicks on the submit button

let submit = document.getElementById('submit');
submit.addEventListener('click', () => {
    // Show please wait in the response box to request patience from the user
    // document.getElementById('responseJsonText').value = "Please wait.. Fetching response...";
    document.getElementById('responsePrism').innerHTML = "Please wait.. Fetching response...";
    

    // fetch all the value user has entered
    let url = document.getElementById('url').value;
    let requestType = document.querySelector("input[name='requestType']:checked").value;
    let contentType = document.querySelector("input[name='contentType']:checked").value;
 
    // log all the values in the console for debugging  


    // If user has used params option instead of json, collect all the parameters in an object
    if (contentType == 'params') {
        data = {};
        for (let i = 0; i < addedParamsCount + 1; i++) {
            if (document.getElementById('parameterKey' + (i + 1)) != undefined) {
                let key = document.getElementById('parameterKey' + (i + 1)).value;
                let value = document.getElementById('parameterValue' + (i + 1)).value;
                data[key] = value; 
            }
        }
        data = JSON.stringify(data);
    }else{
        data = document.getElementById('requestJsonText').value;
    }


    console.log('url is',url);
    console.log('requesttype is',requestType);
    console.log('contentType is',contentType);
    console.log('Data is',data);

    // if the requestType is GET, invoke fetch api to create a GET request
    if(requestType=="GET"){
        fetch(url,{
            method:'GET',
        })
        .then(response => response.text())
        .then((text)=> {
            document.getElementById('responsePrism').innerHTML = text;
        })
    }
    else{
        fetch(url, {
            method: 'POST', 
            body: data,
            headers: {
                "Content-type": "application/json; charset=UTF-8"
              }  
        })
        .then(response=> response.text())
        .then((text) =>{
            // document.getElementById('responseJsonText').value = text;
            document.getElementById('responsePrism').innerHTML = text;
        });

    }

})





