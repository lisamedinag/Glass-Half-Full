class APIHandler {
    constructor() {
        this.axiosApp = axios.create({
            baseURL: 'http://localhost:3000'
        })
    }
  
    getEvents (id) {
      return this.axiosApp.get(`/api/events/${id}`);
    }
  }