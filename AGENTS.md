# AGENTS.md

## Working on an issue (Mandatory)

Several people (and their Claude sessions) work on this repository. To never
do the same work twice:

1. **Claim before starting.** Look at the issue first: if someone else is
   assigned, do not start; ask them. Otherwise assign yourself
   (`gh issue edit N --add-assignee @me`); the "in progress" label follows
   automatically.
2. **One branch per issue**, from `web-client-792`: `issue-N-short-name`.
   Push it and open a **draft pull request** early, with "Closes #N" in the
   description, so work in progress is visible.
3. **Merge through the pull request** into `web-client-792`; no direct
   pushes. The "Issue claim" check fails when the pull request names no
   issue or the issue is not assigned to its author.
4. **Done:** merge, then the issue closes with a short summary. Giving up:
   unassign yourself and say what is left in a comment.
5. Small fixes without an issue: open one first.
