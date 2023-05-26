import { retrieveEventData } from "./retrieveEventData.js";
export function setEvent() {
    const eventData = retrieveEventData();
    let eventColor = '';
    const eventDate = new Date(`${eventData.eventYear}-${eventData.eventMonth}-${eventData.eventDay}`).toISOString().slice(0, 10);
    const eventFinishDate = `${eventData.eventYearF}-${eventData.eventMonthF}-${eventData.eventDayF}`;
    const dateArray = getDatesInRange(eventDate, eventFinishDate);
    switch (eventData.eventType) {
        case 'work':
            eventColor = "bg-danger";
            break;
        case 'family':
            eventColor = "bg-secondary";
            break;
        case 'friends':
            eventColor = "bg-warning";
            break;
        case 'doctor':
            eventColor = "bg-info";
            break;
        case 'private':
            eventColor = "bg-success";
            break;
    }
    if (dateArray.length === 0) {
        const targetDay = document.querySelector(`[data-daynumber="${eventDate}"]`);
        if (targetDay) {
            const dayEvent = document.createElement("div");
            dayEvent.setAttribute("class", `row d-flex justify-content-center ${eventColor} bg-gradient mb-1 day-event-dropdown`);
            dayEvent.setAttribute("style", "font-size: 12px; color: black;");
            dayEvent.innerText = `${eventData.name}`;
            dayEvent.setAttribute("data-day", eventDate);
            dayEvent.setAttribute("data-name", eventData.name);
            dayEvent.setAttribute("data-startHour", `${eventData.eventHour}:${eventData.eventMinutes}`);
            dayEvent.setAttribute("data-endHour", `${eventData.eventHourF}:${eventData.eventMinutesF}`);
            dayEvent.setAttribute("data-description", `${eventData.description}`);
            dayEvent.setAttribute("data-eventType", `${eventData.eventType}`);
            dayEvent.setAttribute("data-reminder", `${eventData.reminder}`);
            targetDay.appendChild(dayEvent);
        }
    }
    else if (dateArray.length > 0) {
        dateArray.forEach((day) => {
            const targetDay = document.querySelector(`[data-daynumber="${day}"]`);
            if (targetDay) {
                const dayEvent = document.createElement("div");
                dayEvent.setAttribute("class", `row d-flex justify-content-center ${eventColor} bg-gradient mb-1 day-event-dropdown`);
                dayEvent.setAttribute("style", "font-size: 12px; color: black;");
                dayEvent.innerText = `${eventData.name}`;
                dayEvent.setAttribute("data-day", eventDate);
                dayEvent.setAttribute("data-name", eventData.name);
                dayEvent.setAttribute("data-startHour", `${eventData.eventHour}:${eventData.eventMinutes}`);
                dayEvent.setAttribute("data-endHour", `${eventData.eventHourF}:${eventData.eventMinutesF}`);
                dayEvent.setAttribute("data-description", `${eventData.description}`);
                dayEvent.setAttribute("data-eventType", `${eventData.eventType}`);
                dayEvent.setAttribute("data-reminder", `${eventData.reminder}`);
                targetDay.appendChild(dayEvent);
            }
        });
    }
    const closeBtn = document.querySelector('#closeBtn');
    if (closeBtn) {
        closeBtn.click();
    }
}
export function getDatesInRange(startDate, endDate) {
    const dateArray = [];
    const currentDate = new Date(startDate);
    const finishDate = new Date(endDate);
    while (currentDate <= finishDate) {
        dateArray.push(currentDate.toISOString().slice(0, 10));
        currentDate.setDate(currentDate.getDate() + 1);
    }
    return dateArray;
}
//# sourceMappingURL=createEvent.js.map