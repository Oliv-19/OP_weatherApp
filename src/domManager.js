import { format } from "date-fns";
export default class DomManager{
    constructor(jsonResponse){
        this.jsonResponse = jsonResponse
        //this.daysTemplate= document.querySelector('#daysTemplate').content.cloneNode(true)
        this.rightSide= document.querySelector('#rightSide')
        this.cityDiv= document.querySelector('#cityDiv')
        this.daysSection= document.querySelector('#days')
        this.init()
    }
    init(){
        this.renderLeftSide()
        this.renderRightSide()
        this.renderDays()
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

        cityName.textContent= this.jsonResponse.address
        temp.textContent= this.jsonResponse.temp
        feelsLike.textContent= this.jsonResponse.feelslike
        conditions.textContent= this.jsonResponse.conditions
    }
    renderDays(){
        this.daysSection.textContent= ''
        for(let i=1; i< 8; i++){
            let daysTemplate= document.querySelector('#daysTemplate').content.cloneNode(true)
            let day = daysTemplate.querySelector('.day')
            let dayTemp = daysTemplate.querySelector('.dayTemp')
            let dayCondition = daysTemplate.querySelector('.dayCondition')

            day.textContent= format((this.jsonResponse.days.at(i).datetime+ " 00:00:00"), "eeee")
            dayTemp.textContent= this.jsonResponse.days.at(i).temp
            dayCondition.textContent= this.jsonResponse.days.at(i).conditions


            this.daysSection.append(daysTemplate)
        }

    }
}