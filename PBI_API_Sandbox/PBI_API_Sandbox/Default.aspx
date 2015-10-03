<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="Default.aspx.cs" Inherits="PBI_API_Sandbox.Default" %>

<!DOCTYPE html>

<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
    <title>Power BI Web App</title>
</head>
<body>
    <form id="form1" runat="server">
    <div>
        <asp:Panel ID="PowerBIPanel" runat="server">
            <asp:Label ID="UserLabel" runat="server"></asp:Label>
            <asp:Label ID="AccessToken" runat="server"></asp:Label>
        </asp:Panel>
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