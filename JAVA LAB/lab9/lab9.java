import javax.swing.*;
import java.awt.*;
import java.awt.event.*;
import java.util.*;

public class lab9 extends JFrame {
    private JTextField nameField, ageField;
    private JTextArea displayArea;
    private java.util.List<String> rows = new ArrayList<>();

    public lab9() {
        setTitle("Database Operations");
        setSize(400, 300);
        setDefaultCloseOperation(JFrame.EXIT_ON_CLOSE);
        setLayout(new FlowLayout());

        add(new JLabel("Name:"));
        nameField = new JTextField(20);
        add(nameField);
        add(new JLabel("Age:"));
        ageField = new JTextField(3);
        add(ageField);

        JButton addButton = new JButton("Add");
        addButton.addActionListener(e -> addRecord());
        add(addButton);
        JButton deleteButton = new JButton("Delete");
        deleteButton.addActionListener(e -> deleteRecord());
        add(deleteButton);
        JButton displayButton = new JButton("Display");
        displayButton.addActionListener(e -> displayRecords());
        add(displayButton);
        JButton exitButton = new JButton("Exit");
        exitButton.addActionListener(e -> System.exit(0));
        add(exitButton);

        displayArea = new JTextArea(10, 30);
        add(new JScrollPane(displayArea));
        setVisible(true);
    }

    private void addRecord() {
        String name = nameField.getText();
        String ageStr = ageField.getText();
        try {
            int age = Integer.parseInt(ageStr);
            rows.add(name + " | " + age);
            displayArea.setText("Record added.");
        } catch (NumberFormatException e) {
            displayArea.setText("Error: Enter valid age.");
        }
    }

    private void deleteRecord() {
        String name = nameField.getText();
        rows.removeIf(s -> s.startsWith(name + " | "));
        displayArea.setText("Record deleted (if found).");
    }

    private void displayRecords() {
        if (rows.isEmpty()) displayArea.setText("(no records)");
        else displayArea.setText(String.join("\n", rows));
    }

    public static void main(String[] args) {
        SwingUtilities.invokeLater(() -> new lab9());
    }
}
