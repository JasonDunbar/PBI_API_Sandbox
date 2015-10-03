<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="Default.aspx.cs" Inherits="PBI_API_Sandbox.Default" %>

<!DOCTYPE html>

<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
    <title>Power BI Web App</title>
    <link type="text/css" rel="stylesheet" href="./css/default.css" />
    <script type="text/javascript">

        window.onload = function () {
            var width = 500;
            var height = 500;

            // client side click to embed a selected tile.
            var dropdown = document.getElementById("TilesDropdown");
            if (dropdown.addEventListener) {
                dropdown.addEventListener("click", updateEmbedTile, false);
            }
            else {
                dropdown.attachEvent('onclick', updateEmbedTile);
            }

            //How to navigate from a Power BI Tile to the dashboard
            // listen for message to receive tile click messages.
            if (window.addEventListener) {
                window.addEventListener("message", receiveMessage, false);
            } else {
                window.attachEvent("onmessage", receiveMessage);
            }

            //How to handle server side post backs
            // handle server side post backs, optimize for reload scenarios
            // show embedded tile if all fields were filled in.
            var accessTokenElement = document.getElementById('AccessTokenTextbox');
            if(null !== accessTokenElement){
                var accessToken = accessTokenElement.value;
                if ("" !== accessToken)
                    updateEmbedTile();
            }
        };

        //How to navigate from a Power BI Tile to the dashboard
        // The embedded tile posts message for click to parent window.  
        // Listen and handle as appropriate
        // The sample shows how to open the tile source.
        function receiveMessage(event)
        {
            if (event.data) {
                try {
                    messageData = JSON.parse(event.data);
                    if (messageData.event === "tileClicked")
                    {
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
        }

        // update embed tile
        function updateEmbedTile() {
            // check if the embed url was selected
            var embedTileUrl = document.getElementById('tb_EmbedURL').value;
            if ("" === embedTileUrl)
                return;

            // to load a tile do the following:
            // 1: set the url, include size.
            // 2: add a onload handler to submit the auth token
            iframe = document.getElementById('iFrameEmbedTile');
            iframe.src =  embedTileUrl + "&width=" + width + "&height=" + height;
            iframe.onload = postActionLoadTile;
        }

        
        // post the auth token to the iFrame. 
        function postActionLoadTile() {
            // get the access token.
            accessToken = document.getElementById('AccessTokenTextbox').value;

            // return if no a
            if ("" === accessToken)
                return;

            var h = height;
            var w = width; 

            // construct the push message structure
            var m = { action: "loadTile", accessToken: accessToken, height: h, width: w};
            message = JSON.stringify(m);

            // push the message.
            iframe = document.getElementById('PowerBIFrame');
            iframe.contentWindow.postMessage(message, "*");;
        }

    </script>
    <script type="text/javascript" src="http://code.jquery.com/jquery-2.1.4.min.js"></script>
</head>
<body>
    <form id="form1" runat="server">
    <div>
        <!-- Show this once the user is authenticated -->
        <asp:Panel ID="PowerBIPanel" runat="server">
            
            <h1>The Power BI API Sandbox</h1>
            <p>If you're seeing this, then you're authenticated against the CTP Power BI Service (linked to the ctp2.onmicrosoft.com tenant)</p>

            <span class="titleBold">The curent user: </span><asp:Label ID="UserLabel" runat="server" /><br />
            <asp:Label ID="AccessTokenTextbox" runat="server" /><br /> -->
            <br /><br />
            <h2>User Guide</h2>
            <ol>
                <li>Hitting the 'Get Dashboards' button will fill the Dashboards dropdown with the dashboards that you have access to in Power BI</li>
                <li>Selecting a dashboard from the list will load the Tiles for that dashboard into the Tiles dropdown</li>
                <li>Then select a Tile from the dropdown to have that tile displayed in the iframe below</li>
                <li>There's also the Get Datasets button which will fill the textarea below with the Data Sets you have access to</li>
            </ol>
            For each request, the response is put in the text box below.
            <asp:Button ID="GetDataSetsButton" runat="server" Text="Get Me DataSets!" OnClick="GetDataSetsButton_Click" />
            <asp:Button ID="GetDashboardsButton" runat="server" Text="Get Dashboards" OnClick="GetDashboardsButton_Click" />
            
            <br /><br />
            
            <!-- Dashboards Dropdown -->
            <span class="titleBold">Dashboards: </span>
            <asp:DropDownList ID="DashboardsDropdown" runat="server" AutoPostBack="true" OnSelectedIndexChanged="DashboardsDropdown_SelectedIndexChanged" />
            <br />
            
            <!-- Tiles Dropdown -->
            <span class="titleBold">Tiles: </span>
            <asp:DropDownList ID="TilesDropdown" runat="server" AutoPostBack="true" OnSelectedIndexChanged="" />
            <br /><br />
            
            <!-- json output TextBox -->
            <asp:TextBox ID="ResultsTextBox" runat="server" Height="200px" Width="800px" TextMode="MultiLine" Wrap="False" />
            <br /><br />
            
            <!-- Power BI Tile iframe -->
            <h2>Here's the embedded Tile in an iframe</h2>
            <iframe id="PowerBIFrame" runat="server" seamless="seamless"></iframe>

        </asp:Panel>

        <!-- Show this when the user is not yet authenticated -->
        <asp:Panel ID="SignInPanel" runat="server" Visible="true">
            <p>
                By clicking the button below, you will use AAD to authenticate against the Power BI Service. 
                <br />this will return an access token for Power BI API calls
            </p>
            <asp:Button ID="SignInButton" runat="server" Text="Login to Power BI" OnClick="SignInButton_Click" />
        </asp:Panel>
    </div>
    </form>
</body>
</html>