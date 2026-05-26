print("Q7. Logistic Regression with Threshold Tuning")

import numpy as np
from sklearn.datasets import make_classification
from sklearn.model_selection import train_test_split
from sklearn.linear_model import LogisticRegression
from sklearn.metrics import accuracy_score, precision_score, recall_score, f1_score

X, y = make_classification(n_samples=200, n_features=4, random_state=42)
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.3, random_state=42)
model = LogisticRegression(random_state=42, max_iter=1000)
model.fit(X_train, y_train)
probs = model.predict_proba(X_test)[:, 1]
best_threshold = 0.5
best_f1 = 0
for threshold in np.arange(0.1, 1.0, 0.05):
    preds = (probs >= threshold).astype(int)
    f1 = f1_score(y_test, preds)
    if f1 > best_f1:
        best_f1 = f1
        best_threshold = threshold
preds = (probs >= best_threshold).astype(int)

print(f"Best Threshold: {best_threshold:.2f}")
print(f"Accuracy: {accuracy_score(y_test, preds):.4f}")
print(f"Precision: {precision_score(y_test, preds):.4f}")
print(f"Recall: {recall_score(y_test, preds):.4f}")
print(f"F1 Score: {f1_score(y_test, preds):.4f}")
