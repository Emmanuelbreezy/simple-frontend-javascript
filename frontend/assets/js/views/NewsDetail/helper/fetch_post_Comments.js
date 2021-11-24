import {getCommentByNewsIdResponse,
        addCommentToNewsIdResponse,
        deleteCommentByIdResponse} 
 from '../../../fetchHook/fetchCommentsHook.js';
import {isRequired,displayError,displaySuccess} from '../../../validation/form-validtion.js';


// Function that fetches all comment by newsId
export  async function fetchCommentsByNewsId(element,newsId){
        element.innerHTML = '<p>Loading Comments....</p>';
        try{
            const data = await getCommentByNewsIdResponse(newsId);
            element.innerHTML = '';
            if(data){
                data.reverse().map(res => {
                    const itemEle = `<div class="card card-default mb-1">
                        <div class="card-body"><div class="row g-0">
                        <div class="col-md-12">
                            <div class="card-body">
                                <div class="d-flex align-items-center">
                                <div class="comment__avatar_wrapper">
                                    <img src="${res.avatar}" />
                                </div>
                                <h5 class="card-title">${res.name}</h5>

                                </div>
                                <p class="card-text">
                                    ${res.comment}
                                </p>
                                <p class="card-text d-flex align-item-center">
                               

                                <a href="#" style="cursor:pointer;" data-newsId="${res.newsId}" data-id="${res.id}"><small class="text-muted ms-4">
                                    <i class="fas fa-pen" style="font-size: 0.8rem;"></i>
                                    Edit
                                </small></a>

                                <a style="cursor:pointer;" class="comment__del" data-newsId="${res.newsId}" data-id="${res.id}"><small class="text-muted ms-4">
                                    <i class="fas fa-trash" style="font-size: 0.8rem;"></i>
                                    Delete
                                </small></a>
                                </p>
                            </div>
                            </div>
                        </div>
                        </div>
                    </div>  `;

                element.innerHTML += itemEle;
            });  

            //Add Delete Event Listener to the delete buttons
            deleteCommentBtnListener(newsId,element);
            
            //GET ALL ELEMENT CONTAINING [data-link] ATTRIBUTES
            const elems = document.querySelectorAll('[data-link]');
            elems.forEach(ele => {
                ele.addEventListener("click", e => {
                    e.preventDefault();
                    if(e.path[1].matches('[data-link]')){
                        navigateTo(e.path[1].href);
                    }
            });

            });
            }else{
                element.innerHTML = '';
                element.innerHTML ='<div><p>Error Occoured</p></div>';
            }
    }catch(error){
        element.innerHTML = '';
        element.innerHTML ='<div><p>Error Occoured</p></div>';
        console.log(error)
    }
}



// POSTING COMMENT HELPER FUNCTION SECTION 

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

// Validation for Name Field
const checkName = (nameEle) =>{
    let isValid = false;
    const name = nameEle.value.trim();
    if(!isRequired(name)){
        displayError(nameEle,'Name field cannot be empty');
    }else{
        displaySuccess(nameEle);
        isValid = true;
    }
    return isValid;
}

// Validation for Comment Field
const checkComment = (commentEle) =>{
    let isValid = false;
    const comment = commentEle.value.trim();
    if(!isRequired(comment)){
        displayError(commentEle,'Comment field cannot be empty');
    }else{
        displaySuccess(commentEle);
        isValid = true;
    }

    return isValid;
}

// Helper function that validated and submit comment formdata
export async function postCommentToNewsId(e,newsId,element){
    e.preventDefault();
    
    const _avatarEle = document.querySelector('#comment__avatarUrl');
    const _nameEle = document.querySelector('#comment__name');
    const _commentEle = document.querySelector('#comment__textarea');

    const submit__btn = document.querySelector('#comment__submitBtn');
    const loader = document.querySelector('#comment__loader');
    const alert__diplay = document.querySelector('#comment_alert__diplay');

    let isAvatarValid = checkAvatar(_avatarEle),
        isNameValid = checkName(_nameEle),
        isComment = checkComment(_commentEle);
    
    let isFormValid = isNameValid && isAvatarValid  && isComment;

    if(isFormValid){
        submit__btn.setAttribute("class","btn btn-primary text-white disabled");
        loader.setAttribute("class","spinner-border spinner-border-sm");
         
        const formData = {
            newId: newsId,
            name : _nameEle.value,
            avatar: _avatarEle.value,
            comment: _commentEle.value
        };

        try{
            const response = await addCommentToNewsIdResponse(newsId,formData);

            if(response.status == 400 || response.status == 500){
                alert__diplay.setAttribute('class','alert alert-danger');
                alert__diplay.textContent = "Something went wrong, please try again";

                return null
            }

            //Refetch the comments if response is success
            fetchCommentsByNewsId(element,newsId);


           
        }catch(err){
            if(err){
                alert__diplay.setAttribute('class','alert alert-danger');
                alert__diplay.textContent = "Something went wrong, please try again";
            }
            console.log(err,'----');
        }
        
        document.getElementById('comment_form_id').reset();
        submit__btn.setAttribute("class","btn btn-primary text-white");
        loader.setAttribute("class","spinner-border spinner-border-sm d-none");
    }

    

}


// Find all delete button and added eventlistener
function deleteCommentBtnListener(newsId,element) {
    const allDelBtn = document.querySelectorAll('.comment__del[data-id]');
    allDelBtn.forEach(ele => {
        const commentId = ele.dataset.id;
         ele.addEventListener('click',() => deleteCommentHandler(newsId,commentId,element))
    });    
}


// Helper function that validated and submit comment formdata
async function deleteCommentHandler(newsId,commentId,element){
    if(!commentId) return null;
    
    try{
        const resStatus = await deleteCommentByIdResponse(newsId,commentId);
        console.log(newsId,resStatus);
        if(resStatus === 200){
            alert(`Successfully Deleted Item -`);

             //Refetch the comments if response is success
             fetchCommentsByNewsId(element,newsId);
        }

    }catch(err){
        if(err){
            alert('Error Occurred: Could not delete,pls try again')
        }
        console.log(err);
    } 

}