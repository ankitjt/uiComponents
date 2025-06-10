const myButton = document.querySelector( ".myButton" )
const initial = document.querySelector( ".initial" )
const loadingDots = document.querySelector( ".loadingDots" )
const success = document.querySelector( ".success" )
let isAnimating = false

const show = el =>
{
  el.classList.remove( "hidden" )
  setTimeout( () =>
  {
    el.classList.add( "flex" )
    el.classList.remove( "opacity-0", "scale-75" )
    el.classList.add( "opacity-100", "scale-100" )
  }, 10 )
}

const hide = el =>
{
  el.classList.remove( "opacity-100", "scale-100" )
  el.classList.add( "opacity-0", "scale-75" )
  setTimeout( () =>
  {
    el.classList.remove( "flex" )
    el.classList.add( "hidden" )
  }, 700 )
}

myButton.addEventListener( "click", () =>
{
  if ( isAnimating ) return
  isAnimating = true
  hide( initial )
  show( loadingDots )

  setTimeout( () =>
  {
    hide( loadingDots )
    show( success )

    setTimeout( () =>
    {
      hide( success )
      show( initial )
      isAnimating = false

    }, 5000 )
  }, 3000 )
} )

