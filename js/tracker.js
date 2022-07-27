let headlineOffsetList = []
function draw_tracker() {
    let tracker_dom = ``
    for (let post_dom of $('.headerlink')) {
        let tracker_title = $(post_dom).attr('title')
        let tracker_link = $(post_dom).attr('href')
        let elHeight = $(post_dom).height()
        let offset = $(post_dom).offset().top
        let tracker_id = tracker_link.substring(1)
        headlineOffsetList.push({
            id: tracker_id,
            height: elHeight,
            offset: offset
        })
        tracker_dom += `
        <li>
            <a onclick="goToHeadline('${tracker_id}')" data-gh="${tracker_id}" title="${tracker_title}" >${tracker_title}</a>
        </li>`
    }
    $('.track-list').html(tracker_dom)
}

function toTheTop() {
    $(window).scrollTop(0);
}

function scrollStop (callback, refresh = 66) {

	// Make sure a valid callback was provided
	if (!callback || typeof callback !== 'function') return;

	// Setup scrolling variable
	let isScrolling;

	// Listen for scroll events
	window.addEventListener('scroll', function (event) {

		// Clear our timeout throughout the scroll
		window.clearTimeout(isScrolling);

		// Set a timeout to run after scrolling ends
		isScrolling = setTimeout(callback, refresh);

	}, false);

}

$(document).on('scroll', function () {
    let window_position = $(window).scrollTop() + 100
    let filterList = headlineOffsetList.filter(headline => {
        return headline.offset + headline.height <= window_position //엘리먼트의 바닥 기준.
    }) //작은 것을 반환함. 길이를 측정하고 맨 마지막 요소를 반환하면 됨.
    let focus_index = filterList.length - 1
    if (focus_index == -1) {
        $('.track-list a').removeClass('active')
    } else {
        $('.track-list a').removeClass('active')
        $(`[data-gh="${filterList[focus_index].id}"]`).addClass('active') //하이라이트
    }

})

scrollStop(function(){
    goToInnerList()
})

function goToInnerList() { // 역추적 스크롤링
    $('.track-list a.active')

    let tracker_pin = document.querySelector('.track-list a.active')
    if(tracker_pin!=undefined){    
        tracker_pin.scrollIntoView({
            behavior: 'smooth',
            block: 'nearest',
            inline: 'start'
        })
    }
}

function goToHeadline(id) {
    let headline = document.getElementById(id)
    headline.scrollIntoView()
}

function goToMain() {
    location.href = "/"
}