package uk.co.balasuriya.SparkforJira;

import static spark.Spark.get;

import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.net.HttpURLConnection;
import java.net.URL;

import spark.servlet.SparkApplication;

public class JiraServiceHandler implements SparkApplication {

    private final String USER_AGENT = "Mozilla/5.0";
    private final String GET_PROJECTS = "http://sb-jira.brm.pri:8080/rest/api/latest/project";
    private final String GET_PROJECT = "http://sb-jira.brm.pri:8080/rest/api/latest/search?jql=project=";
    private final String GET_ISSUES = "http://sb-jira.brm.pri:8080/rest/api/latest/issue/";
    

    public void init() {

	get("/getProjects", (request, response) -> {
	    return sendGet(GET_PROJECTS);
	    });

	get("/getProject/:projectid", (request, response) -> {
	    return sendGet(GET_PROJECT+request.params("projectid"));
	    });

	get("/getIssue/:issueid", (request, response) -> {
	    return sendGet(GET_ISSUES+request.params("issueid"));
	    });

    }

    private String sendGet(String url) throws Exception {

	/*String url = "http://sb-jira.brm.pri:8080/rest/api/latest/project";*/

	URL obj = new URL(url);
	HttpURLConnection con = (HttpURLConnection) obj.openConnection();

	// optional default is GET
	con.setRequestMethod("GET");

	// add request header
	con.setRequestProperty("User-Agent", USER_AGENT);
	String userPassword = "Prabash.Balasuriya:welcome1";
	String encoding = new sun.misc.BASE64Encoder().encode(userPassword.getBytes());
	con.setRequestProperty("Authorization", "Basic " + encoding);

	int responseCode = con.getResponseCode();
	System.out.println("\nSending 'GET' request to URL : " + url);
	System.out.println("Response Code : " + responseCode);

	BufferedReader in = new BufferedReader(new InputStreamReader(con.getInputStream()));
	String inputLine;
	StringBuffer response = new StringBuffer();

	while ((inputLine = in.readLine()) != null) {
	    response.append(inputLine);
	}
	in.close();

	// print result
	System.out.println(response.toString());
	return response.toString();

    }

}
