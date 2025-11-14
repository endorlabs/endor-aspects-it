# Endor Aspects Integration Test Suite

## Purpose

This repository contains integration tests for Endor Aspects across multiple child workspaces.

## Structure

Test workspaces are organized by ruleset and version:

```
rules_<name>/<version>/
```

Examples:
- `rules_go/0.42.0/` - Go Workspace using rules_go@0.42.0
- `rules_rust/0.40.0/` - Rust Workspace using rules_rust@0.40.0

Each version directory contains a complete Bazel workspace with testable targets.

**Note:** Test workspaces are listed in `.bazelignore` to exclude them from the main workspace.

## Adding New Tests

1. Create directory: `rules_<name>/<version>/`
2. Set up Bazel workspace with test cases
3. Add path to `.bazelignore`

