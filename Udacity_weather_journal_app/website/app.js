/* Global Variables */
const key = '&appid=9f15e45060210ec849a698b3298f0bed&units=imperial';
let city = 'zip=';
const baseURI = `http://api.openweathermap.org/data/2.5/forecast?`;


// Create a new date instance dynamically with JS
let d = new Date();
let newDate = d.getMonth() + '.' + d.getDate() + '.' + d.getFullYear();

const postData = async (url = '', data = {}) => {

 const response = await fetch(url, {
  method: 'POST',
  credentials: 'same-origin',
  headers: {
   'Content-Type': 'application/json',
  },
  body: JSON.stringify(data), // body data type must match "Content-Type" header        
 });
 try {
  const newData = await response.json();
  return newData;
 } catch (error) {
  console.log("error", error);
 }
};

const retrieveData = async (url = '') => {
 const request = await fetch(url)
 try {
  // Transform into JSON
  const allData = await request.json();
  return allData;
 } catch (error) {
  console.log("error", error);
  // appropriately handle the error
 }
};

let getuserresponse = (event) => {
 let citytosearch = document.getElementById("zip").value;
 retrieveData(baseURI + city + citytosearch.toString()+',us' + '&' + key)
  .then(
   (data) => {
    const Datatosave = {
     temperature: data.list[0].main.temp,
     date: newDate,
     user_response: document.querySelector("textarea").value
    }
    postData('/POSTDATA', Datatosave)
   }
  )
  .then(
   () => {
    return retrieveData("/ALL")
   }).then((data) => {
   document.getElementById("date").innerText = data.date;
   document.getElementById("temp").innerText = data.temperature.toString();
   document.getElementById("content").innerText = data.user_response;
  });
};

document.getElementById("generate").addEventListener("click", getuserresponse);
