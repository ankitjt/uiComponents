import { alertsLogic } from "./logic.js"

const copyCode = document.querySelectorAll( ".copyCode" )

copyCode.forEach( copyIcon =>
{
  copyIcon.addEventListener( "click", () =>
  {
    const parentComponent = copyIcon.closest( ".component" )
    const targetNode = parentComponent.querySelector( ".wrapper .ui" )
    const toolTip = parentComponent.querySelector( ".toolTip" )

    setTimeout( () =>
    {
      toolTip.innerHTML = `Code Copied !!`
      toolTip.classList.remove( "hidden" )
      copyIcon.classList.add( "bg-emerald-600", "text-slate-200" )
    }, 100 )
    setTimeout( () =>
    {
      toolTip.innerHTML = ""
      toolTip.classList.add( "hidden" )
      copyIcon.classList.remove( "bg-emerald-600", "text-slate-200" )
    }, 2000 )

  } )
} )
// navigator.clipboard.writeText( targetNode.outerHTML )



Prism.plugins.NormalizeWhitespace.setDefaults( {
  "remove-trailing": true,
  "remove-indent": true,
  "break-lines": 80,
  "remove-initial-line-feed": false,
  "tabs-to-spaces": 4,
  "spaces-to-tabs": 4
} )

let getCode = document.querySelectorAll( ".getCode" )
getCode.forEach( showCode =>
{

  showCode.addEventListener( "click", () =>
  {
    const component = showCode.closest( ".component" )
    getCode.forEach( removeBg =>
    {
      removeBg.classList.remove( "bg-emerald-600" )
    } )
    const copyButton = component.querySelector( ".copyButton" )
    copyButton.classList.remove( 'right-24' )
    copyButton.classList.add( "-z-10", "right-0" )

    const htmlBlockWrapper = component.querySelector( ".htmlBlockWrapper" )
    const componentType = component.querySelector( ".wrapper" )
    const javascriptBlockWrapper = component.querySelector( ".javascriptBlockWrapper" )
    const viewWrapper = component.querySelector( ".viewWrapper" )
    const htmlBlock = component.querySelector( ".htmlBlock" )
    const javascriptBlock = component.querySelector( ".javascriptBlock" )
    const codeType = showCode.dataset.code


    if ( codeType === "getHtml" )
    {
      showCode.classList.add( "bg-emerald-600" )
      htmlBlockWrapper.classList.toggle( "-right-[100vw]" )
      htmlBlockWrapper.classList.toggle( "right-0" )
      javascriptBlockWrapper.classList.add( "-right-[100vw]" )
      javascriptBlockWrapper.classList.remove( "right-0" )
      htmlBlock.textContent = viewWrapper.outerHTML
      setTimeout( () =>
      {
        copyButton.classList.add( "right-24" )
        copyButton.classList.remove( "-z-10", "right-0" )
        copyButton.addEventListener( "click", copyCodeFunction( "getHtml" ) )

      }, 200 )
    }
    else if ( codeType === "getJavascript" )
    {
      showCode.classList.add( "bg-emerald-600" )
      htmlBlockWrapper.classList.add( "-right-[100vw]" )
      htmlBlockWrapper.classList.remove( "right-0" )
      javascriptBlockWrapper.classList.toggle( "-right-[100vw]" )
      javascriptBlockWrapper.classList.toggle( "right-0" )
      setTimeout( () =>
      {
        copyButton.classList.add( "right-24" )
        copyButton.classList.remove( "-z-10", "right-0" )
        copyButton.addEventListener( "click", copyCodeFunction( "getJavascript" ) )
      }, 200 )

      if ( componentType.getAttribute( 'id' ) === 'alerts' ) javascriptBlock.textContent = alertsLogic
    }
  } )
} )

const copyCodeFunction = blockType =>
{
  if ( blockType === "getHtml" ) console.log( 'You got HTML code.' )
  if ( blockType === "getJavascript" ) console.log( 'You got Javascript code.' )
}