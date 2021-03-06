$(document).ready(function() {
    // const back = $("#12");
    // const arms = $("#8");
    // const chest = $("#chest");
    // const legs = $("#legs");
    // const abs = $("#abs");
    // const routine = $("#shoulders");

    $.get("/api/user_data").then(function(data) {
        getRoutine(data);
    });

    function getRoutine(data) {
        console.log(data);

        const serial = data.equipment;
        const equipment = serial.split("-").filter(element => element.length > 0);
        let urlParams = "";

        for (let i = 0; i < equipment.length; i++) {
            urlParams += "&equipment=" + equipment[i];
        }

        var queryURL = "https://wger.de/api/v2/exercise/?language=2&limit=40" + urlParams;

        $.ajax({
            url: queryURL,
            method: "GET",
            Authorization: "b848c6ad024b1c40f59e4da17743e3a1c17d613e"
        }).then(function(res) {
            const results = res.results;
            console.log(res);
            console.log(results);
            console.log(results[0].name);
            console.log(results[0].description);
            console.log(results[0].category);
            console.log(results.length);

            for (let i = 0; i < results.length; i++) {
                let name = results[i].name;
                let description = results[i].description;
                let category = results[i].category;

                let div = $("<div>")
                let divName = $("<div>").text(name)
                let divDescription = $("<p>").html(description)

                const nameNoSpaces = name.trim().split(" ").join("").toLowerCase();
                const img = $("<img>").attr('src', "../images/gif/" + nameNoSpaces + ".gif").attr('width', "250px");
                const imgDiv = $("<div>");

                img.appendTo(imgDiv);


                divName.attr("class", "subtitle")
                div.append(divName)
                div.append(divDescription)
                div.append(imgDiv);
                div.append("_______________________________")

                if (category === 14) {
                    category = 9;
                }

                const bodyPart = $("#" + category)
                bodyPart.append(div);
            }
        })
    }
});