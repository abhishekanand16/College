// Lab 5 - 22AI471: Multi-thread - generator, square (even), cube (odd)

import java.util.Random;

class SharedNumber {
    private int number;
    private boolean available = false;

    public synchronized void setNumber(int n) throws InterruptedException {
        while (available) wait();
        number = n;
        available = true;
        notifyAll();
    }

    public synchronized int getAndConsume(boolean wantEven) throws InterruptedException {
        while (!available || (number % 2 == 0) != wantEven) wait();
        available = false;
        int n = number;
        notifyAll();
        return n;
    }
}

public class lab5 {
    public static void main(String[] args) {
        SharedNumber shared = new SharedNumber();
        Random r = new Random();

        Thread gen = new Thread(() -> {
            for (int i = 0; i < 6; i++) {
                try {
                    int n = r.nextInt(100);
                    System.out.println("Generated number: " + n);
                    shared.setNumber(n);
                    Thread.sleep(1000);
                } catch (InterruptedException e) {}
            }
        });

        Thread square = new Thread(() -> {
            while (true) {
                try {
                    int n = shared.getAndConsume(true);
                    System.out.println("Square of " + n + " is " + (n * n));
                } catch (InterruptedException e) { break; }
            }
        });

        Thread cube = new Thread(() -> {
            while (true) {
                try {
                    int n = shared.getAndConsume(false);
                    System.out.println("Cube of " + n + " is " + (n * n * n));
                } catch (InterruptedException e) { break; }
            }
        });

        gen.start();
        square.start();
        cube.start();
        try { gen.join(); } catch (InterruptedException e) {}
        System.exit(0);
    }
}
