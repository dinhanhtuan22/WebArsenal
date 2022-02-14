$(document).ready(function () {

    loadNewsAjax("", optionTime());


    $("#btn-search-index").click(function () {
        $('#modal').removeClass('hide');
    });

    $('#modal-search__btn').click(function () {
        deleteNews();
        let keyword = $('#modal-search__txt').val();
        let stringDate = optionTime();
        loadNewsAjax(keyword, stringDate);
        $('#modal').addClass('hide');
    })


    $('#newest').click(function () {
        $('#search-selected').text("Mới nhất");
        $('.search-select__option ion-icon').addClass('hide-icon');
        $('#newest').children().removeClass('hide-icon');

    });
    $('#past-24hours').click(function () {
        $('#search-selected').text("24 giờ trước");
        $('.search-select__option ion-icon').addClass('hide-icon');
        $('#past-24hours').children().removeClass('hide-icon');
    });
    $('#past-week').click(function () {
        $('#search-selected').text("Tuần trước");
        $('.search-select__option ion-icon').addClass('hide-icon');
        $('#past-week').children().removeClass('hide-icon');
    });
    $('#past-month').click(function () {
        $('#search-selected').text("Tháng trước");
        $('.search-select__option ion-icon').addClass('hide-icon');
        $('#past-month').children().removeClass('hide-icon');
    });


    $('#dateSelected').change(function () {
        let dayText = $('#dateSelected').val();

        let dateCheck = new Date($('#dateSelected').val());
        let today = new Date()
        if (dateCheck > today)
            $('#error-time').removeClass('hide-icon');
        else
            $('#error-time').addClass('hide-icon');

        $('#search-selected').text(dayText);
        $('.search-select__option ion-icon').addClass('hide-icon');
        $('#custom-time').children().removeClass('hide-icon');
    });
    $('#btn-close').click(function () {
        $('#modal').addClass('hide');
    });




});

/**
 * @description Lấy thời gian tìm kiếm news
 */
function optionTime() {
    let currentDateTime = new Date();
    let stringCurrentDateTime = currentDateTime.toISOString();
    let resultDateTime = currentDateTime;

    const stringSelect = $('#search-selected').text();

    if (stringSelect == "Mới nhất")
        resultDateTime.setHours(resultDateTime.getHours() - 1);
    else if (stringSelect == "24 giờ trước")
        resultDateTime.setDate(resultDateTime.getDate() - 1);
    else if (stringSelect == "Tuần trước")
        resultDateTime.setDate(resultDateTime.getDate() - 7);
    else if (stringSelect == "Tháng trước")
        resultDateTime.setDate(resultDateTime.getDate() - 30);
    else {
        resultDateTime = new Date($('#dateSelected').val());
    }

    let stringResultDateTime = resultDateTime.toISOString();

    //Cắt chuối về đúng định dạng của gnews.io
    stringResultDateTime = stringResultDateTime.substr(0, 19) + 'Z';
    return {
        currentDate: stringCurrentDateTime,
        resultDate: stringResultDateTime
    };
}

/**
 * @description Hàm xóa các news
 */
function deleteNews() {
    console.log($('#news-list').children());
    $('#news-list').children().each(function (index, element) {
        element.remove();
    })
}

/**
 * @description Hàm lấy tin tức từ API và render ra web
 * @param {*} keyword 
 * @param {*} dateString 
 */
function loadNewsAjax(keyword, dateString = { currentDate, resultDate }) {
    $('#loadding').removeClass('spinner--hide');

    var token = "f29a4bf5bbbae28e39cd3365c259d0f5";
    let topic = "";

    if (keyword != undefined && keyword != "") {
        keyword = "&q=" + keyword + "&sortby=relevance";
    } else {
        keyword = "";
        topic = "sports";
    }
    let stringUTCDate;
    if (dateString != undefined && dateString.resultDate != "") {
        stringUTCDate = "&to=" + dateString.resultDate;
    } else {
        stringUTCDate = "";
    }


    $.ajax({
        url: `https://gnews.io/api/v4/top-headlines?token=${token}&topic=${topic}&lang=en${keyword + stringUTCDate}`,
        type: "GET",
        success: function (data) {
            console.log(data);
            for (let i = 0; i < data.articles.length; i++) {
                let html = `
                    <div class="col-lg-6 col-md-12 col-sm-12">
                        <div class="news-item">        
                            <div class="news-item__image">
                                <img src="${data.articles[i].image}" alt="" />
                            </div>
                            <div class="news-item__content">
                                <h3 class="content-title">
                                    <a class="content-title__link" href="${data.articles[i].url}" target="_bank">
                                        ${data.articles[i].title}
                                    </a>
                                </h3>
                                <p class="content-detail">
                                    ${data.articles[i].content}
                                </p>
                            </div>
                        </div>
                    </div>`;
                $('#news-list').append(html);
            }
            $('#loadding').addClass('spinner--hide');

        },
        error: function () {
            alert('An error has occurred');
        },
    });

}
