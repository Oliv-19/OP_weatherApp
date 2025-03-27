import './index.css'
import apiHandler from './apiHandler'
import formHandler from './formHandler'
import DomManager from './domManager'

const api = new apiHandler()
const form = new formHandler()
const formElem = document.querySelector('.searchForm')

formElem.addEventListener('submit', handle)

async function handle(e) {
  e.preventDefault();
  let search = form.handleSearch();
  if (search) {
      try {
        let response = await api.fetchApi(search);
        if (!response) {
            console.error("No data returned from API");
            return;
        }
        let responseJson = api.getInfo(response);
        new DomManager(responseJson);
      } catch (error) {
        console.error("Error during form submission:", error);
      }
  } else {
      console.warn("Invalid search input.");
  }
}
(async function init(){
  let initResponse = await api.fetchApi('london')
  let initResponseJson = api.getInfo(initResponse)
  new DomManager(initResponseJson)
}())