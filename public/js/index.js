const charactersAPI = new APIHandler('https://minions-api.herokuapp.com/');

window.addEventListener('load', () => {

    const dayEvents = document.getElementById("day-id").value;

    charactersAPI.getEvents(dayEvents)
          .then(res => {

              console.log('hola mundo', res)
          })
          .catch(err => console.log(err))

});