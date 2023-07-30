$(document).ready(function () {

    // Set the API endpoint URL
    var endpoint = 'https://api.weatherapi.com/v1/forecast.json';


    // Set the API parameters
    var params = {
        q: '19122', // City name
        key: 'eb23c3da5e204fdc9b5224506232907', // Your API key
        days: 3
    };

    // Make the API request
    $.ajax({
        url: endpoint,
        type: 'GET',
        dataType: 'json',
        data: params,
        success: function (data) {
            var location = data.location.name;
            $('.location').html(location);
            // Extract the temperature from the API response
            var temp_c = data.current.temp_c.toFixed(1);
            // Update the HTML element with the temperature
            $('.temp-value').html(temp_c);

            var currentCondition = data.current.condition.text;
            // Both methods will return a single element
            $('.condition').html(currentCondition);

            var time = data.location.localtime;
            $('.time').html(time);

            var forecastDays = data.forecast.forecastday;
            
                // Get the forecastday array from the API response
                var forecastDays = data.forecast.forecastday;

                // Get the temperature elements in the HTML
                var tomorrowTempElement = document.querySelector(".lnr1 .temp");
                var twoDaysTempElement = document.querySelector(".lnr2 .temp");

                // Update the temperature for tomorrow
                tomorrowTempElement.innerHTML = forecastDays[1].day.avgtemp_c.toFixed(1) + '<span class="deg"></span><span class="temp-type">°C</span>';

                // Update the temperature for two days from now
                twoDaysTempElement.innerHTML = forecastDays[2].day.avgtemp_c.toFixed(1) + '<span class="deg"></span><span class="temp-type">°C</span>';
            
        },
        error: function () {
            $('#temperature').html('Error: API request failed');
        }
    });

});