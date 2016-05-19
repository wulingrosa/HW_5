
var skycons = new Skycons();
skycons.play();

$('#dropdown li').each(function(index, element) {
    var city = $(this).attr("id");
    var url = 'https://query.yahooapis.com/v1/public/yql?q=select%20*%20from%20weather.forecast%20where%20woeid%20in%20(select%20woeid%20from%20geo.places(1)%20where%20text%3D"' + city + '")&format=json&env=store%3A%2F%2Fdatatables.org%2Falltableswithkeys';
    $.getJSON(url, function(data) {
        var currentTemp = data.query.results.channel.item.condition.temp;
        temp = celsius(currentTemp);
        $(element).text($(element).text() + "  " + temp + "℃");
    });
});

$(function() {
    findCity('taipei');
    $('#dropdown li').on('click', function() {
        $('button').text($(this).text());
        findCity($(this).attr("id"));
    });
});

var findCity = function(city) {
    $.getJSON(
        'https://query.yahooapis.com/v1/public/yql?q=select%20*%20from%20weather.forecast%20where%20woeid%20in%20(select%20woeid%20from%20geo.places(1)%20where%20text%3D"' + city + '")&format=json&env=store%3A%2F%2Fdatatables.org%2Falltableswithkeys', {},
        function(data) {
            var currentTemp = data.query.results.channel.item.condition.temp;
            var currentDate = data.query.results.channel.item.forecast[0].date;
            var currentCond = data.query.results.channel.item.condition.text;
            var secondDate = data.query.results.channel.item.forecast[1].date;
            var secondHightemp = data.query.results.channel.item.forecast[1].high;
            var secondLowtemp = data.query.results.channel.item.forecast[1].low;
            var secondCond = data.query.results.channel.item.forecast[1].text;
            var thirdDate = data.query.results.channel.item.forecast[2].date;
            var thirdHightemp = data.query.results.channel.item.forecast[2].high;
            var thirdLowtemp = data.query.results.channel.item.forecast[2].low;
            var thirdCond = data.query.results.channel.item.forecast[2].text;
            var fourthDate = data.query.results.channel.item.forecast[3].date;
            var fourthHightemp = data.query.results.channel.item.forecast[3].high;
            var fourthLowtemp = data.query.results.channel.item.forecast[3].low;
            var fourthCond = data.query.results.channel.item.forecast[3].text;

            $('.temperature').text(celsius(currentTemp));
            $('.date').text(currentDate);
            $('.cond').text(currentCond);
            $("thead > tr >th:nth-child(1)").text(secondDate);
            $(".temp:nth-child(1)").text(celsius(secondLowtemp) + '~' + celsius(secondHightemp) + "℃");
            $("thead > tr >th:nth-child(2)").text(thirdDate);
            $(".temp:nth-child(2)").text(celsius(thirdLowtemp) + '~' + celsius(thirdHightemp) + "℃");
            $("thead > tr >th:nth-child(3)").text(fourthDate);
            $(".temp:nth-child(3)").text(celsius(fourthLowtemp) + '~' + celsius(fourthHightemp) + "℃");
            skyconsDecide("today", currentCond);
            skyconsDecide("day1", secondCond);
            skyconsDecide("day2", thirdCond);
            skyconsDecide("day3", fourthCond);
        }
    );
};

var skyconsDecide = function(date, status) {
    if (status.search("Sunny") >= 0) {
        skycons.set(date, Skycons.CLEAR_DAY);
    }
    else if (status.search("Partly Cloudy") >= 0) {
        skycons.set(date, Skycons.PARTLY_CLOUDY_DAY);
    }
    else if (status.search("Cloudy") >= 0) {
        skycons.set(date, Skycons.CLOUDY);
    }
    else if (status.search("Rain") >= 0) {
        skycons.set(date, Skycons.RAIN);
    }
      else if (status.search("Shower") >= 0) {
        skycons.set(date, Skycons.RAIN);
    }
    else if (status.search("Windy") >= 0) {
        skycons.set(date, Skycons.WIND);
    }
    else if (status.search("Snow") >= 0) {
        skycons.set(date, Skycons.SNOW);
    }
    else if (status.search("Foggy") >= 0) {
        skycons.set(date, Skycons.FOG);
    }
    else if (status.search("Thunderstorms") >= 0) {
        skycons.set(date, Skycons.RAIN);
    }
};