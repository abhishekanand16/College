// Source code is decompiled from a .class file using FernFlower decompiler (from Intellij IDEA).
import java.util.Scanner;

public class lab1 {
   public lab1() {
   }

   public static void part1a() {
      System.out.println("--- Part 1a: Data types ---");
      char var0 = 'G';
      byte var1 = 89;
      byte var2 = 4;
      byte var3 = 56;
      double var4 = 4.355453532;
      float var6 = 4.7333436F;
      long var7 = 12121L;
      System.out.println("char: " + var0);
      System.out.println("integer: " + var1);
      System.out.println("byte: " + var2);
      System.out.println("short: " + var3);
      System.out.println("float: " + var6);
      System.out.println("double: " + var4);
      System.out.println("long: " + var7);
   }

   public static void part1b() {
      System.out.println("\n--- Part 1b: Char to String ---");
      char var0 = 'G';
      String var1 = Character.toString(var0);
      String var2 = String.valueOf(var0);
      System.out.println("Char to String using Character.toString(): " + var1);
      System.out.println("Char to String using String.valueOf(): " + var2);
   }

   public static int isEvenOrOdd(int var0) {
      return var0 % 2;
   }

   public static void part1c(String[] var0) {
      System.out.println("\n--- Part 1c: Even or Odd ---");
      int var1;
      if (var0.length > 0) {
         var1 = Integer.parseInt(var0[0]);
         System.out.println("From command line: " + var1);
      } else {
         Scanner var2 = new Scanner(System.in);
         System.out.print("Enter a number: ");
         var1 = var2.nextInt();
      }

      if (isEvenOrOdd(var1) == 0) {
         System.out.println(var1 + " is even");
      } else {
         System.out.println(var1 + " is odd");
      }

   }

   public static void main(String[] var0) {
      part1a();
      part1b();
      part1c(var0);
   }
}
