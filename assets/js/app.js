

$(document).ready(function () {
    var btnGenerate = '#btn-generate';
    var btnCreateLink = '#btn-permalink';
    var token = getUrlParameter('token');
    var btnTokenPopover = '#token-input-popover';
    if (token !== undefined) {
        document.getElementById('btn-permalink').disabled = false;
        document.getElementById('btn-generate').disabled = false;
        makeRequest(token)
    } else {
        insertIntoResult("We need a token to generate results")
    }

    

    $(btnGenerate).click(function() {
        makeRequest(token);
    })

    $(btnCreateLink).click(function() {
        navigator.clipboard.writeText(window.location.href)
        
    })

    $('#inputButton').click(function() {
        token = $('#executionTokenField').val();
        console.log(token);
    })
    // Token Input
    // $('#executionTokenField').on('input', function() {
    //     token = $('#executionTokenField').val();
    //     console.log(token);
    // })

    // Popovers
    $(btnTokenPopover).popover({
        html: true,
        content: function() {
            return $("#token-input-content").html();
        },
        title: function() {
            return $("#token-input-title").html();
        }
    });

    

})

function testFunction(value) {
    window.location.replace(`?token=${value}`);
}

function insertIntoResult(string) {
    var resultBody = '#result-body';
    $(resultBody).text(string);
}

function makeRequest(token) {
    var url = `https://generator.campaign-logger.com/execute/${token}`
    $.ajax({url: url, success: function(response){
        output = response.htmlContent;
        if (response.result === null) {
            insertIntoResult("Invaild Token Supplied")
        } else {
            insertIntoResult(output);
        }
    }});
}

var getUrlParameter = function getUrlParameter(sParam) {
    var sPageUrl = window.location.search.substring(1),
    surlVariables = sPageUrl.split('&'),
    sParameterName, i;

    for ( i = 0; i < surlVariables.length; i++) {
        sParameterName = surlVariables[i].split('=');
        if (sParameterName[0] === sParam) {
            return sParameterName[1] === undefined ? true : decodeURIComponent(sParameterName[1]);
        }
    }
};