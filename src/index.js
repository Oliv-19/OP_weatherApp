import './index.css'
import apiHandler from './apiHandler'
import formHandler from './formHandler'
import DomManager from './domManager'

const api = new apiHandler()
const form = new formHandler()
const formElem = document.querySelector('.searchForm')

DomManager.renderLoadingScreen()
formElem.addEventListener('submit', handle)
async function handle(e) {
  e.preventDefault()
  let search = form.handleSearch()
  DomManager.renderLoadingScreen()
  if (search) {
      try {
        let response = await api.fetchApi(search)
        if (!response) {
          console.error("No data returned from API")
          new DomManager(null)
          return
        }
        let responseJson = api.getInfo(response)
        new DomManager(responseJson)
      } catch (error) {
        console.error("Error during form submission")
      }
  } else {
      console.warn("Invalid search input.")
  }
}
(async function init(){
  let initResponse = await api.fetchApi('london')
  let initResponseJson = api.getInfo(initResponse)
  new DomManager(initResponseJson)
}())