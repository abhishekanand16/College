print("Q3. One-Way ANOVA with Tukey's HSD Post-Hoc Test")

import numpy as np
from scipy import stats
from statsmodels.stats.multicomp import pairwise_tukeyhsd

np.random.seed(42)
group_a = np.random.normal(20, 3, 25)
group_b = np.random.normal(25, 3, 25)
group_c = np.random.normal(22, 3, 25)
data = np.concatenate([group_a, group_b, group_c])
labels = ["A"] * 25 + ["B"] * 25 + ["C"] * 25
f_stat, p_value = stats.f_oneway(group_a, group_b, group_c)
tukey = pairwise_tukeyhsd(data, labels, alpha=0.05)

print(f"F-statistic: {f_stat:.4f}")
print(f"P-value: {p_value:.4f}")
print(tukey)
