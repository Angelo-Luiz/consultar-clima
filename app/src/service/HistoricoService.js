import Request from "../utils/Request.js";
export default class CepService {
    static async getHistoric()
    {
        return await Request.request({
            url: `http://localhost:8080/api/get-historic`,
            method: 'GET'
        })
    }
}
