import GeneralView from "../index.js";


export default class extends GeneralView{
    constructor(params){
        super(params);
        this.setTitlePage('A Simple News Application');
  
    }

    async getHTMLContent(){
       
        return `   
            <div class="grid--layout">
                <div class="container">
                <div class="row">
                    <div class="col-12 col-lg-8 row-left">
                        <div class="news--list">
                            <div class="tab tab-dis">
                                <h5 class="display-4">Recommended For You</h5>
                            </div>
                            <hr class="border-bottom mt-0"/>
                    
                            <div class="row-col" id="list--all">
                            </div>
                        </div>
                    </div> 
                    <div class="col-12 col-lg-4 pe-0 row-right">
                        <div class="container-fluid">
                        <div class="mb-4 news-create-btn">
                            <a class="w-100 d-flex align-items-center " href="/create"  data-link>
                            <i class="fas fa-plus me-2"></i>
                            Create News</a>
                            </div>
                            <br/>
                        <div class="topics--tag">
                            <div class="tab tab-dis">
                                <h5 class="display-4">Topic tags</h5>
                            </div>
                            <div class="row pills">
                                <ul>
                                <li>
                                    <span class="badge rounded-pill">
                                    Technology</span>
                                </li>
                                <li>
                                    <span class="badge rounded-pill">
                                    Health</span>
                                </li>
                                <li>
                                    <span class="badge rounded-pill">
                                    Business</span>
                                </li>
                                <li>
                                    <span class="badge rounded-pill">
                                    Business</span>
                                </li>
                                <li>
                                    <span class="badge rounded-pill">
                                    Business</span>
                                </li>
                                <li>
                                    <span class="badge rounded-pill">
                                    Business</span>
                                </li>
                                <li>
                                    <span class="badge rounded-pill">
                                    Business</span>
                                </li>
                                </ul>
                            </div>
                        </div>

                        <div class="footer">
                                <ul>
                                <li>
                                    <span>&copy; 2021</span>
                                </li>
                                <li>
                                    <span>Status</span>
                                </li>
                                </ul>
                        </div>
                        </div>
                    </div>
                    </div>
            </div>
        </div>
        `
       
    }


}



