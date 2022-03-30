document.addEventListener('DOMContentLoaded', ()=>{
function fetchData() {
    fetch('index.json')
    .then(resp => resp.json())
    .then(data => renderQuotes(data))

  }

  function renderQuotes(data) {
      for (const q of data) {
//Find the container where we attach everything to
      const quoteUL = document.querySelector('#quote-list');
//Create all necessary elements
      const quoteLi = document.createElement('li');
      const blockQuote = document.createElement('blockquote');
      const p = document.createElement('p');
      const footer = document.createElement('footer');
      const br = document.createElement('br');
      const hr = document.createElement('hr')

      const dislikesBtn = document.createElement('button');



//Add appropriate classes and ids. Grab data and insert if needed.
      quoteLi.className = 'quote-card';          //for styling
      blockQuote.className = 'blockquote';       //for styling
      p.className = 'mb-0';                      //for styling
      footer.className = 'blockquote-footer';    //for styling
      quoteLi.dataset.id = q.id
//Grab data and insert it into created elements
      p.innerHTML = q.quote;
      footer.innerHTML = q.author;
//Append everything to main container
      blockQuote.append(p, footer, br, dislikesBtn, hr);
      quoteLi.append(blockQuote);
      quoteUL.append(quoteLi);


      dislikesBtn.innerHTML = 'Delete';
      dislikesBtn.className = 'btn-danger';  //for styling
      dislikesBtn.addEventListener('click', () => deleteQuote())


     function deleteQuote(){
        const url = `index.json/${q.id}`;
        const reqObj = { method: 'DELETE' };
        fetch(url, reqObj)
        .then( quoteLi.remove() )
      }



   } /*fin de function renderQuotes*/


      const form = document.querySelector('#new-quote-form');
      form.addEventListener('submit', (e)=>postQuote(e))
      function postQuote(e) {
          e.preventDefault();
          const newQuote = document.querySelector('#new-quote').value;
          const newAuthor = document.querySelector('#author').value;
          var lth = data.length+1; 
          console.log(lth);
          var obj = {"id": lth, "quote" : newQuote, "author" : newAuthor};
          console.log(obj);
          //const url = 'http://localhost:3000/quotes';
          /*const reqObj = {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
              quote: newQuote,
              author: newAuthor
            })
          }*/
          /*fetch(url, reqObj)
          .then(resp => resp.json())
          .then(quote => renderQuotes([quote]))*/
          data.push(obj); //  Hacer un push del objeto dentro del array
          console.log(data);
      }



      }



//Call the function that will automatically run renderQuote() also 
   fetchData();






})