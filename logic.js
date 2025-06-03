
export const alertsLogic = `
// Logic for alerts
const alerts = (message, status) => {
  const viewWrapper = document.querySelector(".viewWrapper")
  const view = viewWrapper.querySelector(".view")
  status === "fail" ? view.classList.add("bg-rose-600") : view.classList.add("bg-emerald-600")
  const alertMessage = viewWrapper.querySelector(".alertMessage")
  alertMessage.textContent = message
  const closeAlert = document.querySelector(".closeAlert")
  closeAlert.addEventListener("click", () => {
    view.classList.remove("hidden")
  })
}
`

