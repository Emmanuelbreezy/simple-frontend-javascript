import {getSingleNewsResponse} from '../../../fetchHook/fetchNewsHook.js';
import {fetchCommentsByNewsId,postCommentToNewsId} from './fetch_post_Comments.js';


// Function that fetches all the news
export default async function fetchNewsById(element,navigateTo,newsId){
    const skeleton_loader = `  <div class="ph-item mt-2" style="border:none; padding: 0 0 0 0!important;">
    <div class="ph-col-12"> 
      <div class="ph-row">
        <div class="ph-col-8 big"></div>
        <div class="mt-2"></div>
        <div class="ph-col-6"></div>
      </div>
      <div class="mt-2"></div>
      <div class="ph-picture big"></div>
    </div>
  </div> `;
          element.innerHTML = skeleton_loader;
       
        try{
            const data = await getSingleNewsResponse(newsId);

            element.innerHTML = '';
            if(data){
                
                const itemEle = `   <div class="col-12">
                <div class="card" style="border: none;"><div class="card-body">
                    <div class="top--title">
                      <h3 class="display-3">${data.title}</h3>
                    </div>
                    <div class="cd-extra">
                        <ul><li class="mb-2">
                            <span><b>Author:</b> ${data.author}</span>
                          </li>
                          <li class="ms-3">
                            <span class="d-flex align-item-center ">
                            Website: ${data.url}
                            </span>
                          </li>
                        </ul>
                        <ul><li><a href="/edit/${data.id}" data-link><i class="fas fa-pen"></i>Edit</a></li>
                        </ul></div><br />
                     <div class="image-container">
                      <img src="${data.avatar}" alt="" />
                    </div>
                    <br />
                    <div class="card-text">
                      no description
                    </div>
                  </div>
                </div>
                </div>`;

              element.innerHTML += itemEle;
              
              //select the comment parent element
              //call the fetch comment function and append to the parent ele 
               const comment_ele = document.querySelector('#comment--div');
               fetchCommentsByNewsId(comment_ele,newsId);

               if(document.querySelector('#comment_form_id')){
                document.querySelector('#comment_form_id')
                        .addEventListener('submit',(e)=>  postCommentToNewsId(e,newsId,comment_ele))
               }
              
                
                
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