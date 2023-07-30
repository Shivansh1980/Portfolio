import axios from "axios"
import {baseUrl, staticUrl} from './Global'

function getCookie(name) {
    var cookieValue = null;
    if (document.cookie && document.cookie !== '') {
        var cookies = document.cookie.split(';');
        for (var i = 0; i < cookies.length; i++) {
            var cookie = cookies[i].trim(cookies[i]);
            if (cookie.substring(0, name.length + 1) === (name + '=')) {
                cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                break;
            }
        }
    }
    return cookieValue;
}

export default class Api {
    constructor(token) {
        this.api = axios.create({
            baseURL: baseUrl
        })
        this.staticUrl = staticUrl;
    }

    getCsrfToken() {
        return getCookie('csrftoken')
    }

    getAIModels(){
        var token = this.getCsrfToken();
        
        return new Promise((resolve, reject) => {
            this.api.get('/api/ai_models/').then(res => {
                console.log(res.data);
                resolve(res.data);
            }).catch(err => {
                reject(err);
            })
        })
    }
    getModelPrediction(modelId, modelInputData) {
        var token = this.getCsrfToken();
        return new Promise((resolve, reject) => {
            this.api.post(`/api/ai_models/${modelId}/predict/`, modelInputData, {
                headers:{'X-CSRFToken':token}
            })
            .then(res => {
                resolve(res.data);
            })
            .catch(err => {
                console.log(err);
                reject(err);
            })
        })
    }
}