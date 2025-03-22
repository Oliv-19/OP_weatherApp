import test from './test.json'
export default class apiHandler{
    constructor(){
        this.URL= 'https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/'
        this.UNITGROUP = 'metric'
        this.KEY= 'K4CHNVB6V3MULBTF6PQ2AHQPD'
    }
    async fetchApi(address){
        try {
            const response= await fetch(`${this.URL}${address}?unitGroup=${this.UNITGROUP}&key=${this.KEY}&contentType=json`, {
            "method": "GET",
            "headers": {
            }
            })
            const responseJson= await response.json()
            console.log(address)
            console.log(test)
            return responseJson
           //return test
        } catch (error) {
            console.log(error)
        }
    }
    getInfo(response){
        console.log(response)
        const info={
          address:response.resolvedAddress,
          icon:`${response.currentConditions.icon}.png`,
          conditions:response.currentConditions.conditions,
          temp:response.currentConditions.temp,
          tempType:'°C',
          feelslike:response.currentConditions.feelslike,
          humidity:response.currentConditions.humidity,
          windspeed:`${response.currentConditions.windspeed} km/h`,
          cloudcover:`${response.currentConditions.cloudcover}%`,
          datetime:response.currentConditions.datetime,
          sunrise:response.currentConditions.sunrise,
          sunset:response.currentConditions.sunset,
          days:response.days,
        }
        console.log(info)
        return info
      }
}