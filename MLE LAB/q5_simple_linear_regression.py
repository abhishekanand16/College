print("Q5. Simple Linear Regression with Residual Diagnostics")

import numpy as np
import matplotlib.pyplot as plt
from sklearn.linear_model import LinearRegression
from sklearn.metrics import r2_score, mean_squared_error
import statsmodels.api as sm

np.random.seed(42)
X = np.random.rand(100, 1) * 10
y = 3 + 2 * X.ravel() + np.random.normal(0, 2, 100)
model = LinearRegression()
model.fit(X, y)
y_pred = model.predict(X)
r2 = r2_score(y, y_pred)
rmse = np.sqrt(mean_squared_error(y, y_pred))
residuals = y - y_pred
X_sm = sm.add_constant(X)
sm_model = sm.OLS(y, X_sm).fit()

print(f"Coefficient: {model.coef_[0]:.4f}")
print(f"Intercept: {model.intercept_:.4f}")
print(f"R2 Score: {r2:.4f}")
print(f"RMSE: {rmse:.4f}")
print(sm_model.summary())

fig, axes = plt.subplots(1, 2, figsize=(10, 4))
axes[0].scatter(y_pred, residuals, alpha=0.6)
axes[0].axhline(0, color="red", linestyle="--")
axes[0].set_xlabel("Fitted Values")
axes[0].set_ylabel("Residuals")
axes[0].set_title("Residual Plot")
axes[1].scatter(X, y, alpha=0.6)
axes[1].plot(X, y_pred, color="red")
axes[1].set_xlabel("X")
axes[1].set_ylabel("y")
axes[1].set_title("Regression Line")
plt.tight_layout()
plt.show()
