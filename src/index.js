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
  let search = form.handleSearch()
  
  let response = await api.fetchApi(search)
  let responseJson = api.getInfo(response) 
  const domManager = new DomManager(responseJson)
 
  
}
