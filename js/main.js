const hamburger = $(".hamburger");
const navigation = $(".navigation");
const navigation__link = $(".navigation__link");
const WINDOW_CHANGE_EVENT = "onorientationchange" in window ? "orientationchange" : "resize";
const region_button = $("#region-filter-button"),
	region_dropdown = $("#region-dropdown"),
	date_button = $("#date-filter-button"),
	date_dropdown = $("#date-dropdown"),
	gamemode_button = $("#gamemode-filter-button"),
	gamemode_dropdown = $("#gamemode-dropdown");

$().ready(() => {
	$(document).on("click", (e) => {
		if (navigation.hasClass("navigation--open") && !e.target.classList.contains("hamburger")) {
			closeNavigation();
		}
	});

	hamburger.on("click", () => {
		if (navigation.hasClass("navigation--open")) {
			closeNavigation();
		} else {
			navigation.addClass("navigation--open");
		}
	});

	region_button.on("click", () => {
		if (region_dropdown.hasClass("dropdown--open")) {
			region_dropdown.removeClass("dropdown--open");
		} else {
			region_dropdown.addClass("dropdown--open");
		}
	});

	$(".dropdown-items--region").on("click", (e) => {
		$(".filter-region-label").text(e.target.innerHTML);
		if (region_dropdown.hasClass("dropdown--open")) {
			region_dropdown.removeClass("dropdown--open");
		}
	});

	date_button.on("click", () => {
		if (date_dropdown.hasClass("dropdown--open")) {
			date_dropdown.removeClass("dropdown--open");
		} else {
			date_dropdown.addClass("dropdown--open");
		}
	});

	$(".dropdown-items--date").on("click", (e) => {
		$(".filter-date-label").text(e.target.innerHTML);
		if (date_dropdown.hasClass("dropdown--open")) {
			date_dropdown.removeClass("dropdown--open");
		}
	});

	gamemode_button.on("click", () => {
		if (gamemode_dropdown.hasClass("dropdown--open")) {
			gamemode_dropdown.removeClass("dropdown--open");
		} else {
			gamemode_dropdown.addClass("dropdown--open");
		}
	});

	$(".dropdown-items--gamemode").on("click", (e) => {
		$(".filter-gamemode-label").text(e.target.innerHTML);
		if (gamemode_dropdown.hasClass("dropdown--open")) {
			gamemode_dropdown.removeClass("dropdown--open");
		}
	});

	window.addEventListener(WINDOW_CHANGE_EVENT, closeNavigation);

	copyRights();
});

function closeNavigation() {
	navigation.removeClass("navigation--open");
}

function copyRights() {
	$("#current-year").text(new Date().getFullYear());
}
