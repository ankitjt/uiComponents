import { alertsLogic } from "./logic.js"
import './animate.js'

Prism.plugins.NormalizeWhitespace.setDefaults({
  "remove-trailing": true,
  "remove-indent": true,
  "break-lines": 80,
  "remove-initial-line-feed": false,
  "tabs-to-spaces": 4,
  "spaces-to-tabs": 4
})

const showCodeButtons = document.querySelectorAll(".getCodeButtons")
showCodeButtons.forEach(codeButton => {
  codeButton.addEventListener("click", () => {

    showCodeButtons.forEach(button => { button.classList.remove("bg-emerald-600") })

    const component = codeButton.closest(".component")

    const componentName = component.querySelector(".componentName")
    componentName.classList.add("text-slate-500")
    componentName.classList.remove("text-white")

    const codeType = codeButton.dataset.code

    codeButton.classList.add("bg-emerald-600", "text-white")

    const copyButton = component.querySelector(".copyButton")
    copyButton.classList.remove("right-24")
    copyButton.classList.add("right-0", "-z-10")
    copyButton.textContent = "Copy"

    const codeBlock = component.querySelector(".codeBlock")
    codeBlock.innerHTML = ""
    codeBlock.classList.add("-right-[100vw]")
    codeBlock.classList.remove("right-0")

    resetView(codeBlock, copyButton, codeButton, componentName)
    showCode(component, codeType, copyButton, codeBlock)
  })
})

const resetView = (codeBlock, copyButton, codeButton, componentName) => {

  componentName.addEventListener("click", () => {

    componentName.classList.remove("text-slate-500")
    componentName.classList.add("text-white")

    codeBlock.innerHTML = ""
    codeBlock.classList.add("-right-[100vw]")
    codeBlock.classList.remove("right-0")

    copyButton.classList.remove("right-24")
    copyButton.classList.add("right-0", "-z-10")
    copyButton.textContent = "Copy"

    codeButton.classList.remove("bg-emerald-600", "text-white")

  })
}

const showCode = (component, codeType, copyButton, codeBlock) => {
  const wrapper = component.querySelector(".wrapper")
  const showLogic = wrapper.getAttribute("id")
  const pre = document.createElement("pre")
  const code = document.createElement("code")
  code.classList.add("fillCode")

  codeBlock.classList.add("right-0")
  codeBlock.classList.remove("-right-[100vw]")

  if (codeType === "getHtml") {
    const viewWrapper = component.querySelector(".viewWrapper")
    pre.classList.add("language-html")
    code.textContent = viewWrapper.outerHTML
    pre.appendChild(code)
    codeBlock.appendChild(pre)
    copyCode(component, codeType, copyButton)
  }
  else if (codeType === "getJavascript") {
    pre.classList.add("language-javascript")
    copyCode(component, codeType, copyButton)
    if (showLogic === "alerts") {
      code.textContent = alertsLogic
      pre.appendChild(code)
      codeBlock.appendChild(pre)
    }
  }
}

const copyCode = (component, codeType, copyButton) => {
  setTimeout(() => {
    copyButton.classList.add("right-24")
    copyButton.classList.remove("right-0", "-z-10")
  }, 100)

  copyButton.addEventListener("click", () => {
    copyButton.textContent = "Copied"
    copyAction(component, codeType)
  }, { once: true })
}

const copyAction = (component, codeType) => {
  if (codeType === "getHtml") {
    const viewWrapper = component.querySelector(".viewWrapper")
    navigator.clipboard.writeText(viewWrapper.outerHTML)
  }
  if (codeType === "getJavascript") {
    const wrapper = component.querySelector(".wrapper")
    const wrapperType = wrapper.getAttribute("id")
    if (wrapperType === "alerts") navigator.clipboard.writeText(alertsLogic)
  }
}
