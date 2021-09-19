const month_array = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
const gamemodes_array = ["All", "Joust 1v1", "Joust 2v2", "Joust 3v3", "Team Conquest", "Solo Conquest"];
const calendar = $("#calendar"),
	cur_date = new Date(),
	cur_month = month_array[cur_date.getMonth()],
	cur_month_number = cur_date.getMonth() + 1,
	cur_year = cur_date.getFullYear(),
	cur_day = cur_date.getDate(),
	amount_weeks = weeksCount(cur_year, cur_month_number),
	start_day = getFirstOfMonth(cur_month_number, cur_year),
	today = cur_date.getDate();

const filter = $("#filter-date"),
	filter_date_label = $(".filter-date-label"),
	filter_date_label_dropdown = $(".dropdown-items--date > ul"),
	filter_gamemode_label = $(".filter-gamemode-label"),
	filter_gamemode_label_dropdown = $(".dropdown-items--gamemode > ul"),
	MONTHS_AHEAD_SHOWN = 3; //CHANGE THIS VARIABLE TO SHOW LESS OR MORE MONTHS ON THE CALENDAR

function buildCalendar(month, year) {
	//Calculate how many weks in month and append them
	for (let i = 0; i < amount_weeks; i++) {
		calendar.append(createWeekElement(i + 1));
	}

	//Start adding the day numbers
	const weeks = $(".calendar__week");
	const days_in_month = getDaysInMonth(month, year);
	let fill_week = 1,
		fill_day = getFirstOfMonth(month, year);

	for (let i = 0; i < days_in_month; i++) {
		let day_number = i + 1;
		let days_of_week = $("#week_" + fill_week + " .calendar__day");
		let daynumber_element = document.createElement("span");
		daynumber_element.classList.add("day-number");
		daynumber_element.id = "day_" + day_number;

		days_of_week[indexToWeekDay(fill_day)].append(daynumber_element);
		$("#day_" + day_number).text(day_number);

		if (today == day_number && month == cur_month_number && year == cur_year) {
			$("#day_" + day_number)
				.parent()
				.addClass("calendar__today");
		}

		//Set next day to fill
		fill_day++;
		if (fill_day == 1) {
			fill_week++;
		}
		if (fill_day == 7) {
			fill_day = 0;
		}
	}
}

function initFilter() {
	//DATES
	filter_date_label.text(cur_month + " " + cur_year);
	filter_date_label.attr("id", cur_month.toLowerCase() + cur_year);
	for (let i = -1; i < MONTHS_AHEAD_SHOWN; i++) {
		let dropdown_item = document.createElement("li");
		dropdown_item.classList.add("dropdown-item");
		filter_date_label_dropdown.append(dropdown_item);
		let dropdown_item_content = cur_month_number + i >= 12 ? month_array[cur_month_number + i - 12] + " " + (parseInt(cur_year) + 1) : month_array[cur_month_number + i] + " " + cur_year;
		dropdown_item.innerHTML = dropdown_item_content;
	}

	//GAMEMODES
	for (let i = 0; i < gamemodes_array.length; i++) {
		let dropdown_item = document.createElement("li");
		dropdown_item.classList.add("dropdown-item");
		filter_gamemode_label_dropdown.append(dropdown_item);
		dropdown_item.innerHTML = gamemodes_array[i];
	}
}

function createWeekElement(number) {
	let week = document.createElement("tr");
	week.classList.add("calendar__week");
	week.id = "week_" + number;
	for (let i = 0; i < 7; i++) {
		let day = document.createElement("td");
		day.classList.add("calendar__day");
		week.appendChild(day);
	}
	return week;
}

function weeksCount(year, month_number) {
	let firstOfMonth = new Date(year, month_number - 1, 1);
	let day = firstOfMonth.getDay() || 6;
	day = day === 1 ? 0 : day;
	if (day) {
		day--;
	}
	let diff = 7 - day;
	let lastOfMonth = new Date(year, month_number, 0);
	let lastDate = lastOfMonth.getDate();
	if (lastOfMonth.getDay() === 1) {
		diff--;
	}
	let result = Math.ceil((lastDate - diff) / 7);
	return result + 1;
}

function getFirstOfMonth(month, year) {
	return new Date(year, month - 1, 1).getDay();
}

function getDaysInMonth(month, year) {
	return new Date(year, month, 0).getDate();
}

function indexToWeekDay(i) {
	switch (i) {
		case 0:
			return 6;
			break;
		default:
			return i - 1;
	}
}

$().ready(() => {
	buildCalendar(cur_month_number, cur_year);
	initFilter();
});
