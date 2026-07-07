const url = new URL(location.href); //this is a way to make a url object and this function is the intrinsic of javascript.
//location.href will make a string based on the url.
//console.log(`happy ${location.href}`);
const movieId = url.searchParams.get("id")
const movieTitle = url.searchParams.get("title")

//console.log(movieTitle)
let APILINK   ='https://38de3f25-fb84-4790-bbef-0ff681d3f024-00-1no2u1wappe47.sisko.replit.dev/api/v1/reviews/';

const main = document.getElementById("section");
const title = document.getElementById("title");

title.innerText = movieTitle;//using innerHTML we can put any HTML inside the id but using innerText we can only put text.

const div_new = document.createElement('div');
div_new.innerHTML =  `
  <div class="row">
    <div class="column">
      <div class="card">
        New Review
        <p><strong>Review: </strong>
          <input type="text" id="new_review" value="">
        </p>
        <p><strong>User: </strong>
          <input type="text" id="new_user" value="">
        </p>
        <p><a href="#" onclick="saveReview('new_review','new_user')">💾</a>
        </p>
        </div>
        </div>
        </div>
`
main.appendChild(div_new)

returnReviews(APILINK);

function returnReviews(url){
  fetch(url+"movie/"+movieId).then(res => res.json()) //by default fetch is a get request.
  .then(function(data){
  console.log(`happy`,data);
  data.forEach(review =>{
//Now in the following I have represented the data using a different way as compared to that in the script.js
    const div_card=document.createElement('div');
    div_card.innerHTML = `
    <div class="row">
      <div class="column">
        <div class="card" id="${review._id}">
          <p><strong>Review: </strong>${review.review}</p>
          <p><strong>User: </strong>${review.user}</p>
          <p><a class="pencil" href="#" onclick="editReview('${review._id}','${review.review}','${review.user}')">✏️</a><a class="trashcan" href="#" onclick="deleteReview('${review._id}')">🗑</a></p>                                                                 </div>                                                       </div>
</div>
    `;
    main.appendChild(div_card);
  });
});
}

function editReview( id , review , user ) {
  //console.log(review)
  const element = document.getElementById(id);
  //console.log(element)
  const reviewInputId = "review" + id //we are doing this so that we can get a unique reviewId for every.
  const userInputId = "user" + id

  element.innerHTML = `
  <p><strong>Review: </strong><input type="text" id = "${reviewInputId}" value="${review}"></p>
  <p><strong>User: </strong> <input type="text" id="${userInputId}" value="${user}"></p>
  <p><a href="#" onclick="saveReview('${reviewInputId}','${userInputId}','${id}',)">💾</a></p>
  
  `
}

function saveReview(reviewInputId , userInputId , id="") {
  const review = document.getElementById(reviewInputId).value;
  const user = document.getElementById(userInputId).value;

  if(id) {    //this means that we have passed an id and so we have to edit that review.
    fetch(APILINK+id,{ //fetch is a js command that is used to send a https request to a url.
      method: 'PUT',
      headers: {
        'Accept': 'application/json , text/plain, */*',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({"user":user , "review":review}) //JSON.stringify command converts a js object to a string.
    }).then(res => res.json())
    .then(res =>{
      console.log(res)
      location.reload(); //this is a js command to reload the website.
    });
  }else{  //this would mean that we haven't passed an id and therefore have made a new review therefore fetch https request would be POST
    fetch(APILINK + "new",{
      method: 'POST',
      headers: {
        'Accept': 'application/json , text/plain , */*',
        'Content-Type': 'application/json'
      },
      body:JSON.stringify({"user":user , "review": review, "movieId": movieId})
    }).then(res => res.json())
    .then(res=>{
      console.log(res)
      location.reload();
    });
  }
  
}

function deleteReview(id) {
  fetch(APILINK + id , {
    method: 'DELETE'
  }).then(res => res.json())
  .then(res =>{
    console.log(res)
    location.reload();
  });
}

