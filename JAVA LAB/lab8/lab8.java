// Lab 8 - 22AI471: GUI using Java Swing

import javax.swing.*;
import java.awt.*;
import java.awt.event.*;

public class lab8 {
    public static void main(String[] args) {
        JFrame frame = new JFrame("Simple Swing App");
        frame.setSize(300, 200);
        frame.setDefaultCloseOperation(JFrame.EXIT_ON_CLOSE);
        frame.setLayout(new FlowLayout());

        JButton button = new JButton("Click Me");
        JLabel label = new JLabel("Button not clicked yet.");

        button.addActionListener(e -> label.setText("Button clicked!"));

        frame.add(button);
        frame.add(label);
        frame.setVisible(true);
    }
}
