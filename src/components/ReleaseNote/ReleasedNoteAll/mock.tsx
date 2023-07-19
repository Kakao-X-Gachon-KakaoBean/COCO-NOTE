import { ReleasedNoteAll } from '@components/ReleaseNote/ReleasedNoteAll/type.ts';

export const TestReleasedNote: ReleasedNoteAll[] = [
  {
    key: '4.18.0',
    title: '사용자 개인정보 관련 버그 수정',
    contents:
      '## 4.18.0\n' +
      '\n' +
      '### New\n' +
      '\n' +
      '- Initial beta release of `docker init` as per [the roadmap](https://github.com/docker/roadmap/issues/453).\n' +
      '- Added a new **Learning Center** tab to help users get started with Docker.\n' +
      '- Added an experimental file-watch command to Docker Compose that automatically updates your running Compose services as you edit and save your code.\n' +
      '\n' +
      '### Upgrades\n' +
      '\n' +
      '- [Buildx v0.10.4](https://github.com/docker/buildx/releases/tag/v0.10.4)\n' +
      '- [Compose 2.17.2](https://github.com/docker/compose/releases/tag/v2.17.2)\n' +
      '- [Containerd v1.6.18](https://github.com/containerd/containerd/releases/tag/v1.6.18), which includes fixes for [CVE-2023-25153](https://github.com/advisories/GHSA-259w-8hf6-59c2) and [CVE-2023-25173](https://github.com/advisories/GHSA-hmfx-3pcx-653p).\n' +
      '- [Docker Engine v20.10.24](https://docs.docker.com/engine/release-notes/20.10/#201024), which contains fixes for [CVE-2023-28841](https://cve.mitre.org/cgi-bin/cvename.cgi?name=CVE-2023-28841),\n' +
      '  [CVE-2023-28840](https://cve.mitre.org/cgi-bin/cvename.cgi?name=CVE-2023-28840), and\n' +
      '  [CVE-2023-28842](https://cve.mitre.org/cgi-bin/cvename.cgi?name=CVE-2023-28842).\n' +
      '\n' +
      '### Bug fixes and enhancements\n' +
      '\n' +
      '#### For all platforms\n' +
      '\n' +
      '- [Docker Scout CLI](../scout/index.md#docker-scout-cli) can now compare two images and display packages and vulnerabilities differences. This command is in [Early Access](../release-lifecycle.md) and might change in the future.\n' +
      '- [Docker Scout CLI](../scout/index.md#docker-scout-cli) now displays base image update and remediation recommendations using `docker scout recommendations`. It also displays a short overview of an image using `docker scout quickview` commands.\n' +
      '- You can now search for extensions direct from the Marketplace, as well as using **Global Search**.\n' +
      '- Fixed a bug where `docker buildx` container builders would lose access to the network after 24hrs.\n' +
      '- Reduced how often users are prompted for feedback on Docker Desktop.\n' +
      '- Removed minimum VM swap size.\n' +
      '- Added support for subdomain match, CIDR match, `.` and `_.` in HTTP proxy exclude lists.\n' +
      '- Fixed a bug in the transparent TLS proxy when the Server Name Indication field is not set.\n' +
      '- Fixed a grammatical error in Docker Desktop engine status message.\n' +
      '\n' +
      '### For Windows\n' +
      '\n' +
      '- Fixed a bug where `docker run --gpus=all` hangs. Fixes [docker/for-win#13324](https://github.com/docker/for-win/issues/13324).\n' +
      '- Fixed a bug where Registry Access Management policy updates were not downloaded.\n' +
      '- Docker Desktop now allows Windows containers to work when BitLocker is enabled on `C:`.\n' +
      '- Docker Desktop with the WSL backend no longer requires the `com.docker.service` privileged service to run permanently. For more information see [Permission requirements for Windows](https://docs.docker.com/desktop/windows/permission-requirements/).\n' +
      '\n' +
      '### For Mac\n' +
      '\n' +
      '- Fixed a performance issue where attributes stored on the host would not be cached for VirtioFS users.\n' +
      '- The first time Docker Desktop for Mac is launched, the user is presented with an installation window to confirm or adjust the configuration that requires privileged access. For more information see [Permission requirements for Mac](https://docs.docker.com/desktop/mac/permission-requirements/).\n' +
      '- Added the **Advanced** tab in **Settings**, where users can adjust the settings which require privileged access.\n' +
      '\n' +
      '### For Linux\n' +
      '\n' +
      '- Fixed a bug where the VM networking crashes after 24h. [docker/for-linux#131](https://github.com/docker/desktop-linux/issues/131)\n' +
      '\n' +
      '### Security\n' +
      '\n' +
      '#### For all platforms\n' +
      '\n' +
      '- Fixed [CVE-2023-1802](https://www.cve.org/cverecord?id=CVE-2023-1802){: target="_blank" rel="noopener" class="_"} where a security issue with the Artifactory Integration would cause it to fall back to sending registry credentials over plain HTTP if HTTPS check failed. Only users who have `Access experimental features` enabled are affected. Fixes [docker/for-win#13344](https://github.com/docker/for-win/issues/13344).\n' +
      '\n' +
      '#### For Mac\n' +
      '\n' +
      '- Removed the `com.apple.security.cs.allow-dyld-environment-variables` and `com.apple.security.cs.disable-library-validation` entitlements which allow an arbitrary dynamic library to be loaded with Docker Desktop via the `DYLD_INSERT_LIBRARIES` environment variable.\n' +
      '\n' +
      '### Known Issues\n' +
      '\n' +
      '- Uninstalling Docker Desktop on Mac from the **Troubleshoot** page might trigger an unexpected fatal error popup.\n',
    editState: false,
  },
  {
    key: '4.19.0',
    title: '로그인 시 사용자 개인 정보 보호',
    contents:
      '## 4.19.0\n' +
      '\n' +
      '### New\n' +
      '\n' +
      '- Docker Engine and CLI updated to [Moby 23.0](https://github.com/moby/moby/releases/tag/v23.0.0).\n' +
      '- The **Learning Center** now supports in-product walkthroughs.\n' +
      '- Docker init (Beta) now supports Node.js and Python.\n' +
      '- Faster networking between VM and host on macOS.\n' +
      '- You can now inspect and analyze remote images from Docker Desktop without pulling them.\n' +
      '- Usability and performance improvements to the **Artifactory images** view.\n' +
      '\n' +
      '### Removed\n' +
      '\n' +
      '- Removed `docker scan` command. To continue learning about the vulnerabilities of your images, and many other features, use the new `docker scout` command. Run `docker scout --help`, or [read the docs to learn more](../engine/reference/commandline/scout.md).\n' +
      '\n' +
      '### Upgrades\n' +
      '\n' +
      '- [Docker Engine v23.0.5](https://docs.docker.com/engine/release-notes/23.0/#2305)\n' +
      '- [Compose 2.17.3](https://github.com/docker/compose/releases/tag/v2.17.3)\n' +
      '- [Containerd v1.6.20](https://github.com/containerd/containerd/releases/tag/v1.6.20)\n' +
      '- [Kubernetes v1.25.9](https://github.com/kubernetes/kubernetes/releases/tag/v1.25.9)\n' +
      '- [runc v1.1.5](https://github.com/opencontainers/runc/releases/tag/v1.1.5)\n' +
      '- [Go v1.20.3](https://github.com/golang/go/releases/tag/go1.20.3)\n' +
      '\n' +
      '### Bug fixes and enhancements\n' +
      '\n' +
      '#### For all platforms\n' +
      '\n' +
      '- Improved `docker scout compare` command to compare two images, now also aliased under `docker scout diff`.\n' +
      '- Added more details to dashboard errors when a `docker-compose` action fails ([docker/for-win#13378](https://github.com/docker/for-win/issues/13378)).\n' +
      '- Added support for setting HTTP proxy configuration during installation. This can be done via the `--proxy-http-mode`, `--overrider-proxy-http`, `--override-proxy-https` and `--override-proxy-exclude` installer flags in the case of installation from the CLI on [Mac](/install/mac-install.md#install-from-the-command-line) and [Windows](/install/windows-install.md#install-from-the-command-line), or alternatively by setting the values in the `install-settings.json` file.\n' +
      '- Docker Desktop now stops overriding .docker/config.json `credsStore` keys on application start. Note that if you use a custom credential helper then the CLI `docker login` and `docker logout` does not affect whether the UI is signed in to Docker or not. In general, it is better to sign into Docker via the UI since the UI supports multi-factor authentication.\n' +
      '- Added a warning about the [forthcoming removal of Compose V1 from Docker Desktop](../compose/migrate.md). Can be suppressed with `COMPOSE_V1_EOL_SILENT=1`.\n' +
      '- In the Compose config, boolean fields in YAML should be either `true` or `false`. Deprecated YAML 1.1 values such as “on” or “no” now produce a warning.\n' +
      '- Improved UI for image table, allowing rows to use more available space.\n' +
      '- Fixed various bugs in port-forwarding.\n' +
      '- Fixed a HTTP proxy bug where an HTTP request without a Server Name Indication record would be rejected with an error.\n' +
      '\n' +
      '#### For Windows\n' +
      '\n' +
      '- Reverted to fully patching etc/hosts on Windows (includes `host.docker.internal` and `gateway.docker.internal` again). For WSL, this behavior is controlled by a new setting in the **General** tab. Fixes [docker/for-win#13388](https://github.com/docker/for-win/issues/13388) and [docker/for-win#13398](https://github.com/docker/for-win/issues/13398).\n' +
      '- Fixed a spurious `courgette.log` file appearing on the Desktop when updating Docker Desktop. Fixes [docker/for-win#12468](https://github.com/docker/for-win/issues/12468).\n' +
      '- Fixed the "zoom in" shortcut (ctrl+=). Fixes [docker/for-win#13392](https://github.com/docker/for-win/issues/13392).\n' +
      '- Fixed a bug where the tray menu would not correctly update after second container type switch. Fixes [docker/for-win#13379](https://github.com/docker/for-win/issues/13379).\n' +
      '\n' +
      '#### For Mac\n' +
      '\n' +
      '- Increased the performance of VM networking when using the Virtualization framework on macOS Ventura and above. Docker Desktop for Mac now uses gVisor instead of VPNKit. To continue using VPNKit, add `"networkType":"vpnkit"` to your `settings.json` file located at `~/Library/Group Containers/group.com.docker/settings.json`.\n' +
      '- Fixed a bug where an error window is displayed on uninstall.\n' +
      '- Fixed a bug where the setting `deprecatedCgroupv1` was ignored. Fixes [docker/for-mac#6801](https://github.com/docker/for-mac/issues/6801).\n' +
      '- Fixed cases where `docker pull` would return `EOF`.\n' +
      '\n' +
      '#### For Linux\n' +
      '\n' +
      '- Fixed a bug where the VM networking crashes after 24h. Fixes [docker/desktop-linux#131](https://github.com/docker/desktop-linux/issues/131).\n' +
      '\n' +
      '### Security\n' +
      '\n' +
      '#### For all platforms\n' +
      '\n' +
      '- Fixed a security issue allowing users to bypass Image Access Management (IAM) restrictions configured by their organisation by avoiding `registry.json` enforced login via deleting the `credsStore` key from their Docker CLI configuration file. Only affects Docker Business customers.\n' +
      '- Fixed [CVE-2023-24532](https://github.com/advisories/GHSA-x2w5-7wp4-5qff).\n' +
      '- Fixed [CVE-2023-25809](https://github.com/advisories/GHSA-m8cg-xc2p-r3fc).\n' +
      '- Fixed [CVE-2023-27561](https://github.com/advisories/GHSA-vpvm-3wq2-2wvm).\n' +
      '- Fixed [CVE-2023-28642](https://github.com/advisories/GHSA-g2j6-57v7-gm8c).\n' +
      '- Fixed [CVE-2023-28840](https://cve.mitre.org/cgi-bin/cvename.cgi?name=CVE-2023-28840).\n' +
      '- Fixed [CVE-2023-28841](https://cve.mitre.org/cgi-bin/cvename.cgi?name=CVE-2023-28841).\n' +
      '- Fixed [CVE-2023-28842](https://cve.mitre.org/cgi-bin/cvename.cgi?name=CVE-2023-28842).\n',
    editState: false,
  },
  {
    key: '4.20.0',
    title: '회원가입 시 개인 정보 요청 방식 수정',
    contents:
      '## 4.20.0\n' +
      '\n' +
      '### Upgrades\n' +
      '\n' +
      '- [Buildx v0.10.5](https://github.com/docker/buildx/releases/tag/v0.10.5)\n' +
      '- [Compose v2.18.1](https://github.com/docker/compose/releases/tag/v2.18.1)\n' +
      '- [Docker Engine v24.0.2](https://docs.docker.com/engine/release-notes/24.0/#2402)\n' +
      '- [Containerd v1.6.21](https://github.com/containerd/containerd/releases/tag/v1.6.21)\n' +
      '- [runc v1.1.7](https://github.com/opencontainers/runc/releases/tag/v1.1.5)\n' +
      '\n' +
      '### Bug fixes and enhancements\n' +
      '\n' +
      '#### For all platforms\n' +
      '\n' +
      '- [Docker Scout CLI](https://docs.docker.com/scout/#docker-scout-cli) now finds the most recently built image if it is not provided as an argument.\n' +
      '- Improved the [Docker Scout CLI](https://docs.docker.com/scout/#docker-scout-cli) `compare` command.\n' +
      '- Added a warning about the [retirement of Docker Compose ECS/ACS integrations in November 2023](https://docs.docker.com/go/compose-ecs-eol/). Can be suppressed with `COMPOSE_CLOUD_EOL_SILENT=1`.\n' +
      '- Fixed an HTTP proxy bug where an HTTP 1.0 client could receive an HTTP 1.1 response.\n' +
      "- Enabled Docker Desktop's Enhanced Container Isolation (ECI) feature on WSL-2. This is available with a Docker Business subscription.\n" +
      '- Fixed a bug on the **Containers** table where previously hidden columns were displayed again after a fresh installation of Docker Desktop.\n' +
      '\n' +
      '#### For Mac\n' +
      '\n' +
      '- You can now reclaim disk space more quickly when files are deleted in containers. Related to [docker/for-mac#371](https://github.com/docker/for-mac/issues/371).\n' +
      '- Fixed a bug that prevented containers accessing 169.254.0.0/16 IPs. Fixes [docker/for-mac#6825](https://github.com/docker/for-mac/issues/6825).\n' +
      '- Fixed a bug in `com.docker.diagnose check` where it would complain about a missing vpnkit even when vpnkit is not expected to be running. Related to [docker/for-mac#6825](https://github.com/docker/for-mac/issues/6825).\n' +
      '\n' +
      '#### For Windows\n' +
      '\n' +
      '- Fixed a bug that meant WSL data could not be moved to a different disk. Fixes [docker/for-win#13269](https://github.com/docker/for-win/issues/13269).\n' +
      '- Fixed a bug where Docker Desktop was not stopping its WSL distros (docker-desktop and docker-desktop-data) when it was shutdown, consuming host memory unnecessarily.\n' +
      "- Added a new setting that allows the Windows Docker daemon to use Docker Desktop's internal proxy when running Windows containers. See [Windows proxy settings](settings/windows.md#proxies).\n" +
      '\n' +
      '#### For Linux\n' +
      '\n' +
      '- Fixed an issue with the Docker Compose V1/V2 compatibility setting.',
    editState: false,
  },
  {
    key: '4.20.1',
    title: '사용자 찾기 버그 수정',
    contents:
      '## 4.20.1\n' +
      '\n' +
      '### Bug fixes and enhancements\n' +
      '\n' +
      '#### For all platforms\n' +
      '\n' +
      '- containerd image store: Fixed a bug that caused `docker load` to fail when loading an image that contains attestations.\n' +
      '- containerd image store: Fixed the default image exporter during build.\n' +
      '\n' +
      '#### For Windows\n' +
      '\n' +
      '- Fixed a bug that made it difficult to parse the WSL version on the host in non-western locales. Fixes [docker/for-win#13518](https://github.com/docker/for-win/issues/13518) and [docker/for-win#13524](https://github.com/docker/for-win/issues/13524).',
    editState: false,
  },
  {
    key: '4.21.0',
    title: '헤더바 시각화',
    contents:
      '## 4.21.0\n' +
      '\n' +
      '### New\n' +
      '\n' +
      '- Added support for new Wasm runtimes: slight, spin, and wasmtime.  Users can download Wasm runtimes on demand when the containerd image store is enabled.\n' +
      '- Added Rust server support to Docker init.\n' +
      '- Beta release of the [**Builds** view](use-desktop/builds.md) that lets you inspect builds and manage builders. This can be found in the **Features in Development** tab in **Settings**.\n' +
      '\n' +
      '### Upgrades\n' +
      '- [Buildx v0.11.0](https://github.com/docker/buildx/releases/tag/v0.11.0)\n' +
      '- [Compose v2.19.0](https://github.com/docker/compose/releases/tag/v2.19.0)\n' +
      '- [Kubernetes v1.27.2](https://github.com/kubernetes/kubernetes/releases/tag/v1.27.2)\n' +
      '- [cri-tools v1.27.0](https://github.com/kubernetes-sigs/cri-tools/releases/tag/v1.27.0)\n' +
      '- [cri-dockerd v0.3.2](https://github.com/Mirantis/cri-dockerd/releases/tag/v0.3.2)\n' +
      '- [coredns v1.10.1](https://github.com/coredns/coredns/releases/tag/v1.10.1)\n' +
      '- [cni v1.2.0](https://github.com/containernetworking/plugins/releases/tag/v1.2.0)\n' +
      '- [etcd v3.5.7](https://github.com/etcd-io/etcd/releases/tag/v3.5.7)\n' +
      '\n' +
      '### Bug fixes and enhancements\n' +
      '\n' +
      '#### For all platforms\n' +
      '\n' +
      '- Docker Desktop now automatically pauses the Docker Engine when it is not in use and wakes up again on demand.\n' +
      '- VirtioFS is now the default file sharing implementation for new installations of Docker Desktop on macOS 12.5 and higher.\n' +
      '- Improved product usage reporting using OpenTelemetry (experimental).\n' +
      '- Fixed Docker socket permissions. Fixes [docker/for-win#13447](https://github.com/docker/for-win/issues/13447) and [docker/for-mac#6823](https://github.com/docker/for-mac/issues/6823).\n' +
      '- Fixed an issue which caused Docker Desktop to hang when quitting the application whilst paused.\n' +
      '- Fixed a bug which caused the **Logs** and **Terminal** tab content in the **Container** view to be covered by a fixed toolbar [docker/for-mac#6814](https://github.com/docker/for-mac/issues/6814).\n' +
      '- Fixed a bug which caused input labels to overlap with input values on the container run dialog. Fixes [docker/for-win#13304](https://github.com/docker/for-win/issues/13304).\n' +
      "- Fixed a bug which meant users couldn't select the Docker Extension menu. Fixes [docker/for-mac#6840](https://github.com/docker/for-mac/issues/6840) and [docker/for-mac#6855](https://github.com/docker/for-mac/issues/6855)\n" +
      '\n' +
      '#### For Mac\n' +
      '\n' +
      '- Added a health check for macOS that notifies users if there has been a change on their system which might cause problems running Docker binaries.\n' +
      '\n' +
      '#### For Windows\n' +
      '\n' +
      '- Fixed a bug on WSL 2 where if Desktop is paused, killed, and then restarted, the startup hangs unless WSL is shut down first with `wsl --shutdown`.\n' +
      '- Fixed the WSL engine in cases where wsl.exe is not on the PATH [docker/for-win#13547](https://github.com/docker/for-win/issues/13547).\n' +
      "- Fixed the WSL engine's ability to detect cases where one of the Docker Desktop distros' drive is missing [docker/for-win#13554](https://github.com/docker/for-win/issues/13554).\n" +
      '- A slow or unresponsive WSL integration no longer prevents Docker Desktop from starting. Fixes [docker/for-win#13549](https://github.com/docker/for-win/issues/13549).\n' +
      '- Fixed a bug that caused Docker Desktop to crash on startup [docker/for-win#6890](https://github.com/docker/for-mac/issues/6890).\n' +
      '- Added the following installer flags:\n' +
      '  - `--hyper-v-default-data-root` which specifies the default location for Hyper-V VM disk.\n' +
      '  - `--windows-containers-default-data-root` which specifies the default data root for Windows Containers.\n' +
      '  - `--wsl-default-data-root` which specifies the default location for WSL distro disks.\n',
    editState: false,
  },
  {
    key: '4.21.1',
    title: '헤더바 반응형 디자인 수정',
    contents:
      '## 4.21.1\n' +
      '\n' +
      '### Upgrades\n' +
      '- [Compose v2.19.1](https://github.com/docker/compose/releases/tag/v2.19.1)\n' +
      '\n' +
      '### Bug fixes and enhancements\n' +
      '\n' +
      '#### For all platforms\n' +
      '\n' +
      '- Fixed connection leak for Docker contexts using SSH ([docker/for-mac#6834](https://github.com/docker/for-mac/issues/6834) and [docker/for-win#13564](https://github.com/docker/for-win/issues/13564))\n' +
      '\n' +
      '#### For Mac\n' +
      '\n' +
      '- Removed configuration health check for further investigation and addressing specific setups.',
    editState: false,
  },
  {
    key: '4.21.2',
    title: '이슈 보안 설정',
    contents: '## 4.21.2\n',
    editState: true,
  },
];
