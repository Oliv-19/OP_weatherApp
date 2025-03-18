export default class formHandler{
    constructor(){
        this.form = document.querySelector('.searchForm')
        
    }

    handleSearch(){
        
        //e.preventDefault()
        const formElem = document.querySelector('.searchForm')
        const form= new FormData(formElem)
        console.log(form.get('search'))
        return form.get('search')
        
    }

}