const hamburger = $(".hamburger");
const navigation = $(".navigation");
const navigation__link = $(".navigation__link");
const WINDOW_CHANGE_EVENT = "onorientationchange" in window ? "orientationchange" : "resize";

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

	window.addEventListener(WINDOW_CHANGE_EVENT, closeNavigation);

	copyRights();
});

function closeNavigation() {
	navigation.removeClass("navigation--open");
}

function copyRights() {
	$("#current-year").text(new Date().getFullYear());
}
