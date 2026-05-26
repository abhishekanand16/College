print("Q6. Multiple Linear Regression with VIF and Feature Importance")

import numpy as np
import pandas as pd
from sklearn.linear_model import LinearRegression
from statsmodels.stats.outliers_influence import variance_inflation_factor
import statsmodels.api as sm

np.random.seed(42)
n = 100
X = pd.DataFrame(
    {
        "x1": np.random.rand(n) * 10,
        "x2": np.random.rand(n) * 10,
        "x3": np.random.rand(n) * 10,
    }
)
y = 5 + 2 * X["x1"] + 3 * X["x2"] + np.random.normal(0, 1, n)
X_const = sm.add_constant(X)
model = sm.OLS(y, X_const).fit()
vif_data = pd.DataFrame(
    {
        "Feature": X.columns,
        "VIF": [variance_inflation_factor(X.values, i) for i in range(X.shape[1])],
    }
)
lr = LinearRegression()
lr.fit(X, y)
importance = pd.DataFrame({"Feature": X.columns, "Coefficient": lr.coef_})

print(model.summary())
print("\nVIF:")
print(vif_data)
print("\nFeature Importance:")
print(importance)
