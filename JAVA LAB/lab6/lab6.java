import java.awt.*;
import java.awt.event.*;

public class lab6 extends Frame implements ActionListener {
    private Button button;
    private Label label;

    public lab6() {
        setTitle("Simple AWT Event Handling Example");
        setSize(300, 200);
        setLayout(new FlowLayout());

        button = new Button("Click Me");
        button.addActionListener(this);
        label = new Label("Button not clicked yet.");
        add(button);
        add(label);

        addWindowListener(new WindowAdapter() {
            public void windowClosing(WindowEvent e) { System.exit(0); }
        });
        setVisible(true);
    }

    @Override
    public void actionPerformed(ActionEvent e) {
        label.setText("Button clicked!");
    }

    public static void main(String[] args) {
        new lab6();
    }
}
