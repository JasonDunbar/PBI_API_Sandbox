(function() {
window["JST"] = window["JST"] || {};

window["JST"]["dashboard/index.html"] = function(obj) {
obj || (obj = {});
var __t, __p = '';
with (obj) {
__p += '<div class="row">\r\n    <div class="large-12 columns"><p>your token is: <textarea>' +
((__t = (auth)) == null ? '' : __t) +
'</textarea></p></div>\r\n    <div class="large-12 columns">\r\n        <h3>User Guide</h3>\r\n        <ol>\r\n            <li>Hitting the \'Get Dashboards\' button will fill the Dashboards dropdown with the dashboards that you have access to in Power BI.\r\n                It will also refresh the Tiles dropdown to show the Tiles availaible from the selected Dashboard.</li>\r\n            <li>Selecting a dashboard from the list will refresh the Tils dropdown, loading in the Tiles for the newly selected dashboard.</li>\r\n            <li>Select a Tile from the dropdown to have that tile displayed in the iframe below.</li>\r\n            <li>Hovering over the Power BI tile will display the Tool Tips; Clicking will open the dashboard in a new window.</li>\r\n        </ol>\r\n        For each request, the response is put in the text box below.\r\n    </div>\r\n    <select class="large-12 columns" id="dashboard-elements">\r\n\r\n\r\n\r\n    </select>\r\n</div>';

}
return __p
}})();
(function() {
window["JST"] = window["JST"] || {};

window["JST"]["dashboard/tile.html"] = function(obj) {
obj || (obj = {});
var __t, __p = '';
with (obj) {
__p +=
((__t = ( displayName )) == null ? '' : __t);

}
return __p
}})();
(function() {
window["JST"] = window["JST"] || {};

window["JST"]["login/index.html"] = function(obj) {
obj || (obj = {});
var __t, __p = '';
with (obj) {
__p += '<div class="row">\r\n    <div class="large-12 columns"><h2>Getting the auth token</h2></div>\r\n    <div class="large-12 columns"><h4>Please login in the popup window with your account</h4></div>\r\n    <div class="large-12 columns"><em>if you can\'t see the popup, make sure you have allow the popup to open.</em></div>\r\n</div>\r\n<div class="subheader"></div>\r\n<div class="row">\r\n    <div class="large-3 columns"><b>Your Access Token</b></div>\r\n    <div class="large-9 columns">' +
((__t = ( auth )) == null ? '' : __t) +
'</div>\r\n</div>';

}
return __p
}})();