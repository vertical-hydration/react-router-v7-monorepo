#!/usr/bin/env sh
set -eu

APP_STATE_DIR="../../apps/reserve/.wrangler/state/v3/d1/miniflare-D1DatabaseObject"
ROOT_STATE_DIR="../../.wrangler/state/v3/d1/miniflare-D1DatabaseObject"

pick_migrated_db_from_dir() {
  state_dir="$1"
  for db_file in "$state_dir"/*.sqlite; do
    [ -f "$db_file" ] || continue
    if sqlite3 "$db_file" "SELECT name FROM sqlite_master WHERE type='table' AND name='d1_migrations';" | grep -q "d1_migrations"; then
      echo "$db_file"
      return 0
    fi
  done
  return 1
}

pick_latest_db_from_dir() {
  state_dir="$1"
  ls -t "$state_dir"/*.sqlite 2>/dev/null | head -n 1 || true
}

LOCAL_DB_PATH="$(pick_migrated_db_from_dir "$APP_STATE_DIR" || true)"

if [ -z "$LOCAL_DB_PATH" ]; then
  LOCAL_DB_PATH="$(pick_migrated_db_from_dir "$ROOT_STATE_DIR" || true)"
fi

if [ -z "$LOCAL_DB_PATH" ]; then
  LOCAL_DB_PATH="$(pick_latest_db_from_dir "$APP_STATE_DIR")"
fi

if [ -z "$LOCAL_DB_PATH" ]; then
  LOCAL_DB_PATH="$(pick_latest_db_from_dir "$ROOT_STATE_DIR")"
fi

if [ -z "$LOCAL_DB_PATH" ]; then
  echo "No local D1 sqlite database found under $APP_STATE_DIR or $ROOT_STATE_DIR" >&2
  echo "Run: pnpm --filter @workspace/db db:apply" >&2
  exit 1
fi

echo "LOCAL_DB_PATH=$LOCAL_DB_PATH"
echo "TABLES:"
sqlite3 "$LOCAL_DB_PATH" '.tables'
