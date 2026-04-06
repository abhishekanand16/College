/**
 * Demo: Copy constructor WITH this() and WITHOUT this().
 * TriangleA: copy constructor uses this() to call the 3-arg constructor.
 * TriangleB: copy constructor assigns fields directly (no this()).
 */
public class CopyConstructor {

    // ----- TriangleA: copy constructor USES this() -----
    static class TriangleA {
        private double sideA, sideB, sideC;

        public TriangleA() {
            sideA = 1.0;
            sideB = 1.0;
            sideC = 1.0;
        }

        public TriangleA(double a, double b, double c) {
            sideA = a;
            sideB = b;
            sideC = c;
        }

        // Copy constructor WITH this() - delegates to 3-arg constructor
        public TriangleA(TriangleA other) {
            this(other.sideA, other.sideB, other.sideC);
        }

        public String toString() {
            return String.format("TriangleA(%.2f, %.2f, %.2f)", sideA, sideB, sideC);
        }
    }

    // ----- TriangleB: copy constructor WITHOUT this() -----
    static class TriangleB {
        private double sideA, sideB, sideC;

        public TriangleB() {
            sideA = 1.0;
            sideB = 1.0;
            sideC = 1.0;
        }

        public TriangleB(double a, double b, double c) {
            sideA = a;
            sideB = b;
            sideC = c;
        }

        // Copy constructor WITHOUT this() - assigns fields directly
        public TriangleB(TriangleB other) {
            sideA = other.sideA;
            sideB = other.sideB;
            sideC = other.sideC;
        }

        public String toString() {
            return String.format("TriangleB(%.2f, %.2f, %.2f)", sideA, sideB, sideC);
        }
    }

    public static void main(String[] args) {
        System.out.println("--- Copy constructor WITH this() ---");
        TriangleA origA = new TriangleA(3.0, 4.0, 5.0);
        TriangleA copyA = new TriangleA(origA);
        System.out.println("Original: " + origA);
        System.out.println("Copy:     " + copyA);

        System.out.println("\n--- Copy constructor WITHOUT this() ---");
        TriangleB origB = new TriangleB(5.0, 12.0, 13.0);
        TriangleB copyB = new TriangleB(origB);
        System.out.println("Original: " + origB);
        System.out.println("Copy:     " + copyB);
    }
}
