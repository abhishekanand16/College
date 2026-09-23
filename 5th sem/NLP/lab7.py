corpus = [
    "the student submitted the assignment before the deadline",
    "the students submitted their assignments on time",
    "the teacher checked the submitted assignments"
]

pairs = [
    ("student", "students"),
    ("assignment", "assignments"),
    ("teacher", "teachers")
]

def min_edit_distance(a, b):
    m, n = len(a), len(b)
    dp = [[0] * (n + 1) for _ in range(m + 1)]

    for i in range(m + 1):
        dp[i][0] = i

    for j in range(n + 1):
        dp[0][j] = j

    for i in range(1, m + 1):
        for j in range(1, n + 1):
            if a[i-1] == b[j-1]:
                dp[i][j] = dp[i-1][j-1]
            else:
                dp[i][j] = 1 + min(
                    dp[i-1][j],      # deletion
                    dp[i][j-1],      # insertion
                    dp[i-1][j-1]     # substitution
                )

    return dp[m][n]

print(f"{'Source':<15}{'Target':<15}{'Edit Distance':<15}")
print("-" * 45)

for source, target in pairs:
    distance = min_edit_distance(source, target)
    print(f"{source:<15}{target:<15}{distance:<15}")