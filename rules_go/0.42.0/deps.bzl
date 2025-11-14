load("@bazel_gazelle//:deps.bzl", "go_repository")

def go_dependencies():
    go_repository(
        name = "com_github_antchfx_xmlquery",
        importpath = "github.com/antchfx/xmlquery",
        sum = "h1:YvWny6c+VzYrTBMw9aopGqO3BfTUW6MHRAnHW2kYoQ0=",
        version = "v1.3.0",
    )
    go_repository(
        name = "com_github_antchfx_xpath",
        importpath = "github.com/antchfx/xpath",
        sum = "h1:dW1HB/JxKvGtJ9WyVGJ0sIoEcqftV3SqIstujI+B9XY=",
        version = "v1.2.4",
    )
    go_repository(
        name = "com_github_golang_groupcache",
        importpath = "github.com/golang/groupcache",
        sum = "h1:oI5xCqsCo564l8iNU+DwB5epxmsaqB+rhGL0m5jtYqE=",
        version = "v0.0.0-20210331224755-41bb18bfe9da",
    )

    go_repository(
        name = "com_github_gorilla_mux",
        importpath = "github.com/gorilla/mux",
        sum = "h1:i40aqfkR1h2SlN9hojwV5ZA91wcXFOvkdNIeFDP5koI=",
        version = "v1.8.0",
    )

    go_repository(
        name = "org_golang_x_mod",
        importpath = "golang.org/x/mod",
        sum = "h1:6zppjxzCulZykYSLyVDYbneBfbaBIQPYMevg0bEwv2s=",
        version = "v0.6.0-dev.0.20220419223038-86c51ed26bb4",
    )
    go_repository(
        name = "org_golang_x_net",
        importpath = "golang.org/x/net",
        sum = "h1:rJrUqqhjsgNp7KqAIc25s9pZnjU7TUcSY7HcVZjdn1g=",
        version = "v0.7.0",
    )

    go_repository(
        name = "org_golang_x_sys",
        importpath = "golang.org/x/sys",
        sum = "h1:MUK/U/4lj1t1oPg0HfuXDN/Z1wv31ZJ/YcPiGccS4DU=",
        version = "v0.5.0",
    )
    go_repository(
        name = "org_golang_x_term",
        importpath = "golang.org/x/term",
        sum = "h1:n2a8QNdAb0sZNpU9R1ALUXBbY+w51fCQDN+7EdxNBsY=",
        version = "v0.5.0",
    )
    go_repository(
        name = "org_golang_x_text",
        importpath = "golang.org/x/text",
        sum = "h1:4BRB4x83lYWy72KwLD/qYDuTu7q9PjSagHvijDw7cLo=",
        version = "v0.7.0",
    )
    go_repository(
        name = "org_golang_x_tools",
        importpath = "golang.org/x/tools",
        sum = "h1:VveCTK38A2rkS8ZqFY25HIDFscX5X9OoEhJd3quQmXU=",
        version = "v0.1.12",
    )
    go_repository(
        name = "com_github_bgentry_go_netrc",
        importpath = "github.com/bgentry/go-netrc/netrc",
        urls = ["https://github.com/bgentry/go-netrc/archive/9fd32a8.zip"],
        type = "zip",
        strip_prefix = "go-netrc-9fd32a8b3d3d3f9d43c341bfe098430e07609480/netrc",
    )
    go_repository(
        name = "com_github_sirupsen_logrus",
        importpath = "github.com/sirupsen/logrus",
        urls = ["https://github.com/sirupsen/logrus/archive/refs/tags/v1.8.1.tar.gz"],
        type = "tar.gz",
        strip_prefix = "logrus-1.8.1",
    )
    go_repository(
        name = "com_github_google_uuid",
        commit = "16939dafc37a38d2743810a8bdf60fdad6a0f3a3",
        importpath = "github.com/google/uuid",
        remote = "https://github.com/google/uuid",
        vcs = "git",
    )

    go_repository(
        name = "com_github_bwmarrin_snowflake",
        tag = "v0.3.0",
        importpath = "github.com/bwmarrin/snowflake",
        remote = "https://github.com/bwmarrin/snowflake",
        vcs = "git",
    )

    go_repository(
        name = "com_github_bazelbuild_rules_go",
        importpath = "github.com/bazelbuild/rules_go",
        sum = "h1:Q+vDhH4yzafZ0xHBT0JEVawb+1nDHUXhjvWTqSGCCyU=",
        version = "v0.43.0",
    )
