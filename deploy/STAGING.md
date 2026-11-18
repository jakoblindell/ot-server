# Staging deploys

Every merge into `web-client-792` goes to staging by itself (ot-server#34):

1. **Build:** GitHub Actions (`.github/workflows/deploy-staging.yml`) builds
   the `server`, `site` and `web` images once and pushes them to GitHub's
   registry, tagged with the commit: `ghcr.io/jakoblindell/ot-server/server:sha-<commit>`.
2. **Deploy:** it logs in to the staging host over SSH with a deploy key that
   can only run `deploy/staging-deploy.sh`. That script checks out the commit,
   pulls the images and restarts what changed.

**Actions › Deploy staging › Run workflow** deploys again. Use it after an
ot-client merge: the web image takes the latest browser build of the client.
(GitHub offers "Run workflow" only for workflows on the repository's default
branch, so this needs `web-client-792` to be the default branch.)

The images are built once, so production (later) runs exactly what was
tested on staging.

## Setting it up (once)

On the staging host, as the user that owns `/srv/ot-server` (in the
`docker` group):

**1. The deploy key.** It can only run the deploy script (`restrict` turns off
terminals and forwarding).

```sh
ssh-keygen -t ed25519 -N "" -C staging-deploy -f ~/staging-deploy
echo "command=\"/srv/ot-server/deploy/staging-deploy.sh\",restrict $(cat ~/staging-deploy.pub)" >> ~/.ssh/authorized_keys
cat ~/staging-deploy
```

Copy everything `cat` printed (from `-----BEGIN` to `-----END ... KEY-----`)
into GitHub: **ot-server › Settings › Secrets and variables › Actions ›
New repository secret**, named `STAGING_SSH_KEY`. Then delete the files on
the host:

```sh
rm ~/staging-deploy ~/staging-deploy.pub
```

**2. The host's address and key,** as repository *variables* (same page,
Variables tab): they're not secret.

| Variable | Value |
|---|---|
| `STAGING_HOST` | the host's address, e.g. `2.29.166.134` |
| `STAGING_HOST_KEY` | the output of `cut -d' ' -f1,2 /etc/ssh/ssh_host_ed25519_key.pub` |

The workflow only connects to a host with exactly that key.

**3. Deploy:** Actions › Deploy staging › Run workflow.

The SSH user in the workflow is `jakob`; change it there for another host.

## Notes

- `.env`, `secrets/` and `backups/` are not in git and stay as they are. Other
  hand edits on the host to tracked files are dropped at the next deploy.
- `.env` gets `IMAGES` and `IMAGE_TAG`, so a manual `docker compose up -d`
  keeps running the deployed images. To build on the host again instead,
  remove those two lines.
- Images unused for a week are pruned on each deploy.
- When this repository becomes private, the host needs read access to it for
  `git fetch` (a read-only deploy key in the repository settings).
