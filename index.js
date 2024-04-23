const input = document.getElementById('input')
const btn=document.getElementById("klikni")
const inputEl= input.value
let apiKey = '65c98c14'
const container = document.getElementById("container")
let moviesArr=[]

btn.addEventListener('click',async ()=>{
  let feed=''
    const response = await fetch(`https://www.omdbapi.com/?apikey=${apiKey}&s=${input.value}`)
    const data = await response.json()
    const movie = data.Search
    if(data.Response == 'True'){
      for (let movies of movie){
          const fetching = await fetch(`https://www.omdbapi.com/?i=${movies.imdbID}&apikey=8b94b2b`)
          const movieData= await fetching.json()


        feed+=`<div class="post">
        <div>
        <img src="${movies.Poster}" class="poster"></img>
        </div>
        
        <div class="info">
        <div class="header-txt">

        <h2 class="title">${movies.Title}</h2>

        <span>⭐${movieData.imdbRating}</span>
        </div>
        <div class="movie-info">
        <span>${movieData.Runtime}</span>
        <span>${movieData.Genre}</span>
        <i class="fa-solid fa-circle-plus add" data-add="add"
        data-id="${movieData.imdbID}"
        ></i>
        </div>
        <p class="plot" >${movieData.Plot}</p>
        </div>
        </div>
        `
       }
       container.innerHTML=feed
    }
    else{
      container.textContent=`The movie you are looking for does not exist
      `
    }
  
})

document.addEventListener('click',(e)=>{
  if(e.target.dataset.add =='add'){
    
    const parentElements= e.target.parentElement.parentElement.children
    const postImgParent = e.target.parentElement.parentElement.parentElement.children
    const postImg= postImgParent[0].children
  
    const childrenElements = parentElements[0].children
 
      const movieObj={
        poster:postImg[0].src,
        name:childrenElements[0].textContent,
        rating:childrenElements[1].textContent,
        plot:parentElements[2].textContent,
        id:e.target.dataset.id


      }
      const movieExist = moviesArr.find(movie => movie.id == movieObj.id)
if(!movieExist){
  moviesArr.push(movieObj)
  localStorage.setItem('movieArr',JSON.stringify(moviesArr))
}

       }
})

if(localStorage.getItem('movieArr')){
 moviesArr  = JSON.parse(localStorage.getItem('movieArr'))
 console.log(moviesArr)
}




