document.addEventListener('DOMContentLoaded', function() {
    // 1. Configuración inicial del mapa
    const map = L.map('map', {
        zoomControl: false,
        center: [23.2494, -106.4111],
        zoom: 13
    });
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
    }).addTo(map);

    // 2. Variables globales
    let currentRoute = null;
    let currentMarkers = null;
    let currentSelectedRoute = null;
    const busIcon = L.icon({
        iconUrl: 'estacion.svg',
        iconSize: [25, 25],
        iconAnchor: [12, 25],
        popupAnchor: [0, -25]
    });

    // 3. Datos de rutas (actualizado con Villa Galaxia)
    const rutas = {
       'pradera-directo': [{ name: "Avenida San Miguel, 18255", coords: [23.27408197583113, -106.36855044992679] },
        { name: "Avenida San Miguel, 18207", coords: [23.274542017100543, -106.36978546479389] },
        { name: "Habacuc, 18304", coords: [23.2764540799901, -106.37072327643033] },
        { name: "Avenida Eje 2 A, 10910", coords: [23.274992814766176, -106.3721938206122] },
        { name: "Avenida Eje 2 A, 10635", coords: [23.27391449498501, -106.37424322061217] },
        { name: "Avenida Genaro Estrada, 18437", coords: [23.272984472868096, -106.37541023410324] },
        { name: "Calle Mustangs, 18531", coords: [23.27421034829657, -106.37651687643043] },
        { name: "Comadrejas, 18733", coords: [23.274162457883424, -106.37870207643041] },
        { name: "Calle Vizcachas, 18777", coords: [23.272813609297533, -106.37846463168118] },
        { name: "Calle Antilopes, 18522", coords: [23.27043619559275, -106.37813976293963] },
        { name: "Avenida De La Pradera, 18304", coords: [23.270331083550438, -106.3764501629396] },
        { name: "Calle Albert Einstein, 10216", coords: [23.269857964365944, -106.37486857643061] },
        { name: "Calle La Pradera, 18118", coords: [23.268805083478302, -106.37413296293968] },
        { name: "Circunvalación Benjamín Franklin, 18107", coords: [23.2680051912474, -106.37449546293968] },
        { name: "Circunvalación Benjamín Franklin, 368", coords: [23.26674251126258, -106.3751390764307] },
        { name: "Camino Al Conchi, 13104", coords: [23.264341196128058, -106.37779598992176] },
        { name: "Camino Al Conchi, 9035", coords: [23.261013000560975, -106.37993050526728] },
        { name: "San Joaquín, 15", coords: [23.25775724585716, -106.38147789791257] },
        { name: "Calle Costa Del Pacifico, 33", coords: [23.25546870794395, -106.38278699177644] },
        { name: "Avenida Manuel J. Clouthier, 4606", coords: [23.250859069036018, -106.38527597643123] },
        { name: "Avenida Manuel J. Clouthier, 4727", coords: [23.246803903861718, -106.38750509177676] },
        { name: "Camino Al Conchi, Sn-S Oficina Cfe", coords: [23.242873136441602, -106.3898801744236] },
        { name: "Federal Highway 15, 5a", coords: [23.24059987735623, -106.39017312061338] },
        { name: "Emiliano Zapata, 2837", coords: [23.236986008152407, -106.39018974944982] },
        { name: "Libramiento De Mazatlán, 2", coords: [23.2336488018644, -106.38998282061367] },
        { name: "Carretera Internacional México 15, 5621", coords: [23.23246262082557, -106.39027317643193] },
        { name: "Avenida Gabriel Leyva, 4063", coords: [23.231563916567175, -106.3957002322502] },
        { name: "Avenida Gabriel Leyva, 12a", coords: [23.229074065714812, -106.39787614945014] },
        { name: "Avenida Gabriel Leyva, 23", coords: [23.226999268014655, -106.39946551875943] },
        { name: "Munich, 3229", coords: [23.22172387386133, -106.40226627643231] },
        { name: "Avenida Gabriel Leyva, 2831", coords: [23.218521476900662, -106.40363723225067] },
        { name: "Avenida Gabriel Leyva, 1880", coords: [23.21613850019618, -106.4049623610871] },
        { name: "Avenida Gabriel Leyva, 2116a", coords: [23.21176768292731, -106.40765627643263] },
        { name: "Avenida Gabriel Leyva, 1916", coords: [23.20863749149783, -106.4103980629418] },
        { name: "Avenida Gabriel Leyva, 1711", coords: [23.206361555655796, -106.41202273410546] },
        { name: "Avenida Gabriel Leyva, 1616", coords: [23.204408041514263, -106.4134323475966] },
        { name: "Gregorio Ortega, 1133", coords: [23.202648744630565, -106.41349162061472] },
        { name: "21 De Marzo, 1420", coords: [23.20197101239246, -106.41442934759668] },
        { name: "21 De Marzo, 1315", coords: [23.201652973813633, -106.41593203410574] },
        { name: "21 De Marzo, 1116", coords: [23.201316285818454, -106.41788964945111] },
        { name: "Teniente José Azueta, 1604", coords: [23.201237418899588, -106.41950677828748] },
        { name: "Leandro Valle, 415", coords: [23.20222051766603, -106.42015796294206] },
        { name: "Aquiles Serdán, 1513", coords: [23.201166235456707, -106.42056634945111] },
        { name: "Calle General Ángel Flores, 1010", coords: [23.20052206470726, -106.41980216294208] },
        { name: "Calle General Ángel Flores, 1222", coords: [23.20091708943299, -106.41763481671376] },
        { name: "Calle General Ángel Flores, 1420", coords: [23.201298785848206, -106.41575630712383] },
        { name: "21 De Marzo, 1414", coords: [23.201787618209146, -106.41448236294201] }
        ], // Tus datos de Pradera Directo
        'venadillo': [{name: "El Chilillo", coords: [23.316206680431275, -106.38788658992374]},
        {name: "Culiacán-Mazatlán, 12381", coords: [23.30308497569395, -106.40227004417484]},
        {name: "Culiacán-Mazatlán, 377", coords: [23.293114557770135, -106.40562053313204]},
        {name: "Elpidio Osuna, 24", coords: [23.285261978171377, -106.41037193313238]},
        {name: "Ángel Flores, 10", coords: [23.285366338371233, -106.41222093313236]},
        {name: "Circunvalacion, 122", coords: [23.28606981814896, -106.41274193313231]},
        {name: "Ángel Flores, 10", coords: [23.285366338371233, -106.41222093313236]},
        {name: "Ángel Flores, Sn-S Herreria", coords: [23.283953614922982, -106.41200764847578]},
        {name: "Ángel Flores, 19", coords: [23.281679359644055, -106.41272874662486]},
        {name: "Ángel Flores, 3", coords: [23.2814779627958, -106.41253001964]},
        {name: "Culiacán-Mazatlán, 51", coords: [23.27930722077226, -106.4135663889532]},
        {name: "Internacional México 15, Sn-S Expendio Tecate", coords: [23.27430885016839, -106.41472636196855]},
        {name: "Internacional México 15, 3601", coords: [23.26972623283023, -106.41616483313277]},
        {name: "Avenida De Las Torres, 2107", coords: [23.26262195155112, -106.41260941778972]},
        {name: "Boulevard Luis Donaldo Colosio Murrieta, 1061", coords: [23.259497030059816, -106.40924263313316]},
        {name: "De Los Venados, 46", coords: [23.258265833326078, -106.41063230614822]},
        {name: "De Los Venados, 4611", coords: [23.257011565869906, -106.41247524418483]},
        {name: "Avenida Jabalíes, 177a", coords: [23.2549543797966, -106.41352241964083]},
        {name: "Avenida Jabalíes, 111a", coords: [23.25331186813421, -106.41179139080505]},
        {name: "Avenida Santa Rosa, 9", coords: [23.249999600070076, -106.4141805889543]},
        {name: "Calle 8, 2001", coords: [23.251135028683667, -106.41591881964095]},
        {name: "Concordia, 2003", coords: [23.25339128396125, -106.41801444662579]},
        {name: "Boulevard Adolfo López Mateos, 1205", coords: [23.25232186772727, -106.4196667331334]},
        {name: "Avenida Arnaldo Rigodanza, 1201", coords: [23.249755991488232, -106.41996667546186]},
        {name: "Anaxágoras, 2014", coords: [23.246336151473287, -106.4212033908053]},
        {name: "Internacional México 15, 8229", coords: [23.243946697336725, -106.42161944847703]},
        {name: "Internacional México 15, 1883", coords: [23.240989018412584, -106.4223134196413]},
        {name: "Internacional México 15, 19", coords: [23.238711530238295, -106.42293500429798]},
        {name: "Internacional México 15, 15189", coords: [23.2364773403576, -106.42356659080558]},
        {name: "Avenida Ejército Mexicano, 1010", coords: [23.233034759593036, -106.42287289404895]},
        {name: "Avenida Ejército Mexicano, 108(372", coords: [23.230281236613596, -106.4223068503284]},
        {name: "Avenida Ejército Mexicano, 2203", coords: [23.227259486219772, -106.42163708895494]},
        {name: "Lola Beltrán, 2a", coords: [23.22465593004549, -106.42051841779087]},
        {name: "Calle Río Piaxtla, 809", coords: [23.22178333173144, -106.41932557731364]},
        {name: "Avenida Ejército Mexicano, 505", coords: [23.218916536829497, -106.417904319642]},
        {name: "Avenida Ejército Mexicano, 1205", coords: [23.216639639709392, -106.4166731024478]},
        {name: "Avenida Juan Carrasco, 160", coords: [23.213260402377973, -106.41616651964215]},
        {name: "Avenida Juan Carrasco, 127a", coords: [23.210715446520638, -106.41711781964229]},
        {name: "Avenida Juan Carrasco, 527", coords: [23.20917806366683, -106.4183682042989]},
        {name: "Avenida Juan Carrasco, 267", coords: [23.207450543272707, -106.4196250908065]},
        {name: "Aquiles Serdán, 2202", coords: [23.20569506572534, -106.42097144662736]},
        {name: "Avenida Zaragoza, 805", coords: [23.205292274675426, -106.42273370429903]},
        {name: "Belisario Domínguez, 2303", coords: [23.204096166670258, -106.42463416197081]},
        {name: "Belisario Domínguez, 2101", coords: [23.202356434216373, -106.42446750429912]},
        {name: "Belisario Domínguez, 1803", coords: [23.200243507707057, -106.42436936197092]},
        {name: "Calle General Ángel Flores, 604", coords: [23.199715991817786, -106.42348294662756]},
        {name: "Calle General Ángel Flores, 834", coords: [23.199999375390338, -106.42174550429925]},
        {name: "Calle Benito Juárez, Sn-S Fabricas De Francia", coords: [23.201185517574793, -106.42156579614769]},
        {name: "Calle Benito Juárez, 1908", coords: [23.203164421635968, -106.42174230800099]},
        {name: "Calle Benito Juárez, 2212", coords: [23.204784509889397, -106.42213817731412]},
        {name: "Luis Zúñiga, 624b", coords: [23.206009365539625, -106.42139310429901]},
        {name: "Avenida Juan Carrasco, 304b", coords: [23.207150204135157, -106.41952730429895]}
        ],       // Tus datos de Venadillo
        'san-joaquin-juarez': [{name: "Calle Monrovia, 24305", coords: [23.185266828420684, -106.32548051779212]},
        {name: "Avenida California, 4603a", coords: [23.186439286516656, -106.32459929080726]},
        {name: "Boulevard California, 4808", coords: [23.188626572606374, -106.32500046197124]},
        {name: "Calle California, 4925", coords: [23.18990892306629, -106.32572374847878]},
        {name: "Avenida San Pedro, 5004", coords: [23.19005440892405, -106.32719977546371]},
        {name: "Calle Alamitos, 24199", coords: [23.18940147169172, -106.3282094196429]},
        {name: "Calle Pasadena, 24232", coords: [23.190178222827814, -106.32901087546367]},
        {name: "Avenida Santa Ana, 5302", coords: [23.191321650411705, -106.33030303313538]},
        {name: "Calle Santa Ana, 5414", coords: [23.192534662531617, -106.33100809080699]},
        {name: "Calle Sausalito, 24101", coords: [23.193122379054575, -106.33166541779184]},
        {name: "Avenida Del Toro, 5415", coords: [23.19243354086579, -106.33242370429949]},
        {name: "Calle Pomoná, 24047", coords: [23.190671322391136, -106.332123590807]},
        {name: "Avenida Pasadena, 24045", coords: [23.189373385585537, -106.33133058895615]},
        {name: "Avenida Del Toro, 5031", coords: [23.187949311253703, -106.33023041964299]},
        {name: "San Francisco, 5001", coords: [23.18669157695163, -106.33037290429968]},
        {name: "Calle San Marino, 31", coords: [23.18684280132032, -106.33148257546381]},
        {name: "Calle San Marino, 5254", coords: [23.1890878996633, -106.33292483313537]},
        {name: "Calle Santa Elena, 23901", coords: [23.189217575459796, -106.33401930429955]},
        {name: "Primavera, 142", coords: [23.192532635310997, -106.33538159080695]},
        {name: "Amapa, 115", coords: [23.19369031109506, -106.33684043313528]},
        {name: "Escolar, 16", coords: [23.194471941662492, -106.34004864292586]},
        {name: "Calle Escolar, 100", coords: [23.19561342594561, -106.33964506197105]},
        {name: "Internacional, 6", coords: [23.196806216957654, -106.34491960615027]},
        {name: "Internacional Mexico 15, 2", coords: [23.203474889042045, -106.36211079080661]},
        {name: "Boulevard Luis Donaldo Colosio Murrieta, Sn-S", coords: [23.20922009062721, -106.3659604889555]},
        {name: "Granja, 25", coords: [23.21355126108186, -106.37033871964216]},
        {name: "Boulevard Luis Donaldo Colosio Murrieta, 9820", coords: [23.216623439064097, -106.37381111964208]},
        {name: "Libramiento De Mazatlán, 7102", coords: [23.227692784173215, -106.38564504008474]},
        {name: "Carretera Internacional México 15, 5621", coords: [23.232107701530193, -106.39034827731332]},
        {name: "Avenida Gabriel Leyva, 4063", coords: [23.23146532729752, -106.3958075196416]},
        {name: "Avenida Gabriel Leyva, 12a", coords: [23.228926179029653, -106.39776886011899]},
        {name: "Avenida Insurgentes, 6101c", coords: [23.22876145642095, -106.39954704847754]},
        {name: "Avenida Insurgentes, 5605", coords: [23.23008476582577, -106.40125221964158]},
        {name: "Avenida Insurgentes, 5217", coords: [23.231260473760784, -106.4025564466265]},
        {name: "Avenida De Las Américas, 19b", coords: [23.230969314899053, -106.40438216196993]},
        {name: "Enrique Pérez Arce, 2715", coords: [23.229214606442472, -106.40524860429827]},
        {name: "Enrique Pérez Arce, 5208", coords: [23.228011970913172, -106.40391980429831]},
        {name: "Enrique Pérez Arce, 5443", coords: [23.226751534710715, -106.40223080429831]},
        {name: "Enrique Pérez Arce, 5628", coords: [23.225446516534348, -106.4007449754625]},
        {name: "Munich, 3229", coords: [23.221654856290538, -106.40225554662682]},
        {name: "Avenida Gabriel Leyva, 2831", coords: [23.218324279037002, -106.40364796011934]},
        {name: "Avenida Gabriel Leyva, 1880", coords: [23.21603003946769, -106.40501600429869]},
        {name: "Avenida Gabriel Leyva, 2116a", coords: [23.211816984827525, -106.40777429265724]},
        {name: "Avenida Gabriel Leyva, 1916", coords: [23.208469860929014, -106.410376604299]},
        {name: "Av. Gabriel Leyva 1711", coords: [23.206331973303982, -106.41200127643279]},
        {name: "Avenida Gabriel Leyva, 1616", coords: [23.20428971033808, -106.41345380526927]},
        {name: "Gregorio Ortega, 1133", coords: [23.20262902251555, -106.41345943410566]},
        {name: "21 De Marzo, 1420", coords: [23.20199073460456, -106.41447226294207]},
        {name: "21 De Marzo, 1315", coords: [23.20168255720107, -106.41591057643305]},
        {name: "21 De Marzo, 1116", coords: [23.20129656350684, -106.41786819177841]},
        {name: "Teniente José Azueta, 1604", coords: [23.201197974250178, -106.41945313410575]},
        {name: "Leandro Valle, 415", coords: [23.202210656577304, -106.42008286108762]},
        {name: "Aquiles Serdán, 1513", coords: [23.2012254024405, -106.42050197643303]},
        {name: "21 De Marzo, Sn-S", coords: [23.200716268677574, -106.4218414052694]},
        {name: "21 De Marzo, 418", coords: [23.200561352422213, -106.42359944759667]},
        {name: "Belisario Domínguez, 1803", coords: [23.20039142614867, -106.42431571876035]},
        {name: "Calle General Ángel Flores, 604", coords: [23.199755436914646, -106.42350440526944]},
        {name: "Calle General Ángel Flores, 834", coords: [23.200028959153947, -106.42183133596022]}
    ],
    'villa-galaxia': [
        {name: "Calle Caoba, 10339", coords: [23.270625683343898, -106.36977000429697]},
        {name: "Calle Patos, 17941", coords: [23.268657279002042, -106.37113117546116]},
        {name: "Calle Horneros, 10218", coords: [23.26863920373515, -106.37239451964044]},
        {name: "Calle Albert Einstein, 10216", coords: [23.269759403402833, -106.37487930429705]},
        {name: "Avenida De La Pradera, 18304", coords: [23.270301515367002, -106.37647161964038]},
        {name: "Bisontes, 18501", coords: [23.27028437605584, -106.37873929080449]},
        {name: "Álamo, 18114", coords: [23.27026652751564, -106.38029721964035]},
        {name: "Calle Tama, 18053", coords: [23.269449627999645, -106.3815728196404]},
        {name: "Ixtapa, 18101", coords: [23.267207047869654, -106.38238871964049]},
        {name: "Olas Altas, 18005", coords: [23.266871273209212, -106.38384506196871]},
        {name: "Ixtapa, 17911a", coords: [23.26719170416448, -106.38455093313293]},
        {name: "Calle Sauces, 246", coords: [23.266724029614487, -106.38572391964047]},
        {name: "Calle Las Mañanitas, 235", coords: [23.265308679004416, -106.38716210429709]},
        {name: "Calle Siqueros, 249", coords: [23.26506412255863, -106.38812686196886]},
        {name: "Avenida Munich, 2018b", coords: [23.26619733536662, -106.38967560429711]},
        {name: "Avenida Juan Pablo Ii, 110", coords: [23.261564764439694, -106.39480398788993]},
        {name: "Munich 72, 702", coords: [23.259176408366987, -106.39734037546145]},
        {name: "Avenida Munich, 1006", coords: [23.257440222000128, -106.39937421778978]},
        {name: "Munich 72, 113", coords: [23.255324064679723, -106.4015811177899]},
        {name: "Munich 72, 302", coords: [23.251495693914542, -106.40543184847681]},
        {name: "Munich 72, 43", coords: [23.24969957901526, -106.4075612484768]},
        {name: "Puerto Angel, 823", coords: [23.24587369474942, -106.41079887361097]},
        {name: "Avenida Juan Pablo Ii, 1641", coords: [23.242888662850127, -106.41161476196949]},
        {name: "Sagitario, 3420", coords: [23.24177115352873, -106.41073409080545]},
        {name: "Libra, 3505", coords: [23.240937611946514, -106.41001300429785]},
        {name: "Tauro, 3428", coords: [23.23901669576768, -106.41071530429792]},
        {name: "Acuario, 3423", coords: [23.2381502790233, -106.41129119080556]},
        {name: "Avenida México 68, 1313", coords: [23.236753820485635, -106.41209838895469]},
        {name: "Avenida México 68, 1119", coords: [23.234885037702877, -106.41258979080567]},
        {name: "Avenida Insurgentes, 4245", coords: [23.234417437737758, -106.41394163313397]},
        {name: "Avenida Insurgentes, 2975", coords: [23.23573807902485, -106.42103140429803]},
        {name: "Avenida Ejército Mexicano, 1010", coords: [23.23249286839431, -106.42286163973584]},
        {name: "Avenida Ejército Mexicano, 108(372", coords: [23.227424375180032, -106.42131749080585]},
        {name: "Avenida Ejército Mexicano, 2203", coords: [23.22711159753467, -106.42159417361158]},
        {name: "Lola Beltrán, 2a", coords: [23.224606632874007, -106.4204325871041]},
        {name: "Calle Río Piaxtla, 809", coords: [23.221659060104876, -106.41907809503707]},
        {name: "Avenida Ejército Mexicano, 505", coords: [23.218829980537258, -106.41782158658427]},
        {name: "Avenida Ejército Mexicano, 1205", coords: [23.21644243907768, -106.41673747546288]},
        {name: "Avenida Juan Carrasco, 160", coords: [23.213132218757913, -106.41610214662705]},
        {name: "Avenida Juan Carrasco, 127a", coords: [23.21055767904252, -106.41703198895551]},
        {name: "Avenida Juan Carrasco, 527", coords: [23.209089318462212, -106.41832528895551]},
        {name: "Avenida Juan Carrasco, 267", coords: [23.20738151833743, -106.41961436197066]},
        {name: "Aquiles Serdán, 2202", coords: [23.205645761556134, -106.42098217546321]},
        {name: "Aquiles Serdán, 2099", coords: [23.2049337661753, -106.42107093313497]},
        {name: "Aquiles Serdán, 1813", coords: [23.20305172316167, -106.42082657546322]},
        {name: "Aquiles Serdán, 1513", coords: [23.201097207265548, -106.42045906011992]},
        {name: "Aquiles Serdán, 1115", coords: [23.198497633604628, -106.42014801964254]},
        {name: "Avenida Miguel Alemán, 303", coords: [23.195964955954413, -106.421519788956]},
        {name: "Circunvalación, 317", coords: [23.194988425546576, -106.4242984177918]},
        {name: "Venustiano Carranza, 36a", coords: [23.194403425719443, -106.42528007546355]},
        {name: "Avenida Miguel Alemán, 208", coords: [23.194602187314224, -106.42392246197097]},
        {name: "Avenida Miguel Alemán, 310", coords: [23.195795763742964, -106.4213431331352]},
        {name: "Calle Libertad Poniente, 1204", coords: [23.19813025627232, -106.42113123313511]},
        {name: "Calle Benito Juárez, Sn-S Fabricas De Francia", coords: [23.202130146079668, -106.42163673643115]},
        {name: "Calle Benito Juárez, 1908", coords: [23.202957340082126, -106.42159210429912]},
        {name: "Calle Benito Juárez, 2212", coords: [23.204685251288208, -106.42211175452096]},
        {name: "Luis Zúñiga, 624b", coords: [23.206058669574702, -106.42142529080657]},
        {name: "Avenida Juan Carrasco, 304b", coords: [23.20712062195792, -106.4195594908065]}
    ] 
    };

    // 4. Sistema de Favoritos
    const favorites = JSON.parse(localStorage.getItem('favorites')) || {};

    // 5. Elementos del DOM
    const sidebar = document.getElementById('sidebar');
    const mainMenu = document.getElementById('mainMenu');
    const routesSubmenu = document.getElementById('routesSubmenu');
    const favoritesMenu = document.getElementById('favoritesMenu');
    const backButton = document.getElementById('backButton');
    const menuButton = document.getElementById('menuButton');
    const rutasButton = document.getElementById('rutasButton');
    const favoritosButton = document.getElementById('favoritosButton');
    const addFavoriteBtn = document.getElementById('addFavorite');

    // 6. Funciones principales
    function clearRoute() {
        if (currentRoute) map.removeLayer(currentRoute);
        if (currentMarkers) map.removeLayer(currentMarkers);
        currentRoute = null;
        currentMarkers = null;
        document.querySelectorAll('.route-item').forEach(item => {
            item.classList.remove('active');
        });
    }

    function showRoute(paradas) {
        clearRoute();
        
        currentMarkers = L.layerGroup().addTo(map);
        paradas.forEach(parada => {
            L.marker(parada.coords, { icon: busIcon })
                .bindPopup(`<b>${parada.name}</b>`)
                .addTo(currentMarkers);
        });

        const routeCoords = paradas.map(p => p.coords);
        currentRoute = L.polyline(routeCoords, {
            color: '#0078D7',
            weight: 6,
            opacity: 0.8
        }).addTo(map);

        map.fitBounds(currentRoute.getBounds(), { padding: [50, 50] });
    }

    function updateFavoritesMenu() {
        favoritesMenu.innerHTML = '<li class="menu-title">Tus Rutas Favoritas</li>';
        
        if (Object.keys(favorites).length === 0) {
            favoritesMenu.innerHTML += '<li style="color:#666; padding:15px 25px;">No tienes rutas favoritas</li>';
            return;
        }
        
        for (const [routeName, routeData] of Object.entries(favorites)) {
            const li = document.createElement('li');
            li.className = 'favorite-item';
            li.innerHTML = `
                <span><i class="fas fa-bus"></i> ${routeData.displayName}</span>
                <button class="remove-favorite" data-route="${routeName}">
                    <i class="fas fa-times"></i>
                </button>
            `;
            li.querySelector('button').addEventListener('click', (e) => {
                e.stopPropagation();
                removeFavorite(routeName);
            });
            li.addEventListener('click', () => {
                showFavoriteRoute(routeName);
            });
            favoritesMenu.appendChild(li);
        }
    }

    // FUNCIÓN MODIFICADA PARA FAVORITOS
    function showFavoriteRoute(routeName) {
        // Redirigir a página específica cuando se selecciona de favoritos
        switch(routeName) {
            case 'pradera-directo':
                window.location.href = 'pradera.html';
                break;
            case 'venadillo':
                window.location.href = 'venadillo.html';
                break;
            case 'san-joaquin-juarez':
                window.location.href = 'sanJoaquin.html';
                break;
            case 'villa-galaxia':
                window.location.href = 'villaGalaxia.html';
                break;
            default:
                // Fallback por si acaso
                if (favorites[routeName]) {
                    showRoute(favorites[routeName].paradas);
                    document.querySelector(`[data-route="${routeName}"]`).classList.add('active');
                    currentSelectedRoute = routeName;
                    updateFavoriteButton();
                }
        }
        sidebar.classList.remove('open');
    }

    function addFavorite() {
        if (!currentSelectedRoute) return;
        
        const routeKey = currentSelectedRoute;
        favorites[routeKey] = {
            displayName: document.querySelector(`[data-route="${routeKey}"]`).textContent.trim(),
            paradas: rutas[routeKey]
        };
        
        saveFavorites();
        updateFavoritesMenu();
        updateFavoriteButton();
        showToast('✓ Ruta agregada a favoritos');
    }

    function removeFavorite(routeName) {
        delete favorites[routeName];
        saveFavorites();
        updateFavoritesMenu();
        
        if (currentSelectedRoute === routeName) {
            updateFavoriteButton();
        }
        
        showToast('✗ Ruta eliminada de favoritos');
    }

    function saveFavorites() {
        localStorage.setItem('favorites', JSON.stringify(favorites));
    }

    function updateFavoriteButton() {
        const isFavorite = favorites[currentSelectedRoute];
        addFavoriteBtn.innerHTML = isFavorite 
            ? '<i class="fas fa-star"></i> En Favoritos' 
            : '<i class="far fa-star"></i> Agregar a Favoritos';
        addFavoriteBtn.disabled = isFavorite;
    }

    function showToast(message) {
        const toast = document.createElement('div');
        toast.className = 'toast-notification';
        toast.innerHTML = message;
        document.body.appendChild(toast);
        setTimeout(() => toast.remove(), 3000);
    }

    // 7. Event Listeners (se mantienen igual)
    menuButton.addEventListener('click', () => {
        sidebar.classList.toggle('open');
    });

    rutasButton.addEventListener('click', () => {
        mainMenu.style.display = 'none';
        routesSubmenu.style.display = 'block';
        backButton.style.display = 'block';
    });

    favoritosButton.addEventListener('click', () => {
        mainMenu.style.display = 'none';
        favoritesMenu.style.display = 'block';
        backButton.style.display = 'block';
        updateFavoritesMenu();
    });

    backButton.addEventListener('click', () => {
        mainMenu.style.display = 'block';
        routesSubmenu.style.display = 'none';
        favoritesMenu.style.display = 'none';
        backButton.style.display = 'none';
    });

    document.querySelectorAll('.route-item').forEach(item => {
        item.addEventListener('click', function() {
            const routeName = this.dataset.route;
            currentSelectedRoute = routeName;
            
            // Mostrar ruta en el mapa (comportamiento original)
            showRoute(rutas[routeName]);
            this.classList.add('active');
            
            // Mostrar acciones
            document.getElementById('route-actions').style.display = 'block';
            updateFavoriteButton();
            
            // Cerrar sidebar
            sidebar.classList.remove('open');
        });
    });

    addFavoriteBtn.addEventListener('click', addFavorite);

    document.getElementById('searchButton').addEventListener('click', function() {
        const searchTerm = document.getElementById('routeSearch').value.trim().toLowerCase();
        let routeKey = null;
        
        if (searchTerm.includes('pradera') || searchTerm.includes('directo')) {
            routeKey = 'pradera-directo';
        } else if (searchTerm.includes('venadillo')) {
            routeKey = 'venadillo';
        } else if (searchTerm.includes('joaquin') || searchTerm.includes('juarez')) {
            routeKey = 'san-joaquin-juarez';
        } else if (searchTerm.includes('villa') || searchTerm.includes('galaxia')) {
            routeKey = 'villa-galaxia';
        }
        
        if (routeKey) {
            const item = document.querySelector(`[data-route="${routeKey}"]`);
            if (item) item.click();
        } else {
            alert('Rutas disponibles:\n- Pradera Directo\n- Venadillo\n- San Joaquín Juárez\n- Villa Galaxia');
        }
     });
     
     updateFavoritesMenu();
});