import {isRequired,displayError,displaySuccess} from '../../../validation/form-validtion.js';
import {createNewsResponse } from '../../../fetchHook/fetchNewsHook.js';



// Validation for Avatar Field
const checkAvatar = (avatarEle) =>{
    let isValid = false;
    const avatar = avatarEle.value.trim();
    if(!isRequired(avatar)){
        displayError(avatarEle,'Avatar cannot be empty');
    }else{
        displaySuccess(avatarEle);
        isValid = true;
    }

    return isValid;
}

// Validation for Author Field
const checkAuthor = (authorEle) =>{
    let isValid = false;
    const author = authorEle.value.trim();
    if(!isRequired(author)){
        displayError(authorEle,'Author field cannot be empty');
    }else{
        displaySuccess(authorEle);
        isValid = true;
    }
    return isValid;
}

// Validation for Title Field
const checkTitle = (titleEle) =>{
    let isValid = false;
    const title = titleEle.value.trim();
    if(!isRequired(title)){
        displayError(titleEle,'Title field cannot be empty');
    }else{
        displaySuccess(titleEle);
        isValid = true;
    }

    return isValid;
}

// Validation for Url Field
const checkUrl = (urlEle) =>{
    let isValid = false;
    const url = urlEle.value.trim();
    if(!isRequired(url)){
        displayError(urlEle,'Url field cannot be empty');
    }else{
        displaySuccess(urlEle);
        isValid = true;
    }

    return isValid;
}



 export default async function handlecreateNews(e){
    e.preventDefault();
    const avatarEle = document.querySelector('#avatarUrl');
    const authorEle = document.querySelector('#authorName');
    const titleEle = document.querySelector('#newsTitle');
    const urlEle = document.querySelector('#newsUrl');

    const submit__btn = document.getElementById('submit__btn');
    const loader = document.getElementById('loader');

    
    
    let isAvatarValid = checkAvatar(avatarEle),
        isAuthorValid = checkAuthor(authorEle),
        isTitle = checkTitle(titleEle),
        isUrl   = checkUrl(urlEle);
    
    let isFormValid = isAuthorValid && isAvatarValid && isAuthorValid && isTitle && isUrl;

    if(isFormValid){
        submit__btn.setAttribute("class","btn btn-primary text-white disabled");
        loader.setAttribute("class","spinner-border spinner-border-sm");
         
        const formData = {
            author: authorEle.value,
            avatar: avatarEle.value,
            title : titleEle.value,
            url: urlEle.value
        };


        try{
            const response = await createNewsResponse(formData);

            if(response.status == 400 || response.status == 500){
                document.getElementById('alertId').setAttribute('class','alert alert-danger');
                document.getElementById('alertId').textContent = "Something went wrong, please try again";
           
            }else if(response.status == 200){
                alert('Successfull Posted, Go to Home')
                document.getElementById('alertId').setAttribute('class','alert alert-success');
                document.getElementById('alertId').textContent = "News was Successfull created, Go to home";

            }
           
        }catch(err){
            if(err){
                document.getElementById('alertId').setAttribute('class','alert alert-danger');
                document.getElementById('alertId').textContent = "Something went wrong, please try again";
            }
            console.log(err,'----');
        }
        
        document.getElementById('create_news_form').reset();
        submit__btn.setAttribute("class","btn btn-primary text-white");
        loader.setAttribute("class","spinner-border spinner-border-sm d-none");
    }
}
