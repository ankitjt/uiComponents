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

    navigator.clipboard.writeText( targetNode.outerHTML )
  } )
} )

function formatHTML ( html )
{
  const tab = '  ' // 2 spaces
  let result = ''
  let indentLevel = 0

  html.split( />\s*</ ).forEach( ( element, i ) =>
  {
    if ( element.match( /^\/\w/ ) ) indentLevel--

    result += `${ tab.repeat( indentLevel ) }<${ element }>\n`

    if ( element.match( /^<?\w[^>]*[^\/]$/ ) && !element.startsWith( "input" ) ) indentLevel++
  } )

  return result.trim()
}


const testBtn = document.querySelector( ".testBtn" )
testBtn.addEventListener( "click", () =>
{
  const parent = testBtn.closest( ".component" )
  const section1 = parent.querySelector( ".section1" )
  const section2 = parent.querySelector( ".section2" )
  section2.classList.toggle( "-right-[100vw]" )
  section2.classList.toggle( "right-0" )
  navigator.clipboard.writeText( section1.outerHTML )

  let copiedText = section1.outerHTML
  let formattedHTML = formatHTML( copiedText )
  const codeBlock = parent.querySelector( ".userCode code" )
  codeBlock.textContent = formattedHTML

  Prism.highlightElement( codeBlock )
} )
