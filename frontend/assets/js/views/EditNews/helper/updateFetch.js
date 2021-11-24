import {isRequired,displayError,displaySuccess} from '../../../validation/form-validtion.js';
import {updateNewsResponse,getSingleNewsResponse } from '../../../fetchHook/fetchNewsHook.js';

export async function displayEditForm(newsId){
    let itemEle = '';


    if(!newsId) return itemEle = '<p>Could not load form, Try again</p>';


      try {
            const data = await getSingleNewsResponse(newsId);
            if(data){

            itemEle = `
                <div class="view--news">
                <div class="container">
                <div class="row">
                    <div class="col-12">
                        <div class="top--title">
                            <h3 class="display-3">Edit News</h3>
                            </div>

                            <div id="alert__diplay" class="alert alert-danger d-none" role="alert"></div>

                            <div>
                                <div class="card">
                                    <div class="card-body">
                                    <form action="" id="edit_or_updte_news_form" class="needs-validation" novalidate>
                                        <fieldset id="field_set">
                                        <div class="mb-3">
                                        <label for="authorName" class="form-label">Author</label>
                                        <input type="text" placeholder="Author Name" value="${data.author}" class="form-control" id="authorName" aria-describedby="" required>
                                        <small class="invalid-feedback"></small>
                                        </div>
                                        <div class="mb-3">
                                        <label for="avatarUrl" class="form-label">Avatar Url</label>
                                        <input type="url" placeholder="Avatar Url" value="${data.avatar}" class="form-control" id="avatarUrl" aria-describedby="" required>
                                        <small class="invalid-feedback"></small>
                                        </div>
                                        <div class="field-group mb-3">
                                            <label for="newsTitle" class="form-label">Title</label>
                                            <input type="text" placeholder="Title" value="${data.title}" class="form-control" id="newsTitle" aria-describedby="" required>
                                            <small class="invalid-feedback"></small>
                                        </div>
                                        <div class="mb-3">
                                            <label for="newsUrl" class="form-label">Url</label>
                                            <input type="url" placeholder="Url" class="form-control" value="${data.url}" id="newsUrl" aria-describedby="" required>
                                            <small class="invalid-feedback"></small>
                                        </div>
                                        
                                        <input id="hidden__input__id" value="${data.id}" type="hidden" />
                                        <button id="submit__btn"  class="btn btn-primary text-white" style="float:right;">
                                            <span id="loader" class="spinner-border spinner-border-sm d-none" role="status" aria-hidden="true"></span>
                                            Update
                                        </button>
                                        </fieldset>
                                        </form>
                                    </div>
                                </div>
                            </div>
                    </div>
                    </div>
                    <br />
                    <br />
                    <br />
            </div>  
                `;

            return itemEle;

            }
      } catch (error) {
          if(error){
            itemEle = '<p>Could not load form, Try again</p>';

            return itemEle;
          }
      }


      

      
}





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



/***************   UPDATE OR EDIT NEWS    ****************/  
export async function handleUpdateNews(e){
    e.preventDefault();
    
const avatarEle = document.querySelector('#avatarUrl');
const authorEle = document.querySelector('#authorName');
const titleEle = document.querySelector('#newsTitle');
const urlEle = document.querySelector('#newsUrl');

const submit__btn = document.getElementById('submit__btn');
const loader = document.getElementById('loader');
const alert__diplay = document.getElementById('alert__diplay');
const __newsid  =  document.getElementById('hidden__input__id');


    let isNewsId = isRequired(__newsid.value.trim());
  
    let isAvatarValid = checkAvatar(avatarEle),
        isAuthorValid = checkAuthor(authorEle),
        isTitle = checkTitle(titleEle),
        isUrl   = checkUrl(urlEle);
        
    let isFormValid = isAuthorValid && isAvatarValid && isAuthorValid && isTitle && isUrl && isNewsId;

    if(isFormValid){
        submit__btn.setAttribute("class","btn btn-primary text-white disabled");
        loader.setAttribute("class","spinner-border spinner-border-sm");
         
        const formData = {
            newsId: __newsid.value,
            author: authorEle.value,
            avatar: avatarEle.value,
            title : titleEle.value,
            url: urlEle.value
        };

       

        try{
            const respStatus = await updateNewsResponse(__newsid.value,formData);
             
            if(respStatus === 200 || respStatus === 201){

                alert__diplay.setAttribute('class','alert alert-success');
                alert__diplay.textContent = "Successfully Updated News";

            }else if(respStatus === 400 || respStatus === 500){
                alert__diplay.setAttribute('class','alert alert-danger');
                alert__diplay.textContent = "Something went wrong, please try again";
            }
           
        }catch(err){
            if(err){
                alert__diplay.setAttribute('class','alert alert-danger');
                alert__diplay.textContent = "Something went wrong, please try again";
            }
        }
        
        document.getElementById('edit_or_updte_news_form').reset();
        submit__btn.setAttribute("class","btn btn-primary text-white");
        loader.setAttribute("class","spinner-border spinner-border-sm d-none");
    }
}




