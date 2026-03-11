// Lab 4 - 22AI471: Method overriding and overloading using Inheritance

class Animal {
    public void makeSound() {
        System.out.println("The animal makes a sound");
    }
    public void eat(String food) {
        System.out.println("The animal eats " + food);
    }
}

class Dog extends Animal {
    @Override
    public void makeSound() {
        System.out.println("The dog barks");
    }
    public void eat(String food, int quantity) {
        System.out.println("The dog eats " + quantity + " units of " + food);
    }
}

public class lab4 {
    public static void main(String[] args) {
        Animal myAnimal = new Animal();
        Dog myDog = new Dog();

        myAnimal.makeSound();
        myDog.makeSound();

        myAnimal.eat("food");
        myDog.eat("bone");
        myDog.eat("bone", 2);
    }
}
