load("//endor_aspects/custom/javascript/js_binary:provider.bzl", "EndorJavaScriptDependencyInfo", "EndorJavaScriptSpecInfo")

def _impl(target, ctx):
    label_str = getattr(ctx, "label", "")

    spec = EndorJavaScriptSpecInfo(
        name = "xyz",
        version = "1.2.3",
    )

    provider = EndorJavaScriptDependencyInfo(
        original_label = str(label_str),
        dependencies = [],
        internal = False,
        javascript = spec,
    )

    output_file = ctx.actions.declare_file("{}_resolved_dependencies.json".format(label_str))

    ctx.actions.write(
        output = output_file,
        content = json.encode_indent(provider, indent = " "),
    )

    return [OutputGroupInfo(endor_sca_info = depset([output_file]))]

endor_resolve_dependencies = aspect(
    attr_aspects = ["deps", "data", "src", "srcs"],
    implementation = _impl,
    attrs = {
        "ref": attr.string(),
        "log_level": attr.string(default = "DEBUG"),
        "external_target_json": attr.string(default = "{}"),
    },
)
