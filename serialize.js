function serialize (mixed_value) {
    // Returns a string representation of variable (which can later be unserialized)  
    // 
    // version: 1003.2411
    // discuss at: http://phpjs.org/functions/serialize    // +   original by: Arpad Ray (mailto:arpad@php.net)
    // +   improved by: Dino
    // +   bugfixed by: Andrej Pavlovic
    // +   bugfixed by: Garagoth
    // +      input by: DtTvB (http://dt.in.th/2008-09-16.string-length-in-bytes.html)    // +   bugfixed by: Russell Walker (http://www.nbill.co.uk/)
    // +   bugfixed by: Jamie Beck (http://www.terabit.ca/)
    // +      input by: Martin (http://www.erlenwiese.de/)
    // +   bugfixed by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
    // -    depends on: utf8_encode    // %          note: We feel the main purpose of this function should be to ease the transport of data between php & js
    // %          note: Aiming for PHP-compatibility, we have to translate objects to arrays
    // *     example 1: serialize(['Kevin', 'van', 'Zonneveld']);
    // *     returns 1: 'a:3:{i:0;s:5:"Kevin";i:1;s:3:"van";i:2;s:9:"Zonneveld";}'
    // *     example 2: serialize({firstName: 'Kevin', midName: 'van', surName: 'Zonneveld'});    // *     returns 2: 'a:3:{s:9:"firstName";s:5:"Kevin";s:7:"midName";s:3:"van";s:7:"surName";s:9:"Zonneveld";}'
    var _getType = function (inp) {
        var type = typeof inp, match;
        var key;
        if (type == 'object' && !inp) {            return 'null';
        }
        if (type == "object") {
            if (!inp.constructor) {
                return 'object';            }
            var cons = inp.constructor.toString();
            match = cons.match(/(\w+)\(/);
            if (match) {
                cons = match[1].toLowerCase();            }
            var types = ["boolean", "number", "string", "array"];
            for (key in types) {
                if (cons == types[key]) {
                    type = types[key];                    break;
                }
            }
        }
        return type;    };
    var type = _getType(mixed_value);
    var val, ktype = '';
    
    var err_php_ClassName_var = false;
    
    switch (type) {        case "function": 
            val = ""; 
            break;
        case "boolean":
            val = "b:" + (mixed_value ? "1" : "0");            break;
        case "number":
            val = (Math.round(mixed_value) == mixed_value ? "i" : "d") + ":" + mixed_value;
            break;
        case "string":
        			mixed_value = this.utf8_encode(mixed_value);
        			val = "s:" + encodeURIComponent(mixed_value).replace(/%../g, 'x').length + ":\"" + mixed_value + "\"";
            break;
        case "array":
        	val = "a";
        case "object"://            val = "a";
            if (type == "object") {
                var objname = mixed_value.constructor.toString().match(/(\w+)\(\)/);
                if (objname == undefined) {                    return;
                }
                objname[1] = this.serialize(objname[1]);
                val = "O:" + mixed_value.php_ClassName_var.length + ":\"" +  mixed_value.php_ClassName_var + "\""; //objname[1].substring(1, objname[1].length - 1);
            }            
            var count = 0;
            var vals = "";
            var okey;
            var key;
            for (key in mixed_value) {
            	err_php_ClassName_var = false;
            	if (key == "php_ClassName_var"){
            		err_php_ClassName_var = true;
            	}
                ktype = _getType(mixed_value[key]);
                if (ktype == "function") { 
                    continue; 
                }                
                okey = (key.match(/^[0-9]+$/) ? parseInt(key, 10) : key);
                if (!err_php_ClassName_var){
	                vals += this.serialize(okey) +
	                        this.serialize(mixed_value[key]);
	                count++;
                }
            }
            val += ":" + count + ":{" + vals + "}";
            break;
        case "undefined": // Fall-through
        default: // if the JS object has a property which contains a null value, the string cannot be unserialized by PHP
            break;
        case "null":
        	val = "N";
            break;
    }
    if (type != "object" && type != "array" ) {
        val += ";";    }
    return val;
}

function utf8_encode ( argString ) {
    // Encodes an ISO-8859-1 string to UTF-8  
    // 
    // version: 1003.2411
    // discuss at: http://phpjs.org/functions/utf8_encode    // +   original by: Webtoolkit.info (http://www.webtoolkit.info/)
    // +   improved by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
    // +   improved by: sowberry
    // +    tweaked by: Jack
    // +   bugfixed by: Onno Marsman    // +   improved by: Yves Sucaet
    // +   bugfixed by: Onno Marsman
    // +   bugfixed by: Ulrich
    // *     example 1: utf8_encode('Kevin van Zonneveld');
    // *     returns 1: 'Kevin van Zonneveld'    var string = (argString+''); // .replace(/\r\n/g, "\n").replace(/\r/g, "\n");
 
    var utftext = "";
    var start, end;
    var stringl = 0; 
    start = end = 0;
    var string = argString;
    stringl = string.length;
    for (var n = 0; n < stringl; n++) {
        var c1 = string.charCodeAt(n);        var enc = null;
 
        if (c1 < 128) {
            end++;
        } else if (c1 > 127 && c1 < 2048) {            enc = String.fromCharCode((c1 >> 6) | 192) + String.fromCharCode((c1 & 63) | 128);
        } else {
            enc = String.fromCharCode((c1 >> 12) | 224) + String.fromCharCode(((c1 >> 6) & 63) | 128) + String.fromCharCode((c1 & 63) | 128);
        }
        if (enc !== null) {            if (end > start) {
                utftext += string.substring(start, end);
            }
            utftext += enc;
            start = end = n+1;        }
    }
 
    if (end > start) {
        utftext += string.substring(start, string.length);    }
 
    return utftext;
}






/**
 * o------------------------------------------------------------------------------o
 * | This package is licensed under the Phpguru license. A quick summary is       |
 * | that for commercial use, there is a small one-time licensing fee to pay. For |
 * | registered charities and educational institutes there is a reduced license   |
 * | fee available. You can read more  at:                                        |
 * |                                                                              |
 * |                  http://www.phpguru.org/static/license.html                  |
 * o------------------------------------------------------------------------------o
 */

 /**
 * Unserializes a PHP serialized data type. Currently handles:
 *  o Strings
 *  o Integers
 *  o Doubles
 *  o Arrays
 *  o Booleans
 *  o NULL
 *  o Objects
 * 
 * alert()s will be thrown if the function is passed something it
 * can't handle or incorrect data.
 *
 * @param  string input The serialized PHP data
 * @return mixed        The resulting datatype
 */
 function PHP_Unserialize(input)
 {
     var result = PHP_Unserialize_(input);
     return result[0];
 }



 /**
 * Function which performs the actual unserializing
 *
 * @param string input Input to parse
 */
 function PHP_Unserialize_(input)
 {
     var length = 0;
     
     switch (input.charAt(0)) {
         /**
         * Array
         */
         case 'a':
             length = PHP_Unserialize_GetLength(input);
             input  = input.substr(String(length).length + 4);

             var arr   = new Array();
             var key   = null;
             var value = null;

             for (var i=0; i<length; ++i) {
                 key   = PHP_Unserialize_(input);
                 input = key[1];

                 value = PHP_Unserialize_(input);
                 input = value[1];

                 arr[key[0]] = value[0];
             }

             input = input.substr(1);
             return [arr, input];
             break;
         
         /**
         * Objects
         */
         case 'O':
             length = PHP_Unserialize_GetLength(input);
             var classname = String(input.substr(String(length).length + 4, length));
             
             input  = input.substr(String(length).length + 6 + length);
             var numProperties = Number(input.substring(0, input.indexOf(':')))
             input = input.substr(String(numProperties).length + 2);

             var obj      = new Object();
             obj.php_ClassName_var = classname;
             var property = null;
             var value    = null;

             for (var i=0; i<numProperties; ++i) {
                 key   = PHP_Unserialize_(input);
                 input = key[1];
                 
                 // Handle private/protected
                 key[0] = key[0].replace(new RegExp('^\x00' + classname + '\x00'), '');
                 key[0] = key[0].replace(new RegExp('^\x00\\*\x00'), '');

                 value = PHP_Unserialize_(input);
                 input = value[1];

                 obj[key[0]] = value[0];
             }

             input = input.substr(1);
             return [obj, input];
             break;

         /**
         * Strings
         */
         case 's':
             length = PHP_Unserialize_GetLength(input);
             return [String(input.substr(String(length).length + 4, length)), input.substr(String(length).length + 6 + length)];
             break;

         /**
         * Integers and doubles
         */
         case 'i':
         case 'd':
             var num = Number(input.substring(2, input.indexOf(';')));
             return [num, input.substr(String(num).length + 3)];
             break;
         
         /**
         * Booleans
         */
         case 'b':
             var bool = (input.substr(2, 1) == 1);
             return [bool, input.substr(4)];
             break;
         
         /**
         * Null
         */
         case 'N':
             return [null, input.substr(2)];
             break;

         /**
         * Unsupported
         */
         case 'o':
         case 'r':
         case 'C':
         case 'R':
         case 'U':
             alert('Error: Unsupported PHP data type found!');

         /**
         * Error
         */
         default:
             return [null, null];
             break;
     }
 }
 

 /**
 * Returns length of strings/arrays etc
 *
 * @param string input Input to parse
 */
 function PHP_Unserialize_GetLength(input)
 {
     input = input.substring(2);
     var length = Number(input.substr(0, input.indexOf(':')));
     return length;
 }

 function getSerializedObj(serStr){
		var obj = PHP_Unserialize(serStr);
		return obj;
	}

function ser(){
	var sString;
	var myThing = PHP_Unserialize(stString);
	myThing.un = 'newKkk';
	
	var l2n = clone(pr_tabT2);
	l2n.un='newKkk2';
	myThing.listt2.push(l2n);
	
	var stString2 = serialize(myThing);
	//alert (myThing.un);
	sString = "./sTest.php?obj=" + stString + "&obj2=" + stString2; //serialize({firstName: 'Kevin', midName: 'van', id: 'Zonneveld'});;
	getEl('sTest').setAttribute('href', sString);
}