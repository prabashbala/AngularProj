package uk.co.balasuriya.SparkforJira;

import static spark.Spark.get;

import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.net.HttpURLConnection;
import java.net.URL;

import spark.servlet.SparkApplication;

public class JiraServiceHandler implements SparkApplication {
    
    private final String USER_AGENT = "Mozilla/5.0";
    public void init() {

	get("/hi", (request, response) -> {
	  return  sendGet();
	    //return "Hello World!";
	});
    }
  
	private String sendGet() throws Exception {
	    
		String url = "http://sb-jira.brm.pri:8080/rest/api/latest/project";

		URL obj = new URL(url);
		HttpURLConnection con = (HttpURLConnection) obj.openConnection();

		// optional default is GET
		con.setRequestMethod("GET");

		//add request header
		con.setRequestProperty("User-Agent", USER_AGENT);
		String userPassword = "Prabash.Balasuriya:chandima1";
		String encoding = new sun.misc.BASE64Encoder().encode(userPassword.getBytes());
		con.setRequestProperty("Authorization", "Basic " + encoding);

		int responseCode = con.getResponseCode();
		System.out.println("\nSending 'GET' request to URL : " + url);
		System.out.println("Response Code : " + responseCode);

		BufferedReader in = new BufferedReader(
		        new InputStreamReader(con.getInputStream()));
		String inputLine;
		StringBuffer response = new StringBuffer();

		while ((inputLine = in.readLine()) != null) {
			response.append(inputLine);
		}
		in.close();

		//print result
		System.out.println(response.toString());
		return response.toString();

	}


}