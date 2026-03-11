// Lab 12 - 22AI471
// 12a) Handle HTTP request and HTTP response
// Using Java 11+ HttpClient for demo (no servlet container needed)

import java.net.URI;
import java.net.http.HttpClient;
import java.net.http.HttpRequest;
import java.net.http.HttpResponse;

public class lab12 {
    public static void main(String[] args) throws Exception {
        System.out.println("--- Lab 12: HTTP Request & Response ---");
        HttpClient client = HttpClient.newHttpClient();
        HttpRequest req = HttpRequest.newBuilder()
                .uri(URI.create("https://httpbin.org/get"))
                .GET()
                .build();
        HttpResponse<String> resp = client.send(req, HttpResponse.BodyHandlers.ofString());
        System.out.println("Status: " + resp.statusCode());
        System.out.println("Headers: " + resp.headers().map());
        System.out.println("Body (first 500 chars): " + resp.body().substring(0, Math.min(500, resp.body().length())) + "...");
    }
}
