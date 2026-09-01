import javax.swing.*;
import java.awt.*;
import java.awt.event.*;

public class lab7 extends JFrame implements ActionListener {
    private JButton button;
    private JLabel label;

    public lab7() {
        setTitle("Simple GUI (Applet-style)");
        setSize(300, 200);
        setDefaultCloseOperation(JFrame.EXIT_ON_CLOSE);
        setLayout(new FlowLayout());

        button = new JButton("Click Me");
        button.addActionListener(this);
        label = new JLabel("Button not clicked yet.");
        add(button);
        add(label);
        setVisible(true);
    }

    @Override
    public void actionPerformed(ActionEvent e) {
        label.setText("Button clicked!");
    }

    public static void main(String[] args) {
        SwingUtilities.invokeLater(() -> new lab7());
    }
}
