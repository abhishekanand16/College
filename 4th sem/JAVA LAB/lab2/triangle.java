/**
 * triangle class with 2 constructors (no this() used).
 * Constructor 1: no-arg, sets default sides.
 * Constructor 2: takes three side lengths.
 */
public class triangle {
    private double sideA;
    private double sideB;
    private double sideC;

    // Constructor 1: no-argument constructor (default equilateral triangle)
    public triangle() {
        sideA = 1.0;
        sideB = 1.0;
        sideC = 1.0;
    }

    // Constructor 2: three-argument constructor (custom sides)
    public triangle(double a, double b, double c) {
        sideA = a;
        sideB = b;
        sideC = c;
    }

    public double getSideA() {
        return sideA;
    }

    public double getSideB() {
        return sideB;
    }

    public double getSideC() {
        return sideC;
    }

    public double perimeter() {
        return sideA + sideB + sideC;
    }

    public double area() {
        double s = perimeter() / 2;
        return Math.sqrt(s * (s - sideA) * (s - sideB) * (s - sideC));
    }

    @Override
    public String toString() {
        return String.format("triangle(sides: %.2f, %.2f, %.2f)", sideA, sideB, sideC);
    }

    public static void main(String[] args) {
        triangle t1 = new triangle();
        triangle t2 = new triangle(3.0, 4.0, 5.0);

        System.out.println("triangle 1 (default): " + t1);
        System.out.println("  Perimeter: " + t1.perimeter() + ", Area: " + t1.area());

        System.out.println("triangle 2 (3, 4, 5): " + t2);
        System.out.println("  Perimeter: " + t2.perimeter() + ", Area: " + t2.area());
    }
}
