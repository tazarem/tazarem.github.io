$(document).on('click','.post img',function(){
    $('.overlay').removeClass('hide')
    let title = $(this).prop('alt')
    let src = $(this).prop('src')
    let img_dom = `
        <img src="${src}" alt="${title}" />
    `
    $('.overlay').children('.img-zone').children('.content').html(img_dom)
    $('.overlay').children('.img-zone').children('.title').html(title)
})
$(document).on('click','.overlay',function(){
    $('.overlay').toggleClass('hide')
})
// $(document).on('click','.overlay .close',function(){
//     $('.overlay').addClass('hide')
// })