const glassAPI = new APIHandler('https://minions-api.herokuapp.com/');

window.addEventListener('load', () => {

    const dayEvents = document.getElementById("day-id").value;

// Gets events and sends their duration as height to divs
    glassAPI.getEvents(dayEvents)
        .then(res => {

            let allEventsDuration = getDuration(res.data);
            
            document.querySelector(".work").style.height = `${(allEventsDuration[0]*100)/1440}%`
            document.querySelector(".study").style.height = `${(allEventsDuration[1]*100)/1440}%`
            document.querySelector(".sport").style.height = `${(allEventsDuration[2]*100)/1440}%`
            document.querySelector(".self-care").style.height = `${(allEventsDuration[3]*100)/1440}%`
            document.querySelector(".social").style.height = `${(allEventsDuration[4]*100)/1440}%`
            document.querySelector(".relax").style.height = `${(allEventsDuration[5]*100)/1440}%`

            
            console.log('hola duration', allEventsDuration[0])

        })
        .catch(err => console.log(err))


});

// Functions to get duration per category and total duration of events

function getDuration(dayEvents) {
    let eventWork = 0;
    let eventStudy = 0;
    let eventSport = 0;
    let eventSelfcare = 0;
    let eventSocial = 0;
    let eventRelax = 0;
    
    // const mapper = {
    //     "Work": 0,
    //     "Study": 0
    // }

    dayEvents.forEach((event, i) => {
        // mapper[event.category] += dayEvents[i].duration 
       
        if (event.category === 'Work') {
            eventWork += dayEvents[i].duration
        }
    
        if (event.category === 'Study') {
            eventStudy += dayEvents[i].duration
        }
    
        if (event.category === 'Sport') {
            eventSport += dayEvents[i].duration
        }
    
        if (event.category === 'Self-care') {
            eventSelfcare += dayEvents[i].duration
        }
    
        if (event.category === 'Social') {
            eventSocial += dayEvents[i].duration
        }
    
        if (event.category === 'Relax') {
            eventRelax += dayEvents[i].duration
        }
     
    })

    // const result = [mapper.Work, mapper.Study ...
    const result = [eventWork, eventStudy, eventSport, eventSelfcare, eventSocial, eventRelax]
    return result
}



// Total duration of all events
function totalSum(dayEvents) {
    for (let i = 0; i < dayEvents.length; i++) {
        totalSum += dayEvents[i].duration;
    }
    return totalSum;
}


