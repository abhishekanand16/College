print("Q12. Hierarchical Clustering with Dendrogram and Comparison to K-Means")

import matplotlib.pyplot as plt
from sklearn.datasets import load_iris
from sklearn.cluster import KMeans, AgglomerativeClustering
from scipy.cluster.hierarchy import dendrogram, linkage
from sklearn.metrics import adjusted_rand_score

iris = load_iris()
X = iris.data
y_true = iris.target
link = linkage(X, method="ward")
plt.figure(figsize=(10, 5))
dendrogram(link, truncate_mode="level", p=3)
plt.title("Dendrogram")
plt.xlabel("Samples")
plt.ylabel("Distance")
plt.show()

hc = AgglomerativeClustering(n_clusters=3, linkage="ward")
hc_labels = hc.fit_predict(X)
kmeans = KMeans(n_clusters=3, random_state=42, n_init=10)
km_labels = kmeans.fit_predict(X)
ari_hc = adjusted_rand_score(y_true, hc_labels)
ari_km = adjusted_rand_score(y_true, km_labels)

print(f"Hierarchical Clustering ARI: {ari_hc:.4f}")
print(f"K-Means ARI: {ari_km:.4f}")
