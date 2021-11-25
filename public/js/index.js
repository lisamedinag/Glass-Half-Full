const dayGlassAPI = new APIHandler('http://localhost:3000');

window.addEventListener('load', () => {

    const dayEvents = document.getElementById("day-id").value;

    dayGlassAPI.getEvents(dayEvents)
          .then(res => {

              console.log('hola mundo', res)
          })
          .catch(err => console.log(err))

});