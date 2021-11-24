import Home from './views/Home/Home.js';
import fetchAllNews from './views/Home/helper/fetchAllNews.js';

import NewsDetail from './views/NewsDetail/NewsDetail.js';

import CreateNews from './views/CreateNews/CreateNews.js';
import handlecreateNews from './views/CreateNews/helper/postFetch.js';

import EditNews from './views/EditNews/EditNews.js';
import {handleUpdateNews} from './views/EditNews/helper/updateFetch.js';


// SINGLE PAGE ROUTING TECHNIQUE
// ReqExp("^"+ path.replace(/\//g, "\\/")
//                     .replace(/:\w+/g, "(.+)") + "$");

function pathToRegex(path){
   return ("^"+ path.replace(/\//g, "\\/").replace(/:\w+/g, "(.+)") + "$");
}

function getParams(match){
    if (!match.result) return ''
    const values = match.result.slice(1);
    const keys = Array.from(match.route.path.matchAll(/:(\w+)/g)).map(result => result[1]);

    return Object.fromEntries(keys.map((key,i) => {
        return [key, values[i]];
    }))
}

//HELPER FUNCTION TO NAVIGATE THE PAGE USING THE HISTORY API
function navigateTo(url){
    history.pushState(null,null,url);
    router();
}



const router = async () => {

    const routes = [
        {path:"/", view: Home},
        {path:"/news/:id", view: NewsDetail},
        {path:"/create", view: CreateNews},
        {path:"/edit/:id", view: EditNews},
    ]

    //MAP THE FRONTEND ROUTES FOR MATCH
    const routeMatches = routes.map(route => {
        return {
            route: route,
            result: location.pathname.match(pathToRegex(route.path))
        }
    });

    // find the route that is not null
    let match = routeMatches.find(routeMatch => routeMatch.result !== null);

    // if match route is null return to routes[0] - Home page
    if(!match){
        match = {
            route: routes[0],
            result: [location.pathname]
        };
    }
 
    // get the view from the routes that match
    const view = new match.route.view(getParams(match));
    
    // Inserting the html inside the app-root element
    document.querySelector('#app-root').innerHTML = await view.getHTMLContent();
   

    if(document.querySelector('#list--all')){
        const news__listing_element = document.querySelector('#list--all');
        await fetchAllNews(news__listing_element,navigateTo);
    }

     //News Detail - Selecting the element to display the content fetched
    if(document.querySelector('#single__display')){
        const news_detail_element = document.querySelector('#single__display');
        await view.getSingleNews(news_detail_element,navigateTo)
    }

    //Create News - Adding Event listener to the create news form 
    if(document.getElementById('create_news_form')){
        document.getElementById('create_news_form').addEventListener('submit',handlecreateNews);
    }

    //Edit News -  AddingEvent listener to the edit news form 
    if(document.getElementById('edit_or_updte_news_form')){
        document.getElementById('edit_or_updte_news_form').addEventListener('submit',handleUpdateNews);
    }
  
  
}




//ADDED EVENT LISTENER TO WINDOW FOR 'pop state'
window.addEventListener("popstate",router);


// ADDING EVENT LISTENER TO THE DOM
document.addEventListener("DOMContentLoaded", () => {
    console.log('DOM LOADED');
    //ADDED AN EVENT LISTENER TO THE BODY TO FIND LINK THAT CONTAIN 'data-link'
    //PREVENT DEFAULT EVENT
    //BEFORE RUNNING THE 'navigateTo' FUNCTION
    document.body.addEventListener("click", e => {
        if(e.target.matches('[data-link]')){
            e.preventDefault();
            navigateTo(e.target.href);
        }
    });

    
    router();
});