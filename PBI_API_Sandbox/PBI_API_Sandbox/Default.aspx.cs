using System;
using System.Collections.Generic;
using System.Collections.Specialized;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;
using Microsoft.IdentityModel.Clients.ActiveDirectory;

namespace PBI_API_Sandbox
{
    public partial class Default : System.Web.UI.Page
    {
        public AuthenticationResult authResult { get; set; }


        protected void Page_Load(object sender, EventArgs e)
        {
            //Test for AuthenticationResult
            if (Session["authResult"] != null)
            {
                //Get the authentication result from the session
                authResult = (AuthenticationResult)Session["authResult"];

                //Show Power BI Panel
                PowerBIPanel.Visible = true;
                SignInPanel.Visible = false;

                //Set user and token from authentication result
                UserLabel.Text = authResult.UserInfo.DisplayableId;
                AccessToken.Text = authResult.AccessToken;

            }
            else
            {
                PowerBIPanel.Visible = false;
            }
        }

        protected void SignInButton_Click(object sender, EventArgs e)
        {
            //Create a query string
            //Create a sign-in NameValueCollection for query string
            var @params = new NameValueCollection
            {
                //Azure AD will return an authorization code. 
                //See the Redirect class to see how "code" is used to AcquireTokenByAuthorizationCode
                {"response_type", "code"},

                //Client ID is used by the application to identify themselves to the users that they are requesting permissions from. 
                //You get the client id when you register your Azure app.
                {"client_id", "6a8322b8-c391-44da-b040-8d4bf5bf954e"},

                // The resource Uri to the Power BI resource to be authorized. You must use this exact Uri.
                {"resource", "https://analysis.windows.net/powerbi/api"},

                // After user authenticates, Azure AD will redirect back to the web app
                // A redirect uri gives AAD more details about the specific application that it will authenticate.
                {"redirect_uri", "http://localhost:13526/Redirect"}
            };

            // Create sign-in query string
            var queryString = HttpUtility.ParseQueryString(string.Empty);
            queryString.Add(@params);

            // Redirect authority
            // Authority Uri is an Azure resource that takes a client id to get an Access token
            string authorityUri = "https://login.windows.net/common/oauth2/authorize/";
            Response.Redirect(String.Format("{0}?{1}", authorityUri, queryString));
        }

        public bool doSomething()
        {
            return false;
        }
    }

    //  Auth Key oWhLA+JzsRRzOXEVPR41dMsMS0YgvVgyg2XoE2tctQI=
}