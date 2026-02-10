# JavaScript Aspect Example

## How to Run

Find available targets in the workspace.

```sh
bazel query 'kind("js_library", //...)'
```

Pick a target and run the aspect.

```sh
bazel build <target> \
  --aspects=//aspect:js_library.bzl%endor_resolve_dependencies \
  --output_groups=endor_sca_info \
  --aspects_parameters="ref=main"
```

| Flag | Description |
|------|-------------|
| `--aspects` | Applies the `endor_resolve_dependencies` aspect to the target. |
| `--output_groups` | Requests the `endor_sca_info` output group from the aspect. |
| `--aspects_parameters` | Sets the `ref` attribute passed to the aspect. |

## How to Verify

Check the generated files.

```sh
find bazel-bin -name "*_resolved_dependencies.json"
```

Here is how you can expect the output for a First Party Target (`//src/components/organisms:organisms`) to look like.

```json
{
 "dependencies": [
  "@//:node_modules/@mui/icons-material",
  "@//:node_modules/@mui/material",
  "@//:node_modules/file-saver",
  "@//:node_modules/react",
  "@//:node_modules/react-dropzone",
  "@//:node_modules/react-hot-toast",
  "@//src/components/molecules:molecules",
  "@//src/utils:utils"
 ],
 "hide": false,
 "internal": false,
 "original_label": "@//src/components/organisms:organisms",
 "purl": "pkg:npm/organisms@main",
 "vendored": false
}
```

Note that `internal` is not set to `true` here. You can modify the aspect logic to configure this for first party targets.

Here is how you can expect the output for a Third Party Target (`.aspect_rules_js/node_modules/react-dom@19.2.0_react_19.2.0/pkg`) to look like.

```json
{
 "dependencies": [
  "@//:.aspect_rules_js/node_modules/react@19.2.0/ref",
  "@//:.aspect_rules_js/node_modules/scheduler@0.27.0/ref",
  "@npm__react-dom__19.2.0_react_19.2.0//:pkg"
 ],
 "hide": false,
 "internal": false,
 "original_label": "@//:.aspect_rules_js/node_modules/react-dom@19.2.0_react_19.2.0/pkg",
 "purl": "pkg:npm/react-dom@19.2.0_react_19.2.0",
 "vendored": false
}
```
