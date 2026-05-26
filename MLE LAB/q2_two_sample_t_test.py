print("Q2. Two-Sample T-Test with Variance Check and Effect Size")

import numpy as np
from scipy import stats

np.random.seed(42)
group1 = np.random.normal(50, 10, 30)
group2 = np.random.normal(55, 12, 30)
levene_stat, levene_p = stats.levene(group1, group2)
equal_var = levene_p > 0.05
t_stat, p_value = stats.ttest_ind(group1, group2, equal_var=equal_var)
pooled_std = np.sqrt(
    ((len(group1) - 1) * np.var(group1, ddof=1) + (len(group2) - 1) * np.var(group2, ddof=1))
    / (len(group1) + len(group2) - 2)
)
cohens_d = (np.mean(group1) - np.mean(group2)) / pooled_std

print(f"Levene statistic: {levene_stat:.4f}")
print(f"Levene p-value: {levene_p:.4f}")
print(f"Equal variance assumed: {equal_var}")
print(f"T-statistic: {t_stat:.4f}")
print(f"P-value: {p_value:.4f}")
print(f"Cohen's d: {cohens_d:.4f}")
