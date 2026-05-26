print("Q4. Chi-Square Test of Independence with Effect Size")

import numpy as np
from scipy.stats import chi2_contingency

observed = np.array([[30, 20, 10], [25, 25, 20], [15, 30, 25]])
chi2, p_value, dof, expected = chi2_contingency(observed)
n = observed.sum()
cramers_v = np.sqrt(chi2 / (n * (min(observed.shape) - 1)))

print(f"Chi-square statistic: {chi2:.4f}")
print(f"P-value: {p_value:.4f}")
print(f"Degrees of freedom: {dof}")
print(f"Cramer's V: {cramers_v:.4f}")
print("Expected frequencies:")
print(expected)
