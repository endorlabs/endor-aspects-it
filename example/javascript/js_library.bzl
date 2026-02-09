EndorDependencyInfo = provider(
    doc = "Provider for collecting dependency metadata through Bazel aspects.",
    fields = {
        "original_label": "String: The Canonical label of the Target",
        "purl": "String: Package URL (PURL) for the dependency",
        "dependencies": "String: List of direct dependency labels",
        "internal": "Boolean: True if Node corresponds to a First Party *_library Target.",
        "vendored": "Boolean: True if dependencies have been vendored into the scanned repository.",
        "hide": "Boolean: Use this Field to hide Nodes from the Endor Dependency Graph and Scan",
    },
)

## Helpers to Iterate over Dependency Nodes
def _transform_to_iterable(objects):
    if not objects:
        return []

    if type(objects) not in ("list", "tuple", "dict", "set", "depset"):
        return [objects]
    return objects

def _get_dependency_list(objs):
    labels = []
    for obj in _transform_to_iterable(objs):
        if hasattr(obj, "label") and OutputGroupInfo in obj and hasattr(obj[OutputGroupInfo], "endor_sca_info"):
            labels.append(str(obj.label))
    return labels

def _get_dependency_files(objs):
    files = []
    for obj in _transform_to_iterable(objs):
        if type(obj) == "File":
            continue
        if OutputGroupInfo in obj and hasattr(obj[OutputGroupInfo], "endor_sca_info"):
            files.extend(obj[OutputGroupInfo].endor_sca_info.to_list())
    return files

def _get_sca_information(ctx):
    rule = getattr(ctx, "rule", None)
    attr = getattr(rule, "attr", None) if rule else None
    name = getattr(attr, "package", "") if attr else ""
    version = getattr(attr, "version", "") if attr else ""

    if len(name) == 0:
        label_parts = str(ctx.label).split(":")
        if len(label_parts) > 1:
            name = label_parts[-1]

    if len(version) == 0:
        version = "internal"
        if hasattr(ctx.attr, "ref") and ctx.attr.ref:
            version = ctx.attr.ref

    return name, version

def _impl(target, ctx):
    # Extract the target label.
    label_str = getattr(ctx, "label", "")

    # Extract all Attributes which needs dependency propogation/traversal.
    deps = ctx.rule.attr.deps if hasattr(ctx.rule.attr, "deps") else []
    src = ctx.rule.attr.src if hasattr(ctx.rule.attr, "src") else []
    srcs = ctx.rule.attr.srcs if hasattr(ctx.rule.attr, "srcs") else []
    data = ctx.rule.attr.data if hasattr(ctx.rule.attr, "data") else []

    # Resolve package name and version, then build the PURL identifier.
    package_name, version = _get_sca_information(ctx)
    purl = "pkg:{}/{}@{}".format("npm", package_name, version)

    # Dependency Labels
    dependency_list = _get_dependency_list(deps)
    dependency_list += _get_dependency_list(src)
    dependency_list += _get_dependency_list(srcs)
    dependency_list += _get_dependency_list(data)

    # Files created in endor_sca_info
    dependency_files = _get_dependency_files(deps)
    dependency_files += _get_dependency_files(src)
    dependency_files += _get_dependency_files(srcs)
    dependency_files += _get_dependency_files(data)

    # Populate the dependency metadata provider for this target.
    provider = EndorDependencyInfo(
        original_label = str(label_str),
        dependencies = dependency_list,
        internal = False,
        purl = purl,
        vendored = False,
        hide = False,
    )

    # Declare JSON output file for resolved dependencies of the currently target node.
    output_file = ctx.actions.declare_file("{}_resolved_dependencies.json".format(label_str))

    # Serialize the provider to JSON and write it to the output file.
    ctx.actions.write(
        output = output_file,
        content = json.encode_indent(provider, indent = " "),
    )

    # Return output group with this file and all transitive dependency files.
    return [OutputGroupInfo(endor_sca_info = depset([output_file] + dependency_files))]

endor_resolve_dependencies = aspect(
    attr_aspects = ["deps", "data", "src", "srcs"],
    implementation = _impl,
    attrs = {
        "ref": attr.string(),
        "log_level": attr.string(default = "DEBUG"),
        "external_target_json": attr.string(default = "{}"),
    },
)
