export default class formHandler{
    idk(){
        const input = document.querySelector('.input')
        input.addEventListener('input', ()=>{
            input.setCustomValidity('');
            input.reportValidity();
        })
    }

    async handleSearch(){
        const input = document.querySelector('.input')
        let isAlphabetic = Array.from(input.value).every((char) =>
            /[A-Za-z]/.test(char));

        if(isAlphabetic){
            this.idk()
            return input.value
        }
        input.setCustomValidity("Enter a valid country");
        input.reportValidity();
        return false  
        
        
    }

}