print("Q1. One-Sample Z-Test with Confidence Interval")

import numpy as np
from scipy import stats

np.random.seed(42)
data = np.random.normal(loc=105, scale=15, size=50)
population_mean = 100
sample_mean = np.mean(data)
sample_std = np.std(data, ddof=1)
n = len(data)
z_stat = (sample_mean - population_mean) / (sample_std / np.sqrt(n))
p_value = 2 * (1 - stats.norm.cdf(abs(z_stat)))
ci = stats.norm.interval(0.95, loc=sample_mean, scale=sample_std / np.sqrt(n))

print(f"Sample Mean: {sample_mean:.4f}")
print(f"Z-statistic: {z_stat:.4f}")
print(f"P-value: {p_value:.4f}")
print(f"95% Confidence Interval: ({ci[0]:.4f}, {ci[1]:.4f})")
