const scrollTop = (e, delay = 800) => {
	e?.preventDefault();
	$("html, body").animate({
		scrollTop: 0
	}, delay)
}

export default scrollTop