//In this practice I uses promises, arrow functions, operator conditional
//and template strings
let XMLHttpRequest = require('xmlhttprequest').XMLHttpRequest;
//Require the xmlhttprequest module  for make HTTP requests from NodeJS.
let API = 'https://ghibliapi.herokuapp.com/films/';
//URL to get The Studio Ghibli Films

const fetchData = (url_api) => {

    return new Promise((resolve, reject) => {
    
        const xhttp = new XMLHttpRequest();//New XMLHttpRequest object
        xhttp.open('GET', url_api, true);//Initializes a request or re-initializes with the XMLHttpRequest method open()
        //The first parameter is the method (In this case GET to retrieve data from the API)
        //Second parameter is the url API
        //Third parameter is to indicate to perform the operation asynchronously
        xhttp.onreadystatechange = (() => {  //Define a arrow function to the
            //EventHandler, this function is called when the readyState attribute change
            if(xhttp.readyState === 4){
            //This property of the XMLHttpRequest object
            //returns the state an XMLHttpRequest client is in
            //4 when the operation is done
                (xhttp.status === 200)
                //This property of the XMLHttpRequest object
                //returns the numerical HTTP status code
                //200 when successful responses
                    //The operator conditional replace the if conditional
                    ? resolve(JSON.parse(xhttp.responseText))
                    //When the promise is resolve
                    //take the data from the API and use The method JSON.parse  
                    //to transform the data(is a text) in a JSON
                    : reject(new Error('Error', url_api))
                    //When the promise is reject, create a new error
                    //with the error from the request
            }
        })
        xhttp.send();
        //This method of the XMLHttpRequest object sends the request to the server
    })
}

fetchData(API)
    .then(data1 => {
        console.log(`The name of the movie is: ${data1[8].title}`);
        //Printing in console the data received from the API
        //when response is succesful
        return fetchData(`${data1[8].people[0]}`);
        // Return a again the function fetchData to do a new request
        //Template strings ` `
    })
    //The method .then return a promise resolve. That promise brings the
    //data request from the API. This is the first request to the API
    .then(data2 => {
        console.log(`The main character is: ${data2.name}`);
        return fetchData(data2.species);
    })
    //This is the second request to the API
    .then(data3 => {
        console.log(`His species is: ${data3.name}`);
    })
    //This is the third request to the API
    .catch(err => console.error(err));
    //The method .catch return a promise reject. That promise brings the
    //error in the request from the API

