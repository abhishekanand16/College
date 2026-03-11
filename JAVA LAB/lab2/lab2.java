// Lab 2 - 22AI471: Implement this() for Cube class with 3 constructors

public class lab2 {
    private double sideLength;

    public lab2() {
        this(1.0);
        System.out.println("Default constructor called");
    }

    public lab2(double sideLength) {
        this(sideLength, true);
        System.out.println("Single parameter constructor called");
    }

    public lab2(double sideLength, boolean dummyFlag) {
        this.sideLength = sideLength;
        System.out.println("Two parameter constructor called");
    }

    public double getSideLength() {
        return sideLength;
    }

    public double calculateVolume() {
        return Math.pow(sideLength, 3);
    }

    public static void main(String[] args) {
        System.out.println("--- Cube1 (default) ---");
        lab2 cube1 = new lab2();
        System.out.println("Cube1 side length: " + cube1.getSideLength());
        System.out.println("Cube1 volume: " + cube1.calculateVolume());

        System.out.println("\n--- Cube2 (single param) ---");
        lab2 cube2 = new lab2(3.0);
        System.out.println("Cube2 side length: " + cube2.getSideLength());
        System.out.println("Cube2 volume: " + cube2.calculateVolume());

        System.out.println("\n--- Cube3 (two params) ---");
        lab2 cube3 = new lab2(4.0, true);
        System.out.println("Cube3 side length: " + cube3.getSideLength());
        System.out.println("Cube3 volume: " + cube3.calculateVolume());
    }
}
