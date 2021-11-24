import GeneralView from "../index.js";
import {displayEditForm} from './helper/updateFetch.js';

export default class extends GeneralView{
    constructor(params){
        super(params);
        this.setTitlePage('Edit News');

    
    }

    async getHTMLContent(){
        const newsId = this.params.id;
        return displayEditForm(newsId);
       
    }

    

    

}



