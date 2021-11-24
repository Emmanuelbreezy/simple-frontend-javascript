import GeneralView from "../index.js";
import fetchNewsById from './helper/fetchSingleNews.js';


export default class extends GeneralView{
    constructor(params){
        super(params);
        this.setTitlePage('View - News Application');
    }

    async getHTMLContent(){
        
        return `   
        <div class="view--news">
        <div class="container">
         <div class="row_col" id="single__display">
         </div>
          
           <div class=" mt-2 comment-section" id="news__comment__sec">
             <hr style="width: 95%; margin:0 auto;" />
            <br/>
             <div class="top--title_">
               <h3 class="display-3">Comment</h3>
             </div>
             <div id="comment_alert__diplay" class="alert alert-danger d-none" role="alert"></div>
             
             <div class="mt-4">
               <form id="comment_form_id" class="needs-validation" novalidate>
                 <div class="mb-3">
                   <label for="avatarUrl" class="form-label">Avatar Url</label>
                   <input type="url" placeholder="Avatar Url" class="form-control" id="comment__avatarUrl" aria-describedby="" required>
                   <small class="invalid-feedback"></small>
                 </div>
                 <div class="mb-3">
                   <label for="Name" class="form-label">Name</label>
                   <input type="text" placeholder="Name" class="form-control" id="comment__name" aria-describedby="" required>
                   <small class="invalid-feedback"></small>
                 </div>
                 <div class="form-floating">
                 <textarea class="form-control" name="commentTextarea" placeholder="Leave a comment here" id="comment__textarea" style="height: 100px"></textarea>
                 <label for="commentTextarea">Comments</label>
                 <small class="invalid-feedback"></small>

                 </div>
                 <div class="d-flex align-items-center justify-content-end pt-3">
                    <button id="comment__submitBtn"  class="btn btn-primary text-white">
                      <span id="comment__loader" class="spinner-border spinner-border-sm d-none" role="status" aria-hidden="true"></span>
                        Submit
                    </button>
                 </div>
               </form>
               <br />             
             </div>

             <br />
             <div class="mt-2">
                <h3>All Comment</h3>
                <div class="mt-2" id="comment--div" style="background:#eee;">
             </div>
           </div>
          
           </div>

           <br/>
           <br/>
           <br/>
        </div>
      </div>
             `
       
    }

    async getSingleNews(news_detail_element,navigateTo){
        if(!this.params) return ''
        return await fetchNewsById(news_detail_element,navigateTo, this.params.id);
    }

}



