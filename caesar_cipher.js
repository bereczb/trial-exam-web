'use strict';

var button = document.querySelector('.button');
var encryptedText = document.querySelector('.encrypted_text');
var shift = document.querySelector('.shift');
var dataToSend = {};
var APIEndpoint = 'http://localhost:3000/';


button.addEventListener('click', function() {
   ajax('GET', 'decode/all', dataToSend, render);
   if (encryptedText.value != '' && shift.value) {
      dataToSend = {
         shift: shift.value,
         text: encryptedText.value
      };
      console.log(dataToSend);
      ajax('POST', 'decode', dataToSend)
   }
});

function ajax(method, resource, data, callback){
   var xhr = new XMLHttpRequest();
   console.log(method, APIEndpoint + resource);
   xhr.open(method, APIEndpoint + resource);
   if( method != 'GET' ) {
      xhr.setRequestHeader('Content-Type', 'application/json')
      xhr.send(JSON.stringify(data));
   } else {
      xhr.send();
   };
   xhr.onreadystatechange = function (rsp) {
      if ( xhr.readyState === XMLHttpRequest.DONE ) {
         callback( JSON.parse(xhr.response));
      }
   }
};

function render(data){
   console.log(data);
}
