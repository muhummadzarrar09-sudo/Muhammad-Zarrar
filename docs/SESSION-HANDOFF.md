
### §10 · Addendum — the gremlin rolls FILES too (2026-09-06)

Beyond git-history rollbacks, the sandbox snapshot can restore an older
WORKING TREE mid-session (files that existed at turn start vanish —
pointer.ts disappeared from disk while being worked on; /home/user/social
and out/ were lost the same way). Survived by:

1. **The `.git` object store usually outlives the rollback.** Salvage:
   `git ls-tree -r <good-sha> --name-only` then
   `git cat-file -e <sha>:<path>` per blob. All 118 blobs of the final
   state survived and were grafted from a fresh clone
   (`git restore --source=<sha> --staged --worktree .`).
2. **`/tmp` is NOT part of the snapshot** — pristine clones and assets
   placed there survive; keep a working clone in /tmp when the repo
   state looks suspect.
3. **Verify merged state by TARBALL, not by PR state or contents APIs**
   (several REST endpoints served stale/cached views during the incident):
   `gh api repos/<o>/<r>/tarball/main | tar tz` and grep for the files.
4. A PR whose head commit is already an ancestor of main merges as a
   no-op — after any suspected corruption, re-check `git merge-base`
   before trusting a green merge.
