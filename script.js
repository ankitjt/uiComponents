import { alertsLogic } from "./logic.js"

const copyCode = document.querySelectorAll(".copyCode")

copyCode.forEach(copyIcon => {
  copyIcon.addEventListener("click", () => {
    const parentComponent = copyIcon.closest(".component")
    const targetNode = parentComponent.querySelector(".wrapper .ui")
    const toolTip = parentComponent.querySelector(".toolTip")

    setTimeout(() => {
      toolTip.innerHTML = `Code Copied !!`
      toolTip.classList.remove("hidden")
      copyIcon.classList.add("bg-emerald-600", "text-slate-200")
    }, 100)
    setTimeout(() => {
      toolTip.innerHTML = ""
      toolTip.classList.add("hidden")
      copyIcon.classList.remove("bg-emerald-600", "text-slate-200")
    }, 2000)

    navigator.clipboard.writeText(targetNode.outerHTML)
  })
})

function formatHTML(html) {
  const tab = '  ' // 2 spaces
  let result = ''
  let indentLevel = 0

  html.split(/>\s*</).forEach((element, i) => {
    if (element.match(/^\/\w/)) indentLevel--

    result += `${tab.repeat(indentLevel)}<${element}>\n`

    if (element.match(/^<?\w[^>]*[^\/]$/) && !element.startsWith("input")) indentLevel++
  })

  return result.trim()
}


const testBtn = document.querySelector(".testBtn")
testBtn.addEventListener("click", () => {
  const parent = testBtn.closest(".component")
  const section1 = parent.querySelector(".section1")
  const section2 = parent.querySelector(".section2")
  section2.classList.toggle("-right-[100vw]")
  section2.classList.toggle("right-0")
  navigator.clipboard.writeText(section1.outerHTML)

  let copiedText = section1.outerHTML
  let formattedHTML = formatHTML(copiedText)
  const codeBlock = parent.querySelector(".userCode code")
  codeBlock.textContent = formattedHTML

  Prism.highlightElement(codeBlock)
})

Prism.plugins.NormalizeWhitespace.setDefaults({
  "remove-trailing": true,
  "remove-indent": true,
  "break-lines": 80,
  "remove-initial-line-feed": false,
  "tabs-to-spaces": 4,
  "spaces-to-tabs": 4
});

let getCode = document.querySelectorAll(".getCode")
getCode.forEach(showCode => {
  showCode.addEventListener("click", () => {
    getCode.forEach(removeBg => {
      removeBg.classList.remove("bg-emerald-600")
    })
    const component = showCode.closest(".component")
    const htmlBlockWrapper = component.querySelector(".htmlBlockWrapper")
    const componentType = component.querySelector(".wrapper")
    const javascriptBlockWrapper = component.querySelector(".javascriptBlockWrapper")
    const viewWrapper = component.querySelector(".viewWrapper")
    const htmlBlock = component.querySelector(".htmlBlock")
    const javascriptBlock = component.querySelector(".javascriptBlock")
    const codeType = showCode.dataset.code

    if (codeType === "getHtml") {
      showCode.classList.add("bg-emerald-600")
      htmlBlockWrapper.classList.toggle("-right-[100vw]")
      htmlBlockWrapper.classList.toggle("right-0")
      javascriptBlockWrapper.classList.add("-right-[100vw]")
      javascriptBlockWrapper.classList.remove("right-0")
      htmlBlock.textContent = viewWrapper.outerHTML
    }
    else if (codeType === "getJavascript") {
      showCode.classList.add("bg-emerald-600")
      htmlBlockWrapper.classList.add("-right-[100vw]")
      htmlBlockWrapper.classList.remove("right-0")
      javascriptBlockWrapper.classList.toggle("-right-[100vw]")
      javascriptBlockWrapper.classList.toggle("right-0")
      if (componentType.getAttribute('id') === 'alerts') javascriptBlock.textContent = alertsLogic
    }
  })
})