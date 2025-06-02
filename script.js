const copyCode = document.querySelectorAll(".copyCode")

copyCode.forEach(copy => {
  copy.addEventListener("click", () => {
    let targetNode = copy.parentElement.parentElement.parentElement.children[ 1 ].children[ 0 ]
    let toolTip = copy.parentElement.parentElement.children[ 1 ]

    setTimeout(() => {
      toolTip.innerHTML = `Code Copied !!`
      copy.classList.add("bg-emerald-600", "text-slate-200")
    }, 100)
    setTimeout(() => {
      toolTip.innerHTML = ""
      copy.classList.remove("bg-emerald-600", "text-slate-200")
    }, 2000)

    navigator.clipboard.writeText(targetNode.outerHTML)
  })
})