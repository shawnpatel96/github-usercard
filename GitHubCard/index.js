/* Step 1: using axios, send a GET request to the following URL 
           (replacing the palceholder with your Github name):
           https://api.github.com/users/<your name>
*/
axios.get("https://api.github.com/users/shawnpatel96")
.then(response =>{
  console.log(response)
    const cards = document.querySelector('.cards')
    const myCard = cardCreator(response.data);
    cards.append(myCard);
})

.catch( error => {
  console.log("no data ", error)
})

setTimeout(function(){
  axios.get("https://api.github.com/users/shawnpatel96/followers")
  .then(response=>{
    response.data.map(items=>{
      followersArray.push(items.login)
    })
  })
  followersArray.forEach(users=> {
    axios.get(`https://api.github.com/users/${users}`)
    .then(res=>{
      let cards = document.querySelector('.cards')
      let myCard = cardCreator(res.data);
      cards.append(myCard);
    })
  })
}, 500);

const followersArray = ['tetondan', 'dustinmyers', 'justsml', 'luishrd', 'bigknell'];

/* Step 4: Pass the data received from Github into your function, 
           create a new component and add it to the DOM as a child of .cards  (cards is the big parent in html)
*/





//  console.log(cards);
/* Step 5: Now that you have your own card getting added to the DOM, either 
          follow this link in your browser https://api.github.com/users/<Your github name>/followers 
          , manually find some other users' github handles, or use the list found 
          at the bottom of the page. Get at least 5 different Github usernames and add them as
          Individual strings to the friendsArray below.
          
          Using that array, iterate over it, requesting data for each user, creating a new card for each
          user, and adding that card to the DOM.
*/


followersArray.forEach(user =>{
axios.get(`https://api.github.com/users/${user}`)
.then(response=>{
  const cards=document.querySelector('.cards');
  const newFollower=cardCreator(response.data);
  cards.append(newFollower);

})
})

/* Step 3: Create a function that accepts a single object as its only argument,
          Using DOM methods and properties, create a component that will return the following DOM element:

<div class="card">
  <img src={image url of user} />
  <div class="card-info">
    <h3 class="name">{users name}</h3>
    <p class="username">{users user name}</p>
    <p>Location: {users location}</p>
    <p>Profile:  
      <a href={address to users github page}>{address to users github page}</a>
    </p>
    <p>Followers: {users followers count}</p>
    <p>Following: {users following count}</p>
    <p>Bio: {users bio}</p>
  </div>
</div>

*/
function cardCreator(object){
  // Creating Elements
  const newImage = document.createElement('img');
  const cardParent = document.createElement('div');     // Main Parent    
  const cardInfo = document.createElement('div');    
  const nameInfo = document.createElement('h3');      
  const usernameInfo = document.createElement('p'); 
  const link= document.createElement('a')
  // P elements with no class name
  const locationParagraph = document.createElement('p');
  const profileParagraph = document.createElement('p');
  const followersParagraph = document.createElement('p');
  const followingParagraph = document.createElement('p');
  const bioParagraph = document.createElement('p');

  // Assigning class Names
  newImage.src= object.avatar_url;
  cardParent.classList.add('card');                     // Main parent given class name of 'card'                
  cardInfo.classList.add('card-info');               
  nameInfo.classList.add('name');                    
  usernameInfo.classList.add('username');  

  //Appending Children to Parent
  cardParent.append(newImage);
  cardParent.append(cardInfo);
  cardInfo.append(nameInfo);
  cardInfo.append(usernameInfo);
  cardInfo.append(locationParagraph);
  cardInfo.append(profileParagraph);
  cardInfo.append(followersParagraph);
  cardInfo.append(followingParagraph);
  cardInfo.append(bioParagraph);

  //Text Content
  newImage.src= object.avatar_url;
  nameInfo.textContent=object.name;
  usernameInfo.textContent=object.login;
  locationParagraph.textContent=`Location: ${object.location}`;
  profileParagraph.textContent=object.html_url;
  followersParagraph.textContent= `Followers: ${object.followers}`;
  followingParagraph.textContent=`Following: ${object.following}`;
  bioParagraph.textContent=object.bio;




  return cardParent
}
// console.log(cardCreator);

/* List of LS Instructors Github username's: 
  tetondan
  dustinmyers
  justsml
  luishrd
  bigknell
*/
