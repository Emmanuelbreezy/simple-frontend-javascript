
// CRUD FOR COMMENT

 // FETCH ALL COMMENT BY NEWSID
 export async function getCommentByNewsIdResponse(newsId){
    const response =  await fetch(`https://61924d4daeab5c0017105f1a.mockapi.io/credo/v1/news/${newsId}/comments`,{
         method:'GET',
         headers:{
                 'Content-Type': 'application/json'
             } 
     });
     return response.json();
 }

 // ADD COMMENT TO NEWSID
 export async function addCommentToNewsIdResponse(newsId,data){
    const response =  await fetch(`https://61924d4daeab5c0017105f1a.mockapi.io/credo/v1/news/${newsId}/comments`,{
         method:'POST',
         headers:{
                 'Content-Type': 'application/json'
             },
        body: JSON.stringify(data)
     });
     return response.json();
 }

 
  // UPDATE COMMENT TO COMMENTID & NEWSID
  export async function updateCommentByIdResponse(newsId,commentId,formData){
    const response =  await fetch(`https://61924d4daeab5c0017105f1a.mockapi.io/credo/v1/news/${newsId}/comments/${commentId}`,{
         method:'PUT',
         headers:{
               'Content-Type': 'application/json'
             },
        
        body: JSON.stringify(formData),
        
     });
     return response.json();
 }

   // DELETE COMMENT TO COMMENTID & NEWSID
   export async function deleteCommentByIdResponse(newsId,commentId){
    const response =  await fetch(`https://61924d4daeab5c0017105f1a.mockapi.io/credo/v1/news/${newsId}/comments/${commentId}`,{
         method:'DELETE',
     });
     return response.status;
 }