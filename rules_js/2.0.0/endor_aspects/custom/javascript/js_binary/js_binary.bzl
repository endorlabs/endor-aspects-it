load("//endor_aspects/custom/javascript/js_binary:provider.bzl", "EndorJavaScriptDependencyInfo", "EndorJavaScriptSpecInfo")

def _get_sca_information(target, ctx):
    return "xyz", "1.2.3"

def _get_dependency_list(deps):
    labels = []
    for dep in deps:
        if hasattr(dep, "label") and OutputGroupInfo in dep and hasattr(dep[OutputGroupInfo], "endor_sca_info"):
            labels.append(str(dep.label))
    return labels

def _get_dependency_files(deps):
    files = []
    for dep in deps:
        if OutputGroupInfo in dep and hasattr(dep[OutputGroupInfo], "endor_sca_info"):
            files.extend(dep[OutputGroupInfo].endor_sca_info.to_list())
    return files

def _impl(target, ctx):
    label_str = getattr(ctx, "label", "")
    deps = ctx.rule.attr.deps if hasattr(ctx.rule.attr, "deps") else []

    name, version = _get_sca_information(target, ctx)
    spec = EndorJavaScriptSpecInfo(
        name = name,
        version = version,
    )

    provider = EndorJavaScriptDependencyInfo(
        original_label = str(label_str),
        dependencies = _get_dependency_list(deps),
        internal = False,
        javascript = spec,
    )

    output_file = ctx.actions.declare_file("{}_resolved_dependencies.json".format(label_str))

    ctx.actions.write(
        output = output_file,
        content = json.encode_indent(provider, indent = " "),
    )

    return [OutputGroupInfo(endor_sca_info = depset([output_file] + _get_dependency_files(deps)))]

endor_resolve_dependencies = aspect(
    attr_aspects = ["deps", "data", "src", "srcs"],
    implementation = _impl,
    attrs = {
        "ref": attr.string(),
        "log_level": attr.string(default = "DEBUG"),
        "external_target_json": attr.string(default = "{}"),
    },
)
