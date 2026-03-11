// a) NumberFormatException b) StackOverflowError c) OutOfMemoryError

public class lab1 {
    public static void main(String[] args) {
        try {
            generateNumberFormatException();
        } catch (NumberFormatException e) {
            System.out.println("Caught NumberFormatException");
            e.printStackTrace();
        }
        try {
            generateStackOverflowError(1);
        } catch (StackOverflowError e) {
            System.out.println("Caught StackOverflowError");
            e.printStackTrace();
        }
        try {
            generateOutOfMemoryError();
        } catch (OutOfMemoryError e) {
            System.out.println("Caught OutOfMemoryError");
            e.printStackTrace();
        }
    }

    private static void generateNumberFormatException() {
        String invalidNumber = "abc";
        int number = Integer.parseInt(invalidNumber);
    }

    private static void generateStackOverflowError(int depth) {
        generateStackOverflowError(depth + 1);
    }

    private static void generateOutOfMemoryError() {
        // 1 million reachable objects - may throw OOM depending on heap
        Object[] array = new Object[1000000];
        for (int i = 0; i < array.length; i++) {
            array[i] = new Object();
        }
    }
}
