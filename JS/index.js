$(document).ready(function(){
    loadNewsAjax("");
});


/**
 * @description Hàm lấy tin tức từ API và render ra web
 * @param {*} keyword 
 */
function loadNewsAjax(keyword) {
    var token = "f29a4bf5bbbae28e39cd3365c259d0f5";
    let topic = "Arsenal";

    if (keyword != undefined && keyword != "") {
        keyword = "&q=" + keyword + "&sortby=relevance";
    } else {
        keyword = "";
        topic = "sports";
    }
    

    $.ajax({
        url: `https://gnews.io/api/v4/top-headlines?token=${token}&topic=${topic}&lang=en${keyword}`,
        type: "GET",
        success: function (data) {
            console.log(data);
            for (let i = 0; i < 6; i++) {
                let html = `
                    <div class="col-lg-6 col-md-12 col-sm-12">
                        <div class="news-item">        
                            <div class="ni-image">
                                <img src="${data.articles[i].image}" alt="" />
                            </div>
                            <div class="ni-content">
                                <h3 class="ni-c-title">
                                    <a class="c-t-link" href="${data.articles[i].url}" target="_bank">
                                        ${data.articles[i].title}
                                    </a>
                                </h3>
                                <p class="ni-c-detail">
                                    ${data.articles[i].content}
                                </p>
                            </div>
                        </div>
                    </div>`;
                $('#news-list').append(html);
                console.log(data.articles[i].publishedAt);
            }
        },
        error: function () {
            alert('An error has occurred');
        },
    });

}
