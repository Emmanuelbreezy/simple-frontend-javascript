import GeneralView from "../index.js";
 

export default class extends GeneralView{
    constructor(params){
        super(params);
        this.setTitlePage('Create News');

    
    }

    async getHTMLContent(){
       
        const displayEle = `   
            <div class="view--news">
                <div class="container">
                <div class="row">
                    <div class="col-12">
                        <div class="top--title">
                            <h3 class="display-3">Create News</h3>
                            </div>

                            <div id="alertId" class="alert alert-danger d-none" role="alert"></div>

                            <div>
                                <div class="card">
                                    <div class="card-body">
                                    <form action="" id="create_news_form" class="needs-validation" novalidate>
                                        <fieldset id="field_set">
                                        <div class="mb-3">
                                        <label for="authorName" class="form-label">Author</label>
                                        <input type="text" placeholder="Author Name" class="form-control" id="authorName" aria-describedby="" required>
                                        <small class="invalid-feedback"></small>
                                        </div>
                                        <div class="mb-3">
                                        <label for="avatarUrl" class="form-label">Avatar Url</label>
                                        <input type="url" placeholder="Avatar Url" class="form-control" id="avatarUrl" aria-describedby="" required>
                                        <small class="invalid-feedback"></small>
                                        </div>
                                        <div class="field-group mb-3">
                                            <label for="newsTitle" class="form-label">Title</label>
                                            <input type="text" placeholder="Title" class="form-control" id="newsTitle" aria-describedby="" required>
                                            <small class="invalid-feedback"></small>
                                        </div>
                                        <div class="mb-3">
                                            <label for="newsUrl" class="form-label">Url</label>
                                            <input type="url" placeholder="Url" class="form-control" id="newsUrl" aria-describedby="" required>
                                            <small class="invalid-feedback"></small>
                                        </div>
                                    <input id="hidden__input__id" value="" type="hidden" />
                                        <button id="submit__btn"  class="btn btn-primary text-white" style="float:right;">
                                            <span id="loader" class="spinner-border spinner-border-sm d-none" role="status" aria-hidden="true"></span>
                                            Submit
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


        return displayEle;
       
    }

    

}



