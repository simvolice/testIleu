/**
 * Created by Moon on 20.06.2015.
 */
// Transliteration ported from https://github.com/yaroslav/russian/blob/master/lib/russian/transliteration.rb



var LOWER_SINGLE = {
    "³": "i", "´": "g", "¸": "yo", "¹": "#", "º": "e",
    "¿": "yi", "à": "a", "á": "b",
    "â": "v", "ã": "g", "ä": "d", "å": "e", "æ": "zh",
    "ç": "z", "è": "i", "é": "y", "ê": "k", "ë": "l",
    "ì": "m", "í": "n", "î": "o", "ï": "p", "ð": "r",
    "ñ": "s", "ò": "t", "ó": "u", "ô": "f", "õ": "h",
    "ö": "ts", "÷": "ch", "ø": "sh", "ù": "sch", "ú": "",
    "û": "y", "ü": "", "ý": "e", "þ": "yu", "ÿ": "ya"
};

var LOWER_MULTI = {
    "üå": "ie",
    "ü¸": "ie"
};

var UPPER_SINGLE = {
    "¥": "G", "¨": "YO", "ª": "E", "¯": "YI", "²": "I",
    "À": "A", "Á": "B", "Â": "V", "Ã": "G",
    "Ä": "D", "Å": "E", "Æ": "ZH", "Ç": "Z", "È": "I",
    "É": "Y", "Ê": "K", "Ë": "L", "Ì": "M", "Í": "N",
    "Î": "O", "Ï": "P", "Ð": "R", "Ñ": "S", "Ò": "T",
    "Ó": "U", "Ô": "F", "Õ": "H", "Ö": "TS", "×": "CH",
    "Ø": "SH", "Ù": "SCH", "Ú": "", "Û": "Y", "Ü": "",
    "Ý": "E", "Þ": "YU", "ß": "YA"
};
var UPPER_MULTI = {
    "ÜÅ": "IE",
    "Ü¨": "IE"
};

var LOWER = _.assign({}, LOWER_SINGLE, LOWER_MULTI);

var UPPER = _.assign({}, UPPER_SINGLE, UPPER_MULTI);

var MULTI_KEYS = Object.keys(_.assign({}, LOWER_MULTI, UPPER_MULTI)).sort(function(a, b) {
    return a.length > b.length;
});


// Transliterate a string with russian/ukrainian characters
function transliterate(str) {
    var reg = new RegExp(MULTI_KEYS.join('|') + '|\\w|.', 'g');

    var result = "";
    var chars = str.match(reg);
    for (var i = 0; i < chars.length; i++) {
        if (chars[i] in UPPER && chars[i + 1] in LOWER) {
            // combined case
            var r = UPPER[chars[i]].toLowerCase();
            result += r[0].toUpperCase() + r.slice(1);
        } else if (chars[i] in UPPER) {
            result += UPPER[chars[i]];
        } else if (chars[i] in LOWER) {
            result += LOWER[chars[i]];
        } else {
            result += chars[i];
        }
    }

    return result;
}

module.exports = transliterate;// Transliteration ported from https://github.com/yaroslav/russian/blob/master/lib/russian/transliteration.rb

