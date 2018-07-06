// ==UserScript==
// @name         Console++
// @namespace    sascha
// @version      0.1
// @description  hej
// @author       You
// @match        *
// @grant        none
// ==/UserScript==

(function() {
    var log = window.log = {fontFamily: 'Lucida Console'};

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
        //console.fontFamily && ( console.fontFamily = fontFamily
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
    
    /* EMOJIS */
    
    log.shrug = () => {
        log.css('¯\\_(ツ)_/¯', ['color: white', 'font-size: 60px']);
    };
    
    log.snipe = () => {
        log.css('▄︻̷̿┻̿═━一', ['color: white', 'font-size: 40px']);
    }
    
    log.face = () => {
        log.css('( ͡° ͜ʖ ͡°)', ['color: white', 'font-size: 60px']);
    }
    
    log.bear = () => {
        log.css('ʕ•ᴥ•ʔ', ['color: white', 'font-size: 60px']);
    }
    
    log.cry = () => {
        log.css('(;´༎ຶД༎ຶ`)', ['color: white', 'font-size: 60px']);
    }
    
    log.tableflip = () => {
        log.css('(╯°□°）╯︵ ┻━┻', ['color: white', 'font-size: 40px']);
    }
    log.tableput = () => {
        log.css('┬──┬ ノ( ゜-゜ノ)', ['color: white', 'font-size: 40px']);
    }
    
    log.people = () => {
        log.css('༼ ºل͟º ༼ ºل͟º ༼ ºل͟º ༽ ºل͟º ༽ ºل͟º ༽', ['color: white', 'font-size: 20px']);
    }
    
    log.emojis = () => {
        log.block('↓shrug');
        log.shrug();
        log.block('↓snipe');
        log.snipe();
        log.block('↓face');
        log.face();
        log.block('↓bear');
        log.bear();
        log.block('↓cry');
        log.cry();
        log.block('↓tableflip');
        log.tableflip();
        log.block('↓tableput');
        log.tableput();
        log.block('↓people');
        log.people();
    };
    
    /* Animations */
    log.animate = {};
    
    log.animate.table = (iterationLimit = 4, update = 400) => {
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
    
    // Detailed command info
    log.help = () => {
        log.block("<LOG COMMANDS>", "white", "black", "big")
        log.center("log.color(message, color, background, size) // Message is required, rest have default values", "green", "medium")
        log.center("log.SPECIFIC-COLOR(message, background, size) // Message is required, rest have default values. This is a short command for changing text color.", "cyan", "medium")
        log.center("log.available() // Lists all available colors to use for above function")
        log.center("log.emojis() // Lists all available emojis :)")
        log.center("log.css(message, ['custom css', 'custom css']) // Message is required", "purple", "medium")
        log.center("log.block(message, color, background, size) // Message is required, rest have default values. This creates a full width block with centered text.", "orange", "medium")
        log.center("log.center(message, color, size) // Message is required, rest have default values. This acts like a block without background for centering text.", "magenta", "medium")
        log.center("Size Values: ?px OR mini/tiny/small/medium/big/huge/gigantic which are preset pixel values.", "white", "medium")
        log.center("Color values: ANY color that can be used in CSS(hsl, hex, rgb etc.) are allowed. For background gradients are useable.", "white", "medium")
        log.block("</LOG COMMANDS>", "white", "black", "big")   
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
    
    
    // Assign to console object
    Object.assign(console, log);
})();