'use strict';

var decrypter = function (text, shift){
   var text = text.toLowerCase();
   var textArray = text.split('');
   var encryptedText = '';
   var ascii;
   var newAscii;
   var shift = Number(shift);
   console.log(textArray);
   console.log('shift', shift);

   textArray.forEach(function(string) {
      ascii = string.charCodeAt(0);
      if (string.search(/[^a-zA-Z]+/) === -1){
         newAscii = ascii + shift;
         if (newAscii > 122) {
            newAscii -= 26;
         } else if(newAscii < 97) {
            newAscii += 26;
         }
         encryptedText += String.fromCharCode(newAscii);
      } else {
         encryptedText += String.fromCharCode(ascii);
      }
      console.log('old', string.charCodeAt(0));
      console.log('new', newAscii);
   });
   console.log('decrypter', encryptedText);
   return encryptedText;
}

module.exports = decrypter;
