<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="Default.aspx.cs" Inherits="PBI_API_Sandbox.Default" %>

<!DOCTYPE html>

<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
    <title>Power BI Web App</title>
    <link type="text/css" rel="stylesheet" href="./css/default.css" />
    <script type="text/javascript">
        window.onload = function () {
            // put code to run here
        }
    </script>
    <script type="text/javascript" src="http://code.jquery.com/jquery-2.1.4.min.js"></script>
    <script type="text/javascript" src="./scripts/App.js"></script>
</head>
<body>
    <form id="form1" runat="server">
    <div>
        <!-- Show this once the user is authenticated -->
        <asp:Panel ID="PowerBIPanel" runat="server">
            
            <h1>The Power BI API Sandbox</h1>
            <p>If you're seeing this, then you're authenticated against the CTP Power BI Service (linked to the ctp2.onmicrosoft.com tenant)</p>
            <span class="titleBold">The curent user: </span><asp:Label ID="UserLabel" runat="server" /><br />
            <asp:Label ID="AccessTokenTextbox" runat="server" />
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