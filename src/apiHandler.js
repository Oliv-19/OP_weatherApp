import test from './test.json'
export default class apiHandler{
    constructor(){
        this.URL= 'https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/'
        this.UNITGROUP = ''
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
            // console.log(address)
            // console.log(test)
            // return test
            return responseJson
        } catch (error) {
            console.log(error)
        }
    }
    getInfo(response){
        console.log(response)
        const info={
          address:response.resolvedAddress,
          conditions:response.currentConditions.conditions,
          temp:response.currentConditions.temp,
          feelslike:response.currentConditions.feelslike,
          humidity:response.currentConditions.humidity,
          windspeed:response.currentConditions.windspeed,
          pressure:response.currentConditions.pressure,
          datetime:response.currentConditions.datetime,
          sunrise:response.currentConditions.sunrise,
          sunset:response.currentConditions.sunset,
          days:response.days,
        }
        console.log(info)
        return info
      }
}