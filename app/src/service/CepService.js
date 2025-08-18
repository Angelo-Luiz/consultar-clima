
import Request from "../utils/Request.js";
export default class CepService {
    static async getCity(cep)
    {
        if (cep.length < 9) {
            alert("Digite um CEP válido (8 números)!");
            return;
        }

        return await Request.request({
            url: `https://viacep.com.br/ws/${cep}/json`,
        });
    }

    static async getCityClimate()
    {
        await Request.request({
            url: `http://localhost:8080`
        })
    }
}
