/**
 * Created by Moon on 20.06.2015.
 */
// Transliteration ported from https://github.com/yaroslav/russian/blob/master/lib/russian/transliteration.rb



var LOWER_SINGLE = {
    "�": "i", "�": "g", "�": "yo", "�": "#", "�": "e",
    "�": "yi", "�": "a", "�": "b",
    "�": "v", "�": "g", "�": "d", "�": "e", "�": "zh",
    "�": "z", "�": "i", "�": "y", "�": "k", "�": "l",
    "�": "m", "�": "n", "�": "o", "�": "p", "�": "r",
    "�": "s", "�": "t", "�": "u", "�": "f", "�": "h",
    "�": "ts", "�": "ch", "�": "sh", "�": "sch", "�": "",
    "�": "y", "�": "", "�": "e", "�": "yu", "�": "ya"
};

var LOWER_MULTI = {
    "��": "ie",
    "��": "ie"
};

var UPPER_SINGLE = {
    "�": "G", "�": "YO", "�": "E", "�": "YI", "�": "I",
    "�": "A", "�": "B", "�": "V", "�": "G",
    "�": "D", "�": "E", "�": "ZH", "�": "Z", "�": "I",
    "�": "Y", "�": "K", "�": "L", "�": "M", "�": "N",
    "�": "O", "�": "P", "�": "R", "�": "S", "�": "T",
    "�": "U", "�": "F", "�": "H", "�": "TS", "�": "CH",
    "�": "SH", "�": "SCH", "�": "", "�": "Y", "�": "",
    "�": "E", "�": "YU", "�": "YA"
};
var UPPER_MULTI = {
    "��": "IE",
    "ܨ": "IE"
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

