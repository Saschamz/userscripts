// ==UserScript==
// @name         Console++
// @namespace    Sascha
// @version      0.1
// @description  CSS functions for the console object.
// @author       Sascha Ringström
// @match        *://*/*
// @grant        none
// @downloadURL  https://github.com/Saschamz/userscripts/raw/master/Console%2B%2B.user.js
// ==/UserScript==

(function() {
    var log = window.log = {fontFamily: 'Consolas, Lucida Console, sans-serif'};

    var availableColors = [
        "aliceblue", "antiquewhite", "aqua", "aquamarine", "azure", "beige", "bisque", "black", "blanchedalmond", "blue", "blueviolet", "brown", "burlywood", "cadetblue", "chartreuse", "chocolate",
        "coral", "cornflowerblue", "cornsilk", "crimson", "cyan", "darkblue", "darkcyan", "darkgoldenrod", "darkgray", "darkgrey", "darkgreen", "darkkhaki", "darkmagenta", "darkolivegreen", "darkorange",
        "darkorchid", "darkred", "darksalmon", "darkseagreen", "darkslateblue", "darkslategray", "darkslategrey", "darkturqoise", "darkviolet", "deeppink", "deepskyblue", "dimgray", "dimgrey",
        "dodgerblue", "firebrick", "floralwhite", "forestgreen", "fuchsia", "gainsboro", "ghostwhite", "gold", "goldenrod", "gray", "grey", "green", "greenyellow", "hondeydew", "hotpink", "indianred",
        "indigo", "ivory", "khaki", "lavendar", "lavendarblush", "lawngreen", "lemonchiffon", "lightblue", "lightcoral", "lightcyan", "lightgoldenrodyellow", "lightgray", "lightgrey", "lightgreen",
        "lightpink", "lightsalmon", "lightseagreen", "lightskyblue", "lightslategray", "lightslategrey", "lightsteelblue", "lightyellow", "lime", "limegreen", "linen", "magenta",
        "maroon", "mediumaquamarine", "mediumblue", "mediumorchid", "mediumpurple", "mediumseagreen", "mediumslateblue", "mediumspringgreen", "mediumturqoise", "mediumvioletred", "midnightblue",
        "mintcream", "mistyrose", "moccasin", "navajowhite", "navy", "oldlace", "olive", "olivedrab", "orange", "orangered", "orchid", "palegoldenrod", "palegreen", "paleturquoise", "palevioletred",
        "papayawhip", "peachpuff", "peru", "pink", "plum", "powderblue", "purple", "rebeccapurple", "red", "rosybrown", "royalblue", "saddlebrown", "salmon", "sandybrown", "seagreen", "seashell",
        "sienna", "silver", "skyblue", "slateblue", "slategray", "slategrey", "snow", "springgreen", "steelblue", "tan", "teal", "thistle", "tomato", "turquoise", "violet", "wheat", "white", "whitesmoke",
        "yellow", "green" 
    ];
    
    // Standard log color function
    function logColor (message, color = "white", background = "transparent", size) {
        console.log(`%c${message}`, `color: ${color};background: ${background};font-size: ${size};font-family: ${log.fontFamily}`);
    };
    
    // Function to handle font-size
    function logSize(size) {
        switch(size){
            case "mini":
                return "1px";
                break;
    
            case "tiny":
                return "6px";
                break;
    
            case "small":
                return "10px";
                break;
    
            case "medium":
                return "12px";
                break;
    
            case "big":
                return "24px";
                break;
    
            case "huge":
                return "36px";
                break;
    
            case "gigantic":
                return "44px";
                break;
    
            default:
                return size;
                break;
        }
    };
    
    // Sets font family
    log.setFont = (fontFamily) => {
        log.fontFamily = fontFamily;
    };
    
    // Css log using custom values inside array
    log.css = (message, css = []) => {
        css = css.join(';');
        console.log(`%c${message}`, `${css}; font-family: ${log.fontFamily}`);
    };
    
    // Color log
    log.color = (message, color = "white", background = "none", size = "medium") => {
        size = logSize(size);
        logColor(message, color, background, size);
    };
    
    // Block log
    log.block = (message, color = "white", background ="black", size = "big") => {
        size = logSize(size);
        console.log(`%c${message}`, `color: ${color};background: ${background};font-size: ${size};width: 100%;text-align: center;display: block;font-family: ${log.fontFamily}`);
    };
    
    // Row log
    log.row = (message, color = "white", background ="black", size = "medium") => {
        size = logSize(size);
        console.log(`%c${message}`, `color: ${color};background: ${background};font-size: ${size};width: 100%;display: block;font-family: ${log.fontFamily}`);
    };
    
    // Center Text
    log.center = (message, color = "white", size = "medium") => {
        size = logSize(size);
        console.log(`%c${message}`, `color: ${color};font-size: ${size};width: 100%;text-align: center;display: block;font-family: ${log.fontFamily}`);
    };
    
    // Creates color specific functions
    availableColors.forEach(color => {
        log[color] = (message, background = "none", size = "medium") => {
            logColor(message, color, background, logSize(size));
        };
        log.row[color] = (message, fontColor = "white", color, size = "medium") => {
            log.row(message, fontColor, color, logSize(size));
        };
    });
    
    
    // Available colors
    log.available = () => {
        availableColors.forEach(color => log[color](color));
    };
    
    // Emojis
    log.shrug = (color = 'white', fontSize = '20px') => {
        fontSize = logSize(fontSize);
        log.css('¯\\_(ツ)_/¯', [`font-size: ${fontSize}`, `color: ${color}`]);
    };
    
    log.face = (color = 'white', fontSize = '20px') => {
        fontSize = logSize(fontSize);
        log.css('( ͡° ͜ʖ ͡°)', [`font-size: ${fontSize}`, `color: ${color}`]);
    }
    
    log.bear = (color = 'white', fontSize = '20px') => {
        fontSize = logSize(fontSize);
        log.css('ʕ•ᴥ•ʔ', [`font-size: ${fontSize}`, `color: ${color}`]);
    }
    
    log.cry = (color = 'white', fontSize = '20px') => {
        fontSize = logSize(fontSize);
        log.css('(;´༎ຶД༎ຶ`)', [`font-size: ${fontSize}`, `color: ${color}`]);
    }
    
    log.tableflip = (color = 'white', fontSize = '20px') => {
        fontSize = logSize(fontSize);
        log.css('(╯°□°）╯︵ ┻━┻', [`font-size: ${fontSize}`, `color: ${color}`]);
    }

    log.tableput = (color = 'white', fontSize = '20px') => {
        fontSize = logSize(fontSize);
        log.css('┬──┬ ノ( ゜-゜ノ)', [`font-size: ${fontSize}`, `color: ${color}`]);
    }
    
    log.people = (color = 'white', fontSize = '20px') => {
        fontSize = logSize(fontSize);
        log.css('༼ ºل͟º ༼ ºل͟º ༼ ºل͟º ༽ ºل͟º ༽ ºل͟º ༽', [`font-size: ${fontSize}`, `color: ${color}`]);
    }

    log.fight = (color = 'white', fontSize = '20px') => {
        fontSize = logSize(fontSize);
        log.css('(ง ͠° ͟ل͜ ͡°)ง', [`font-size: ${fontSize}`, `color: ${color}`]);
    }

    log.stare = (color = 'white', fontSize = '20px') => {
        fontSize = logSize(fontSize);
        log.css('◉_◉', [`font-size: ${fontSize}`, `color: ${color}`]);
    }

    log.point = (color = 'white', fontSize = '20px') => {
        fontSize = logSize(fontSize);
        log.css('☝', [`font-size: ${fontSize}`, `color: ${color}`]);
    }

    log.zoidberg = (color = 'white', fontSize = '20px') => {
        fontSize = logSize(fontSize);
        log.css('(/) (°,,,°) (/)', [`font-size: ${fontSize}`, `color: ${color}`]);
    }
    
    log.emojis = () => {
        log.center('↓shrug');
        log.shrug();
        log.center('↓face');
        log.face();
        log.center('↓bear');
        log.bear();
        log.center('↓cry');
        log.cry();
        log.center('↓tableflip');
        log.tableflip();
        log.center('↓tableput');
        log.tableput();
        log.center('↓people');
        log.people();
        log.center('↓fight');
        log.fight();
        log.center('↓stare');
        log.stare();
        log.center('↓point');
        log.point();
        log.center('↓zoidberg');
        log.zoidberg();
    };
    
    // Animations
    log.animate = {};
    
    log.animate.tableflip = (iterationLimit = 4, update = 400) => {
        let iteration = 0;
    
        let animation = setInterval(() => {
            console.clear();
            iteration % 2 === 0 && log.tableflip();
            iteration % 2 > 0 && log.tableput();
    
            ++iteration;
            if(iteration === iterationLimit) {
                clearInterval(animation);
            }
        }, update);
    }

    log.animate.rainbowBear = (iterationLimit = 10, update = 100) => {
        let iteration = 0;
    
        let animation = setInterval(() => {
            console.clear();
            iteration === 0 && log.bear('red');
            iteration === 1 && log.bear('blue');
            iteration === 2 && log.bear('green');
            iteration === 3 && log.bear('yellow');
            iteration === 4 && log.bear('orange');
            iteration === 5 && log.bear('cyan');
            iteration === 6 && log.bear('purple');
            iteration === 7 && log.bear('darkgreen');
            iteration === 8 && log.bear('magenta');
            iteration === 9 && log.bear('coral');
            iteration === 10 && log.bear('red');
    
            ++iteration;
            if(iteration === iterationLimit) {
                clearInterval(animation);
            }
        }, update);
    }
    
    // Detailed command info
    log.help = () => {
        log.block("<LOG COMMANDS>", "white", "black", "big");
        log.center("log.color(message, color, background, size) // Message is required, rest have default values", "green", "medium");
        log.center("log.SPECIFIC-COLOR(message, background, size) // Message is required, rest have default values. This is a short command for changing text color.", "cyan", "medium");
        log.center("log.available() // Lists all available colors to use for above function");
        log.center("log.emojis(color, size) // Lists all available emojis", 'coral', 'medium');
        log.center("log.css(message, ['custom css', 'custom css']) // Message is required", "purple", "medium");
        log.center("log.block(message, color, background, size) // Message is required, rest have default values. This creates a full width block with centered text.", "orange", "medium");
        log.center("log.center(message, color, size) // Message is required, rest have default values. This acts like a block without background for centering text.", "magenta", "medium");
        log.center("Size Values: ?px OR mini/tiny/small/medium/big/huge/gigantic which are preset pixel values.", "white", "medium");
        log.center("Color values: ANY color that can be used in CSS(hsl, hex, rgb etc.) are allowed. For background gradients are useable.", "white", "medium");
        log.block("</LOG COMMANDS>", "white", "black", "big");
    };
    
    // Command showcase
    log.commands = () => {
        log.color('log.color(message, color, background, size)', 'pink');
        log.orange('log.SPECIFIC-COLOR(message, background, size)');
        log.block('log.block(message, color, background, size)');
        log.row('log.row(message, color, background, size)');
        log.center('log.center(messag, color, size)');
        log.color('log.help()', 'white', 'black');
        log.color('log.available()', 'white', 'black');
        log.color('log.emojis()', 'white', 'black');
    };
    
    Object.assign(window.console, window.log);
})();


