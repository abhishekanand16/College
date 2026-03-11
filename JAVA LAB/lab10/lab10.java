// Lab 10 - 22AI471: Servlet that uses Cookies for visit count (standalone demo)

public class lab10 {
    static int visitCount = 0;

    public static void main(String[] args) {
        visitCount++;
        System.out.println("Visit Counter Servlet (run in Tomcat for full version)");
        System.out.println("You have visited this page " + visitCount + " time(s).");
    }
}
