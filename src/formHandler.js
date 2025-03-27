export default class formHandler{
    resetCustomValidity(){
        const input = document.querySelector('.input')
        input.addEventListener('input', ()=>{
            input.setCustomValidity('');
            input.reportValidity();
        })
    }

    handleSearch(){
        const input = document.querySelector('.input')
        let isAlphabetic = Array.from(input.value).every((char) =>
            /[A-Za-z]/.test(char));

        if(isAlphabetic){
            this.resetCustomValidity()
            return input.value
        }
        input.setCustomValidity("Invalid search input.");
        input.reportValidity();
        return false  
        
        
    }

}