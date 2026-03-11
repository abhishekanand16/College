// Lab 11 - 22AI471
// 11a) Servlet that displays current system date and time
// 11b) Servlet that uses Cookies to store visit count
// Run servlet code in Tomcat. This file runs standalone to show the logic.

import java.util.Date;

public class lab11 {
    static int visitCount = 0;

    public static void main(String[] args) {
        System.out.println("--- Lab 11: Servlet logic (run in Tomcat for full servlet) ---");
        System.out.println("11a) Current Date & Time: " + new Date());
        visitCount++;
        System.out.println("11b) Visit count (cookie simulation): " + visitCount);
        System.out.println("Deploy DateServlet and CookieVisitServlet to Tomcat for HTTP.");
    }
}
