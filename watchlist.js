let moviesArr= []
const myList= document.getElementById("my-list")
if(localStorage.getItem("movieArr")){
   moviesArr =  JSON.parse(localStorage.getItem('movieArr'))
   console.log(moviesArr)
}
if(moviesArr.length > 0){
    let feed=""
    for( let movie of moviesArr){
       feed+=`
       <div class="post">
        <div>
        <img src="${movie.poster}" class="poster"></img>
        </div>
        
        <div class="info">
        <div class="header-txt">

        <h2 class="title">${movie.name}</h2>

        <span>${movie.rating}</span>
        </div>
        <div class="movie-info">
        <i class="fa-solid fa-circle-minus" data-remove="remove"
        data-id="${movie.id}"
        ></i>
        </div>
        <p class="plot" >${movie.plot}</p>
        </div>
        </div>
        `
       
    }
    myList.innerHTML= feed
}
document.addEventListener('click',(e)=>{
if(e.target.dataset.remove ==  'remove'){
    let movieDelete = e.target.parentElement.parentElement.parentElement
    moviesArr = moviesArr.filter(movie => movie.id != e.target.dataset.id)
    localStorage.setItem("movieArr",JSON.stringify(moviesArr))
    myList.removeChild(movieDelete)
   console.log(moviesArr)
}

})