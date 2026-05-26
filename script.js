const output = document.getElementById("output");
const input = document.getElementById("cmd-input");
const terminal = document.getElementById("terminal");

let shouldAutoScroll = true;
let autoScrollFrame = null;

function isNearBottom() {
    return (
        terminal.scrollTop + terminal.clientHeight >=
        terminal.scrollHeight - 100
    );
}

// пользователь скроллит
terminal.addEventListener("scroll", () => {
    shouldAutoScroll = isNearBottom();
}, { passive: true });

function autoScrollToBottom(force = false) {

    if (!shouldAutoScroll && !force) return;

    // отменяем предыдущий кадр
    if (autoScrollFrame) {
        cancelAnimationFrame(autoScrollFrame);
    }

    autoScrollFrame = requestAnimationFrame(() => {

        terminal.scrollTop = terminal.scrollHeight;

    });

}


// плавный автоскролл как в ChatGPT
function autoScrollToBottom(){

    if(!shouldAutoScroll) return;

    terminal.scrollTo({
        top: terminal.scrollHeight,
        behavior: "smooth"
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
Name:
Mykhailo Khorenko

Date of Birth:
01.02.2010

Residence:
Bad Fallingbostel, Germany (29683)

Place of Birth:
Bakhmut, Ukraine

Family:
Father - Vitaliy Khorenko (IT Engineer)
Mother - Kseniia Khorenko (Childhood Education Assistant)
Brother - Ivan (11 years old)

Interests:
Programming, AI, Game Development, Arduino,
3D Design, Tabletennis, Athletics, Karate
`,

education: `
09.2016
Gymnasium Nr. 194 "Perspective"
Kyiv, Ukraine

08.2022 - 12.2022
Edith-Stein-Realschule
Emlichheim, Germany

Since 01.2023
OBS Lieth-Schule (Gymnasium branch)
Bad Fallingbostel
`,

experience: `
2024 (10-21 March)
Röders Tec, Soltau
Software- & Mechatronics- Engineer

2025 (10-21 March)
Hagebau IT, Soltau
Software Engineer
`,

skills: `
Programming:
Python, HTML, CSS, JavaScript, SQL

Software:
GIMP, Blender, Word, Excel

Hardware:
Arduino, PC Hardware

Languages:
Ukrainian (Native)
Russian (Fluent)
German (B2)
English (Good)

Strengths:
Reliable, Responsible,
Creative, Independent,
Fast learner, Patient,
Organized, Team-oriented
`,

projects: `
Projects:

- Telegram Bots
- AI Projects
- Arduino Systems
- Web Development
- 3D Modeling
`,

contacts: `
Telegram:
@funny_person

GitHub:
github.com/horenkomihailo

Email:
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
Name:
Mykhailo Khorenko

Geburtsdatum:
01.02.2010

Wohnort:
Bad Fallingbostel, Deutschland (29683)

Geburtsort:
Bakhmut, Ukraine

Familie:
Vater - IT Ingenieur
Mutter - Sozialpädagogische Assistentin
Bruder - Ivan (11 Jahre alt)
`,

education: `
09.2016
Gymnasium Nr. 194 "Perspective"
Kyiv, Ukraine

08.2022 - 12.2022
Edith-Stein-Realschule
Emlichheim, Deutschland

Since 01.2023
OBS Lieth-Schule (Gymnasialer Zweig)
Bad Fallingbostel
`,

experience: `
2024 (10-21 März)
Röders Tec, Soltau
Fachinformatiker & Mechatroniker

2025 (10-21 März)
Hagebau IT, Soltau
Fachinformatiker
`,

skills: `
Programmierung:
Python, HTML, CSS, JavaScript, SQL

Software:
GIMP, Blender, Word, Excel

Hardware:
Arduino, Computer Hardware

Sprachen:
Ukrainisch
Russisch
Deutsch B2
Englisch

Stärken:
Zuverlässig
Verantwortungsvoll
Kreativ
Selbstständig
Lernbereit
`,

projects: `
Bots
AI Projekte
Arduino Systeme
Trading Analytics
3D Druck
`,

contacts: `
Telegram
GitHub
Gmail
WhatsApp
LinkedIn
`

},

ru: {

welcome: `
Добро пожаловать в интерактивное
терминальное портфолио

<span class="highlight">Михаила Хоренко</span>

Введите <span class="highlight">help</span>.
`,

help: `
Команды:

profile
education
experience
skills
projects
contacts
map
download
lang en/de/ru
clear
`,

profile: `
Имя:
Михаил Хоренко

Дата рождения:
01.02.2010

Проживание:
Bad Fallingbostel, Germany

Место рождения:
Бахмут, Украина

Семья:
Отец - IT инженер
Мать - Sozialpädagogische Assistentin
Брат - Иван
`,

education: `
Gymnasium Nr. 194 "Perspective"

Edith-Stein-Realschule

OBS Lieth-Schule
`,

experience: `
Röders Tec
Fachinformatiker & Mechatroniker

Hagebau IT
Fachinformatiker
`,

skills: `
Python
HTML
CSS
JavaScript
GIMP
Blender
Arduino

Языки:
Украинский
Русский
Немецкий B2
Английский

Сильные стороны:
Ответственный
Креативный
Самостоятельный
`,

projects: `
Discord Bots
Telegram Bots
AI Projects
Arduino
3D Printing
`,

contacts: `
Telegram
GitHub
Gmail
WhatsApp
`

}

};

async function print(text, speed = 12){

    const div = document.createElement("div");
    div.className = "output-line";

    output.appendChild(div);
    autoScrollToBottom();

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



function boot(){

    print(`
<span class="success">
SYSTEM ONLINE
</span>
`);

    print(data[currentLang].welcome);

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

    const { jsPDF } = window.jspdf;

    const doc = new jsPDF();

    doc.setFont("courier");

    doc.setFontSize(16);
    doc.text("Mykhailo Khorenko", 20, 20);

    doc.setFontSize(12);

    doc.text(`
Student | Developer | Creator

Skills:
- Python
- JavaScript
- HTML/CSS
- Arduino
- AI Projects

Languages:
- Ukrainian
- German
- English

Contacts:
GitHub: github.com/horenkomihailo
Email: horenkomihailo2022@gmail.com
`, 20, 40);

    doc.save("Mykhailo_Khorenko_CV.pdf");

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

const greenIcon = new L.Icon({
    iconUrl:'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-green.png',
    shadowUrl:'https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png',
    iconSize:[25,41],
    iconAnchor:[12,41]
});

const violetIcon = new L.Icon({
    iconUrl:'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-violet.png',
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

L.marker([52.986,9.843],{
    icon:greenIcon
})
.addTo(map)
.bindPopup("Röders Tec Practice");

L.marker([52.986,9.843],{
    icon:violetIcon
})
.addTo(map)
.bindPopup("Hagebau IT Practice");
