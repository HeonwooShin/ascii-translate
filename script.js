const translateBtn = document.querySelector('#translateBtn'),
     inputText = document.querySelector('#inputText'),
     outputText = document.querySelector('#outputText'),
     translateMode = document.querySelector('#translateMode');

let text_2_ASCII = true;

const ASCIIstartsFrom33 = [" ", "!", "\"", "#", "$", "%", "&", "'", "(", ")", "*", "+", ",", "-", ".", "/", "0", "1", "2", "3", "4", "5", "6", "7", "8", "9", ":", ";", "<", "=", ">", "?", "@", "A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z", "[", "\\", "]", "^", "_", "`", "a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z", "{", "|", "}", "~", , "€", , "‚", "ƒ", "„", "…", "†", "‡", "ˆ", "‰", "Š", "‹", "Œ", , "Ž", , , "‘", "’", "“", "”", "•", "–", "—", "˜", "™", "š", "›", "œ", , "ž", "Ÿ", , "¡", "¢", "£", "¤", "¥", "¦", "§", "¨", "©", "ª", "«", "¬", , "®", "¯", "°", "±", "²", "³", "´", "µ", "¶", "·", "¸", "¹", "º", "»", "¼", "½", "¾", "¿", "À", "Á", "Â", "Ã", "Ä", "Å", "Æ", "Ç", "È", "É", "Ê", "Ë", "Ì", "Í", "Î", "Ï", "Ð", "Ñ", "Ò", "Ó", "Ô", "Õ", "Ö", "×", "Ø", "Ù", "Ú", "Û", "Ü", "Ý", "Þ", "ß", "à", "á", "â", "ã", "ä", "å", "æ", "ç", "è", "é", "ê", "ë", "ì", "í", "î", "ï", "ð", "ñ", "ò", "ó", "ô", "õ", "ö", "÷", "ø", "ù", "ú", "û", "ü", "ý", "þ", "ÿ"];


function dec2bin(dec) {
    let bin = [];
    if (dec < 32) {
        bin = "??????"
    } else {
        for (let index = 0; index < 8; index++) {
            bin.splice(0, 0, Math.floor(dec % 2).toString());
            dec = (dec - Math.floor(dec % 2))/2
        }
        bin = bin.join('')
    }
    return bin
}

function bin2dec(bin) {
    let dec = 0;
    if (bin.split('').some(x => x != 1 && x != 0) || bin.length % 8 != 0)
        return 999;
    for (let index = 0; index < 8; index++) {
        dec += bin[7-index]*(2**index);
        console.log(dec)
    }
    if (dec<32 || dec>255) {
        return 999;
    }
    return dec;
}

function translate_Text_2_ASCII() {
    let ASCII = "";
    const text = inputText.value
    for (let index = 0; index < text.length; index++) {
        const charIndex = ASCIIstartsFrom33.indexOf(text[index]) + 32;
        ASCII += dec2bin(charIndex);
        
    }
    return ASCII;
}

function translate_ASCII_2_Text() {
    let text = "";
    const ASCII = inputText.value
    for (let index = 0; index < ASCII.length/8; index++) {
        const ASCIIsliced = ASCII.slice(index*8, (index+1)*8);
        const ASCIIindex = bin2dec(ASCIIsliced);
        if(ASCIIindex == 999)
            return "Cannot Translate";
        console.log(ASCIIindex);
        text += ASCIIstartsFrom33[ASCIIindex - 32];
    }
    return text;
}

function init() {
    translateBtn.addEventListener('click', ()=>{
        if (text_2_ASCII)
            textToDisplay = translate_Text_2_ASCII();
        else
            textToDisplay = translate_ASCII_2_Text();
        outputText.innerHTML = textToDisplay
    });
    translateMode.addEventListener('click', ()=>{
            
        if (text_2_ASCII){
            inputText.placeholder = "Write an binary code"
            translateMode.value = "BINARY   →   TEXT"
        } else {
            inputText.placeholder = "Write a text"
            translateMode.value = "TEXT   →   BINARY"
        }
        inputText.value = ""
        outputText.innerHTML = ""
        text_2_ASCII = !text_2_ASCII;
    });

}

init();