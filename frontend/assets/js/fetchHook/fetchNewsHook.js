
// CRUD FOR NEWS
export async function getAllNewsResponse(){
    const response =  await fetch(`https://61924d4daeab5c0017105f1a.mockapi.io/credo/v1/news`,{
         method:'GET',
         headers:{
                 'Content-Type': 'application/json'
             } 
     });
     return response.json();
 }

 // FETCH NEWS BY NEWSID 
export async function getSingleNewsResponse(newsId){
    const response =  await fetch(`https://61924d4daeab5c0017105f1a.mockapi.io/credo/v1/news/${newsId}`,{
         method:'GET',
         headers:{
                 'Content-Type': 'application/json'
             } 
     });
     return response.json();
 }

 // CREATE NEWS  (POST)
export async function createNewsResponse(formData){
      const response =  await fetch('https://61924d4daeab5c0017105f1a.mockapi.io/credo/v1/news',
           {
            method:'POST',
            headers:{
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(formData),
         });
    return response.json();
        
}

 // UPADTE NEWS BY NEWSID (PUT)
export async function updateNewsResponse(newsId,formData){
    const response =  await fetch(`https://61924d4daeab5c0017105f1a.mockapi.io/credo/v1/news/${newsId}`,
         {
          method:'PUT',
          headers:{
              'Content-Type': 'application/json'
          },
          body: JSON.stringify(formData),
       });
  return response.status;
      
}

 // DELETE NEWS BY NEWSID (DELETE)
export async function deleteNewsByIdResponse(newsId){
    const response =  await fetch(`https://61924d4daeab5c0017105f1a.mockapi.io/credo/v1/news/${newsId}`,{
         method:'DELETE',
         headers:{
            'Content-Type': 'application/json'
         } 
     });
     return response.status;
 }




 //IMAGES SECTION
 //FETCH IMAGE FROM NEWS ID
 export async function getImageByNewsId(newsId){
    const response =  await fetch(`https://61924d4daeab5c0017105f1a.mockapi.io/credo/v1/news/${newsId}/images`,
      {
      method:'GET',
      headers:{
          'Content-Type': 'application/json'
      },
  });
  return response.json();
}

 //UPLOAD IMAGE TO SPECIFIC NEWS ID
 export async function uploadImageToNewsById(newsId,formData){
      const response =  await fetch(`https://61924d4daeab5c0017105f1a.mockapi.io/credo/v1/news/${newsId}/images`,
        {
        method:'POST',
        headers:{
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData),
    });
    return response.json();
 }
