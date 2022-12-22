let fromText=document.querySelector(".form-text");
let toText=document.querySelector(".to-text");
let selectTag=document.querySelectorAll("select");
let btn=document.querySelector("button");
let exchangeIcon=document.querySelector(".exchange");
let icons=document.querySelectorAll(".row i");


selectTag.forEach((tag,id)=>{
    for(let country_code in countries){
        let selected;
        if(id==0 && country_code=="en-GB"){
            selected="selected"
        }else if(id==1 && country_code=="hi-IN"){
            selected="selected"
        }
        let option=`<option value="${country_code}" ${selected}>${countries[country_code]}</option>`;
        tag.insertAdjacentHTML("beforeend",option);
    }
});


exchangeIcon.addEventListener("click",()=>{
    let temp=fromText.value;
    fromText.value=toText.value;
    toText.value=temp;

    let tempLang=selectTag[0].value;
    selectTag[0].value=selectTag[1].value;
    selectTag[1].value=tempLang;
})

btn.addEventListener("click",()=>{
    let text=fromText.value;
    let translateFrom=selectTag[0].value;
    let translateTo=selectTag[1].value;

    if(!text) return;
    toText.setAttribute("placeholder","Translating ...");

    let url=`https://api.mymemory.translated.net/get?q=${text}&langpair=${translateFrom}|${translateTo}`;

    fetch(url).then(res=>res.json()).then(data=>{
        console.log(data);
        toText.value=data.responseData.translatedText;
        toText.setAttribute("placeholder","Translation");
    });
});

icons.forEach((el)=>{
    el.addEventListener("click",({target})=>{
        if(target.classList.contains("fa-copy")){
            if(target.id=="from"){
                // console.log("From copy icon clicked");
                navigator.clipboard.writeText(fromText.value);
            }else{
                // console.log("To copy icon clicked");
                navigator.clipboard.writeText(toText.value);
            }
        }else{
            let speak;
            if(target.id=="from"){
                speak=new SpeechSynthesisUtterance(fromText.value);
                speak.lang=selectTag[0].value;
            }else{
                speak=new SpeechSynthesisUtterance(toText.value);
                speak.lang=selectTag[1].value;
            }
            speechSynthesis.speak(speak);
        }
    })
})