var pass;

db.collection('pass').doc('passkey').get().then(function(doc) {
    if (doc.exists) {
        while(pass != doc.data().key){
            pass = prompt("Enter the password");
        };
    } else {
        // doc.data() will be undefined in this case
        alert("No such document!");
    }
}).catch(function(error) {
    alert("Error getting document:", error);
});

var deletebtn = document.getElementById('delete')

let postCollection = document.querySelector("#posts-collection");

function createPost(post, date) {
  let div = document.createElement("div");
  div.setAttribute("class", "card-body");

  let h5 = document.createElement("h5");
  h5.setAttribute("class", "card-title");
  let p = document.createElement("p");
  p.setAttribute("class", "card-text");

  h5.textContent = date;
  p.textContent = post;

  div.appendChild(h5);
  div.appendChild(p);

  postCollection.appendChild(div);
}

// Get Posts
function getPosts() {
  db.collection("suggestion")
    .get()
    .then(snapshot => {
      snapshot.docs.forEach(docs => {
        createPost(
          docs.data().entry,
          docs.data().dt,
        );
      });
    })
    .catch(err => {
      console.log(err);
    });
}

getPosts();

function deletePosts(){
    db.collection("suggestion")
    .get()
    .then(snapshot => {
      snapshot.docs.forEach(docs => {
        db.collection("suggestion").doc(docs.data().dt).delete().then(function() {
            deletebtn.textContent = 'successful';
            deletebtn.style.cssText = `background-color : #19a74b; 
                                       border-color: #19a74b;`;
        }).catch(function(error) {
            deletebtn.textContent = 'error';
            deletebtn.style.cssText = `background-color : #dc5050; 
                                       border-color: #dc5050;`;
        });
      });
    });
}

deletebtn.onclick = deletePosts;

