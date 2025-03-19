import { format } from "date-fns";
export default class DomManager{
    constructor(jsonResponse){
        this.jsonResponse = jsonResponse
        //this.daysTemplate= document.querySelector('#daysTemplate').content.cloneNode(true)
        this.rightSide= document.querySelector('#rightSide')
        this.cityDiv= document.querySelector('#cityDiv')
        this.daysSection= document.querySelector('#days')
        this.unitGroupBtn = document.querySelector('.unitGroupBtn')
        this.init()
    }
    init(){
        this.renderLeftSide()
        this.renderRightSide()
        this.renderDays()
        this.unitGroupBtn.addEventListener('click', this.changeUnitGroup)
    } 
    renderRightSide(){
        const humidity = document.querySelector('.humidity')
        const windspeed = document.querySelector('.windspeed')
        const pressure = document.querySelector('.pressure')
        const datetime = document.querySelector('.datetime')
        const sunrise = document.querySelector('.sunrise')
        const sunset = document.querySelector('.sunset')

        humidity.textContent= this.jsonResponse.humidity
        windspeed.textContent= this.jsonResponse.windspeed
        pressure.textContent= this.jsonResponse.pressure
        datetime.textContent= this.jsonResponse.datetime
        sunrise.textContent= this.jsonResponse.sunrise
        sunset.textContent= this.jsonResponse.sunset
    }
    renderLeftSide(){
        const cityName = document.querySelector('.cityName')
        const temp = document.querySelector('.temp')
        const feelsLike = document.querySelector('.feelsLike')
        const conditions = document.querySelector('.conditions')
        const icon = document.querySelector('.icon')

        cityName.textContent= this.jsonResponse.address
        temp.textContent=`${this.jsonResponse.temp} ${this.jsonResponse.tempType}`
        feelsLike.textContent= `${this.jsonResponse.feelslike} ${this.jsonResponse.tempType}`
        conditions.textContent= this.jsonResponse.conditions
        icon.src= './icons/'+ this.jsonResponse.icon
    }
    renderDays(){
        this.daysSection.textContent= ''
        for(let i=1; i< 8; i++){
            let daysTemplate= document.querySelector('#daysTemplate').content.cloneNode(true)
            let day = daysTemplate.querySelector('.day')
            let date = daysTemplate.querySelector('.date')
            let dayTemp = daysTemplate.querySelector('.dayTemp')
            let dayCondition = daysTemplate.querySelector('.dayCondition')
            let dayIcon = daysTemplate.querySelector('.dayIcon')
            
            day.textContent= format((this.jsonResponse.days.at(i).datetime+ " 00:00:00"), "eeee")
            date.textContent= this.jsonResponse.days.at(i).datetime
            dayTemp.textContent= `${this.jsonResponse.days.at(i).temp} ${this.jsonResponse.tempType}`
            dayCondition.textContent= this.jsonResponse.days.at(i).conditions
            dayIcon.src= './icons/'+ this.jsonResponse.days.at(i).icon+'.png'
            
            
            this.daysSection.append(daysTemplate)
        } 
    }
    calcCelsius(temperature){
        return ((temperature - 32) * 5/9).toFixed(2)
    }
    calcFarenheit (temperature){
        return ((temperature * 9/5) + 32 ).toFixed(2)
    }
    changeUnitGroup=()=>{
        if(this.jsonResponse.tempType =='°C'){
            this.jsonResponse.temp = this.calcFarenheit(this.jsonResponse.temp)
            this.jsonResponse.feelslike = this.calcFarenheit(this.jsonResponse.feelslike)
            this.jsonResponse.days.forEach(day => {
                day.temp= this.calcFarenheit(day.temp)
            });
            this.jsonResponse.tempType = '°F'  
        }else{
            this.jsonResponse.temp = this.calcCelsius(this.jsonResponse.temp)
            this.jsonResponse.feelslike = this.calcCelsius(this.jsonResponse.feelslike)
            this.jsonResponse.days.forEach(day => {
                day.temp= this.calcCelsius(day.temp)
            });
            this.jsonResponse.tempType = '°C'  
        }
        this.renderLeftSide()
        this.renderDays()
    }
}