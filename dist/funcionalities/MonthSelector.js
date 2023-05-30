export function initializeCalendar() {
    let currentDate = new Date();
    let currentDay = currentDate.getDate();
    let monthNumber = currentDate.getMonth();
    let actualMonth = currentDate.getMonth();
    let currentYear = currentDate.getFullYear();
    let actualYear = currentDate.getFullYear();
    const daysContainer = document.querySelector("#daysContainer");
    const month = document.querySelector("#month");
    const year = document.querySelector("#year");
    const prevMonthDom = document.querySelector("#prevMonth");
    const nextMonthDom = document.querySelector("#nextMonth");
    const btnToday = document.querySelector("#btnToday");
    const calendar = document.querySelector("#generalContainer");
    writeMonth(monthNumber);
    setNewDate();
    function writeMonth(month) {
        if (daysContainer) {
            while (daysContainer.firstChild) {
                daysContainer.firstChild.remove();
            }
            const previousMonthdaysContainer = getTotaldaysContainer(monthNumber - 1);
            const currentMonthdaysContainer = getTotaldaysContainer(month);
            const startDayIndex = startDay();
            for (let i = previousMonthdaysContainer - startDayIndex + 1; i <= previousMonthdaysContainer; i++) {
                const dayElement = document.createElement("div");
                dayElement.classList.add("day", "previous-month");
                dayElement.setAttribute("id", `day${i}`);
                dayElement.addEventListener("click", () => {
                    dayElement.style.overflow = "visible";
                    setTimeout(() => {
                        dayElement.style.overflow = "hidden";
                    }, 10000);
                });
                daysContainer.appendChild(dayElement);
                const numberDay = document.createElement("p");
                numberDay.setAttribute("class", "ms-2 mb-0");
                numberDay.textContent = i.toString();
                dayElement.appendChild(numberDay);
            }
            for (let i = 1; i <= currentMonthdaysContainer; i++) {
                const dayElement = document.createElement("div");
                dayElement.classList.add("day");
                dayElement.setAttribute("id", `day${i}`);
                dayElement.addEventListener("click", () => {
                    dayElement.style.overflow = "visible";
                    setTimeout(() => {
                        dayElement.style.overflow = "hidden";
                    }, 10000);
                });
                let paddedMonth = monthNumber + 1;
                let dateAttribute = `${currentYear}-${paddedMonth}-${i}`;
                const toISODate = new Date(dateAttribute).toISOString().slice(0, 10);
                const numberDay = document.createElement("p");
                numberDay.setAttribute("class", "ms-2 mb-0");
                numberDay.textContent = i.toString();
                dayElement.appendChild(numberDay);
                const dayEventContainer = document.createElement("div");
                dayEventContainer.setAttribute("class", "container overflow-auto mh-75");
                dayEventContainer.setAttribute("data-dayNumber", toISODate);
                dayElement.appendChild(dayEventContainer);
                const addButtonDiv = document.createElement("div");
                addButtonDiv.classList.add("add-button-container");
                dayElement.appendChild(addButtonDiv);
                const addButton = document.createElement("button");
                addButton.classList.add("hover-button");
                addButton.setAttribute("data-today", toISODate);
                addButton.addEventListener("click", (event) => {
                    if (event.target) {
                        const targetDay = event.currentTarget;
                        const dayData = targetDay.getAttribute("data-today");
                        const startDate = document.querySelector("#startDate");
                        if (startDate) {
                            startDate.value = `${dayData}T12:00`;
                        }
                    }
                });
                addButtonDiv.appendChild(addButton);
                const addButtonSpan = document.createElement("span");
                addButtonSpan.classList.add("plus-icon");
                addButtonSpan.setAttribute("data-bs-toggle", "modal");
                addButtonSpan.setAttribute("data-bs-target", "#eventModal");
                addButtonSpan.textContent = "+";
                addButton.appendChild(addButtonSpan);
                const targetYear = year.innerText;
                const todayYear = actualYear.toString();
                if (i === currentDay && month === actualMonth && todayYear === targetYear) {
                    dayElement.classList.add("today");
                }
                daysContainer.appendChild(dayElement);
            }
            const remainingNextDays = 7 - ((startDayIndex + currentMonthdaysContainer) % 7);
            for (let i = 1; i <= remainingNextDays; i++) {
                const dayElement = document.createElement("div");
                dayElement.classList.add("day", "next-month");
                daysContainer.appendChild(dayElement);
                dayElement.setAttribute("id", `day${i}`);
                dayElement.addEventListener("click", () => {
                    dayElement.style.overflow = "visible";
                    setTimeout(() => {
                        dayElement.style.overflow = "hidden";
                    }, 10000);
                });
                const numberDay = document.createElement("p");
                numberDay.setAttribute("class", "ms-2 mb-0");
                numberDay.textContent = i.toString();
                dayElement.appendChild(numberDay);
            }
        }
    }
    function getTotaldaysContainer(month) {
        if (month === -1)
            month = 11;
        if (month == 0 || month == 2 || month == 4 || month == 6 || month == 7 || month == 9 || month == 11) {
            return 31;
        }
        else if (month == 3 || month == 5 || month == 8 || month == 10) {
            return 30;
        }
        else {
            return isLeap() ? 29 : 28;
        }
    }
    function isLeap() {
        return (currentYear % 100 !== 0 && currentYear % 4 === 0) || currentYear % 400 === 0;
    }
    function startDay() {
        const start = new Date(currentYear, monthNumber, 1);
        return start.getDay() === 0 ? 6 : start.getDay() - 1;
    }
    function lastMonth() {
        if (monthNumber !== 0) {
            monthNumber--;
        }
        else {
            monthNumber = 11;
            currentYear--;
        }
        setNewDate();
        calendar.classList.add("tearing-effect-lastMont");
        setTimeout(() => {
            calendar.classList.remove("tearing-effect-lastMont");
        }, 600);
    }
    function nextMonth() {
        if (monthNumber !== 11) {
            monthNumber++;
        }
        else {
            monthNumber = 0;
            currentYear++;
        }
        setNewDate();
        calendar.classList.add("tearing-effect-nextMonth");
        setTimeout(() => {
            calendar.classList.remove("tearing-effect-nextMonth");
        }, 600);
    }
    function setNewDate() {
        currentDate = new Date(currentYear, monthNumber, currentDay);
        if (month) {
            month.textContent = new Intl.DateTimeFormat(navigator.language, { month: "long" }).format(currentDate);
        }
        if (year) {
            year.textContent = currentYear.toString();
        }
        writeMonth(monthNumber);
    }
    prevMonthDom.addEventListener("click", () => lastMonth());
    nextMonthDom.addEventListener("click", () => nextMonth());
    btnToday.addEventListener("click", () => {
        currentDate = new Date();
        const actualMonth = new Intl.DateTimeFormat(navigator.language, { month: "long" }).format(currentDate);
        const actualYear = currentYear.toString();
        ;
        if (year.textContent !== actualYear || month.textContent !== actualMonth) {
            currentYear = currentDate.getFullYear();
            monthNumber = currentDate.getMonth();
            if (month && year) {
                month.textContent = actualMonth;
                year.textContent = actualYear;
            }
            writeMonth(monthNumber);
        }
    });
}
//# sourceMappingURL=MonthSelector.js.map