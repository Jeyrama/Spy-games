/*
You're operating behind enemy lines, 
but your decryption device took a bullet and no longer operates. 

You need to write a code to unscramble the encrypted messages coming in from headquarters. 
Luckily, you remember how the encryption algorithm works.

Each message you receive is a single string, 
with the blocks for each letter separated by a space. 

The blocks encoding the characters are made up of 
seemingly random characters and are of a variable length. 
For example, a two character word might look like:
  "x20*6<xY y_r9L"

To decode this string, you add up only the numbers in each block:
  sum of integers in "x20*6<xY" --> 2 + 0 + 6 = 8
  sum of integers in "y_r9L" --> 9

Then map these numbers to the corresponding letters of the alphabet, 
with 0 representing a space:
  0  : ' '
  1  : 'a'
  2  : 'b'
  ...
  26 : 'z'

So we have:
  "x20*6<xY y_r9L" --> "8 9" --> "hi"

Note: 
  If the sum of the digits goes over 26, loop back to zero 
  (standard modulo / remainder function, such that 27 == 0, 28 == 1, etc.).
  
  As such the previous code could have also been:
    "x20*6<xY y875_r97L" --> "8 36" --> "8 9" --> "hi"
*/


// Solution

function decrypt(code) {
  return code.split(/ /)
    .map(w => w.match(/\d/g).reduce((n, x) => n + Number(x), 0))
    .map(c => c % 27)
    .reduce((s, c) => s += c ? String.fromCharCode(96 + c) : " ", "")
}

// or

const decrypt = code =>
  code.replace(/\S+(\s|$)/g, block => {
    let n = block.match(/\d/g).reduce((a, b) => a + +b, 0);
    return ' abcdefghijklmnopqrstuvwxyz'[n % 27];
  });