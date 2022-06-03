function toggleSearcher(el){
    $(el).toggleClass('active')
    $('.search-widget').toggleClass('active')
}
// $(function(){
//     let auto_inner_trigger = setTimeout(function(){
//         toggleSearcher('#searchToggler')
//         clearTimeout(auto_inner_trigger)
//         auto_inner_trigger=null
//     },2000)
// })

var searchFunc = function(path, search_id, content_id) {
    'use strict';
    $.ajax({
        url: path,
        dataType: "json",
        success: function( jsonDatas ) {
            // get the contents from search data

            var $input = document.getElementById(search_id);
			if (!$input) return;
            var $resultContent = document.getElementById(content_id);
            if ($("#local-search-input").length > 0) {
                $input.addEventListener('input', function () {
                    var str = '<ul class=\"search-result-list scroll\">';
                    var keywords = this.value.trim().toLowerCase().split(/[\s\-]+/);
                    $resultContent.innerHTML = "";
                    if (this.value.trim().length <= 0) {
                        return;
                    }
                    // perform local searching
                    let matchingCount = 0;
                    jsonDatas.forEach(function (data) {
                        var isMatch = true;
                        var content_index = [];
                        if (!data.title || data.title.trim() === '') {
                            data.title = "Untitled";
                        }
                        var data_title = data.title.trim().toLowerCase();
                        var data_content = data.content.trim().replace(/<[^>]+>/g, "").toLowerCase();
                        var data_url = data.url;
                        var index_title = -1;
                        var index_content = -1;
                        var first_occur = -1;
                        // only match artiles with not empty contents
                        if (data_content !== '') {
                            keywords.forEach(function (keyword, i) {
                                index_title = data_title.indexOf(keyword);
                                index_content = data_content.indexOf(keyword);

                                if (index_title < 0 && index_content < 0) {
                                    isMatch = false;
                                } else {
                                    if (index_content < 0) {
                                        index_content = 0;
                                    }
                                    if (i == 0) {
                                        first_occur = index_content;
                                    }
                                    // content_index.push({index_content:index_content, keyword_len:keyword_len});
                                }
                            });
                        } else {
                            isMatch = false;
                        }
                        // show search results
                        if (isMatch) {
                            matchingCount++
                            str += `<li onclick="location.href='${data_url}'"><a class='search-result-title'>${data_title}</a>`;
                            var content = data.content.trim().replace(/<[^>]+>/g, "");
                            if (first_occur >= 0) {
                                // cut out 100 characters
                                var start = first_occur - 20;
                                var end = first_occur + 80;

                                if (start < 0) {
                                    start = 0;
                                }

                                if (start == 0) {
                                    end = 100;
                                }

                                if (end > content.length) {
                                    end = content.length;
                                }

                                var match_content = content.substring(start, end);

                                // highlight all keywords
                                keywords.forEach(function (keyword) {
                                    var regS = new RegExp(keyword, "gi");
                                    match_content = match_content.replace(regS, "<b class=\"search-keyword\">" + keyword + "</b>");
                                });

                                str += "<p class=\"search-result\">" + match_content + "...</p>"
                            }
                            str += "</li>";
                        }
                    });
                    if(matchingCount>0){
                        str=`<div class="search-mention">검색 결과가 <b class="search-keyword" style="margin-left: 0.2rem;">${matchingCount}</b> 건 있습니다</div>`+str;
                    }else{
                        str=`<div class="search-mention">검색 결과 <b class="search-keyword" style="margin-left: 0.2rem;">${matchingCount}</b> 건 </div>`;
                    }
                    str += "</ul>";
                    $resultContent.innerHTML = str;
                });
            }
        }
    });
}