# mehdimohebbi.ir

Personal academic website, built with [Hugo](https://gohugo.io) (no theme, just
`layouts/` and `assets/css/main.css`) and deployed to GitHub Pages by
`.github/workflows/hugo.yaml` on every push to `main`.

## Where things come from

| File | Edited by |
| --- | --- |
| `data/profile.json` | generated: `uv run apply27 site` in the apply27 repo (education, experience, publications, awards, skills, links) |
| `static/Mohebbi_Mehdi_CV.pdf` | generated: same command copies the CV built by `apply27 cv` |
| `content/_index.md` | by hand: the bio in the About section |
| `data/news.toml` | by hand: News items |
| `hugo.toml` | by hand: tagline, meta description, photo path |
| `assets/images/photo.jpg` | by hand: your photo; Hugo crops and resizes it (`photo` in `hugo.toml`) |

## Update the site

```bash
cd ../apply27 && uv run apply27 cv && uv run apply27 site
cd ../mehdimhb.github.io && hugo server   # preview at http://localhost:1313
git add -A && git commit -m "Update site" && git push
```
