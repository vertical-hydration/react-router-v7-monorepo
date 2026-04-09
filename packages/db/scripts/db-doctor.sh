#!/usr/bin/env sh
set -eu

APP_STATE_DIR="../../apps/reserve/.wrangler/state/v3/d1/miniflare-D1DatabaseObject"
ROOT_STATE_DIR="../../.wrangler/state/v3/d1/miniflare-D1DatabaseObject"

REQUIRED_TABLES="users sessions accounts verifications todos d1_migrations"

print_store_report() {
  label="$1"
  state_dir="$2"

  echo ""
  echo "== $label =="
  echo "State dir: $state_dir"

  if [ ! -d "$state_dir" ]; then
    echo "Status: missing directory"
    return 0
  fi

  db_count=$(find "$state_dir" -maxdepth 1 -type f -name '*.sqlite' | wc -l | tr -d ' ')
  if [ "$db_count" = "0" ]; then
    echo "Status: no sqlite files"
    return 0
  fi

  echo "SQLite files: $db_count"

  for db_file in "$state_dir"/*.sqlite; do
    [ -f "$db_file" ] || continue

    mod_epoch=$(stat -f "%m" "$db_file" 2>/dev/null || echo "0")
    file_size=$(stat -f "%z" "$db_file" 2>/dev/null || echo "0")

    echo ""
    echo "DB: $db_file"
    echo "  modified_epoch: $mod_epoch"
    echo "  size_bytes: $file_size"

    tables=$(sqlite3 "$db_file" '.tables' || true)
    if [ -z "$tables" ]; then
      echo "  tables: (none)"
      continue
    fi

    echo "  tables: $tables"

    missing=""
    for table in $REQUIRED_TABLES; do
      exists=$(sqlite3 "$db_file" "SELECT count(*) FROM sqlite_master WHERE type='table' AND name='$table';" 2>/dev/null || echo "0")
      if [ "$exists" != "1" ]; then
        if [ -z "$missing" ]; then
          missing="$table"
        else
          missing="$missing, $table"
        fi
      fi
    done

    if [ -z "$missing" ]; then
      echo "  required_tables: OK"
    else
      echo "  required_tables: MISSING ($missing)"
    fi
  done
}

echo "Local D1 doctor"
echo "Required tables: $REQUIRED_TABLES"

print_store_report "APP STORE (reserve runtime)" "$APP_STATE_DIR"
print_store_report "ROOT STORE" "$ROOT_STATE_DIR"

echo ""
echo "If required tables are missing in APP STORE, run:"
echo "pnpm --filter @workspace/db db:apply"
