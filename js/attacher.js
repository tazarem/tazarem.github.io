//sticker attacher
let attacher=(function(){
    let css_param = {
        rotate:'',
        left:'',
        top:''
    }
    let save_param ={
        url:'',
        key:''
    }
    let attach_audio = new Audio('/sounds/test1.wav');
    let delete_audio = new Audio('/sounds/test2.wav');
    let delete_all_audio = new Audio('/sounds/test3.wav');
    let delete_mode = false

    const rotate_random = 50

    return{
        onload:()=>{ // 컴포넌트 처음 그려졌을 때
            //폴더에 있는 이미지 리스트 로드. 읽기.
            //컴포넌트에 sticker-applyer 그리기.
        },
        getStickerLoad:(nowUrl)=>{ //현 url에 맞는 스티커 정보를 찾아와서 뿌려주기
            //디비 읽기
            //nowUrl로 필터링
            //render Sticker
        },
        attachSticker:(img_src, e)=>{
            if(!delete_mode){
                let rotate2 = Math.floor(Math.random()*2)
                let rotate = Math.floor(Math.random()*rotate_random)
                if(rotate2===0){
                    rotate=rotate*-1
                }
                let sticker_el = `
                <div class="sticker" style="left:${e.pageX}px; top:${e.pageY}px; transform: rotate(${rotate}deg)">
                    <img src="${img_src}">
                </div>
                `
                attach_audio.play();
                $('body').append(sticker_el)
            }
        },
        rettachSticker:(el, e)=>{
            if(!delete_mode){
                let rotate2 = Math.floor(Math.random()*2)
                let rotate = Math.floor(Math.random()*rotate_random)
                if(rotate2===0){
                    rotate=rotate*-1
                }
                $(el).css('left',`${e.pageX}px`)
                $(el).css('top',`${e.pageY}px`)
                $(el).css('transform',`rotate(${rotate}deg)`)
                attach_audio.play();
            }
        },
        toggleDeleteMode:(el)=>{
            delete_mode=!delete_mode
            $(el).toggleClass('remove')
            $(el).toggleClass('attach')
            if(delete_mode){
                $(el).html('스티커 붙이기')
            }else{
                $(el).html('스티커 떼기')
            }
        },
        deletejustSticker:(el)=>{ // 화면에 붙인 스티커 삭제
            if(delete_mode){
                $(el).remove()
                delete_audio.play()
            }
        },
        deleteAllSticker:()=>{
            $('.sticker').remove()
            delete_all_audio.play()
        }
    }
})()

// 마우스이벤트 수신자

$(document).on('dragend','.sticker-thumb',function(e){
    let img_src = $(this).children('img').prop('src')
    attacher.attachSticker(img_src,e)
})

$(document).on('dragend','.sticker',function(e){
    attacher.rettachSticker(this,e)
})

$(document).on('click','.sticker',function(e){
    attacher.deletejustSticker(this)
})
