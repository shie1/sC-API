const express = require("express");
const app = express();

let sCrypt = {
    dev: {},
    x: {}
}

sCrypt.encrypt = function (key, string) {
    let array = sCrypt.dev.toNs(string)
    let bkey = sCrypt.dev.bigKey(key)
    key = sCrypt.dev.toNs(key)
    let res = []
    let x = 0
    for (item in array) {
        let keynum = item / key.length
        keynum = Math.round((keynum - Math.floor(keynum)) * key.length)
        res.push(array[[item]] * (key[[keynum]] * bkey))
        x++
        if (x == array.length) {
            return res
        }
    }
}

sCrypt.decrypt = function (key, array) {
    let bkey = sCrypt.dev.bigKey(key)
    key = sCrypt.dev.toNs(key)
    let res = []
    let x = 0
    for (item in array) {
        let keynum = item / key.length
        keynum = Math.round((keynum - Math.floor(keynum)) * key.length)
        res.push(array[[item]] / (key[[keynum]] * bkey))
        x++
        if (x == array.length) {
            res = sCrypt.dev.toLs(res)
            if (res.length === array.length) { return res } else { return '' }
        }
    }
}

sCrypt.dev.bigKey = function (key) {
    numbers = sCrypt.dev.toNs(key)
    let res = 1
    let x = 0
    for (item of numbers) {
        res = res + item
        x++
        if (x == key.length) {
            return res - (key.length)
        }
    }
}

sCrypt.dev.toN = function (string) {
    return sCrypt.dev.ls.indexOf(string)
}

sCrypt.dev.toL = function (number) {
    return sCrypt.dev.ls[[number]]
}

sCrypt.dev.toNs = function (string) {
    string = string.split('')
    let res = []
    let x = 0
    for (let item of string) {
        res.push(sCrypt.dev.toN(item))
        x++
        if (x == string.length) {
            return res
        }
    }
}

sCrypt.dev.toLs = function (array) {
    let res = ''
    let x = 0
    for (let item in array) {
        item = array[[item]]
        lv = sCrypt.dev.toL(item)
        if (!lv) { res = res } else { res = res + lv }
        x++
        if (x == array.length) {
            return res
        }
    }
}

sCrypt.dev.ls = ["\u0001","\u0002","\u0003","\u0004","\u0005","\u0006","\u0007","\b","\t","\n","\u000b","\f","\r","\u000e","\u000f","\u0010","\u0011","\u0012","\u0013","\u0014","\u0015","\u0016","\u0017","\u0018","\u0019","\u001a","\u001b","\u001c","\u001d","\u001e","\u001f"," ","!","\"","#","$","%","&","'","(",")","*","+",",","-",".","/","0","1","2","3","4","5","6","7","8","9",":",";","<","=",">","?","@","A","B","C","D","E","F","G","H","I","J","K","L","M","N","O","P","Q","R","S","T","U","V","W","X","Y","Z","[","\\","]","^","_","`","a","b","c","d","e","f","g","h","i","j","k","l","m","n","o","p","q","r","s","t","u","v","w","x","y","z","{","|","}","~","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","",""," ","¡","¢","£","¤","¥","¦","§","¨","©","ª","«","¬","­","®","¯","°","±","²","³","´","µ","¶","·","¸","¹","º","»","¼","½","¾","¿","À","Á","Â","Ã","Ä","Å","Æ","Ç","È","É","Ê","Ë","Ì","Í","Î","Ï","Ð","Ñ","Ò","Ó","Ô","Õ","Ö","×","Ø","Ù","Ú","Û","Ü","Ý","Þ","ß","à","á","â","ã","ä","å","æ","ç","è","é","ê","ë","ì","í","î","ï","ð","ñ","ò","ó","ô","õ","ö","÷","ø","ù","ú","û","ü","ý","þ","ÿ","Ā","ā","Ă","ă","Ą","ą","Ć","ć","Ĉ","ĉ","Ċ","ċ","Č","č","Ď","ď","Đ","đ","Ē","ē","Ĕ","ĕ","Ė","ė","Ę","ę","Ě","ě","Ĝ","ĝ","Ğ","ğ","Ġ","ġ","Ģ","ģ","Ĥ","ĥ","Ħ","ħ","Ĩ","ĩ","Ī","ī","Ĭ","ĭ","Į","į","İ","ı","Ĳ","ĳ","Ĵ","ĵ","Ķ","ķ","ĸ","Ĺ","ĺ","Ļ","ļ","Ľ","ľ","Ŀ","ŀ","Ł","ł","Ń","ń","Ņ","ņ","Ň","ň","ŉ","Ŋ","ŋ","Ō","ō","Ŏ","ŏ","Ő","ő","Œ","œ","Ŕ","ŕ","Ŗ","ŗ","Ř","ř","Ś","ś","Ŝ","ŝ","Ş","ş","Š","š","Ţ","ţ","Ť","ť","Ŧ","ŧ","Ũ","ũ","Ū","ū","Ŭ","ŭ","Ů","ů","Ű","ű","Ų","ų","Ŵ","ŵ","Ŷ","ŷ","Ÿ","Ź","ź","Ż","ż","Ž","ž","ſ","ƀ","Ɓ","Ƃ","ƃ","Ƅ","ƅ","Ɔ","Ƈ","ƈ","Ɖ","Ɗ","Ƌ","ƌ","ƍ","Ǝ","Ə","Ɛ","Ƒ","ƒ","Ɠ","Ɣ","ƕ","Ɩ","Ɨ","Ƙ","ƙ","ƚ","ƛ","Ɯ","Ɲ","ƞ","Ɵ","Ơ","ơ","Ƣ","ƣ","Ƥ","ƥ","Ʀ","Ƨ","ƨ","Ʃ","ƪ","ƫ","Ƭ","ƭ","Ʈ","Ư","ư","Ʊ","Ʋ","Ƴ","ƴ","Ƶ","ƶ","Ʒ","Ƹ","ƹ","ƺ","ƻ","Ƽ","ƽ","ƾ","ƿ","ǀ","ǁ","ǂ","ǃ","Ǆ","ǅ","ǆ","Ǉ","ǈ","ǉ","Ǌ","ǋ","ǌ","Ǎ","ǎ","Ǐ","ǐ","Ǒ","ǒ","Ǔ","ǔ","Ǖ","ǖ","Ǘ","ǘ","Ǚ","ǚ","Ǜ","ǜ","ǝ","Ǟ","ǟ","Ǡ","ǡ","Ǣ","ǣ","Ǥ","ǥ","Ǧ","ǧ","Ǩ","ǩ","Ǫ","ǫ","Ǭ","ǭ","Ǯ","ǯ","ǰ","Ǳ","ǲ","ǳ","Ǵ","ǵ","Ƕ","Ƿ","Ǹ","ǹ","Ǻ","ǻ","Ǽ","ǽ","Ǿ","ǿ","Ȁ","ȁ","Ȃ","ȃ","Ȅ","ȅ","Ȇ","ȇ","Ȉ","ȉ","Ȋ","ȋ","Ȍ","ȍ","Ȏ","ȏ","Ȑ","ȑ","Ȓ","ȓ","Ȕ","ȕ","Ȗ","ȗ","Ș","ș","Ț","ț","Ȝ","ȝ","Ȟ","ȟ","Ƞ","ȡ","Ȣ","ȣ","Ȥ","ȥ","Ȧ","ȧ","Ȩ","ȩ","Ȫ","ȫ","Ȭ","ȭ","Ȯ","ȯ","Ȱ","ȱ","Ȳ","ȳ","ȴ","ȵ","ȶ","ȷ","ȸ","ȹ","Ⱥ","Ȼ","ȼ","Ƚ","Ⱦ","ȿ","ɀ","Ɂ","ɂ","Ƀ","Ʉ","Ʌ","Ɇ","ɇ","Ɉ","ɉ","Ɋ","ɋ","Ɍ","ɍ","Ɏ","ɏ","ɐ","ɑ","ɒ","ɓ","ɔ","ɕ","ɖ","ɗ","ɘ","ə","ɚ","ɛ","ɜ","ɝ","ɞ","ɟ","ɠ","ɡ","ɢ","ɣ","ɤ","ɥ","ɦ","ɧ","ɨ","ɩ","ɪ","ɫ","ɬ","ɭ","ɮ","ɯ","ɰ","ɱ","ɲ","ɳ","ɴ","ɵ","ɶ","ɷ","ɸ","ɹ","ɺ","ɻ","ɼ","ɽ","ɾ","ɿ","ʀ","ʁ","ʂ","ʃ","ʄ","ʅ","ʆ","ʇ","ʈ","ʉ","ʊ","ʋ","ʌ","ʍ","ʎ","ʏ","ʐ","ʑ","ʒ","ʓ","ʔ","ʕ","ʖ","ʗ","ʘ","ʙ","ʚ","ʛ","ʜ","ʝ","ʞ","ʟ","ʠ","ʡ","ʢ","ʣ","ʤ","ʥ","ʦ","ʧ","ʨ","ʩ","ʪ","ʫ","ʬ","ʭ","ʮ","ʯ","ʰ","ʱ","ʲ","ʳ","ʴ","ʵ","ʶ","ʷ","ʸ","ʹ","ʺ","ʻ","ʼ","ʽ","ʾ","ʿ","ˀ","ˁ","˂","˃","˄","˅","ˆ","ˇ","ˈ","ˉ","ˊ","ˋ","ˌ","ˍ","ˎ","ˏ","ː","ˑ","˒","˓","˔","˕","˖","˗","˘","˙","˚","˛","˜","˝","˞","˟","ˠ","ˡ","ˢ","ˣ","ˤ","˥","˦","˧","˨","˩","˪","˫","ˬ","˭","ˮ","˯","˰","˱","˲","˳","˴","˵","˶","˷","˸","˹","˺","˻","˼","˽","˾","˿","̀","́","̂","̃","̄","̅","̆","̇","̈","̉","̊","̋","̌","̍","̎","̏","̐","̑","̒","̓","̔","̕","̖","̗","̘","̙","̚","̛","̜","̝","̞","̟","̠","̡","̢","̣","̤","̥","̦","̧","̨","̩","̪","̫","̬","̭","̮","̯","̰","̱","̲","̳","̴","̵","̶","̷","̸","̹","̺","̻","̼","̽","̾","̿","̀","́","͂","̓","̈́","ͅ","͆","͇","͈","͉","͊","͋","͌","͍","͎","͏","͐","͑","͒","͓","͔","͕","͖","͗","͘","͙","͚","͛","͜","͝","͞","͟","͠","͡","͢","ͣ","ͤ","ͥ","ͦ","ͧ","ͨ","ͩ","ͪ","ͫ","ͬ","ͭ","ͮ","ͯ","Ͱ","ͱ","Ͳ","ͳ","ʹ","͵","Ͷ","ͷ","͸","͹","ͺ","ͻ","ͼ","ͽ",";","Ϳ","΀","΁","΂","΃","΄","΅","Ά","·","Έ","Ή","Ί","΋","Ό","΍","Ύ","Ώ","ΐ","Α","Β","Γ","Δ","Ε","Ζ","Η","Θ","Ι","Κ","Λ","Μ","Ν","Ξ","Ο","Π","Ρ","΢","Σ","Τ","Υ","Φ","Χ","Ψ","Ω","Ϊ","Ϋ","ά","έ","ή","ί","ΰ","α","β","γ","δ","ε","ζ","η","θ","ι","κ","λ","μ","ν","ξ","ο","π","ρ","ς","σ","τ","υ","φ","χ","ψ","ω","ϊ","ϋ","ό","ύ","ώ","Ϗ","ϐ","ϑ","ϒ","ϓ","ϔ","ϕ","ϖ","ϗ","Ϙ","ϙ","Ϛ","ϛ","Ϝ","ϝ","Ϟ","ϟ","Ϡ","ϡ","Ϣ","ϣ","Ϥ","ϥ","Ϧ","ϧ","Ϩ","ϩ","Ϫ","ϫ","Ϭ","ϭ","Ϯ","ϯ","ϰ","ϱ","ϲ","ϳ","ϴ","ϵ","϶","Ϸ","ϸ","Ϲ","Ϻ","ϻ","ϼ","Ͻ","Ͼ","Ͽ","Ѐ","Ё","Ђ","Ѓ","Є","Ѕ","І","Ї","Ј","Љ","Њ","Ћ","Ќ","Ѝ","Ў","Џ","А","Б","В","Г","Д","Е","Ж","З","И","Й","К","Л","М","Н","О","П","Р","С","Т","У","Ф","Х","Ц","Ч","Ш","Щ","Ъ","Ы","Ь","Э","Ю","Я","а","б","в","г","д","е","ж","з","и","й","к","л","м","н","о","п","р","с","т","у","ф","х","ц","ч","ш","щ","ъ","ы","ь","э","ю","я","ѐ","ё","ђ","ѓ","є","ѕ","і","ї","ј","љ","њ","ћ","ќ","ѝ","ў","џ","Ѡ","ѡ","Ѣ","ѣ","Ѥ","ѥ","Ѧ","ѧ","Ѩ","ѩ","Ѫ","ѫ","Ѭ","ѭ","Ѯ","ѯ","Ѱ","ѱ","Ѳ","ѳ","Ѵ","ѵ","Ѷ","ѷ","Ѹ","ѹ","Ѻ","ѻ","Ѽ","ѽ","Ѿ","ѿ","Ҁ","ҁ","҂","҃","҄","҅","҆","҇","҈","҉","Ҋ","ҋ","Ҍ","ҍ","Ҏ","ҏ","Ґ","ґ","Ғ","ғ","Ҕ","ҕ","Җ","җ","Ҙ","ҙ","Қ","қ","Ҝ","ҝ","Ҟ","ҟ","Ҡ","ҡ","Ң","ң","Ҥ","ҥ","Ҧ","ҧ","Ҩ","ҩ","Ҫ","ҫ","Ҭ","ҭ","Ү","ү","Ұ","ұ","Ҳ","ҳ","Ҵ","ҵ","Ҷ","ҷ","Ҹ","ҹ","Һ","һ","Ҽ","ҽ","Ҿ","ҿ","Ӏ","Ӂ","ӂ","Ӄ","ӄ","Ӆ","ӆ","Ӈ","ӈ","Ӊ","ӊ","Ӌ","ӌ","Ӎ","ӎ","ӏ","Ӑ","ӑ","Ӓ","ӓ","Ӕ","ӕ","Ӗ","ӗ","Ә","ә","Ӛ","ӛ","Ӝ","ӝ","Ӟ","ӟ","Ӡ","ӡ","Ӣ","ӣ","Ӥ","ӥ","Ӧ","ӧ","Ө","ө","Ӫ","ӫ","Ӭ","ӭ","Ӯ","ӯ","Ӱ","ӱ","Ӳ","ӳ","Ӵ","ӵ","Ӷ","ӷ","Ӹ","ӹ","Ӻ","ӻ","Ӽ","ӽ","Ӿ","ӿ","Ԁ","ԁ","Ԃ","ԃ","Ԅ","ԅ","Ԇ","ԇ","Ԉ","ԉ","Ԋ","ԋ","Ԍ","ԍ","Ԏ","ԏ","Ԑ","ԑ","Ԓ","ԓ","Ԕ","ԕ","Ԗ","ԗ","Ԙ","ԙ","Ԛ","ԛ","Ԝ","ԝ","Ԟ","ԟ","Ԡ","ԡ","Ԣ","ԣ","Ԥ","ԥ","Ԧ","ԧ","Ԩ","ԩ","Ԫ","ԫ","Ԭ","ԭ","Ԯ","ԯ","԰","Ա","Բ","Գ","Դ","Ե","Զ","Է","Ը","Թ","Ժ","Ի","Լ","Խ","Ծ","Կ","Հ","Ձ","Ղ","Ճ","Մ","Յ","Ն","Շ","Ո","Չ","Պ","Ջ","Ռ","Ս","Վ","Տ","Ր","Ց","Ւ","Փ","Ք","Օ","Ֆ","՗","՘","ՙ","՚","՛","՜","՝","՞","՟","ՠ","ա","բ","գ","դ","ե","զ","է","ը","թ","ժ","ի","լ","խ","ծ","կ","հ","ձ","ղ","ճ","մ","յ","ն","շ","ո","չ","պ","ջ","ռ","ս","վ","տ","ր","ց","ւ","փ","ք","օ","ֆ","և","ֈ","։","֊","֋","֌","֍","֎","֏","֐","֑","֒","֓","֔","֕","֖","֗","֘","֙","֚","֛","֜","֝","֞","֟","֠","֡","֢","֣","֤","֥","֦","֧","֨","֩","֪","֫","֬","֭","֮","֯","ְ","ֱ","ֲ","ֳ","ִ","ֵ","ֶ","ַ","ָ","ֹ","ֺ","ֻ","ּ","ֽ","־","ֿ","׀","ׁ","ׂ","׃","ׄ","ׅ","׆","ׇ","׈","׉","׊","׋","׌","׍","׎","׏","א","ב","ג","ד","ה","ו","ז","ח","ט","י","ך","כ","ל","ם","מ","ן","נ","ס","ע","ף","פ","ץ","צ","ק","ר","ש","ת","׫","׬","׭","׮","ׯ","װ","ױ","ײ","׳","״","׵","׶","׷","׸","׹","׺","׻","׼","׽","׾","׿","؀","؁","؂","؃","؄","؅","؆","؇","؈","؉","؊","؋","،","؍","؎","؏","ؐ","ؑ","ؒ","ؓ","ؔ","ؕ","ؖ","ؗ","ؘ","ؙ","ؚ","؛","؜","؝","؞","؟","ؠ","ء","آ","أ","ؤ","إ","ئ","ا","ب","ة","ت","ث","ج","ح","خ","د","ذ","ر","ز","س","ش","ص","ض","ط","ظ","ع","غ","ػ","ؼ","ؽ","ؾ","ؿ","ـ","ف","ق","ك","ل","م","ن","ه","و","ى","ي","ً","ٌ","ٍ","َ","ُ","ِ","ّ","ْ","ٓ","ٔ","ٕ","ٖ","ٗ","٘","ٙ","ٚ","ٛ","ٜ","ٝ","ٞ","ٟ","٠","١","٢","٣","٤","٥","٦","٧","٨","٩","٪","٫","٬","٭","ٮ","ٯ","ٰ","ٱ","ٲ","ٳ","ٴ","ٵ","ٶ","ٷ","ٸ","ٹ","ٺ"]

const port = process.env.PORT || 80

app.listen(port, () => {
    app.get("/", (req, res, next) => {
        res.send('ERROR: Use "/encrypt" or "/decrypt"');
    });
    app.get("/encrypt", (req, res, next) => {
        res.json(sCrypt.encrypt(req.query.key, req.query.text));
    });
    app.get("/decrypt", (req, res, next) => {
        res.json(sCrypt.decrypt(req.query.key, JSON.parse(req.query.array)));
    });
});
