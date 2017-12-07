/* cookie plugin: https://github.com/js-cookie/js-cookie/tree/v2.1.3  */
!function(e){var n=!1;if("function"==typeof define&&define.amd&&(define(e),n=!0),"object"==typeof exports&&(module.exports=e(),n=!0),!n){var t=window.Cookies,o=window.Cookies=e();o.noConflict=function(){return window.Cookies=t,o}}}(function(){function e(){for(var e=0,n={};e<arguments.length;e++){var t=arguments[e];for(var o in t)n[o]=t[o]}return n}function n(t){function o(n,r,i){var c;if("undefined"!=typeof document){if(arguments.length>1){if(i=e({path:"/"},o.defaults,i),"number"==typeof i.expires){var a=new Date;a.setMilliseconds(a.getMilliseconds()+864e5*i.expires),i.expires=a}try{c=JSON.stringify(r),/^[\{\[]/.test(c)&&(r=c)}catch(s){}return r=t.write?t.write(r,n):encodeURIComponent(String(r)).replace(/%(23|24|26|2B|3A|3C|3E|3D|2F|3F|40|5B|5D|5E|60|7B|7D|7C)/g,decodeURIComponent),n=encodeURIComponent(String(n)),n=n.replace(/%(23|24|26|2B|5E|60|7C)/g,decodeURIComponent),n=n.replace(/[\(\)]/g,escape),document.cookie=[n,"=",r,i.expires?"; expires="+i.expires.toUTCString():"",i.path?"; path="+i.path:"",i.domain?"; domain="+i.domain:"",i.secure?"; secure":""].join("")}n||(c={});for(var p=document.cookie?document.cookie.split("; "):[],u=/(%[0-9A-Z]{2})+/g,d=0;d<p.length;d++){var f=p[d].split("="),l=f.slice(1).join("=");'"'===l.charAt(0)&&(l=l.slice(1,-1));try{var m=f[0].replace(u,decodeURIComponent);if(l=t.read?t.read(l,m):t(l,m)||l.replace(u,decodeURIComponent),this.json)try{l=JSON.parse(l)}catch(s){}if(n===m){c=l;break}n||(c[m]=l)}catch(s){}}return c}}return o.set=o,o.get=function(e){return o.call(o,e)},o.getJSON=function(){return o.apply({json:!0},[].slice.call(arguments))},o.defaults={},o.remove=function(n,t){o(n,"",e(t,{expires:-1}))},o.withConverter=n,o}return n(function(){})});

// Geolizr countries and currencies defaults
if("undefined" === typeof Geolizr) {
    var Geolizr = {countries:{AF:"AFGHANISTAN",AL:"ALBANIA",DZ:"ALGERIA",AS:"AMERICAN SAMOA",AD:"ANDORRA",AO:"ANGOLA",AI:"ANGUILLA",AQ:"ANTARCTICA",AG:"ANTIGUA AND BARBUDA",AR:"ARGENTINA",AM:"ARMENIA",AW:"ARUBA",AU:"AUSTRALIA",AT:"AUSTRIA",AZ:"AZERBAIJAN",BS:"BAHAMAS",BH:"BAHRAIN",BD:"BANGLADESH",BB:"BARBADOS",BY:"BELARUS",BE:"BELGIUM",BZ:"BELIZE",BJ:"BENIN",BM:"BERMUDA",BT:"BHUTAN",BO:"BOLIVIA",BA:"BOSNIA AND HERZEGOVINA",BW:"BOTSWANA",BV:"BOUVET ISLAND",BR:"BRAZIL",BQ:"BRITISH ANTARCTIC TERRITORY",IO:"BRITISH INDIAN OCEAN TERRITORY",VG:"BRITISH VIRGIN ISLANDS",BN:"BRUNEI",BG:"BULGARIA",BF:"BURKINA FASO",BI:"BURUNDI",KH:"CAMBODIA",CM:"CAMEROON",CA:"CANADA",CT:"CANTON AND ENDERBURY ISLANDS",CV:"CAPE VERDE",KY:"CAYMAN ISLANDS",CF:"CENTRAL AFRICAN REPUBLIC",TD:"CHAD",CL:"CHILE",CN:"CHINA",CX:"CHRISTMAS ISLAND",CC:"COCOS [KEELING] ISLANDS",CO:"COLOMBIA",KM:"COMOROS",CG:"CON BRAZZAVILLE",CD:"CON KINSHASA",CK:"COOK ISLANDS",CR:"COSTA RICA",HR:"CROATIA",CU:"CUBA",CY:"CYPRUS",CZ:"CZECH REPUBLIC",CI:"CÔTE D’IVOIRE",DK:"DENMARK",DJ:"DJIBOUTI",DM:"DOMINICA",DO:"DOMINICAN REPUBLIC",NQ:"DRONNING MAUD LAND",DD:"EAST GERMANY",EC:"ECUADOR",EG:"EGYPT",SV:"EL SALVADOR",GQ:"EQUATORIAL GUINEA",ER:"ERITREA",EE:"ESTONIA",ET:"ETHIOPIA",FK:"FALKLAND ISLANDS",FO:"FAROE ISLANDS",FJ:"FIJI",FI:"FINLAND",FR:"FRANCE",GF:"FRENCH GUIANA",PF:"FRENCH POLYNESIA",TF:"FRENCH SOUTHERN TERRITORIES",FQ:"FRENCH SOUTHERN AND ANTARCTIC TERRITORIES",GA:"GABON",GM:"GAMBIA",GE:"GEORGIA",DE:"GERMANY",GH:"GHANA",GI:"GIBRALTAR",GR:"GREECE",GL:"GREENLAND",GD:"GRENADA",GP:"GUADELOUPE",GU:"GUAM",GT:"GUATEMALA",GG:"GUERNSEY",GN:"GUINEA",GW:"GUINBISSAU",GY:"GUYANA",HT:"HAITI",HM:"HEARD ISLAND AND MCDONALD ISLANDS",HN:"HONDURAS",HK:"HONG KONG SAR CHINA",HU:"HUNGARY",IS:"ICELAND",IN:"INDIA",ID:"INDONESIA",IR:"IRAN",IQ:"IRAQ",IE:"IRELAND",IM:"ISLE OF MAN",IL:"ISRAEL",IT:"ITALY",JM:"JAMAICA",JP:"JAPAN",JE:"JERSEY",JT:"JOHNSTON ISLAND",JO:"JORDAN",KZ:"KAZAKHSTAN",KE:"KENYA",KI:"KIRIBATI",KW:"KUWAIT",KG:"KYRGYZSTAN",LA:"LAOS",LV:"LATVIA",LB:"LEBANON",LS:"LESOTHO",LR:"LIBERIA",LY:"LIBYA",LI:"LIECHTENSTEIN",LT:"LITHUANIA",LU:"LUXEMBOURG",MO:"MACAU SAR CHINA",MK:"MACEDONIA",MG:"MADAGASCAR",MW:"MALAWI",MY:"MALAYSIA",MV:"MALDIVES",ML:"MALI",MT:"MALTA",MH:"MARSHALL ISLANDS",MQ:"MARTINIQUE",MR:"MAURITANIA",MU:"MAURITIUS",YT:"MAYOTTE",FX:"METROPOLITAN FRANCE",MX:"MEXICO",FM:"MICRONESIA",MI:"MIDWAY ISLANDS",MD:"MOLDOVA",MC:"MONACO",MN:"MONGOLIA",ME:"MONTENEGRO",MS:"MONTSERRAT",MA:"MOROCCO",MZ:"MOZAMBIQUE",MM:"MYANMAR [BURMA]",NA:"NAMIBIA",NR:"NAURU",NP:"NEPAL",NL:"NETHERLANDS",AN:"NETHERLANDS ANTILLES",NT:"NEUTRAL ZONE",NC:"NEW CALEDONIA",NZ:"NEW ZEALAND",NI:"NICARAGUA",NE:"NIGER",NG:"NIGERIA",NU:"NIUE",NF:"NORFOLK ISLAND",KP:"NORTH KOREA",VD:"NORTH VIETNAM",MP:"NORTHERN MARIANA ISLANDS",NO:"NORWAY",OM:"OMAN",PC:"PACIFIC ISLANDS TRUST TERRITORY",PK:"PAKISTAN",PW:"PALAU",PS:"PALESTINIAN TERRITORIES",PA:"PANAMA",PZ:"PANAMA CANAL ZONE",PG:"PAPUA NEW GUINEA",PY:"PARAGUAY",YD:"PEOPLE’S DEMOCRATIC REPUBLIC OF YEMEN",PE:"PERU",PH:"PHILIPPINES",PN:"PITCAIRN ISLANDS",PL:"POLAND",PT:"PORTUGAL",PR:"PUERTO RICO",QA:"QATAR",RO:"ROMANIA",RU:"RUSSIA",RW:"RWANDA",RE:"RÉUNION",BL:"SAINT BARTHÉLEMY",SH:"SAINT HELENA",KN:"SAINT KITTS AND NEVIS",LC:"SAINT LUCIA",MF:"SAINT MARTIN",PM:"SAINT PIERRE AND MIQUELON",VC:"SAINT VINCENT AND THE GRENADINES",WS:"SAMOA",SM:"SAN MARINO",SA:"SAUDI ARABIA",SN:"SENEGAL",RS:"SERBIA",CS:"SERBIA AND MONTENEGRO",SC:"SEYCHELLES",SL:"SIERRA LEONE",SG:"SINGAPORE",SK:"SLOVAKIA",SI:"SLOVENIA",SB:"SOLOMON ISLANDS",SO:"SOMALIA",ZA:"SOUTH AFRICA",GS:"SOUTH GEORGIA AND THE SOUTH SANDWICH ISLANDS",KR:"SOUTH KOREA",ES:"SPAIN",LK:"SRI LANKA",SD:"SUDAN",SR:"SURINAME",SJ:"SVALBARD AND JAN MAYEN",SZ:"SWAZILAND",SE:"SWEDEN",CH:"SWITZERLAND",SY:"SYRIA",ST:"SÃO TOMÉ AND PRÍNCIPE",TW:"TAIWAN",TJ:"TAJIKISTAN",TZ:"TANZANIA",TH:"THAILAND",TL:"TIMLESTE",TG:"TOGO",TK:"TOKELAU",TO:"TONGA",TT:"TRINIDAD AND TOBAGO",TN:"TUNISIA",TR:"TURKEY",TM:"TURKMENISTAN",TC:"TURKS AND CAICOS ISLANDS",TV:"TUVALU",UM:"U.S. MINOR OUTLYING ISLANDS",PU:"U.S. MISCELLANEOUS PACIFIC ISLANDS",VI:"U.S. VIRGIN ISLANDS",UG:"UGANDA",UA:"UKRAINE",SU:"UNION OF SOVIET SOCIALIST REPUBLICS",AE:"UNITED ARAB EMIRATES",GB:"UNITED KINGDOM",US:"UNITED STATES",ZZ:"UNKNOWN OR INVALID REGION",UY:"URUGUAY",UZ:"UZBEKISTAN",VU:"VANUATU",VA:"VATICAN CITY",VE:"VENEZUELA",VN:"VIETNAM",WK:"WAKE ISLAND",WF:"WALLIS AND FUTUNA",EH:"WESTERN SAHARA",YE:"YEMEN",ZM:"ZAMBIA",ZW:"ZIMBABWE",AX:"ÅLAND ISLANDS"},currencies:{AD:"EUR",AE:"AED",AF:"AFN",AG:"XCD",AI:"XCD",AL:"ALL",AM:"AMD",AO:"AOA",AQ:"AQD",AR:"ARS",AS:"USD",AT:"EUR",AU:"AUD",AW:"AWG",AX:"EUR",AZ:"AZN",BA:"BAM",BB:"BBD",BD:"BDT",BE:"EUR",BF:"XOF",BG:"BGN",BH:"BHD",BI:"BIF",BJ:"XOF",BL:"EUR",BM:"BMD",BN:"BND",BO:"BOB",BQ:"USD",BR:"BRL",BS:"BSD",BT:"BTN",BV:"NOK",BW:"BWP",BY:"BYR",BZ:"BZD",CA:"CAD",CC:"AUD",CD:"CDF",CF:"XAF",CG:"XAF",CH:"CHF",CI:"XOF",CK:"NZD",CL:"CLP",CM:"XAF",CN:"CNY",CO:"COP",CR:"CRC",CU:"CUP",CV:"CVE",CW:"ANG",CX:"AUD",CY:"EUR",CZ:"CZK",DE:"EUR",DJ:"DJF",DK:"DKK",DM:"XCD",DO:"DOP",DZ:"DZD",EC:"USD",EE:"EUR",EG:"EGP",EH:"MAD",ER:"ERN",ES:"EUR",ET:"ETB",FI:"EUR",FJ:"FJD",FK:"FKP",FM:"USD",FO:"DKK",FR:"EUR",GA:"XAF",GB:"GBP",GD:"XCD",GE:"GEL",GF:"EUR",GG:"GBP",GH:"GHS",GI:"GIP",GL:"DKK",GM:"GMD",GN:"GNF",GP:"EUR",GQ:"XAF",GR:"EUR",GS:"GBP",GT:"GTQ",GU:"USD",GW:"XOF",GY:"GYD",HK:"HKD",HM:"AUD",HN:"HNL",HR:"HRK",HT:"HTG",HU:"HUF",ID:"IDR",IE:"EUR",IL:"ILS",IM:"GBP",IN:"INR",IO:"USD",IQ:"IQD",IR:"IRR",IS:"ISK",IT:"EUR",JE:"GBP",JM:"JMD",JO:"JOD",JP:"JPY",KE:"KES",KG:"KGS",KH:"KHR",KI:"AUD",KM:"KMF",KN:"XCD",KP:"KPW",KR:"KRW",KW:"KWD",KY:"KYD",KZ:"KZT",LA:"LAK",LB:"LBP",LC:"XCD",LI:"CHF",LK:"LKR",LR:"LRD",LS:"LSL",LT:"LTL",LU:"EUR",LV:"EUR",LY:"LYD",MA:"MAD",MC:"EUR",MD:"MDL",ME:"EUR",MF:"EUR",MG:"MGA",MH:"USD",MK:"MKD",ML:"XOF",MM:"MMK",MN:"MNT",MO:"MOP",MP:"USD",MQ:"EUR",MR:"MRO",MS:"XCD",MT:"EUR",MU:"MUR",MV:"MVR",MW:"MWK",MX:"MXN",MY:"MYR",MZ:"MZN",NA:"NAD",NC:"XPF",NE:"XOF",NF:"AUD",NG:"NGN",NI:"NIO",NL:"EUR",NO:"NOK",NP:"NPR",NR:"AUD",NU:"NZD",NZ:"NZD",OM:"OMR",PA:"PAB",PE:"PEN",PF:"XPF",PG:"PGK",PH:"PHP",PK:"PKR",PL:"PLN",PM:"EUR",PN:"NZD",PR:"USD",PS:"ILS",PT:"EUR",PW:"USD",PY:"PYG",QA:"QAR",RE:"EUR",RO:"RON",RS:"RSD",RU:"RUB",RW:"RWF",SA:"SAR",SB:"SBD",SC:"SCR",SD:"SDG",SE:"SEK",SG:"SGD",SH:"SHP",SI:"EUR",SJ:"NOK",SK:"EUR",SL:"SLL",SM:"EUR",SN:"XOF",SO:"SOS",SR:"SRD",SS:"SSP",ST:"STD",SV:"USD",SX:"ANG",SY:"SYP",SZ:"SZL",TC:"USD",TD:"XAF",TF:"EUR",TG:"XOF",TH:"THB",TJ:"TJS",TK:"NZD",TL:"USD",TM:"TMT",TN:"TND",TO:"TOP",TR:"TRY",TT:"TTD",TV:"AUD",TW:"TWD",TZ:"TZS",UA:"UAH",UG:"UGX",UM:"USD",US:"USD",UY:"UYU",UZ:"UZS",VA:"EUR",VC:"XCD",VE:"VEF",VG:"USD",VI:"USD",VN:"VND",VU:"VUV",WF:"XPF",WS:"WST",XK:"EUR",YE:"YER",YT:"EUR",ZA:"ZAR",ZM:"ZMK",ZW:"ZWL"}};
    Geolizr.shopDomain = window.location.hostname;
    Geolizr.jquery = null;
    Geolizr.geoData = null;
    Geolizr.validation = "74Pfs6wLK3GmwxYLoURv2ptrFVUAsEtDupYN0jEBC3WJyjGGddHrcl8IyRwF";
    Geolizr.initState = "false";
    Geolizr.initCallbackList = [];
    Geolizr.dataState = "false";
    Geolizr.dataCallbackList = [];
    Geolizr.eventListeners = [];
    Geolizr.currency_widget_enabled = false;
    Geolizr.shopCurrency = "EUR";
    Geolizr.moneyFormats = [];
    Geolizr.shopifyFormatMoneySet = false;
    Geolizr.observeElements = [];
    Geolizr.formatMoneyInit = false;
    Geolizr.cookie = Cookies.noConflict();
    Geolizr.version = 1.2;
    Geolizr.money_format = "${{amount}}";
}

Geolizr.config = function(config) {
    Geolizr.currency_widget_enabled = config.currency_widget_enabled == "true" || false;
    Geolizr.shopCurrency = "EUR";
    Geolizr.moneyFormats = [];
    Geolizr.shopifyFormatMoneySet = false;
    Geolizr.observeElements = [];

    if(Geolizr.currency_widget_enabled == true) {

        /* watch from https://gist.github.com/eligrey/384583 */
        Object.prototype.geolizrWatch||Object.defineProperty(Object.prototype,"geolizrWatch",{enumerable:!1,configurable:!0,writable:!1,value:function(e,t){var r=this[e],n=r,c=function(){return n},i=function(c){return r=n,n=t.call(this,e,r,c)};delete this[e]&&Object.defineProperty(this,e,{get:c,set:i,enumerable:!0,configurable:!0})}}),Object.prototype.geolizrUnWatch||Object.defineProperty(Object.prototype,"geolizrUnWatch",{enumerable:!1,configurable:!0,writable:!1,value:function(e){var t=this[e];delete this[e],this[e]=t}});

        var watcher = function(id, oldMethod, newMethod) {
            Geolizr.currency_widget_enabled = true; // sometimes the disabled this in this context, but it's true
            var morph = Geolizr.appendShopfiyFormatMoney(newMethod);
            if(morph.modified) {
                return morph.m;
            }

            return newMethod;
        };

        var startCheck = false;
        var endIntervalTheme = false, endIntervalShopify = false;
        var interval = function() {
            if(startCheck === false) {
                startCheck = new Date() / 1000;
            } else {
                var now = new Date() / 1000;
                if(now - startCheck > 30)
                    return;
            }

            if(endIntervalTheme === true && endIntervalShopify === true) {
                return;
            }

            var fm;
            if(endIntervalTheme === false) {
                if("undefined" == typeof theme || "undefined" == typeof theme.Currency) {
                    setTimeout(interval, 10);
                } else {
                    theme.Currency.geolizrWatch("formatMoney", watcher);
                    fm = Geolizr.appendShopfiyFormatMoney(theme.Currency.formatMoney);
                    theme.Currency.formatMoney = fm.m;
                    endIntervalTheme = true;
                    return
                }
            }

            if(endIntervalShopify === false) {
                if ("undefined" == typeof Shopify) {
                    setTimeout(interval, 10);
                } else {
                    Shopify.geolizrWatch("formatMoney", watcher);
                    fm = Geolizr.appendShopfiyFormatMoney(Shopify.formatMoney);
                    if("undefined" != typeof Shopify.money_format) Geolizr.money_format = Shopify.money_format;
                    Shopify.formatMoney = fm.m;
                    endIntervalShopify = true;
                }
            }
        };

        interval();
    }
};

Geolizr.addEventListener = function (event, eventListener) {
    if (!Geolizr.eventListeners[event]) {
        Geolizr.eventListeners[event] = [];
    }

    Geolizr.eventListeners[event].push(eventListener);

    if(event == 'geolizr.geoData' && Geolizr.geoData) {
        Geolizr.dispatchEvent('geolizr.geoData', Geolizr.geoData);
    }
};

Geolizr.appendShopfiyFormatMoney = function(method) {
    var modified = false;
    if("undefined"!=typeof method && Geolizr.currency_widget_enabled == true) {
        if (typeof method === 'function' && method(10000, "{{checkGeolizrExtension}}") === "") {
            Geolizr.shopifyFormatMoneySet = true;
            Geolizr.shopifyFormatMoney = method;
            method = function(cents, format) {
                if(format === "{{checkGeolizrExtension}}")
                    return Geolizr.version;

                "string" == typeof cents && (cents = cents.replace(".", ""));
                if(Geolizr.formatMoneyInit == true) {
                    return Geolizr.formatMoney(cents, format);
                } else {
                    return '<span class="geolizr-currency" data-geolizr-price="' + cents + '">' + Geolizr.shopifyFormatMoney(cents, format) + '</span>';
                }
            };
            modified = true;
        }
    }

    return {m: method, modified: modified};
};

Geolizr.dispatchEvent = function (event, params) {
    if (Geolizr.eventListeners[event]) {
        for (var i = 0; i < Geolizr.eventListeners[event].length; i++) {
            Geolizr.eventListeners[event][i](params);
        }
    }
};

Geolizr.isReady = function () {
    // check for valid installations
    return true;
};

Geolizr.getCurrencyCode = function (geoData) {
    geoData.countryCode = geoData.countryCode || "--";
    if (geoData && Geolizr.currencies[geoData.countryCode]) {
        return Geolizr.currencies[geoData.countryCode];
    }
    else {
        return false;
    }
};

Geolizr.loadScript = function (url, callback) {
    var script = document.createElement('script');
    script.type = 'text/javascript';

    if (script.readyState) {
        script.onreadystatechange = function () {
            if (script.readyState == 'loaded' || script.readyState == 'complete') {
                script.onreadystatechange = null;
                callback();
            }
        };
    } else {
        script.onload = function () {
            callback();
        };
    }

    script.src = url;
    document.getElementsByTagName('head')[0].appendChild(script);
};

Geolizr.listCheck = function(item, filterUrls, currentUrlWithoutParams) {
    if(item.filterlistType == undefined)
        return false;

    item.filterlistType = item.filterlistType || "none";
    var result = false;
    if(item.filterlistType == 'blacklist') {
        result = false;
        filterUrls.forEach(function(filter) {
            if(currentUrlWithoutParams.match(filter) !== null)
                result = true;
        });
        return result;
    }

    if(item.filterlistType == 'whitelist') {
        result = true;
        filterUrls.forEach(function(filter) {
            if(currentUrlWithoutParams.match(filter) !== null)
                result = false;
        });
        return result;
    }

    return false;
};

Geolizr.calculate = function(calcStr) {
    return new Function('return ' + calcStr)();
};

Geolizr.getURLParameter = function (name) {
    var vars = [], hash;
    var hashes = window.location.href.slice(window.location.href.indexOf('?') + 1).split('&');
    for (var i = 0; i < hashes.length; i++) {
        hash = hashes[i].split('=');
        vars.push(hash[0]);
        vars[hash[0]] = hash[1];
    }
    return vars[name];
};

Geolizr.checkGeoData = function(geoData) {
    var ignoreOrgs =['Microsoft bingbot', 'Googlebot', 'Facebook', 'Yahoo', 'YANDEX LLC', 'China Unicom Beijing'];
    geoData.org = geoData.org || "N/A";
    if("undefined" !== typeof geoData.org && ignoreOrgs.indexOf(geoData.org) > -1) {
        return false;
    }
    return "undefined" !== typeof geoData.status && geoData.status == "success";
};

Geolizr.geoDataSuccessCallback = function(geoData) {
    var fallback = false;
    var status = Geolizr.checkGeoData(geoData);
    if(geoData.success == true) {
        fallback = true;
        status = true;
    }

    if (status) {
        Geolizr.geoDataSave(geoData);
        if(!fallback) {
            geoData.currency = {'code': Geolizr.getCurrencyCode(geoData)};
            geoData.country = {'code': geoData.countryCode, 'country': geoData.country};
        }

        Geolizr.geoData = geoData;
        Geolizr.dataState = 'true';
        for (var i = 0; i < Geolizr.dataCallbackList.length; i++) {
            Geolizr.dataCallbackList[i](geoData, true);
        }
        Geolizr.dataCallbackList = [];
    }
};

Geolizr.geoDataLoad = function(usedUrl, fallBackUrl, callback) {
    if((typeof Geolizr.geolizr != "undefined" && Geolizr.geolizr == 'off') ||
        (typeof Geolizr.geoDataObject != "undefined" && Geolizr.geoDataObject && Geolizr.geoDataObject.geolizr == "off" )) {
        var data = {
            "success":true,
            "geolizr": 'off',
            "country": {"code":"--"},
            "currency":{"code":"---"}
        };
        callback(data);
        return;
    }

    Geolizr.jquery.ajax = Geolizr.jquery.ajax || false;
    if(Geolizr.jquery.ajax != false) {
        Geolizr.jquery.ajax({
            timeout: 1500,
            url: usedUrl,
            success: callback,
            error: function() {
                $.ajax({
                    url: fallBackUrl,
                    success: callback
                });
            }
        });
    }
};

Geolizr.geoDataSave = function(geoData) {
    if (Geolizr.geolizrCountry) {
        geoData.geolizrCountry = Geolizr.geolizrCountry;
    }

    Geolizr.cookie.set('geo_data', geoData, {
        expires: 365,
        path: '/',
        domain: Geolizr.shopDomain
    });
};

Geolizr.getGeoData = function (callback, ignoreCache) {
    Geolizr.geolizr = Geolizr.getURLParameter('geolizr');
    Geolizr.geolizrIP = Geolizr.getURLParameter('geolizr_ip');
    Geolizr.geolizrCountry = Geolizr.getURLParameter('geolizr_country');

    ignoreCache = ignoreCache ? ignoreCache === true : false;
    if(Geolizr.geolizr && Geolizr.geolizr == "off" || Geolizr.geolizrIP || Geolizr.geolizrCountry)
        ignoreCache = false;

    if (Geolizr.dataState === 'true' && Geolizr.geoData) {
        callback(Geolizr.geoData);
        return;
    } else if (Geolizr.dataState === 'pending') {
        Geolizr.dataCallbackList.push(callback);
        return;
    }

    Geolizr.dataCallbackList.push(callback);
    Geolizr.dataState = 'pending';

    var usedUrl = 'https://pro.ip-api.com/json';
    var fallBackUrl = 'https://service.geolizr.com';

    if (Geolizr.geolizrIP) {
        ignoreCache = true;
        usedUrl = usedUrl + '/' + Geolizr.geolizrIP + '?key=tRmURnXYvSzbKKY';
    } else {
        usedUrl = usedUrl + '?key=tRmURnXYvSzbKKY';
    }

    if (Geolizr.geolizrCountry) {
        ignoreCache = true;
        usedUrl = fallBackUrl + '?country=' + Geolizr.geolizrCountry;
    }

    Geolizr.geoDataObject = false;
    if (Geolizr.isReady()) {
        var geoData = Geolizr.cookie.get('geo_data');
        Geolizr.jquery.parseJSON = Geolizr.jquery.parseJSON || false;
        if(Geolizr.jquery.parseJSON == false)
            return;

        if("undefined" != typeof geoData)
            Geolizr.geoDataObject = Geolizr.jquery.parseJSON(geoData);
        else
            Geolizr.geoDataObject = false;

        if(typeof Geolizr.geoDataObject != "undefined" && Geolizr.geoDataObject) {
            if(!Geolizr.geoDataObject.geolizrCountry && Geolizr.geoDataObject.geolizrCountry != Geolizr.geolizrCountry) {
                Geolizr.geoDataObject = false;
            }

            if(Geolizr.geoDataObject && ("off" == Geolizr.geoDataObject.geolizr)) {
                Geolizr.geolizr = "off";
            }

            if(Geolizr.geolizr && ("on" == Geolizr.geolizr || "off" == Geolizr.geolizr)) {
                Geolizr.geoDataObject = false;
            }

            if(ignoreCache === true)
                Geolizr.geoDataObject = false;
        }

        if(Geolizr.geoDataObject) {
            Geolizr.geoDataSuccessCallback(Geolizr.geoDataObject);
            Geolizr.geoDataLoad(usedUrl, fallBackUrl, Geolizr.geoDataSave);
        } else {
            Geolizr.geoDataLoad(usedUrl, fallBackUrl, Geolizr.geoDataSuccessCallback);
        }
    } else {
        Geolizr.dataState = 'false';
    }
};

Geolizr.versionCompare = function(a, b) {
    if (a === b) {
        return 0;
    }

    var a_components = a.split(".");
    var b_components = b.split(".");

    var len = Math.min(a_components.length, b_components.length);

    // loop while the components are equal
    for (var i = 0; i < len; i++) {
        // A bigger than B
        if (parseInt(a_components[i]) > parseInt(b_components[i])) {
            return 1;
        }

        // B bigger than A
        if (parseInt(a_components[i]) < parseInt(b_components[i])) {
            return -1;
        }
    }

    // If one's a prefix of the other, the longer one is greater.
    if (a_components.length > b_components.length) {
        return 1;
    }

    if (a_components.length < b_components.length) {
        return -1;
    }

    // Otherwise they are the same.
    return 0;
};

Geolizr.redirect = function(redirect) {
    if(redirect) {
        var currentUrl = window.location.href;
        if(currentUrl.slice(-1) == '/') {
            currentUrl = currentUrl.substring(0, currentUrl.length - 1);
        }

        var currentUrlWithoutParams = currentUrl.split('?')[0];
        if(currentUrlWithoutParams.slice(-1) == '/') {
            currentUrlWithoutParams = currentUrlWithoutParams.substring(0, currentUrlWithoutParams.length - 1);
        }

        redirect.redirectUrl = redirect.redirectUrl || "";
        var targetUrl = redirect.redirectUrl.replace('/%path%', '%path%');
        if(targetUrl.slice(-1) == '/') {
            targetUrl = targetUrl.substring(0, targetUrl.length - 1);
        }
        if(targetUrl.indexOf('%path%') > -1) {
            var path = window.location.href.replace(window.location.protocol + '//' + window.location.hostname, '');
            targetUrl = targetUrl.replace('%path%', path);
        } else {
            Geolizr.geolizrCountry = Geolizr.getURLParameter('geolizr_country');
            Geolizr.geolizrIP = Geolizr.getURLParameter('geolizr_ip');
            if("undefined" !== typeof Geolizr.geolizrCountry && "undefined" !== typeof Geolizr.geolizrIP) {
                targetUrl = targetUrl + '/?geolizr_country=' + Geolizr.geolizrCountry + "&geolizr_ip=" + Geolizr.geolizrIP;
            } else {
                if(Geolizr.geolizrCountry) {
                    targetUrl = targetUrl + '/?geolizr_country=' + Geolizr.geolizrCountry;
                }
                if(Geolizr.geolizrIP) {
                    targetUrl = targetUrl + '/?geolizr_ip=' + Geolizr.geolizrIP;
                }
            }
        }
        if(targetUrl.slice(-1) == '/') {
            targetUrl = targetUrl.substring(0, targetUrl.length - 1);
        }

        redirect.filterlistUrls = redirect.filterlistUrls || "";
        if(redirect.filterlistType != 'none' && redirect.filterlistUrls != "") {
            var filterUrls = redirect.filterlistUrls.replace(/ /g,'').split(",");
            if(Geolizr.listCheck(redirect, filterUrls, currentUrlWithoutParams))
                return;
        }

        if(document.referrer && document.referrer != '') {
            var tmpAnchor = document.createElement('a');
            tmpAnchor.href = document.referrer;
            var referrer = tmpAnchor.host;
            redirect.redirectIgnoreReferrers = redirect.redirectIgnoreReferrers || false;
            if(redirect.redirectIgnoreReferrers) {
                var ignoreReferrers = redirect.redirectIgnoreReferrers.replace(/ /g,'').split(',');
                Geolizr.jquery.inArray = Geolizr.jquery.inArray || function() { return false };
                if(Geolizr.jquery.inArray(referrer, ignoreReferrers) == -1 && currentUrl != targetUrl) {
                    window.location.replace(targetUrl);
                }
            } else {
                if(currentUrl != targetUrl) {
                    window.location.replace(targetUrl);
                }
            }
        } else {
            if(currentUrl != targetUrl) {
                window.location.replace(targetUrl);
            }
        }
    }
};

Geolizr.popup = function(popup, assetUrl) {
    if(popup) {
        // Create IE + others compatible event handler
        var eventMethod = window.addEventListener ? "addEventListener" : "attachEvent";
        var eventCatcher = window[eventMethod];
        var messageEvent = eventMethod == "attachEvent" ? "onmessage" : "message";

        // Listen to message from child window
        eventCatcher(messageEvent,function(e) {
            var geolizrPopup = $('#geolizr-popup');
            var data = e.data || "";
            if(geolizrPopup.length > 0 && data.startsWith("GeolizrClosePopup") === true) {
                e.preventDefault();

                if(Geolizr.activePopup)
                    Geolizr.dispatchEvent('popup.hide', Geolizr.activePopup);

                geolizrPopup.remove();

                if(Geolizr.activePopup && Geolizr.activePopup.rememberCloseState === 'true') {
                    Geolizr.cookie.set('geolizr-dismissed-popup-' + Geolizr.activePopup.id, 'true', {expires: 365, path: '/', domain: Geolizr.shopDomain });
                }
                Geolizr.activePopup = null;
                if(data !== "GeolizrClosePopup") {
                    var dataArray = data.split("=>");
                    var url = dataArray[1];
                    window.location.href = url;
                }
            }
        },false);

        var dismissed = Geolizr.cookie.get('geolizr-dismissed-popup-' + popup.id) === 'true';
        if(!dismissed) {
            var currentUrlWithoutParams = window.location.href.split('?')[0];
            if(currentUrlWithoutParams.slice(-1) == '/') {
                currentUrlWithoutParams = currentUrlWithoutParams.substring(0, currentUrlWithoutParams.length - 1);
            }

            if(popup.filterlistType != 'none' && popup.filterlistUrls != "") {
                var filterUrls = popup.filterlistUrls.replace(/ /g,'').split(",");
                if(Geolizr.listCheck(popup, filterUrls, currentUrlWithoutParams))
                    return;
            }

            // open popup div
            popup.roundCorner = popup.roundCorner || 'false';
            var geolizrClass = popup.roundCorner === 'true' ? "geolizr-popup-round-corner" : "geolizr-popup-shadow";
            var geolizrPopupTemplate = '<div id="geolizr-popup">';
            geolizrPopupTemplate += '<div class="geolizr-popup gp-center ' + geolizrClass + '" style="background: ' + popup.backgroundColor + ' !important;">';
            geolizrPopupTemplate += '<iframe id="geolizr-popup-content-iframe" class="' + geolizrClass + '" src="' + assetUrl.replace("[popupId]",popup.id) +  '.html"></iframe>';

            popup.dismissible = popup.dismissible || 'false';
            if(popup.dismissible === 'true') {
                popup.textColor = popup.textColor || "black";

                // close
                geolizrPopupTemplate += '<a id="geolizr-dismiss-popup" style="color: ' + popup.textColor + ';" href="">&times;</a>';
            }

            popup.pageBackgroundColor = popup.pageBackgroundColor || ['inherit'];
            geolizrPopupTemplate += '</div>';
            geolizrPopupTemplate += '<div class="geolizr-popup-background" style="background-color: rgba(' + popup.pageBackgroundColor[0] + ', ' + popup.pageBackgroundColor[1] + ',' + popup.pageBackgroundColor[2] + ', 0.7)"></div>';
            geolizrPopupTemplate += '</div>';

            Geolizr.dispatchEvent('popup.show', popup);

            Geolizr.jquery('body').prepend = Geolizr.jquery('body').prepend || function() { return false };
            Geolizr.jquery('body').prepend(geolizrPopupTemplate);

            var geolizrPopup = $('#geolizr-popup');
            Geolizr.activePopup = popup;
            geolizrPopup.children = geolizrPopup.children || function() { return false };
            var geolizrPopupContent = geolizrPopup.children('div.geolizr-popup');
            var onResize = function(event) {
                Geolizr.event = event;
                var geolizrPopupHeight = parseInt(geolizrPopup.height());
                geolizrPopupContent.hasClass = geolizrPopupContent.hasClass || function() {return false;};
                geolizrPopupContent.addClass = geolizrPopupContent.addClass || function() {return false;};
                geolizrPopupContent.removeClass = geolizrPopupContent.removeClass || function() {return false;};
                if($(window).width() < 670 && geolizrPopupContent.hasClass('gp-center')) {
                    if($(window).width >= $(window).height) {
                        geolizrPopupContent.addClass('gp-mobile');
                        geolizrPopupContent.addClass('landscape');
                    } else {
                        geolizrPopupContent.addClass('gp-mobile');
                        geolizrPopupContent.addClass('portrait');
                    }
                    geolizrPopupContent.removeClass('gp-center');
                } else if($(window).width() >= 670 && geolizrPopupContent.hasClass('gp-mobile')) {
                    geolizrPopupContent.addClass('gp-center');
                    geolizrPopupContent.removeClass('gp-mobile');
                    if(geolizrPopupContent.hasClass('portrait'))
                        geolizrPopupContent.removeClass('portrait');
                    if(geolizrPopupContent.hasClass('landscape'))
                        geolizrPopupContent.removeClass('landscape');
                }
                Geolizr.dispatchEvent('popup.resize', {popup: popup, height:geolizrPopupHeight});
            };

            onResize();
            $(window).resize(onResize);

            if(popup.dismissible === 'true') {
                $('#geolizr-dismiss-popup').click(function(e) {
                    e.preventDefault();

                    Geolizr.dispatchEvent('popup.hide', popup);

                    geolizrPopup.remove();
                    Geolizr.activePopup = null;

                    popup.rememberCloseState = popup.rememberCloseState || 'false';
                    if(popup.rememberCloseState === 'true') {
                        Geolizr.cookie.set('geolizr-dismissed-popup-' + popup.id, 'true', {expires: 365, path: '/', domain: Geolizr.shopDomain });
                    }
                });
            }
        }
    }
};

Geolizr.notification = function(notification, geoData, geolizrNotificationShadow) {
    if(notification) {
        var dismissed = Geolizr.cookie.get('geolizr-dismissed-' + notification.id) === 'true';
        if(!dismissed) {
            var currentUrlWithoutParams = window.location.href.split('?')[0];
            if(currentUrlWithoutParams.slice(-1) == '/') {
                currentUrlWithoutParams = currentUrlWithoutParams.substring(0, currentUrlWithoutParams.length - 1);
            }

            if(notification.filterlistType != 'none' && notification.filterlistUrls != "") {
                var filterUrls = notification.filterlistUrls.replace(/ /g,'').split(",");
                if(Geolizr.listCheck(notification, filterUrls, currentUrlWithoutParams))
                    return;
            }

            var randomNumber = function(regex,from,to,gc,cookie) {
                cookie = cookie == "1";
                var cookieKey = "rndNr_" + from + "," + to + location.href;
                if(cookie && Geolizr.cookie.get(cookieKey)) {
                    return Geolizr.cookie.get(cookieKey);
                }
                var random = Math.floor(Math.random() * parseInt(to) ) + parseInt(from);
                if(cookie) Geolizr.cookie.set(cookieKey, random, {expire: 1});
                return random;
            };

            notification.message = notification.message.replace('{{ country_name }}', Geolizr.countries[geoData.country.code])
                .replace('{{ country_code }}', geoData.country.code)
                .replace(/{{ random_number\((\d+),(\d+)(,(\d+))?\) }}/g, randomNumber)
                .replace('{{ currency }}', geoData.currency.code);

            notification.linkColor = notification.linkColor || "";
            notification.linkUrl = notification.linkUrl || "";
            notification.linkText = notification.linkText || "";
            notification.textColor = notification.textColor || "";
            notification.backgroundColor = notification.backgroundColor || "";

            // open notification div
            var geolizrNotificationTemplate = '<div id="geolizr-notification">';
            geolizrNotificationTemplate += '<div id="geolizr-notification-message-wrapper" style="background-color: ' + notification.backgroundColor + '; border-bottom:4px solid ' + notification.textColor + ';">';
            // text
            geolizrNotificationTemplate += '<span style="color:' +  notification.textColor + ' !important; font-family:' + notification.font + ' !important;">' + notification.message + '&nbsp;</span>';
            // link
            geolizrNotificationTemplate += '<a style="color:' + notification.linkColor + ' !important;text-decoration:underline !important;font-family:' + notification.font + ' !important;" href="' + notification.linkUrl + '">' + notification.linkText + '</a>';

            if(notification.dismissible === 'true') {
                // close
                geolizrNotificationTemplate += '<a id="geolizr-dismiss-notification" style="color: ' + notification.backgroundColor + ' !important; background: ' +  notification.textColor + ';" href="">&times;</a>';
            }

            // close notification div
            geolizrNotificationTemplate += '</div>';

            // spanner
            geolizrNotificationTemplate += '<div id="geolizr-notification-spanner" style="background:url(' + geolizrNotificationShadow + ') !important;"></div></div><div id="geolizr-notification-space"></div>';

            Geolizr.dispatchEvent('notification.show', notification);

            $('body').addClass('geolizr-notification-open');
            $('body').prepend(geolizrNotificationTemplate);

            var geolizrNotification = $('#geolizr-notification');
            var geolizrNotificationSpace  = $('#geolizr-notification-space');

            var onResize = function() {
                var geolizrNotificationHeight = parseInt(geolizrNotification.height());
                geolizrNotificationSpace.css = geolizrNotificationSpace.css || function() { return false };
                geolizrNotificationSpace.css('margin-bottom', geolizrNotificationHeight);

                Geolizr.dispatchEvent('notification.resize', {notification: notification, height:geolizrNotificationHeight});
            };

            onResize();
            $(window).resize(onResize);

            if(notification.dismissible === 'true') {
                $('#geolizr-dismiss-notification').click(function(e) {
                    e.preventDefault();

                    Geolizr.dispatchEvent('notification.hide', notification);

                    geolizrNotification.remove();
                    geolizrNotificationSpace.css('margin-bottom', '0px');
                    $('body').removeClass('geolizr-notification-open');

                    if(notification.rememberCloseState === 'true') {
                        Geolizr.cookie.set('geolizr-dismissed-' + notification.id, 'true', {expires: 365, path: '/', domain: Geolizr.shopDomain });
                    }
                });
            }
        }
    }
};

Geolizr.shopifyFormatMoney = function(e, t) {
    function n(e, t) {
        return "undefined" == typeof e ? t : e
    }
    function i(e, t, i, r) {
        if (t = n(t, 2),
                i = n(i, ","),
                r = n(r, "."),
            isNaN(e) || null == e)
            return 0;
        e = (e / 100).toFixed(t);
        var o = e.split(".")
            , a = o[0].replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1" + i)
            , s = o[1] ? r + o[1] : "";
        return a + s
    }
    "string" == typeof e && (e = e.replace(".", ""));
    var r = ""
        , o = /{{\s*(\w+)\s*}}/
        , a = t || this.money_format;
    switch (a.match(o)[1]) {
        case "amount":
            r = i(e, 2);
            break;
        case "amount_no_decimals":
            r = i(e, 0);
            break;
        case "amount_with_comma_separator":
            r = i(e, 2, ".", ",");
            break;
        case "amount_no_decimals_with_comma_separator":
            r = i(e, 0, ".", ",");
            break;
        case "amount_no_decimals_with_space_separator":
            r = i(e, 0, " ")
    }
    return a.replace(o, r)
};

Geolizr.formatMoney = function(cents, format) {
    if (typeof cents == 'string') { cents = cents.replace('.',''); }
    var value = '';
    var placeholderRegex = /{{\s*(\w+)\s*}}/;
    this.money_format = this.money_format || false;
    var formatString = format || this.money_format;

    var defaultOption = function(opt, def) {
        return (typeof opt == 'undefined' ? def : opt);
    };

    var formatWithDelimiters = function(number, precision, thousands, decimal) {
        precision = defaultOption(precision, 2);
        thousands = defaultOption(thousands, ',');
        decimal   = defaultOption(decimal, '.');

        if (isNaN(number) || number == null) { return 0; }

        number = (number/100.0).toFixed(precision);

        var parts   = number.split('.'),
            dollars = parts[0].replace(/(\d)(?=(\d\d\d)+(?!\d))/g, '$1' + thousands),
            cents   = parts[1] ? (decimal + parts[1]) : '';

        return dollars + cents;
    };

    switch(formatString.match(placeholderRegex)[1]) {
        case 'amount':
            value = formatWithDelimiters(cents, 2);
            break;
        case 'amount_no_decimals':
            value = formatWithDelimiters(cents, 0);
            break;
        case 'amount_with_comma_separator':
            value = formatWithDelimiters(cents, 2, '.', ',');
            break;
        case 'amount_no_decimals_with_comma_separator':
            value = formatWithDelimiters(cents, 0, '.', ',');
            break;
    }

    return formatString.replace(placeholderRegex, value);
};

Geolizr.fixedFormatMoney = function formatMoney(cents, format) {
    if (typeof cents === 'string') {
        cents = cents.replace('.', '');
    }
    var value = '';
    var placeholderRegex = /\{\{\s*(\w+)\s*\}\}/;
    var formatString = (format || moneyFormat);

    function formatWithDelimiters(number, precision, thousands, decimal) {
        if(precision !== 0) precision = precision || 2;
        thousands = thousands || ',';
        decimal = decimal || '.';

        if (isNaN(number) || number == null) {
            return 0;
        }

        number = (number / 100.0).toFixed(precision);

        var parts = number.split('.');
        var dollarsAmount = parts[0].replace(/(\d)(?=(\d\d\d)+(?!\d))/g, '$1' + thousands);
        var centsAmount = parts[1] ? (decimal + parts[1]) : '';

        return dollarsAmount + centsAmount;
    }

    switch (formatString.match(placeholderRegex)[1]) {
        case 'amount':
            value = formatWithDelimiters(cents, 2);
            break;
        case 'amount_no_decimals':
            value = formatWithDelimiters(cents, 0);
            break;
        case 'amount_with_comma_separator':
            value = formatWithDelimiters(cents, 2, '.', ',');
            break;
        case 'amount_no_decimals_with_comma_separator':
            value = formatWithDelimiters(cents, 0, '.', ',');
            break;
        case 'amount_no_decimals_with_space_separator':
            value = formatWithDelimiters(cents, 0, ' ');
            break;
    }

    return formatString.replace(placeholderRegex, value);
};

Geolizr.setCurrency = function (currency) {
    Geolizr.init(function($) {
        if(Geolizr.observeElements.length > 0) {
            Geolizr.disconnectObserver();
        }

        var moneyFormat = Geolizr.moneyFormats[currency].moneyFormat;
        var customCalculation = Geolizr.moneyFormats[currency].calculationString || false;
        Geolizr.jquery('.geolizr-currency').each(function () {
            var originalPrice = parseInt($(this).attr('data-geolizr-price'), 10);
            //noinspection JSUnresolvedVariable,JSUnresolvedFunction
            var convertedPrice = Geolizr.Currency.convert(originalPrice, Geolizr.shopCurrency, currency);

            if (customCalculation) {
                convertedPrice = Geolizr.calculate(customCalculation.replace('{{amount}}', convertedPrice));
            }

            var placeholderRegex = /\{\{\s*(\w+)\s*\}\}/;
            var output = Geolizr.shopifyFormatMoney(convertedPrice, moneyFormat);
            if(moneyFormat.match(placeholderRegex)[1] == 'amount_no_decimals') {
                output = Geolizr.fixedFormatMoney(convertedPrice, moneyFormat);
            }

            Geolizr.jquery(this).html(output);
        });

        var removeDomains = Geolizr.shopDomain.split(".").reverse();
        var baseEnding = removeDomains.shift();
        var baseDomain = removeDomains.shift() + '.' + baseEnding;
        Geolizr.cookie.remove('geolizr-currency', {domain: baseDomain});
        if(removeDomains.length > 0) {
            removeDomains.forEach(function(subDomain) {
                baseDomain = subDomain + '.' + baseDomain
                Geolizr.cookie.remove('geolizr-currency', {domain: baseDomain});
            });
        }
        Geolizr.cookie.set('geolizr-currency', currency, {expires: 365, path: '/', domain: Geolizr.shopDomain});

        var usedLanguageCode = Geolizr.currenciesToLanguages[currency];
        if (!usedLanguageCode) {
            usedLanguageCode = Geolizr.currenciesToLanguages[Geolizr.shopCurrency]
        }

        Geolizr.jquery('#geolizr-currency-switcher').find('> i').replaceWith($('<i class="famfamfam-flag-' + usedLanguageCode + '"></i>'));
        Geolizr.jquery('.geolizr-currency-switcher-value').text(currency);

        Geolizr.dispatchEvent('currency.change', currency);

        if(Geolizr.observeElements.length > 0) {
            Geolizr.observe();
        }
    });
};

Geolizr.getCurrency = function () {
    return Geolizr.cookie.get('geolizr-currency', {domain: Geolizr.shopDomain}) || Geolizr.shopCurrency;
};

Geolizr.switchCurrency = function (currency) {
    if (currency && Geolizr.moneyFormats[currency]) {
        Geolizr.setCurrency(currency);
    } else {
        Geolizr.setCurrency(Geolizr.shopCurrency);
    }
};

Geolizr.currencyConverterInit = function () {
    //noinspection JSUnresolvedVariable
    if (typeof Geolizr.formatMoney != 'undefined' && typeof Geolizr.formatMoney === 'function') {
        //noinspection JSUnresolvedVariable
        Geolizr.formatMoney = function (cents, format) {
            var currency = Geolizr.getCurrency();
            if (Geolizr.moneyFormats[currency]) {
                var moneyFormat = Geolizr.moneyFormats[currency].moneyFormat;
                var originalPrice = parseInt(cents, 10);
                //noinspection JSUnresolvedVariable,JSUnresolvedFunction
                var convertedPrice = Geolizr.Currency.convert(originalPrice, Geolizr.shopCurrency, currency);
                return '<span class="geolizr-currency" data-geolizr-price="' + cents + '">' + Geolizr.shopifyFormatMoney(convertedPrice, moneyFormat) + '</span>';
            } else {
                return '<span class="geolizr-currency" data-geolizr-price="' + cents + '">' + Geolizr.shopifyFormatMoney(cents, format) + '</span>';
            }
        };
        Geolizr.formatMoneyInit = true;
    }

    var usedCurrency = Geolizr.getCurrency();
    var geolizrCountry = Geolizr.getURLParameter('geolizr_country');
    var geolizrIp = Geolizr.getURLParameter('geolizr_ip');

    if ((!Geolizr.cookie.get('geolizr-currency') || geolizrCountry || geolizrIp) && Geolizr.currencyOptions.auto_switch_currency === true) {
        Geolizr.getGeoData(function (geoData) {
            usedCurrency = geoData.currency.code;
            if ($('.geolizr-currency-list-link[geolizr-currency-data="' + geoData.currency.code + '"]').length <= 0 && Geolizr.moneyFormats[geoData.currency.code]) {
                $('#geolizr-currency-placeholder-value').text(geoData.currency.code);
                var currencyPlaceholder = $('#geolizr-currency-placeholder');
                currencyPlaceholder.find('a').attr('geolizr-currency-data', geoData.currency.code);

                var usedLanguageCode = Geolizr.currenciesToLanguages[geoData.currency.code];
                if (usedLanguageCode) {
                    currencyPlaceholder.find('i').attr('class', 'famfamfam-flag-' + usedLanguageCode);
                }

                currencyPlaceholder.show();
            }

            Geolizr.switchCurrency(usedCurrency);
        });
    } else {
        Geolizr.switchCurrency(usedCurrency);
    }

    Geolizr.dispatchEvent('currency.api', {switchCurrency: Geolizr.switchCurrency, getCurrency: Geolizr.getCurrency});
};

Geolizr.init = function (callback) {
    if (Geolizr.initState === 'true') {
        callback(Geolizr.jquery);
        return;
    } else if (Geolizr.initState === 'pending') {
        Geolizr.initCallbackList.push(callback);
        return;
    }

    Geolizr.initCallbackList.push(callback);
    Geolizr.initState = 'pending';

    var init = function ($) {
        // check for global jquery
        if(typeof window.$ == 'undefined') window.$ = $;
        Geolizr.jquery = $;
        Geolizr.jquery && function ($) {
            function t(t, e) {
                var n = t ? $(this) : e;
                n.attr = n.attr || false;
                var d = $(n.attr("data-jq-dropdown")), a = n.hasClass("jq-dropdown-open");
                if (t) {
                    if ($(t.target).hasClass("jq-dropdown-ignore"))return;
                    t.preventDefault(), t.stopPropagation()
                } else if (n !== e.target && $(e.target).hasClass("jq-dropdown-ignore"))return;
                d.data = d.data || function() { return false; };
                o(), a || n.hasClass("jq-dropdown-disabled") || (n.addClass("jq-dropdown-open"), d.data("jq-dropdown-trigger", n).show(), r(), d.trigger("show", {
                    jqDropdown: d,
                    trigger: n
                }))
            }

            function o(t) {
                var target = $(t.target);
                target.parents = target.parents || function() { return false; };
                var parents = target.parents();
                parents.addBack = parents.addBack || function() { return false; };

                var o = t ? parents.addBack() : null;

                o.is = o.is || function() { return false; };
                if (o && o.is(".jq-dropdown")) {
                    if (!o.is(".jq-dropdown-menu"))return;
                    if (!o.is("A"))return
                }

                var document = $(document); document.find = document.find || function() { return false; };
                var dropdownVisible = document.find(".jq-dropdown:visible"); dropdownVisible.each = dropdownVisible.each || false;
                dropdownVisible.each(function () {
                    var t = $(this); t.hide = t.hide || false;
                    var h = t.hide(); h.removeData = h.removeData || false;
                    h.removeData("jq-dropdown-trigger").trigger("hide", {jqDropdown: t})
                }), $(document).find(".jq-dropdown-open").removeClass("jq-dropdown-open")
            }

            function r() {
                var jq = $(".jq-dropdown:visible"); jq.eq = jq.eq || false;
                var t = jq.eq(0), o = t.data("jq-dropdown-trigger"), r = o ? parseInt(o.attr("data-horizontal-offset") || 0, 10) : null, e = o ? parseInt(o.attr("data-vertical-offset") || 0, 10) : null;
                o = o || {};
                t.outerWidth = t.outerWidth || false;
                t.outerHeight = t.outerHeight || false;
                o.offset = o.offset || false;

                0 !== t.length && o && t.css(t.hasClass("jq-dropdown-relative") ? {
                    left: t.hasClass("jq-dropdown-anchor-right") ? o.position().left - (t.outerWidth(!0) - o.outerWidth(!0)) - parseInt(o.css("margin-right"), 10) + r : o.position().left + parseInt(o.css("margin-left"), 10) + r,
                    top: o.position().top + o.outerHeight(!0) - parseInt(o.css("margin-top"), 10) + e
                } : {
                    left: t.hasClass("jq-dropdown-anchor-right") ? o.offset().left - (t.outerWidth() - o.outerWidth()) + r : o.offset().left + r,
                    top: o.offset().top + o.outerHeight() + e
                })
            }

            $.fn = $.fn || {};
            var _document = $(document);
            _document.on = _document.on || function() { return false; };
            //noinspection JSCheckFunctionSignatures
            $.extend($.fn, {
                jqDropdown: function (r, e) {
                    var _this = $(this); _this.removeAttr = _this.removeAttr || function() { return false; };
                    switch (r) {
                        case"show":
                            return t(null, $(this)), $(this);
                        case"hide":
                            return o(), $(this);
                        case"attach":
                            return $(this).attr("data-jq-dropdown", e);
                        case"detach":
                            return o(), _this.removeAttr("data-jq-dropdown");
                        case"disable":
                            return $(this).addClass("jq-dropdown-disabled");
                        case"enable":
                            return o(), $(this).removeClass("jq-dropdown-disabled")
                    }
                }
            }), _document.on("click.jq-dropdown", "[data-jq-dropdown]", t), $(document).on("click.jq-dropdown", o), $(window).on("resize", r)
        }(Geolizr.jquery);

        Geolizr.initState = 'true';
        for (var i = 0; i < Geolizr.initCallbackList.length; i++) {
            Geolizr.initCallbackList[i]($);
        }
        Geolizr.initCallbackList = [];
    };

    //noinspection JSUnresolvedVariable
    if ((typeof jQuery === 'undefined') || (Geolizr.versionCompare(jQuery.fn.jquery, '1.7.0') <= 0)) {
        Geolizr.loadScript('//cdn.jsdelivr.net/jquery/1.9.1/jquery.min.js', function () {
            //noinspection JSUnresolvedVariable
            jQuery.noConflict = jQuery.noConflict || function() { return this; };
            //noinspection JSUnresolvedVariable
            var jQuery191 = jQuery.noConflict(true);
            init(jQuery191);
        });
    } else {
        //noinspection JSUnresolvedVariable
        init(jQuery);
    }
};

Geolizr.onDomChanges = function (records) {
    console.log(records);
    // Geolizr.disconnectObserver();
    Geolizr.switchCurrency(Geolizr.getCurrency());
    // Geolizr.observe();
};

// Create an observer instance
Geolizr.observer = new MutationObserver(Geolizr.onDomChanges);
Geolizr.observe = function() {
    Geolizr.observeElements.forEach(function(el) {
        var elObjects = Geolizr.jquery(el);
        if(elObjects.length > 0) {
            for(var i=0;i<elObjects.length;i++) {
                console.log("observe: ", elObjects[i]);
                Geolizr.observer.observe(elObjects[i], {
                    childList:true,
                    attributes:true,
                    characterData:true,
                    subtree:true,
                    attributeOldValue:true,
                    characterDataOldValue:true,
                    attributeFilter:[]
                });
            }
        }
    });
};

Geolizr.disconnectObserver = function() {
    Geolizr.observer.disconnect();
};

Geolizr.addDomInspectors = function(key) {
    Geolizr.observeElements.push(key);
    if(Geolizr.observeElements.length > 0) {
        Geolizr.disconnectObserver();
        Geolizr.observe();
    }
};

// get the ajaxifyCart
Geolizr.init(function($) {
    $(function() {
        var elements = ["#ajaxifyCart", ".cart-toggle"];
        elements.forEach(function(el) {
            if ($(el).length > 0) {
                Geolizr.addDomInspectors(el);
            }
        });
    });
});
