  function fetchHubSpotData2() {
  var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
  var apiUrl = 'https://api.hubspot.com/crm/v3/objects/companies/?properties=name&properties=domain&properties=industry&properties=city&archived=false&properties=zip&properties=state&properties=linkedin_company_page'; // Replace with your HubSpot endpoint
  var accessToken = 'pat-na1-d7b3cd74-9f92-4bd6-8710-a9a122aa79a3'; // Replace with your HubSpot access token
  
  try {
    // Make the API request
    var response = UrlFetchApp.fetch(apiUrl, {
      headers: {
        'Authorization': 'Bearer ' + accessToken
      }
    });
    
    // Parse the response
    var data = JSON.parse(response.getContentText());
    
    // Log each company in a structured format
    data.results.forEach(function(company) {
      var id = company.id;
      var name = company.properties.name;
      var domain = company.properties.domain;
      var industry = company.properties.industry;
      var city = company.properties.city;
      var state = company.properties.state;
      var zip = company.properties.zip;
      var linkedin_company_page = company.properties.linkedin_company_page;
    });
    
    // Extract data for Google Sheet
    var headers = ['Company ID', 'Name', 'Domain', 'Industry', 'City', 'State', 'Postal Code', 'Linkedin'];
    var values = data.results.map(function(company) {
      return [
        company.id,
        company.properties.name,
        company.properties.domain,
        company.properties.industry,
        company.properties.city,
        company.properties.state,
        company.properties.zip,
        company.properties.linkedin_company_page
      ];
    });
    
    // Clear the sheet and set headers and data
    sheet.clear();
    sheet.appendRow(headers);
    sheet.getRange(2, 1, values.length, headers.length).setValues(values);
    
  } catch (e) {
    // Log any errors that occur
    Logger.log('Error: ' + e.toString());
  }
}
