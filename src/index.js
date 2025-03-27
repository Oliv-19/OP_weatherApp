import './index.css'
import apiHandler from './apiHandler'
import formHandler from './formHandler'
import DomManager from './domManager'

const api = new apiHandler()
const form = new formHandler()
const formElem = document.querySelector('.searchForm')

formElem.addEventListener('submit', handle)

function apiError(error){
  const input = document.querySelector('.input')
  input.setCustomValidity(`${error} not found`);
  input.reportValidity();
}

async function handle(e) {
  e.preventDefault()
  let search = await form.handleSearch()
  if(search != false){
    let response = await api.fetchApi(search).then((res)=>{
      let responseJson = api.getInfo(res) 
      new DomManager(responseJson)

    }).catch((error)=>{
      console.log(error)
      apiError(search)
    })
  }
  
}
(async function init(){
  let initResponse = await api.fetchApi('london')
  let initResponseJson = api.getInfo(initResponse) 
  new DomManager(initResponseJson)
}())