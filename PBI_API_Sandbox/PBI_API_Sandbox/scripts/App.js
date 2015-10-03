"use strict";

Type.registerNamespace("PBI");
PBI.Functions = PBI.Functions || {};

PBI.Functions = {

}

PBI.Functions.InitialisePage = {
    frameHeight: 400,
    frameWidth: 400,

    registerTileChangeEvent: function() {

        // use jQuery to register an event on the dropdown list
        var dropdown = $("#TilesDropdown");
        dropdown.on("click", updateEmbedTile)

        //How to navigate from a Power BI Tile to the dashboard
        // listen for message to receive the tile click messages.
        if (window.addEventListener) {
            window.addEventListener("message", receiveMessage, false);
        } else {
            window.attachEvent("onmessage", receiveMessage);
        }

        //How to handle server side post backs
        // handle server side post backs, optimize for reload scenarios
        // show embedded tile if all fields were filled in.
        var accessTokenElement = $('#AccessTokenTextbox');
        if (null !== accessTokenElement) {
            var accessToken = accessTokenElement.value;
            if ("" !== accessToken){
                updateEmbedTile();
            }
        }
    },

    //How to navigate from a Power BI Tile to the dashboard
    // The embedded tile posts message to the parent window on click.
    // Listen and handle as appropriate
    // The sample shows how to open the tile source.
    receiveMessage: function(event){
        if (event.data) {
            try {
                messageData = JSON.parse(event.data);
                if (messageData.event === "tileClicked") {
                    //Get IFrame source and construct dashboard url
                    iFrameSrc = document.getElementById(event.srcElement.iframe.id).src;

                    //Split IFrame source to get dashboard id
                    var dashboardId = iFrameSrc.split("dashboardId=")[1].split("&")[0];

                    //Get PowerBI service url
                    urlVal = iFrameSrc.split("/embed")[0] + "/dashboards/{0}";
                    urlVal = urlVal.replace("{0}", dashboardId);

                    window.open(urlVal);
                }
            }
            catch (e) {
                // In a production app, handle exception
            }
        }
    },

    // Update the embedded tile
    updateEmbedTile: function(){
        // check if the embed url was selected
        var embedTileUrl = document.getElementById('tb_EmbedURL').value;
        if ("" === embedTileUrl)
            return;

        // to load a tile do the following:
        // 1: set the url, include size.
        // 2: add a onload handler to submit the auth token
        iframe = document.getElementById('iFrameEmbedTile');
        iframe.src = embedTileUrl + "&width=" + width + "&height=" + height;
        iframe.onload = postActionLoadTile;
    },

    // Post the auth token to the iframe
    postActionLoadTile: function () {
        // get the access token.
        accessToken = document.getElementById('AccessTokenTextbox').value;

        // return if no a
        if ("" === accessToken)
            return;

        var h = height;
        var w = width;

        // construct the push message structure
        var m = { action: "loadTile", accessToken: accessToken, height: h, width: w };
        message = JSON.stringify(m);

        // push the message.
        iframe = document.getElementById('PowerBIFrame');
        iframe.contentWindow.postMessage(message, "*");
    }
}