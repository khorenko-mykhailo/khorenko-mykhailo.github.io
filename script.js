const output = document.getElementById("output");
const input = document.getElementById("cmd-input");
const terminal = document.getElementById("terminal");

let shouldAutoScroll = true;
let autoScrollFrame = null;

let firstBoot = true;
let scrollReady = false;
let firstUserCommand = true;

function isNearBottom() {

    return (
        window.innerHeight + window.scrollY
        >=
        document.body.scrollHeight - 120
    );

}

window.addEventListener("scroll", () => {

    shouldAutoScroll = isNearBottom();

}, { passive:true });

function autoScrollToBottom(force = false){

    if(firstBoot && !force) return;

    if(!scrollReady && !force) return;

    if(!shouldAutoScroll && !force) return;

    if(autoScrollFrame){
        cancelAnimationFrame(autoScrollFrame);
    }

    autoScrollFrame = requestAnimationFrame(() => {

        window.scrollTo({
        top: document.body.scrollHeight,
        left: 0
        });

    });

}

let history = [];
let historyIndex = 0;

let currentLang = "en";

const data = {

en: {

welcome: `
Welcome to the interactive terminal portfolio of
<span class="highlight">Mykhailo Khorenko</span>

Student | Developer | Creator

Type <span class="highlight">help</span> to see available commands.
`,

help: `
Available commands:

<span class="highlight">profile</span>     - About me
<span class="highlight">education</span>   - Education
<span class="highlight">experience</span>  - Practical experience
<span class="highlight">skills</span>      - Skills & languages
<span class="highlight">projects</span>    - Portfolio projects
<span class="highlight">contacts</span>    - Socials & contact
<span class="highlight">download</span>    - Download CV
<span class="highlight">lang en/de/ru</span> - Change language
<span class="highlight">clear</span>       - Clear terminal
`,

profile: `
<span class="highlight">Name:</span>
Mykhailo Khorenko

<span class="highlight">Date of Birth:</span>
01.02.2010

<span class="highlight">Residence:</span>
Bad Fallingbostel, Germany (29683)

<span class="highlight">Place of Birth:</span>
Bakhmut, Ukraine

<span class="highlight">Family:</span>
Father - Vitaliy Khorenko (IT Engineer)
Mother - Kseniia Khorenko (Childhood Education Assistant)
Brother - Ivan (11 years old)

<span class="highlight">Interests:</span>
Programming, AI, Game Development, Arduino,
3D Design, Tabletennis, Athletics, Karate
`,

education: `
<span class="highlight">09.2016</span>
Gymnasium Nr. 194 "Perspective"
Kyiv, Ukraine

<span class="highlight">08.2022 - 12.2022</span>
Edith-Stein-Realschule
Emlichheim, Germany

<span class="highlight">Since 01.2023</span>
OBS Lieth-Schule (Gymnasium branch)
Bad Fallingbostel
`,

experience: `
<span class="highlight">2024 (10-21 March)</span>
Röders Tec, Soltau
Software- & Mechatronics- Engineer

<span class="highlight">2025 (10-21 March)</span>
Hagebau IT, Soltau
Software Engineer
`,

skills: `
<span class="highlight">Programming:</span>
Python, HTML, CSS, JavaScript, SQL

<span class="highlight">Software:</span>
GIMP, Blender, Word, Excel

<span class="highlight">Hardware:</span>
Arduino, PC Hardware

<span class="highlight">Languages:</span>
Ukrainian (Native)
Russian (Fluent)
German (B2)
English (Good)

<span class="highlight">Strengths:</span>
Reliable, Responsible,
Creative, Independent,
Fast learner, Patient,
Organized, Team-oriented
`,

projects: `
<span class="highlight">Projects:</span>

- Telegram Bots
- AI Projects
- Arduino Systems
- Web Development
- 3D Modeling
`,

contacts: `
<span class="highlight">WhatsApp:</span>
+380662574515

<span class="highlight">Telegram:</span>
@funny_person

<span class="highlight">GitHub:</span>
github.com/khorenko-mykhailo

<span class="highlight">Email:</span>
horenkomihailo2022@gmail.com
`

},

de: {

welcome: `
Willkommen im interaktiven Terminal-Portfolio von
<span class="highlight">Mykhailo Khorenko</span>

Schüler | Entwickler | Creator

Tippe <span class="highlight">help</span>.
`,

help: `
Verfügbare Befehle:

<span class="highlight">profile</span>     - Über mich
<span class="highlight">education</span>   - Schulbildung
<span class="highlight">experience</span>  - Praktische Erfahrung 
<span class="highlight">skills</span>      - Persönliche Fähigkeiten und Komperenzen
<span class="highlight">projects</span>    - Portfolio Projekte
<span class="highlight">contacts</span>    - Kontakt Information
<span class="highlight">download</span>    - Lebenslauf herunterladen
<span class="highlight">lang en/de/ru</span> - Sprache ändern
<span class="highlight">clear</span>       - Terminal leeren
`,

profile: `
<span class="highlight">Name:</span>
Mykhailo Khorenko

<span class="highlight">Geburtsdatum:</span>
01.02.2010

<span class="highlight">Wohnort:</span>
Bad Fallingbostel, Deutschland (29683)

<span class="highlight">Geburtsort:</span>
Bakhmut, Ukraine

<span class="highlight">Familie:</span>
Vater - IT Ingenieur
Mutter - Sozialpädagogische Assistentin
Bruder - Ivan (11 Jahre alt)
`,

education: `
<span class="highlight">09.2016</span>
Gymnasium Nr. 194 "Perspective"
Kyiv, Ukraine

<span class="highlight">08.2022 - 12.2022</span>
Edith-Stein-Realschule
Emlichheim, Deutschland

<span class="highlight">Since 01.2023</span>
OBS Lieth-Schule (Gymnasialer Zweig)
Bad Fallingbostel
`,

experience: `
<span class="highlight">2024 (10-21 März)</span>
Röders Tec, Soltau
Fachinformatiker & Mechatroniker

<span class="highlight">2025 (10-21 März)</span>
Hagebau IT, Soltau
Fachinformatiker
`,

skills: `
<span class="highlight">Programmierung:</span>
Python, HTML, CSS, JavaScript, SQL

<span class="highlight">Software:</span>
GIMP, Blender, Word, Excel

<span class="highlight">Hardware:</span>
Arduino, Computer Hardware

<span class="highlight">Sprachen:</span>
Ukrainisch
Russisch
Deutsch B2
Englisch

<span class="highlight">Stärken:</span>
Zuverlässig
Verantwortungsvoll
Kreativ
Selbstständig
Lernbereit
`,

projects: `
<span class="highlight">Projekte:</span>

- Telegram-Bots
- KI-Projekte
- Arduino-Systeme
- Webentwicklung
- 3D-Modellierung
`,

contacts: `
<span class="highlight">WhatsApp:</span>
+380662574515

<span class="highlight">Telegram:</span>
@funny_person

<span class="highlight">GitHub:</span>
github.com/khorenko-mykhailo

<span class="highlight">Email:</span>
horenkomihailo2022@gmail.com
`

},

ru: {

welcome: `
Добро пожаловать в интерактивное
терминальное портфолио

<span class="highlight">Михаила Хоренка</span>

Ученик | Разработчик | Создатель

Введите <span class="highlight">help</span>.
`,

help: `
Доступные команды:

<span class="highlight">profile</span>     - О себе 
<span class="highlight">education</span>   - Образование
<span class="highlight">experience</span>  - Практический опыт
<span class="highlight">skills</span>      - Навыки и языки
<span class="highlight">projects</span>    - Проекты
<span class="highlight">contacts</span>    - Контакты
<span class="highlight">download</span>    - Скачать резюме
<span class="highlight">lang en/de/ru</span> - Сменить язык
<span class="highlight">clear</span>       - Очистить терминал
`,

profile: `
<span class="highlight">Имя:</span>
Хоренко Михаил

<span class="highlight">Дата рождения:</span>
01.02.2010

<span class="highlight">Место жительства:</span>
Бад-Фаллинбостель, Германия (29683)

<span class="highlight">Место рождения:</span>
Бахмут, Украина

<span class="highlight">Семья:</span>
Отец - Виталий Хоренко (ИТ инженер)
Мать - Ксения Хоренко (Ассистент по детскому образованию)
Брат - Иван (11 лет)

<span class="highlight">Интересы:</span>
Программирование, ИИ, Разработка игр, Arduino,
3D дизайн, Настольный теннис, Лёгкая атлетика, Карате
`,

education: `
<span class="highlight">09.2016</span>
Гимназия №194 "Перспектива"
Киев, Украина

<span class="highlight">08.2022 - 12.2022</span>
Edith-Stein-Realschule
Emlichheim, Германия

<span class="highlight">С 01.2023</span>
OBS Lieth-Schule (Гимнастический отдел)
Bad Fallingbostel
`,

experience: `
<span class="highlight">2024 (10-21 März)</span>
Röders Tec, Soltau
Специалист по информационным технологиям и мехатронике

<span class="highlight">2025 (10-21 März)</span>
Hagebau IT, Soltau
Специалист по информационным технологиям
`,

skills: `
<span class="highlight">Программирование:</span>
Python, HTML, CSS, JavaScript, SQL

<span class="highlight">Программное обеспечение:</span>
GIMP, Blender, Word, Excel

<span class="highlight">Аппаратное обеспечение:</span>
Arduino, Компьютерное оборудование

<span class="highlight">Языки:</span>
Украинский (родной)
Русский (свободно)
Немецкий (B2)
Английский (хорошо)

<span class="highlight">Сильные стороны:</span>
Надёжный, Ответственный,
Креативный, Независимый,
Быстро обучаемый, Терпеливый,
Организованный, Командный игрок
`,

projects: `
<span class="highlight">Проекты:</span>

- Telegram-боты
- Проекты ИИ
- Системы Arduino
- Веб-разработка
- 3D-моделирование
`,

contacts: `
<span class="highlight">WhatsApp:</span>
+380662574515

<span class="highlight">Telegram:</span>
@funny_person

<span class="highlight">GitHub:</span>
github.com/khorenko-mykhailo

<span class="highlight">Email:</span>
horenkomihailo2022@gmail.com
`

}

};

async function print(text, speed = 12){

    const div = document.createElement("div");
    div.className = "output-line";

    output.appendChild(div);

    requestAnimationFrame(() => {
        autoScrollToBottom();
    });

    const parser = new DOMParser();
    const doc = parser.parseFromString(text, "text/html");

    async function typeNode(node, parent){

        // обычный текст
        if(node.nodeType === Node.TEXT_NODE){

            const textNode = document.createTextNode("");
            parent.appendChild(textNode);

            let counter = 0;

            for(let char of node.textContent){
            
                textNode.textContent += char;
            
                counter++;
                
                if(counter % 15 === 0){
                    autoScrollToBottom();
                }
            
                await new Promise(resolve =>
                    setTimeout(resolve, speed + Math.random() * 20)
                );
            
            }

            autoScrollToBottom();

        }

        // html элементы
        else if(node.nodeType === Node.ELEMENT_NODE){

            const el = document.createElement(node.tagName);

            // копируем классы
            for(let attr of node.attributes){
                el.setAttribute(attr.name, attr.value);
            }

            parent.appendChild(el);

            for(let child of node.childNodes){
                await typeNode(child, el);
            }

        }

    }

    for(let child of doc.body.childNodes){
        await typeNode(child, div);
    }

}



async function boot(){

    await print(`
<span class="success">
SYSTEM ONLINE
</span>
`);

    await print(data[currentLang].welcome);

    firstBoot = false;

    setTimeout(() => {

        scrollReady = true;

        // обновляем состояние автоскролла
        shouldAutoScroll = isNearBottom();

    }, 300);

}

boot();

const commands = {

help(){
    print(data[currentLang].help);
},

profile(){
    print(data[currentLang].profile);
},

education(){
    print(data[currentLang].education);
},

experience(){
    print(data[currentLang].experience);
},

skills(){
    print(data[currentLang].skills);
},

projects(){
    print(data[currentLang].projects);
},

contacts(){
    print(data[currentLang].contacts);
},

map(){
    print("Opening interactive map...");
},

download(){

    const link = document.createElement("a");

    link.href = "./Mykhailo_Khorenko_CV.pdf";

    link.download = "Mykhailo_Khorenko_CV.pdf";

    document.body.appendChild(link);

    link.click();

    document.body.removeChild(link);

    print(`
<span class="success">
CV PDF downloaded successfully
</span>
`);

},

clear(){

    output.innerHTML = "";

}

};

input.addEventListener("keydown", function(e){

    if(e.key === "Enter"){

        const raw = input.value.trim();

        if(!raw) return;

        history.push(raw);

        historyIndex = history.length;

        const cmdLine = document.createElement("div");

        cmdLine.className = "output-line";

        cmdLine.innerHTML =
        `<span class="prompt">mikhail@portfolio:~$</span> ${raw}`;

        output.appendChild(cmdLine);

        // первую команду не скроллим
        if(firstUserCommand){
        
            firstUserCommand = false;
        
        } else {
        
            requestAnimationFrame(() => {
                autoScrollToBottom();
            });
        
        }

        const cmd = raw.toLowerCase();

        if(cmd.startsWith("lang ")){

            const lang = cmd.split(" ")[1];

            if(["en","de","ru"].includes(lang)){

                currentLang = lang;

                print(`<span class="success">Language changed to ${lang}</span>`);

            } else {

                print(`<span class="error">Unknown language</span>`);

            }

        }

        else if(commands[cmd]){

            commands[cmd]();

        }

        else{

            print(`<span class="error">Command not found</span>`);

        }

        input.value = "";

    }

    if(e.key === "ArrowUp"){

        e.preventDefault();

        if(historyIndex > 0){

            historyIndex--;

            input.value = history[historyIndex];

        }

    }

    if(e.key === "ArrowDown"){

        e.preventDefault();

        if(historyIndex < history.length - 1){

            historyIndex++;

            input.value = history[historyIndex];

        } else {

            input.value = "";

        }

    }

});

setInterval(()=>{

    const now = new Date();

    document.getElementById("clock").innerHTML =
        now.toLocaleTimeString();

},1000);

const map = L.map('map').setView([51.0, 12.0], 4);

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',{
    attribution:'© OpenStreetMap'
}).addTo(map);

const blueIcon = new L.Icon({
    iconUrl:'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-blue.png',
    shadowUrl:'https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png',
    iconSize:[25,41],
    iconAnchor:[12,41]
});

const redIcon = new L.Icon({
    iconUrl:'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-red.png',
    shadowUrl:'https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png',
    iconSize:[25,41],
    iconAnchor:[12,41]
});

L.marker([48.5956,37.9999],{
    icon:blueIcon
})
.addTo(map)
.bindPopup("Born in Bakhmut, Ukraine");

L.marker([52.866,9.695],{
    icon:redIcon
})
.addTo(map)
.bindPopup("Living in Bad Fallingbostel");
