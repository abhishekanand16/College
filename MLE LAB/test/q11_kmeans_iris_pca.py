print("Q11. K-Means Clustering on Iris with PCA Visualisation")

import matplotlib.pyplot as plt
from sklearn.datasets import load_iris
from sklearn.cluster import KMeans
from sklearn.decomposition import PCA

iris = load_iris()
X = iris.data
pca = PCA(n_components=2, random_state=42)
X_pca = pca.fit_transform(X)
kmeans = KMeans(n_clusters=3, random_state=42, n_init=10)
labels = kmeans.fit_predict(X)

plt.figure(figsize=(8, 6))
scatter = plt.scatter(X_pca[:, 0], X_pca[:, 1], c=labels, cmap="viridis", alpha=0.7)
plt.xlabel("PC1")
plt.ylabel("PC2")
plt.title("K-Means Clustering on Iris (PCA)")
plt.colorbar(scatter)
plt.show()

print(f"Explained variance ratio: {pca.explained_variance_ratio_}")
