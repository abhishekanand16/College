import re

def draw(s):
    t = re.findall(r"\(|\)|[^\s()]+", s)
    def parse(i):
        i += 1; n = [t[i]]; i += 1
        while t[i] != ")":
            k, i = parse(i) if t[i] == "(" else (t[i], i + 1)
            n.append(k)
        return n, i + 1
    def place(n, c):
        if isinstance(n, str):
            return [n, c + len(n) // 2, 0], c + len(n) + 2
        kids, xs, ys = [], [], []
        for k in n[1:]:
            k, c = place(k, c)
            kids.append(k); xs.append(k[1]); ys.append(k[2])
        x = (xs[0] + xs[-1]) // 2
        return [n[0], x, max(ys) + 2, kids], max(c, x + len(n[0]))
    root, W = place(parse(0)[0], 2)
    H = root[2] + 1
    g = [[" "] * (W + 12) for _ in range(H)]
    def go(n):
        lab, x, y, *rest = n
        kids = rest[0] if rest else []
        r, a = H - 1 - y, max(0, x - len(lab) // 2)
        g[r][a:a + len(lab)] = list(lab)
        if not kids:
            return
        xs, br = [k[1] for k in kids], r + 1
        for col in range(min(xs), max(xs) + 1):
            g[br][col] = "_"
        g[br][x] = "|"
        for k in kids:
            for rr in range(br + 1, H - 1 - k[2]):
                g[rr][k[1]] = "|"
            go(k)
    go(root)
    print("\n".join("".join(r).rstrip() for r in g if any(c != " " for c in r)))

sent = "the old men and women sat near the bank"
parses = [
    "(S (NP (NP (Det the) (Adj old) (N men)) (Conj and) (N women)) (VP (V sat) (PP (P near) (NP (Det the) (N bank)))))",
    "(S (NP (Det the) (Adj old) (N men) (Conj and) (N women)) (VP (V sat) (PP (P near) (NP (Det the) (N bank)))))",
]
mean = ["Only the men are old; the women may not be.", "Both the men and the women are old."]
print("Sentence:", sent)
print("Parse trees: 2")
for i, (p, m) in enumerate(zip(parses, mean), 1):
    print(f"\n--- Parse {i} ---"); draw(p); print("Scope:", m)
print("\nLexical: 'bank' → Near the river bank (not a financial bank).")
