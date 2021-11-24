import {getAllNewsResponse,deleteNewsByIdResponse } from '../../../fetchHook/fetchNewsHook.js';



// Function that fetches all the news
export default async function fetchAllNews(element,navigateTo){
    const skeleton_loader = ` <div class="ph-item mt-2" style="border:none; padding: 0 0 0 0!important;">
    <div class="ph-col-4"> <div class="ph-picture"></div></div>
    <div style="padding: 0 !important;"><div class="ph-row p-0"><div class="mt-4 empty"></div><div class="ph-col-12 big"></div><div class="ph-col-8"></div><div class="ph-col-6"></div>
      </div></div></div>   <div class="ph-item mt-2" style="border:none; padding: 0 0 0 0!important;">
      <div class="ph-col-4"> <div class="ph-picture"></div></div>
      <div style="padding: 0 !important;"><div class="ph-row p-0"><div class="mt-4 empty"></div><div class="ph-col-12 big"></div><div class="ph-col-8"></div><div class="ph-col-6"></div>
        </div></div></div>   <div class="ph-item mt-2" style="border:none; padding: 0 0 0 0!important;">
        <div class="ph-col-4"> <div class="ph-picture"></div></div>
        <div style="padding: 0 !important;"><div class="ph-row p-0"><div class="mt-4 empty"></div><div class="ph-col-12 big"></div><div class="ph-col-8"></div><div class="ph-col-6"></div>
          </div></div></div>`;
          element.innerHTML = skeleton_loader;

        let current_page = 0;
        let rows = 10;
        try{
            const data = await getAllNewsResponse();
            if(data){
                //Display Paginated Data
                displayPaginatedData(data,element,rows,current_page,navigateTo);
                
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




async function displayPaginatedData(data,element,rows_per_page,current_page,navigateTo){
    element.innerHTML = "";
   
    // No of item in a page x current page no (10 x 1) per page
    let start = rows_per_page * current_page;
    let end =  start + rows_per_page;

    let paginatedItems = data.reverse().slice(start,end);
    for(let i = 0; i < paginatedItems.length; i++){
        const res = paginatedItems[i];
        const newsCard = `
            <div class="col-12 mb-4"><div class="card">
              <div class="row g-0">
                <div class="col-3 col-md-3 col-min-img" >
                    <a href="/news/${res.id}" data-link>
                    <img src="${res.avatar}" style="background-color: #eee;" class="card-img-top" alt="..." />    
                    </a>
                </div>
            <div class="col-8 col-md-8 ms-4">
            <div class="card-body">
                <a href="/news/${res.id}" data-link><h5 class="card-title">${res.title}</h5></a>
                <p class="card-text">Website url: <a href="${res.url}" style="color:blue; text-decoration:underline;">${res.url}</a></p>
                <div class="card-extra">
                <ul ><li class=""><span><b>Author:</b> ${res.author}</span>
                </li></ul><ul><li><a href="/edit/${res.id}" data-link><i class="fas fa-pen"></i></a></li><li class="ms-4"><a class="trigger__del_action" style="cursor:pointer" data-id="${res.id}">
                <i class="fas fa-trash"></i></a></li></ul></div>
            </div>
            </div></div></div></div>`;
     element.innerHTML += newsCard;
    }
    
    //call the appended pagination button helper function
    displayPaginatedButton(data,element,rows_per_page,current_page);
    // add Event listener to the delete button handler
    deleteBtnListener(element,navigateTo);
}



function displayPaginatedButton(data,element,rows_per_page,current_page){
    const pgBtns = `
         <div class="py-4 mb-3">
         <nav class="d-flex align-items-center justify-content-center" aria-label="..." style="width: 100%;">
         <ul class="pagination" >
           <li id="pagination__btn__wrapper " class="page-item">
                <a  id="back_pagination__btn" class="page-link" style="cursor:pointer;">Previous</a>
            </li>
             <li id="" class="page-item">
             <a  id="next_pagination__btn" class="page-link" style="cursor:pointer;">Next</a>
          </li>
         </ul>
         </nav>
         </div>`;
     element.innerHTML += pgBtns;
     paginatedButtonListener(data,element,rows_per_page,current_page);

}



function paginatedButtonListener(data,element,rows_per_page,current_page){

    //page__count = total list of news (length) / per no of item to be shown (10) - one
    let page__count = Math.ceil(data.length / rows_per_page) -1;
    
    //Select the pagination buttons
    const prevButton = document.getElementById('back_pagination__btn');
    const nextButton = document.getElementById('next_pagination__btn');

    if(!nextButton && !prevButton) return null;

    if(current_page !== 0 && current_page <= page__count){
        //Add Eventlistener to the previous button
        prevButton.addEventListener('click', function(){
            current_page -= 1;
            displayPaginatedData(data,element,rows_per_page,current_page)
        })
    }
   
    if(current_page  !== page__count && current_page <= page__count){
         //Add Eventlistener to the next button
        nextButton.addEventListener('click', function(){
            current_page += 1;
            displayPaginatedData(data,element,rows_per_page,current_page)

        })
    }
}



// Find all delete button and added eventlistener
function deleteBtnListener(element,navigateTo) {
    const allDelBtn = document.querySelectorAll('.trigger__del_action[data-id]');
    allDelBtn.forEach(ele => {
        const newsId = ele.dataset.id;
         ele.addEventListener('click',() => deleteNewsHandler(newsId,element,navigateTo))
    });    
}


// Delete news by newsId
async function deleteNewsHandler(newsId,element,navigateTo){
    if(!newsId) return null;
    
    try{
        const resultStatus = await deleteNewsByIdResponse(newsId);
        console.log(newsId,resultStatus);
        if(resultStatus === 200){
            alert(`Successfully Deleted Item`)
           
            //refetch the news after delete was successfull 
            fetchAllNews(element,navigateTo);
        }

    }catch(err){
        if(err){
            alert('Error Occurred: Could not delete,pls try again')
        }
        console.log(err);
    } 
}