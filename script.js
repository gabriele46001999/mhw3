function showless(event){
  const bottoneless=event.currentTarget;
  const divinformation=bottoneless.parentNode;
  const casella=divinformation.parentNode;
  divinformation.innerHTML="";
  divinformation.classList.add("hidden");
  const bottonemore=casella.querySelector("span");
  bottonemore.classList.remove("hidden");
}

function showmore(event){
  const bottonemore=event.currentTarget;
  const flexitem=bottonemore.parentNode;
  const index=flexitem.dataset.element;
  bottonemore.classList.add("hidden");
  const descrizione=document.createElement("p");
  const prezzo=document.createElement("h3");
  const bottoneless=document.createElement("span");
  bottoneless.classList.add("button");
  bottoneless.textContent="SHOW LESS";
  descrizione.textContent=RESULT_MAP[index].descrizione;
  prezzo.textContent=RESULT_MAP[index].prezzo;
  const div=flexitem.querySelector(".information");
  div.classList.remove("hidden");
  div.appendChild(descrizione);
  div.appendChild(prezzo);
  div.appendChild(bottoneless);
  bottoneless.addEventListener('click',showless);
}


function showsearch(event){
  const searchbox=event.currentTarget;
  const filter=searchbox.value.toUpperCase();
  for (const blocco of blocchi)
  {
      const titolo=blocco.querySelector("h1").textContent;
      if(titolo.toUpperCase().indexOf(filter)>-1){
        blocco.classList.remove("hidden");
      }
      else{
        blocco.classList.add("hidden");
      }
}
}


function rimuovipreferiti(event){
  const dislike=event.currentTarget;
  const divtitle=dislike.parentNode;
  const itempreferiti=divtitle.parentNode;
  const index=itempreferiti.dataset.element;
  const preferiticontainer=document.querySelector(".preferiti-container");
  const divpreferiti=preferiticontainer.parentNode;
  const figli=preferiticontainer.childNodes;
  preferiticontainer.removeChild(itempreferiti);
  if(figli.length==1){
    divpreferiti.classList.add("hidden");
  }
  for(const button of preferbuttons){
        if(button.parentNode.parentNode.dataset.element===index)
         button.addEventListener("click",showpreferiti);
}
}


function showpreferiti(event){
  preferiti.classList.remove("hidden");
  const flexsection=preferiti.querySelector(".preferiti-container");
  const preferbutton=event.currentTarget;
  const divtitlesection=preferbutton.parentNode;
  const casella=divtitlesection.parentNode;
  const indice=casella.dataset.element;
  const flexitem=document.createElement("div");
  flexitem.classList.add("item-preferiti");
  flexitem.setAttribute("data-element",indice);
  flexsection.appendChild(flexitem);
  const divtitlepreferiti=document.createElement("div");
  divtitlepreferiti.classList.add("title");
  flexitem.appendChild(divtitlepreferiti);
  const title=document.createElement("h1");
  title.textContent=RESULT_MAP[indice].titolo;
  const immagineunprefer=document.createElement("img");
  immagineunprefer.src=RESULT_MAP[indice].immagineunlike;
  divtitlepreferiti.appendChild(title);
  divtitlepreferiti.appendChild(immagineunprefer);
  const imgdesc=document.createElement("img");
  imgdesc.src=RESULT_MAP[indice].immagine;
  flexitem.appendChild(imgdesc);
  preferbutton.removeEventListener('click',showpreferiti);
  const bottonedislike=divtitlepreferiti.querySelector("img");
  bottonedislike.addEventListener('click',rimuovipreferiti);
}


//AGGIUNGO DINAMICAMENTE I DIV//
for(let index in RESULT_MAP){
  const div=document.createElement("div");
  div.setAttribute("data-element",index);
  div.classList.add("flex-itemsection");
  const section=document.querySelector(".flex-section");
  section.appendChild(div);
}

//IN MANIERA DINAMICA AGGIUNGO IL CONTENUTO AD OGNI DIV PRECEDENTE CREATO//
const blocchi=document.querySelectorAll('.flex-itemsection');
for(const blocco of blocchi){
    const indice=blocco.dataset.element;
    const divtitle=document.createElement("div");
    divtitle.classList.add("title");
    const title=document.createElement("h1");
    title.textContent=RESULT_MAP[indice].titolo;
    const immaginelike=document.createElement("img");
    immaginelike.src=RESULT_MAP[indice].immaginelike;
    divtitle.appendChild(title);
    divtitle.appendChild(immaginelike);
    blocco.appendChild(divtitle);
   const immaginedesc=document.createElement("img");
   immaginedesc.src=RESULT_MAP[indice].immagine;
   immaginedesc.setAttribute("id","immaginedescrizione");
   blocco.appendChild(immaginedesc);
   const p1=document.createElement("p");
   p1.textContent="Clicca sulla foto per vedere il video";
   blocco.appendChild(p1);
   const divinformation=document.createElement("div");
   divinformation.classList.add("information");
   divinformation.classList.add("hidden");
   blocco.appendChild(divinformation);
   const bottonemore=document.createElement("span");
   bottonemore.textContent="SHOW MORE";
   bottonemore.classList.add("button");
   blocco.appendChild(bottonemore);
}



//PARTE REST API KEY//
//DAL JSON OTTENGO L'SRC DELLA FOTO CHE USERO PER SETTARE LA FOTO DI BACKGROUND DEL HEADER//
function onJson(json)
{
  console.log(json);
  const list=json.hits;
    const src=list[13].largeImageURL;
    console.log(src);
    const header=document.querySelector("header");
    header.style.backgroundImage="url("+src+")";
  }

//DALLA RESPONSE OTTENGO IL JSON//
function onTokenResponse(response)
{
  console.log(response)
  return response.json();
}


function onFail(error){
  console.log(error);
}

//All'apertura della pagina, richiediamo L'ACCESSO TRAMITE APIKEY A PIXELBAY
fetch("https://pixabay.com/api?key=21165319-74b00e5a51d65f5ad978a43c8&image_type=photo&q=smartphone").then(onTokenResponse,onFail).then(onJson);





//PARTE PER API VIMEO OAUTH2//
//DAL JSON OTTENUTO ESTRAGGO L SRC DEL VIDEO ED CREO UN COMPONENTE IFRAME CON TALE SRC//
function onTokenJson(json){
   console.log(json);
   const listvideo=json.data;
   const video=listvideo[videonumber];
   console.log(video);
   const link=video.link;
   //ESTRATTO DAL LINK OTTENUTO DAL JSON IL NUMERO CHE IDENTIFICA IL VIDEO//
   const linkestratto=link.substring(18);
   //OTTENGO IL LINK DA METTERE NEL SRC DEL COMPONENTE IFRAME
   const linkperfetto="https://player.vimeo.com/video/"+linkestratto;
   console.log(linkperfetto);
   const videocomponent=document.createElement("iframe");
   videocomponent.src=linkperfetto;
   modalview.appendChild(videocomponent);
}


//OTTENGO DALLA RESPONSE DALLA FETCH IL JSON//
function onResponseToken(response){
	console.log('Risposta ricevuta');
	return response.json();
}


//FUNZIONE CHE AL CLICK SULLA MODALE,FA RITORNARE LA PAGINA PRECEDENTE//
function onModalClick(event){
  body.classList.remove("noscroll");
  modalview.innerHTML="";
    modalview.classList.add("hidden");
}

//LA FUNZIONE onModalDisplay mostrerà la MODAL ED ESEGUIRA LA FETCH A VIMEO PER OTTENERE IL VIDEO//
function onModalDisplay(event){
  const casella=event.currentTarget.parentNode;
  //NEL FILE JSON RESULT_MAP HO UN NUMBER PER OTTENERE UN VIDEO ESATTO//
  videonumber=RESULT_MAP[casella.dataset.element].numbervideo;
  const title=casella.querySelector(".flex-itemsection .title h1");
  //ESEGUO LA FETCH PASSANDO COME PARAMETRO IL TITOLO DEL DIV CLICCATO//
  const titleText=encodeURIComponent(title.textContent);
    fetch("https://api.vimeo.com/videos?query="+titleText,
    {
      headers:
      {
      'Authorization': 'bearer '+ tokenbear
      }
    }
  ).then(onResponseToken).then(onTokenJson);
  modalview.style.top=window.pageYOffset+'px';
  modalview.classList.remove("hidden");
  body.classList.add("noscroll");
  const titledescript=document.createElement("h1");
  titledescript.textContent="CONTENUTO MULTIMEDIALE IN ESECUZIONE";
  modalview.appendChild(titledescript);
  //METTO UN LISTENER SULLA MODALE CHE AL CLICK LA FARA CHIUDERE//
  modalview.addEventListener('click',onModalClick);
}





//ASSOCIO IL TOKEN PRELEVANDOLO DAL FILE JSON RESTITUITO NELLA RESPONSE//
function onJsonToken(json){
   console.log(json);
   tokenbear=json.access_token;
   }

//RITORNO IL JSON CON IL TOKEN//
function onSuccessToken(response){
	console.log('Risposta ricevuta');
	return response.json();
}

function onFailToken(error){
  console.log(error);
}

//AL CARICAMENTO DELLA PAGINA ESEGUO  LA FETCH PER RICHIEDERE IL TOKEN//
const client_id="df1b8abce5fc06f94c469b21f02b5dce7898d4f8";
const client_secret="jF3NG3eEI6ocxLNWUSNUK+FeWMl7Ld0RYxROZdyl/2Y9uPCrEDJZgXXZQ0zVdIJzZg8T6pbaCWKEX8mZBZT8GsyRpp6cv1x8vNwwlvv50EsFon3y3E7LFllXkEUvA2qM";
//VARIABILE PER IL TOKEN//
let tokenbear;
//VARIABILE PER IL NUMERO DEL VIDEO CHE VOGLIO OTTENERE//
let videonumber;
const body=document.querySelector("body");
const modalview=document.querySelector(".modal-view");
modalview.classList.add("hidden");
// All'apertura della pagina, richiediamo il token
fetch("https://api.vimeo.com/oauth/authorize/client",
	{
   method: "post",
   body: "grant_type=client_credentials",
   headers:
   {
    'Content-Type': 'application/x-www-form-urlencoded',
    'Authorization': 'Basic ' + btoa(client_id + ':' + client_secret),
    'Accept':	'application/vnd.vimeo.*+json;version=3.4'
       }
  }
).then(onSuccessToken,onFailToken).then(onJsonToken);




//AD OGNI BOTTONE ASSOCIO LA FUNZIONE SHOWMORE//
const caselle = document.querySelectorAll('.flex-itemsection .button');
for (const casella of caselle)
{
  casella.addEventListener('click', showmore);
}

//ASSOCIO AD OGNI IMMAGINE LA FUNZIONE onModalDisplay che visualizzerà la modale//
const immagini=document.querySelectorAll(".flex-itemsection #immaginedescrizione");
for(const immagine of immagini){
  immagine.addEventListener('click',onModalDisplay);
}

//INIZIALMENTE IL DIV PREFERITI E NASCOSTO//
const preferiti=document.querySelector(".preferiti");
preferiti.classList.add("hidden");
//AD OGNI CLICK SUL IMAGINELIKE ASSOCIO LA FUNZIONE SHOWPREFERITI//
const preferbuttons=document.querySelectorAll(".flex-itemsection .title img");
for(const button of preferbuttons){
  button.addEventListener('click',showpreferiti);
}

//ASSOCIO ALLA BARRA DI RICERCA AL EVENTO KEYUP LA FUNZIONE showsearch//
const searchbox=document.querySelector("#searchbox-item input");
searchbox.addEventListener('keyup',showsearch);
