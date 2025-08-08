sync-api:
    git submodule update --remote --merge
    bun run generate-types
