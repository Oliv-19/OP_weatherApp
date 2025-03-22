import { format } from "date-fns";
export default class DomManager{
    constructor(jsonResponse){
        this.jsonResponse = jsonResponse
        this.body= document.querySelector('body')
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
        this.change()
        this.unitGroupBtn.addEventListener('click', this.changeUnitGroup)
    } 
    change(){
        let conditionType= ''
        let lastConditionType= ''
        const datetime= this.jsonResponse.datetime
        const sunset= this.jsonResponse.sunset
        const sunrise= this.jsonResponse.sunrise

        if(datetime > sunrise && datetime < sunset && datetime != '0:00:00'){
            lastConditionType= 'night'
            conditionType= 'sunny'
        }else {
            lastConditionType= 'sunny'
            conditionType= 'night'
        }
        this.stylePage(conditionType, lastConditionType)
    }
    stylePage(conditionType, lastConditionType){
        let litteBoxes = document.querySelectorAll('.littleBoxes')
        let daysBoxes = document.querySelectorAll('.daysBox')
        let cityNameWrapper = document.querySelector('.cityNameWrapper')
        
        this.body.classList.remove(lastConditionType+'_bg')
        this.body.classList.add(conditionType+'_bg')

        cityNameWrapper.classList.remove(lastConditionType+'_title')
        cityNameWrapper.classList.add(conditionType+'_title')

        daysBoxes.forEach((box)=>{
            box.classList.remove(lastConditionType+'_boxes')
            box.classList.add(conditionType+'_boxes')
        })
        litteBoxes.forEach((boxes)=>{

            boxes.classList.remove(lastConditionType+'_boxes')
            boxes.classList.add(conditionType+'_boxes')
        })
    }
    renderRightSide(){
        const humidity = document.querySelector('.humidity')
        const windspeed = document.querySelector('.windspeed')
        const cloudcover = document.querySelector('.cloudcover')
        const datetime = document.querySelector('.datetime')
        const sunrise = document.querySelector('.sunrise')
        const sunset = document.querySelector('.sunset')

        humidity.textContent= this.jsonResponse.humidity
        windspeed.textContent= this.jsonResponse.windspeed
        cloudcover.textContent= this.jsonResponse.cloudcover
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
    calcFarenheit (temperature){
        return ((temperature * 9/5) + 32 ).toFixed(1)
    }
    changeUnitGroup=()=>{
        const tempElem = document.querySelector('.temp')
        const feelsLikeElem = document.querySelector('.feelsLike')
        const daysTemp = document.querySelectorAll('.dayTemp')
        let temp= this.jsonResponse.temp
        let feelsLike= this.jsonResponse.feelslike
        
        if(this.jsonResponse.tempType =='°C'){
            this.jsonResponse.tempType = '°F'  
            this.unitGroupBtn.textContent = '°C'

            let farenheitTemp= this.calcFarenheit(temp)
            let farenheitFeelslike= this.calcFarenheit(feelsLike)

            tempElem.textContent= `${farenheitTemp} ${this.jsonResponse.tempType}`
            feelsLikeElem.textContent= `${farenheitFeelslike} ${this.jsonResponse.tempType}`
            
            daysTemp.forEach((dayElem,i) => {
                let day= this.jsonResponse.days.at(i)
                let dayTemp= this.calcFarenheit(day.temp)
                dayElem.textContent= `${dayTemp} ${this.jsonResponse.tempType}`
            });
        }else{
            this.jsonResponse.tempType = '°C'  
            this.unitGroupBtn.textContent = '°F'

            tempElem.textContent= `${temp} ${this.jsonResponse.tempType}`
            feelsLikeElem.textContent= `${feelsLike} ${this.jsonResponse.tempType}`
            
            daysTemp.forEach((dayElem,i) => {
                let day= this.jsonResponse.days.at(i)
                dayElem.textContent= `${day.temp} ${this.jsonResponse.tempType}`
            });
        }
       
    }
}