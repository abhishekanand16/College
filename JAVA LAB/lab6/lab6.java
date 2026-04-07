import java.awt.*;
import java.awt.event.*;
import java.io.File;

public class lab6 extends Frame implements ActionListener {
    private Button button;
    private Label label;
    private Image backgroundImage;

    public lab6() {
        setTitle("Simple AWT Event Handling Example");
        setSize(500, 300);
        setLayout(new FlowLayout());
        setBackground(new Color(173, 216, 230));
        backgroundImage = Toolkit.getDefaultToolkit().getImage("background.jpg");

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

    @Override
    public void paint(Graphics g) {
        if (new File("background.jpg").exists()) {
            g.drawImage(backgroundImage, 0, 0, getWidth(), getHeight(), this);
        } else {
            super.paint(g);
            return;
        }

        super.paint(g);
    }

    public static void main(String[] args) {
        new lab6();
    }
}
