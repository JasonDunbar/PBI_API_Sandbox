<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="Default.aspx.cs" Inherits="PBI_API_Sandbox.Default" %>

<!DOCTYPE html>

<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
    <title>Power BI Web App</title>
    <link type="text/css" rel="stylesheet" href="./css/default.css" />
</head>
<body>
    <form id="form1" runat="server">
    <div>
        <!-- Show this once the user is authenticated -->
        <asp:Panel ID="PowerBIPanel" runat="server">
            
            <h1>The Power BI API Sandbox</h1>
            <p>If you're seeing this, then you're authenticated against the CTP Power BI Service (linked to the ctp2.onmicrosoft.com tenant)</p>

            <span class="titleBold">The curent user: </span><asp:Label ID="UserLabel" runat="server" /><br />
            <!-- <span class="titleBold">The access token: </span><asp:Label ID="AccessToken" runat="server" /><br /> -->
            <br /><br />
            <asp:Button ID="GetDataSetsButton" runat="server" Text="Get Me DataSets!" OnClick="GetDataSetsButton_Click" />
            <asp:Button ID="GetDashboardsButton" runat="server" Text="Get Dashboards" OnClick="GetDashboardsButton_Click" />
            
            <br /><br />
            
            <asp:DropDownList ID="DashboardsDropdown" runat="server" AutoPostBack="true" OnSelectedIndexChanged="DashboardsDropdown_SelectedIndexChanged" />
            <asp:DropDownList ID="TilesDropdown" runat="server" AutoPostBack="true" OnSelectedIndexChanged="TilesDropdown_SelectedIndexChanged" />
            <br /><br />
            <asp:TextBox ID="ResultsTextBox" runat="server" Height="200px" Width="586px" TextMode="MultiLine" Wrap="False" />
            <br /><br />
            <h2>Here's the embedded Tile in an iframe</h2>
            <iframe id="PowerBIFrame" runat="server"></iframe>

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