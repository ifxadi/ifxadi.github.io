const portfolioData = [
            {
            id: 1,
            category: ['tools', 'pipeline'],
            title: 'DCC Tooling Pipeline',
            shortDescription: 'DCC Tools CI/CD Pipeline: Easy to ship, install, and maintain.',
            fullDescription: 'Creating tools is fun, but making them truly valuable means ensuring they are easy to distribute, simple to install, and effortless to maintain. Especially in a studio environment where artists should focus on creating rather than figuring out tools or constantly updating them. At my current studio, I designed,  implemented and maintained a robust DCC tooling pipeline that is friendly and efficient for both artists and tool developers.',
            thumbnail: './assets/images/000_toolspipelineImage.png',
            image: './assets/images/000_toolspipelineImage.png',
            technologies: 'Python, Maya API, MEL, Blender Python API, Git',
            role: 'Author',
            year: '2023',
            link: '#',
            contentBlocks: [
                {
                    type: 'heading',
                    content: 'Key Features'
                },
                {
                    type: 'paragraph',
                    content: 'One click Installation - Auto Update - Changelog system - Bug report log tracker'
                },
                {
                    type: 'heading',
                    content: 'Pipeline Structure'
                },
                {
                    type: 'code',
                    content: `
                                     Artists in Maya / Blender runs One-Click Installation
                                               from a Centralized Shared Drive
                                                            │
                                                            ▼
                              Tool Developers → Build Features or Fix Bugs → Push to Git Dev Branch
                                                            │
                                                            ▼
                                      PR (Dev → Release) → PR Approved on Release Branch
                                                            │
                                                            ▼
                                Trigger Pull of Latest Release Code to Centralized Shared Drive
                                                            │
                                                            ▼
                                          Tools Auto-Update on Artist Machines
                                                            │
                                                            ▼
                                     Changelog Popup Appears when Maya / Blender Opens
`
                },
                {
                    type: 'heading',
                    content: 'Installation'
                },
                {
                    type: 'paragraph',
                    content: 'The installation workflow is designed to be fast and artist-friendly, requiring minimal technical steps.'
                },
                {
                    type: 'code',
                    content: 'MAYA MEL Installer:-'
                },
                {
                    type: 'paragraph',
                    content: 'Artists simply drag and drop the installer into the Maya viewport, and the tools install instantly — no restart required. All tools are loaded on the fly and become immediately available through the custom studio menu added to Maya. Under the hood, Maya uses .mod files to extend Maya’s script and plugin directories, ensuring clean integration with the existing environment while keeping the setup maintainable.'
                },
                {
                    type: 'image',
                    src: './assets/images/000_toolInstallMaya.png',
                    alt: 'Maya Installer'
                },
                {
                    type: 'code',
                    content: 'BLENDER Python Installer:-'
                },
                {
                    type: 'paragraph',
                    content: 'In Blender, artists only need to open and run the installer. The process automatically installs and enables all required addons. Once complete, the tools are accessible from the N-panel and the custom pipeline menu. Blender relies on an extensions repository that is automatically linked to the centralized shared drive, keeping installations streamlined and consistent across the studio.'
                },
                {
                    type: 'image',
                    src: './assets/images/000_toolInstallBlender.png',
                    alt: 'Blender Installer'
                },
                {
                    type: 'heading',
                    content: 'Changelog & Auto-Update Notification'
                },
                {
                    type: 'paragraph',
                    content: 'The pipeline includes an automated changelog and version-aware update notification system designed to keep artists informed without interrupting their workflow. Whenever a new tool release is approved and deployed to the centralized shared drive, the latest version is automatically synced to each artist machine.On the next launch of Maya, the system performs a version check and determines whether the user has already seen the latest updates.Version tracking is handled by storing the currently acknowledged tool version inside Maya preferences using <i><b>cmds.perfs</b></i>. At startup, the pipeline compares this stored value against the latest tool version available on the shared drive.If a version increment is detected, a changelog popup automatically appears inside Maya. The changelog content itself is generated directly from GitHub bug reports and feature tickets, ensuring that every notification is accurate, traceable, and meaningful.This approach keeps artists aware of fixes and new features while giving developers a single source of truth for release communication.'
                },
                {
                    type: 'image',
                    src: './assets/images/000_changelogMayaTool.png',
                    alt: 'Water Shader Node Graph'
                },
                {
                    type: 'heading',
                    content: 'Impact'
                },
                {
                    type: 'paragraph',
                    content: 'This pipeline significantly reduced the overhead of distributing and maintaining DCC tools across the studio. Artists benefited from a frictionless one-click install and automatic updates, allowing them to stay focused on production rather than technical setup. For developers, the structured Git workflow and centralized deployment improved release reliability, version control, and collaboration. Overall, the system increased tool adoption, minimized support requests, and established a scalable foundation for future pipeline growth.'
                }
            ]
        },
        {
            id: 2,
            category: ['tools', 'pipeline'],
            title: 'Maya Pipeline Manager Framework',
            shortDescription: 'Maya tool to configure project, paths, source control, automation and QA from a single UI.',
            fullDescription: 'Managing project paths, source control, scene defaults, auto-linking rules and QA validation across a team means a lot of manual, error-prone setup every time a new shot or project starts. Pipeline Editor solves this by consolidating every project-level decision into one Maya tool, persisting the entire configuration as a versioned JSON file that can be committed to Perforce or Git and shared across the studio.',
            thumbnail: './assets/images/001_pipelineSetupThumb.png',
            image: './assets/images/001_pipelineSetupThumb.png',
            technologies: 'Python, PySide, Maya CMDS, JSON, Perforce, Git',
            role: 'Author',
            year: '2024',
            link: '#',
            contentBlocks: [
                {
                    type: 'heading',
                    content: 'Key Features'
                },
                {
                    type: 'paragraph',
                    content: 'Collapsible settings sections — Perforce & Git integration — JSON config persistence — Auto scene cleanup — Auto texture & rig linking — QA validation with report export'
                },
                {
                    type: 'heading',
                    content: 'UI Framework'
                },
                {
                    type: 'paragraph',
                    content: 'The UI is built on PySide2 (with a silent PyQt5 fallback) and runs natively inside Maya 2022 by parenting to the Maya main window via <i><b>shiboken2.wrapInstance</b></i>. Every visual element is a custom subclass of a base <i><b>QWidget</b></i> — panels draw their own corner ticks and accent bars via <i><b>paintEvent</b></i>, section headers are painted amber rule lines, and checkboxes use a custom diamond indicator drawn with <i><b>QPolygon</b></i>. Nothing relies on Qt stylesheets for structural layout, keeping the rendering consistent across OS themes.'
                },
                {
                    type: 'code',
                    content: `# Launching inside Maya — parent to the Maya main window
import maya.OpenMayaUI as omui
from shiboken2 import wrapInstance
from PySide2 import QtWidgets

def show_in_maya():
    ptr      = omui.MQtUtil.mainWindow()
    maya_win = wrapInstance(int(ptr), QtWidgets.QWidget)
    win      = PipelineSetupEditor(maya_win)
    win.show()
    return win`
                },
                {
                    type: 'paragraph',
                    content: 'Each settings section is a <i><b>CollapsibleSection</b></i> — a thin wrapper that owns a <i><b>CategoryHeader</b></i> (the clickable title bar) and a content <i><b>QWidget</b></i>. Clicking the header toggles <i><b>content.setVisible()</b></i>, which makes the window resize naturally. Individual settings are <i><b>SettingsRow</b></i> widgets: a fixed-width label column on the left and any control widget on the right, matching the Unreal Engine project settings layout.'
                },
                {
                    type: 'code',
                    content: `# CollapsibleSection — the building block for every settings group
class CollapsibleSection(QtWidgets.QWidget):
    def __init__(self, title, parent=None):
        super().__init__(parent)
        layout = QtWidgets.QVBoxLayout(self)
        layout.setContentsMargins(0, 0, 0, 0)
        layout.setSpacing(0)

        self.header         = CategoryHeader(title)
        self.content        = QtWidgets.QWidget()
        self.content_layout = QtWidgets.QVBoxLayout(self.content)
        self.content_layout.setContentsMargins(0, 0, 0, 2)
        self.content_layout.setSpacing(0)

        layout.addWidget(self.header)
        layout.addWidget(self.content)

    def _on_collapse(self, collapsed):
        self.content.setVisible(not collapsed)

    def add_row(self, widget):
        self.content_layout.addWidget(widget)


# SettingsRow — label left, control right (Unreal-style)
class SettingsRow(QtWidgets.QWidget):
    def __init__(self, label, control=None, alt=False, parent=None):
        super().__init__(parent)
        self._alt = alt
        self.setFixedHeight(28)
        h = QtWidgets.QHBoxLayout(self)
        h.setContentsMargins(8, 0, 8, 0)

        lbl = QtWidgets.QLabel(label)
        lbl.setFixedWidth(260)
        h.addWidget(lbl)
        if control:
            h.addWidget(control)
        h.addStretch()

    def paintEvent(self, e):          # alternating row tint
        p = QPainter(self)
        p.fillRect(self.rect(), QColor("#1e1e1e" if self._alt else "#1a1a1a"))
        p.end()`
                },
                {
                    type: 'heading',
                    content: 'Core Functionality'
                },
                {
                    type: 'paragraph',
                    content: 'The tool has four core methods that wire the UI to the file system and Maya. <i><b>_load_config()</b></i> reads the JSON and calls each widget\'s setter. <i><b>_collect_config()</b></i> does the reverse — reads every widget and builds a fresh dict. <i><b>_save_config()</b></i> writes that dict to disk. <i><b>_apply_all()</b></i> saves first, then iterates <i><b>AUTOMATION_REGISTRY</b></i> and executes every handler whose config flag is true.'
                },
                {
                    type: 'code',
                    content: `# Config round-trip — load JSON into widgets
def _load_config(self):
    path = self._config_path()
    if not os.path.exists(path):
        return
    with open(path, "r") as f:
        cfg = json.load(f)

    scene = cfg.get("scene", {})
    self.chk_color.setChecked(scene.get("color_management", True))
    self.combo_policy.setCurrentText(scene.get("color_policy", "ACES 1.0"))
    self.chk_virus.setChecked(scene.get("remove_vaccine", True))
    # ... repeat for every section


# Collect widgets back into a dict
def _collect_config(self):
    return {
        "project": {
            "vcs_mode":    self._vcs_mode(),
            "custom_root": self.path_field.edit.text(),
            "p4_server":   self.p4_server.text(),
            "p4_user":     self.p4_user.text(),
        },
        "scene": {
            "color_management": self.chk_color.isChecked(),
            "color_policy":     self.combo_policy.currentText(),
            "remove_vaccine":   self.chk_virus.isChecked(),
            "default_unit":     self.combo_unit.currentText().lower(),
            "autosave_interval":self.spin_autosave.value(),
        },
        # ... other sections
    }


# Save + run all enabled automations
def _apply_all(self):
    cfg = self._collect_config()
    self._save_config(cfg)

    for flag_path, handler in AUTOMATION_REGISTRY.items():
        section, key = flag_path.split(".")
        if cfg.get(section, {}).get(key):
            handler(cfg)`
                },
                {
                    type: 'paragraph',
                    content: 'Automations themselves are plain functions that receive the full config dict and call Maya commands. They live outside the UI class, which keeps them unit-testable without a running Maya window.'
                },
                {
                    type: 'code',
                    content: `# Example automation handlers
def _auto_set_color_management(cfg):
    policy = cfg["scene"]["color_policy"]
    cmds.colorManagementPrefs(e=True, cmEnabled=True)
    cmds.colorManagementPrefs(e=True, renderingSpaceName=policy)

def _auto_remove_vaccine(cfg):
    for node in cmds.ls(type="script") or []:
        if "vaccine" in node.lower():
            cmds.delete(node)

def _auto_set_fps(cfg):
    fps_map = {24: "film", 25: "pal", 30: "ntsc", 60: "ntscf"}
    unit = fps_map.get(cfg["animation"]["fps"], "ntsc")
    cmds.currentUnit(time=unit)
    cmds.playbackOptions(
        min=cfg["animation"]["range_start"],
        max=cfg["animation"]["range_end"]
    )


# Registry — key is "section.flag", value is the handler
AUTOMATION_REGISTRY = {
    "scene.color_management": _auto_set_color_management,
    "scene.remove_vaccine":   _auto_remove_vaccine,
    "animation.auto_fps":     _auto_set_fps,
}`
                },
                {
                    type: 'heading',
                    content: 'Config Storage'
                },
                {
                    type: 'paragraph',
                    content: 'All settings persist to <i><b>.pipeline/pipeline_config.json</b></i> inside the project root. The file is human-readable, diff-friendly, and safe to commit to Perforce or Git. Shipping a pre-filled config in the tools repo means new artists get the full studio setup on first launch — no manual input.'
                },
                {
                    type: 'code',
                    content: `// .pipeline/pipeline_config.json
{
  "project": {
    "vcs_mode":      "perforce",
    "custom_root":   "C:/projects/myshow",
    "p4_server":     "ssl:perforce.studio.com:1666",
    "p4_user":       "artist_name",
    "p4_workspace":  "artist_name_maya_ws",
    "git_remote":    "https://github.com/studio/project.git",
    "git_branch":    "main"
  },
  "scene": {
    "color_management":  true,
    "color_policy":      "ACES 1.0",
    "remove_vaccine":    true,
    "default_unit":      "centimeter",
    "up_axis":           "Y",
    "autosave_interval": 10
  },
  "linking": {
    "auto_textures":     false,
    "auto_rig":          false,
    "texture_path":      "//server/textures",
    "rig_path":          "//server/rigs",
    "missing_behaviour": "warn"
  },
  "animation": {
    "fps":              30,
    "range_start":      1001,
    "range_end":        1100,
    "tangent_default":  "auto"
  },
  "render": {
    "renderer":    "arnold",
    "resolution":  [1920, 1080],
    "output_path": "//server/renders/<scene>/<layer>/",
    "format":      "exr_multilayer",
    "auto_aovs":   true
  },
  "qa": {
    "auto_model_qa":   false,
    "auto_rig_qa":     false,
    "max_influences":  4,
    "check_naming":    true,
    "flag_ngons":      true,
    "report_path":     "//server/qa_reports/"
  }
}`
                },
                {
                    type: 'heading',
                    content: 'Extending the Tool'
                },
                {
                    type: 'paragraph',
                    content: 'Adding a new setting, a new section, or a new automation all follow the same three-step pattern and never require touching existing code.'
                },
                {
                    type: 'code',
                    content: `# ── 1. Add a new setting to an existing section ──────────────
# In _section_scene_settings(), add a row:
self.chk_flip_normals = make_checkbox(False)
sec.add_row(SettingsRow("Auto Flip Normals on Import", self.chk_flip_normals, alt=True))

# In _collect_config(), add the key under "scene":
"scene": {
    ...
    "flip_normals_on_import": self.chk_flip_normals.isChecked(),
}

# Register the handler:
AUTOMATION_REGISTRY["scene.flip_normals_on_import"] = _auto_flip_normals


# ── 2. Add a brand new section ────────────────────────────────
def _section_lighting(self):
    sec = CollapsibleSection("▼  Lighting Defaults")
    self.combo_skydom = make_combo("AiSkyDomeLight", "IBL Sphere", width=160)
    sec.add_row(SettingsRow("Default Sky Light Type", self.combo_skydom, alt=False))
    self.chk_exposure = make_checkbox(True)
    sec.add_row(SettingsRow("Auto Set Exposure", self.chk_exposure, alt=True))
    return sec

# Then in __init__, add to the scroll body:
bl.addWidget(self._section_lighting())

# And mirror as a new top-level key in _collect_config():
"lighting": {
    "sky_light_type": self.combo_skydom.currentText(),
    "auto_exposure":  self.chk_exposure.isChecked(),
}`
                },
                {
                    type: 'heading',
                    content: 'QA System'
                },
                {
                    type: 'paragraph',
                    content: 'The QA section runs validation checks as standalone functions and writes a JSON report to the configured output path. Each check returns a list of failed nodes, making the output scriptable and easy to pipe into a review dashboard or Slack notification.'
                },
                {
                    type: 'code',
                    content: `def run_model_qa(cfg) -> dict:
    results = {"passed": [], "failed": {}}
    qa = cfg["qa"]

    # Check freeze transforms
    if qa.get("check_naming"):
        pattern = re.compile(r'^[a-zA-Z][a-zA-Z0-9_]*_(GEO|JNT|CTRL|GRP)$')
        bad = [n for n in cmds.ls(dag=True, long=False)
               if not pattern.match(n)]
        if bad:
            results["failed"]["naming"] = bad
        else:
            results["passed"].append("naming")

    # Check for N-gons
    if qa.get("flag_ngons"):
        ngons = []
        for mesh in cmds.ls(type="mesh"):
            it = maya.api.MItMeshPolygon(
                maya.api.MGlobal.getSelectionListByName(mesh).getDagPath(0))
            while not it.isDone():
                if it.polygonVertexCount() > 4:
                    ngons.append(f"{mesh}.f[{it.index()}]")
                it.next()
        if ngons:
            results["failed"]["ngons"] = ngons

    # Write report
    report_path = os.path.join(cfg["qa"]["report_path"],
                               f"qa_{cmds.file(q=True, sn=True, shn=True)}.json")
    with open(report_path, "w") as f:
        json.dump(results, f, indent=2)

    return results`
                },
                {
                    type: 'heading',
                    content: 'Impact'
                },
                {
                    type: 'paragraph',
                    content: 'Project setup time per artist dropped from several manual steps scattered across Maya, the file system and source control to a single Apply All click. The JSON config gave the team a shared, auditable record of every project decision, reduced onboarding friction for new artists, and made it trivial to roll back to a known-good configuration when issues arose in production.'
                }
            ]
        },
        {
            id: 3,
            category: ['shaders'],
            title: 'Maya GLSL Shader - Lighting Model - Blinn-Phong',
            shortDescription: 'Blinn-Phong real-time hardware shader for Maya viewport with multi-light support, normal mapping, and shadow casting.',
            fullDescription: 'A GLSL/OGSFX  real-time hardware shader for Maya\'s Viewport 2.0. Implements the full Blinn-Phong lighting model with supports for up to 5 configurable lights with types Direction, point and spot light, and physically-based light attenuation, tangent-space normal mapping with DX/GL convention toggle, and maya specific shader requirements like sRGB-to-linear diffuse decoding, and UV flip control. Every light and material parameter is fully exposed and editable through Maya\'s Attribute Editor and can also be maped with actual scene lights.',
            thumbnail: './assets/images/002_blingPhongThumb.png',
            image: './assets/images/002_blingPhongThumb.png',
            technologies: 'GLSL, OGSFX, Maya Viewport 2.0, Blinn-Phong, Normal Mapping, OpenGL',
            role: 'Author',
            year: '2025',
            link: '#',
            contentBlocks: [
                { type: 'heading', content: 'Key Features' },
                { type: 'paragraph', content: 'Multi-light Blinn-Phong shading · Spot, Directional & Point Lights support · Physically-based point-light attenuation · Tangent-space normal mapping · sRGB → Linear diffuse decoding · DX / GL normal map convention toggle · UV V-axis flip' },

                { type: 'heading', content: 'Light Types' },
                { type: 'paragraph', content: 'Supports up to 5 independent lights, each configurable as Point (3), Spot (2), Directional (4), or Ambient (5) directly from sliders in the Attribute Editor. Can or cannot be binded with Maya scene lights.' },
                {
                    type: 'image',
                    src: './assets/images/002_blingPhongLightAttr.png',
                    alt: 'LightAttr'
                },
                {
                    type: 'code', content:
                        `int lType = GetLightType(i);
if      (lType == 5)  LightAccum += ambientContribution;
else if (lType == 4)  L = -GetLightDir(i);           // Directional
else if (lType == 2)  L = spot with cone falloff;     // Spot
else                  L = GetLightPos(i) - worldPos;  // Point` },

                { type: 'heading', content: 'Directional + Point Light' },
                { type: 'paragraph', content: 'A point light demonstrates inverse-square attenuation — brightness falls off smoothly with distance, creating a localized hot spot. A directional light simulates a distant sun, casting parallel rays across the surface with no falloff, defining the broad shading silhouette. Both independently contribute diffuse and Blinn-Phong specular.' },
                {
                    type: 'image',
                    src: './assets/images/002_blinPhong_DirPoint.gif',
                    alt: 'DirPoint'
                },


                { type: 'heading', content: 'Spot Light' },
                { type: 'paragraph', content: 'A spot light carves a focused circle of light with a smooth penumbra edge. A pink directional light acts as a rim fill, wrapping a contrast around the silhouette.  Both lights tuned live directly from the Attribute Editor.' },
                {
                    type: 'image',
                    src: './assets/images/002_blinPhong_Spot.gif',
                    alt: 'DirSpot'
                },

                { type: 'heading', content: 'Lighting Breakdown' },
                { type: 'paragraph', content: 'Ambient sets the base fill, Diffuse shades surface form using NdotL, Specular adds the Blinn-Phong highlight via the half-vector H = normalize(L+V), and Normal Mapping perturbs the surface normal per-pixel using a TBN-transformed texture sample — all four summed together to produce the final lit color.' },
                {
                    type: 'image',
                    src: './assets/images/002_blingPhong001.png',
                    alt: 'BlinPhong'
                },
                {
                    type: 'code', content:
                        `vec3  H     = normalize(L + V);
float NdotH = clamp(dot(N, H), 0.0, 1.0);
float NdotL = clamp(dot(N, L), 0.0, 1.0);
LightAccum += (energy * shadowGain * NdotL * baseColor)  // diffuse
            + (specColor * pow(NdotH, SpecularPower) * NdotL * energy * shadowGain);` },

                { type: 'heading', content: 'Normal Mapping' },
                { type: 'paragraph', content: 'Tangent-space normals are unpacked and rotated into world space using the TBN matrix. A NormalHeight multiplier controls intensity. InvertNormalGreen handles the DX vs GL green-channel convention.' },
                {
                    type: 'image',
                    src: './assets/images/002_blinPhong_NormalMapping.gif',
                    alt: 'BlinPhong_Normal'
                },
                {
                    type: 'code', content:
                        `vec3 tn  = texture(NormalMapSampler, texUV).rgb * 2.0 - 1.0;
tn.xy   *= NormalHeight;
tn.y    *= InvertNormalGreen ? -1.0 : 1.0;   // DX ↔ GL
vec3 N   = normalize(mat3(WorldTangent, WorldBitangent, WorldNormal) * tn);` },

                { type: 'heading', content: 'Material Properties' },
                { type: 'paragraph', content: 'Full AE-editable material controls: Diffuse Color/Map, Specular Color/Map, Ambient Color, Shininess (1–256), and Opacity. Diffuse texture is automatically decoded from sRGB to linear space.' },
                {
                    type: 'code', content:
                        `vec3 srgbToLinear(vec3 color) {
    return 0.012522878 * color + 0.682171111 * color * color + 0.305306011 * color * color * color;
}
baseColor *= srgbToLinear(texture(DiffuseMapSampler, texUV).rgb);` },


                { type: 'heading', content: 'Invert Green Channel' },
                { type: 'paragraph', content: 'A single boolean toggle corrects normal maps baked in DirectX convention (Substance Painter, Unreal). Without it, bumps appear as cavities and highlights land on the wrong side of surfaces.' },
                {
                    type: 'code', content:
                        `// false = OpenGL (Maya, Blender)  |  true = DirectX (Substance, Unreal)
tn.y *= InvertNormalGreen ? -1.0 : 1.0;` },
                {
                    type: 'image',
                    src: './assets/images/002_blingPhongMaterial.png',
                    alt: 'BlinPhong_MatAttr'
                },
            ]
        },
        {
            id: 4,
            category: ['shaders', 'tools'],
            title: 'Maya & 3DS Max - Season System - GLSL / HLSL',
            shortDescription: 'A real-time Season System for Maya and 3DS Max viewports — swap and blend between Summer, Fall, and Snow with per-season textures, tints, and a companion Tool for switching seasons globally for all assets.',
            fullDescription: 'A real-time Season System implemented as hardware shaders for Maya (GLSL/OGSFX) and 3DS Max (HLSL). The system drives three distinct seasons — Summer, Fall, and Snow — each carrying independent diffuse and normal map slots, colour tint multipliers, and specular scale overrides. A SeasonBlend float uniform cross-fades between adjacent seasons in tangent space before TBN transformation, enabling smooth animated transitions. The companion Qt tool controls SeasonSelect and SeasonBlend uniforms live across all compatible shader nodes in the scene, and can optionalty bake multi-season transitions directly to keyframes.',
            thumbnail: './assets/images/003_SeasonSwitch_thumb.png',
            image: './assets/images/003_SeasonSwitch_thumb.png',
            technologies: 'GLSL, OGSFX, HLSL, Maya Viewport 2.0, 3DS Max Viewport, PySide2, PySide6, Maya Python API, OpenGL, DirectX',
            role: 'Author',
            year: '2026',
            link: '#',
            contentBlocks: [
                { type: 'heading', content: 'Key Features' },
                { type: 'paragraph', content: 'Per-season diffuse & normal map slots (Summer / Fall / Snow) · Tangent-space normal blending before TBN transform · Per-season colour tint & specular scale · SeasonBlend float for smooth cross-fades · Graceful texture fallback chain · Companion tool for switching seasons globally for all supported scene assets and keyframe baking.' },

                {
                    type: 'image',
                    src: './assets/images/003_blinPhong_SeasonSwitcher.gif',
                    alt: 'SeasonSwitcher'
                },

                

                { type: 'heading', content: 'Season Uniforms' },
                { type: 'paragraph', content: 'SeasonSelect (int 0–2) picks the active season. SeasonBlend (float 0→1) cross-fades toward the next season in the cycle — Summer → Fall → Snow → Summer. Both are fully exposed as editable sliders in the host application\'s material editor and are the only two uniforms the companion tool needs to identify and control a compatible shader node.' },
                {
                    type: 'code', content:
                        `// Season resolve — identical logic in both GLSL and HLSL
int   seasonA = clamp(SeasonSelect, 0, 2);
int   seasonB = (seasonA + 1 > 2) ? 0 : seasonA + 1;   // wraps Snow → Summer
float blend   = clamp(SeasonBlend, 0.0, 1.0);`
                },

                {
                    type: 'image',
                    src: './assets/images/003_blinPhong_SeasonSwitcherAttrBlend.gif',
                    alt: 'SeasonSwitcherUI'
                },

                { type: 'heading', content: 'Per-Season Textures' },
                { type: 'paragraph', content: 'Each season has its own diffuse map and tangent-space normal map slot with independent enable toggles. If a season-specific map is not assigned, the shader falls back to the shared base map, then to a flat colour or flat normal — so the surface always renders correctly with partially filled texture slots.' },
                {
                    type: 'image',
                    src: './assets/images/003_SeasonSwitch_textures.png',
                    alt: 'SeasonSwitcherUI'
                },
                {
                    type: 'code', content:
                        `vec3 SampleSeasonDiffuse(int s, vec2 uv) {
    if (s == 0) {
        if (UseSummerDiffuse)  return srgbToLinear(texture(SummerDiffuseSampler, uv).rgb);
        if (UseDiffuseMap)     return srgbToLinear(texture(DiffuseMapSampler,    uv).rgb);
        return vec3(1.0);      // flat white fallback
    }
    // ... same pattern for Fall (s==1) and Snow (s==2)
}`
                },

                { type: 'heading', content: 'Season Tint & Specular' },
                { type: 'paragraph', content: 'Each season carries a colour tint multiplied on top of the diffuse result and a specular scale float. Snow defaults to a high specular to simulate icy gloss, Fall to a low matte value for dry foliage, and Summer to neutral. Both the tint and specular scale are lerped by SeasonBlend so colour response and surface sheen transition simultaneously.' },
                {
                    type: 'image',
                    src: './assets/images/003_SeasonSwitch_attrs.png',
                    alt: 'SeasonSwitcherUI'
                },
                {
                    type: 'code', content:
                        `vec3  seasonTint      = mix(GetSeasonTint(seasonA),      GetSeasonTint(seasonB),      blend);
float seasonSpecScale = mix(GetSeasonSpecScale(seasonA), GetSeasonSpecScale(seasonB), blend);

vec3 baseColor = DiffuseColor * seasonTint * seasonDiff;
vec3 specColor = SpecularColor * seasonSpecScale;`
                },

                { type: 'heading', content: 'Normal Blending' },
                { type: 'paragraph', content: 'Season normals are decoded and blended while still in tangent space, then passed through a single TBN transform to world space. Blending before the transform avoids the artefact of interpolating already-rotated world-space vectors, keeping surface detail transitions smooth.' },
                {
                    type: 'code', content:
                        `vec3 tnA = SampleSeasonNormal(seasonA, texUV);   // decoded tangent-space
vec3 tnB = SampleSeasonNormal(seasonB, texUV);
vec3 tn  = normalize(mix(tnA, tnB, blend));       // blend in tangent space
N = TangentToWorld(Nw, Tw, Bw, tn);              // single TBN transform`
                },

                { type: 'heading', content: 'Maya Companion Tool for Global Switching' },
                { type: 'paragraph', content: 'A Maya Python Qt tool scans the scene for all GLSLShader nodes that expose SeasonSelect and SeasonBlend, and lists them in a live material table. Three toggle buttons apply a hard season switch for all the supported assets across the scene, while a blend slider scrubs the cross-fade across every compatible node in real time.' },
                {
                    type: 'image',
                    src: './assets/images/003_blinPhong_SeasonSwitcherBlend.gif',
                    alt: 'SeasonSwitcher'
                },

                { type: 'heading', content: 'Similar Logic implemented with 3DS Max DirectX shader' },
                { type: 'paragraph', content: 'The 3DS Max version is written in HLSL and using the DirectX shader plugin, using the same Season Select / Season Blend uniform contract so both can be driven by the same artistic workflow. Season slot layout, tint multipliers, and blend logic are identical across both implementations.' },
                {
                    type: 'image',
                    src: './assets/images/003_blinPhong_SeasonSwitcherMAX.gif',
                    alt: 'SeasonSystem_Platforms'
                }
            ]
        },

        {
    id: 4,
    category: ['graphics', 'tools'],
    title: 'OpenGL Graphics Application - SDL3 / GLM / GLAD',
    shortDescription: 'A simple real-time OpenGL graphics application built with SDL3, GLM, and GLAD, featuring a basic shader interpolation demo, textured 3D model rendering, and a bloom post-processing experiment.',
    fullDescription: 'An OpenGL graphics application developed in C++ using SDL3 for windowing and input, GLAD for OpenGL function loading, and GLM for matrix and vector math. The project explores core real-time rendering concepts through three focused demos: a shader interpolation triangle for attribute and color interpolation, a textured 3D model viewer for mesh and texture rendering, and a bloom lighting scene with multiple colored emissive light sources and post-processing. Together, these experiments helped establish a practical rendering pipeline covering shader setup, vertex attributes, transformations, model loading, texture mapping, lighting, and framebuffer-based post effects.',

    thumbnail: './assets/images/004_openGLApp_Thumb.png',
    image: './assets/images/004_openGLApp_Thumb.png',

    technologies: 'C++, OpenGL, SDL3, GLAD, GLM, GLSL',
    role: 'Author',
    year: '2025',
    link: 'https://github.com/ifxadi/openGL/',

    contentBlocks: [
        { type: 'heading', content: 'Overview' },
        { type: 'paragraph', content: 'This project was built as a compact OpenGL learning and rendering sandbox focused on modern graphics programming fundamentals. It combines simple but important rendering exercises including shader interpolation, textured mesh rendering, transformation handling, and bloom-based post-processing. Implementation were developed with learning support from the book LearnOpenGL and Mike Shah tutorials.' },

        { type: 'heading', content: 'Key Features' },
        { type: 'paragraph', content: 'SDL3 window creation and input handling · GLAD-based OpenGL initialization · GLM for transform and camera math · GLSL shader compilation and linking · Vertex color interpolation demo · Textured 3D model rendering · Multi-light scene setup · Bloom post-processing using bright-pass extraction and blur.' },

        { type: 'heading', content: 'Shader Interpolation Demo' },
        { type: 'paragraph', content: 'One of the first experiments in the project was a simple triangle rendered with per-vertex colors, allowing the fragment shader to display smooth color interpolation across the surface. This helped validate the rendering setup, vertex attribute layout, shader compilation, and the full GPU pipeline from vertex processing to rasterized fragment output, as seen in the triangle screenshot.' },
        {
            type: 'image',
            src: './assets/images/004_openGLApp_traingle.png',
            alt: 'OpenGL Shader Interpolation Triangle'
        },
        {
            type: 'code', content:
`layout (location = 0) in vec3 aPos;
layout (location = 1) in vec3 aColor;

out vec3 ourColor;

void main()
{
    gl_Position = vec4(aPos, 1.0);
    ourColor = aColor;
}`
        },

        { type: 'heading', content: 'Textured Model Rendering' },
        { type: 'paragraph', content: 'The application also includes a simple 3D model viewer used to render textured meshes with proper transforms and material response. Assimp was used to import external model data, including mesh structure and texture assignments, helping establish a clean asset-loading workflow for displaying 3D content inside the OpenGL renderer.' },
        {
            type: 'image',
            src: './assets/images/004_openGLApp_AssImp.png',
            alt: 'OpenGL Textured Model Viewer'
        },
        {
            type: 'code', content:
`glm::mat4 model = glm::mat4(1.0f);
model = glm::rotate(model, glm::radians(rotationAngle), glm::vec3(0.0f, 1.0f, 0.0f));

glm::mat4 view = camera.GetViewMatrix();
glm::mat4 projection = glm::perspective(glm::radians(fov), aspectRatio, 0.1f, 100.0f);

shader.setMat4("model", model);
shader.setMat4("view", view);
shader.setMat4("projection", projection);`
        },

        { type: 'heading', content: 'Bloom Lighting Experiment' },
        { type: 'paragraph', content: 'A more advanced experiment in the application explores bloom by rendering a scene with bright colored light sources and extracting high-intensity fragments for post-processing. The blurred bright areas are then combined back with the base scene to create a soft glow effect, visible around the red, green, blue, and white light sources in the bloom test image.' },
        {
            type: 'image',
            src: './assets/images/004_openGLApp_Bloom.png',
            alt: 'OpenGL Bloom Lighting Demo'
        },
        {
            type: 'code', content:
`vec3 result = sceneColor + bloomStrength * blurColor;
FragColor = vec4(result, 1.0);`
        },
        { type: 'heading', content: 'Environment Cube Mapping' },
{ type: 'paragraph', content: 'Another rendering experiment in the application focused on environment cube mapping using a skybox and cubemap textures. This demo uses the view direction and surface normal to sample the surrounding environment, allowing the cube to display a reflective material response that visually picks up the mountains, sky, and water from the scene background.' },
{
    type: 'image',
    src: './assets/images/004_openGLApp_EnvMapping.png',
    alt: 'OpenGL Environment Cube Mapping Demo'
},
{
    type: 'code', content:
`vec3 I = normalize(WorldPos - cameraPos);
vec3 R = reflect(I, normalize(Normal));
vec3 envColor = texture(skybox, R).rgb;`
},

        { type: 'heading', content: 'Rendering Pipeline' },
        { type: 'paragraph', content: 'The project follows a straightforward modern OpenGL pipeline: initialize SDL3 and context creation, load OpenGL functions through GLAD, define buffers and vertex attributes, compile GLSL shaders, apply transformations with GLM, render scene geometry, and optionally process the final image through framebuffer-based effects. Keeping the application modular made it easier to test individual rendering features in isolation before combining them into larger scenes.' },

        { type: 'heading', content: 'Learning Outcome' },
        { type: 'paragraph', content: 'This project served as a practical foundation for understanding real-time rendering workflows in OpenGL. It strengthened core C++ skills, graphics engine development fundamentals, shader programming, scene setup, model rendering, and post-processing, while also creating a reusable technical base for more advanced graphics experiments in future projects.' }
    ]
},

        {
    id: 6,
    category: ['shaders', 'pipeline'],
    title: 'Advanced Texture Packing - Packed PBR / Normal Reconstruction',
    shortDescription: 'An optimized texture packing workflow that stores Diffuse in RGB, PBR data in RGB, and packs normal XY into alpha channels, reconstructing normal Z in the shader to reduce texture memory and sampling cost.',
    fullDescription: 'An advanced texture packing workflow designed to reduce texture memory usage and simplify material sampling in real-time rendering. The system stores Diffuse in RGB, Metallic / Roughness / Ambient Occlusion in the RGB channels of a second texture, and packs the X and Y components of the tangent-space normal into the alpha channels of the Diffuse and PBR textures. The Z component of the normal is reconstructed in the shader using the Pythagorean relation, allowing the material to preserve normal detail while removing the need for a separate full normal texture. A matching export preset was also created in Substance to automate output into this packed format and keep the authoring pipeline consistent.',

    thumbnail: './assets/images/005_advPacking_thumb.png',
    image: './assets/images/005_advPacking_thumb.png',

    technologies: 'Unreal Engine Material Editor, HLSL, Substance Painter, Packed Textures, PBR, Shader Optimization',
    role: 'Author',
    year: '2026',
    link: '#',

    contentBlocks: [
        { type: 'heading', content: 'Key Features' },
        { type: 'paragraph', content: 'Diffuse stored in RGB · Metallic / Roughness / AO packed into RGB of a second texture · Normal X and Y stored in alpha channels · Normal Z reconstructed in shader · Substance export preset for packed texture output · Reduced texture memory footprint · Fewer texture reads for real-time materials.' },

        {
            type: 'image',
            src: './assets/images/005_advPacking_node.png',
            alt: 'Advanced Texture Packing Material Graph'
        },

        { type: 'heading', content: 'Packing Layout' },
        { type: 'paragraph', content: 'The workflow uses two packed textures instead of a more typical three-texture setup. The first texture stores Diffuse in RGB and Normal X in Alpha, while the second stores Metallic, Roughness, and Ambient Occlusion in RGB and Normal Y in Alpha, making it possible to preserve both surface colour and PBR response while compressing the normal map data into existing channels.' },
        {
            type: 'code', content:
`Texture A:
RGB = Diffuse
A   = Normal X

Texture B:
R   = Metallic
G   = Roughness
B   = Ambient Occlusion
A   = Normal Y`
        },

        { type: 'heading', content: 'Normal Reconstruction' },
        { type: 'paragraph', content: 'Because only the X and Y channels of the tangent-space normal are stored, the Z component is reconstructed directly in the shader. This uses the unit-length property of normal vectors, deriving the missing component with the Pythagorean relation so the final normal can still be used for standard lighting evaluation.' },
        {
            type: 'image',
            src: './assets/images/005_advPacking_nrml.png',
            alt: 'Advanced Texture Packing Material Graph'
        },
        {
            type: 'code', content:
`float2 normalXY = float2(InX, InY) * 2.0 - 1.0;
float normalZ = sqrt(saturate(1.0 - dot(normalXY, normalXY)));
return float3(normalXY, normalZ);`
        },

        { type: 'heading', content: 'Material Setup' },
        { type: 'paragraph', content: 'The material graph combines the packed channels into a compact shader input layout. Diffuse is passed into base color, the packed PBR channels are routed into metallic, roughness, and ambient occlusion, and the custom shader logic reconstructs the tangent-space normal before feeding it into the normal input, as shown in the attached node setup.' },

        { type: 'heading', content: 'Substance Export Preset' },
        { type: 'paragraph', content: 'To support the runtime shader layout, a custom export preset was created in Substance so textures could be authored and exported directly in the packed format. This removed repetitive manual channel packing work and ensured consistency between texture authoring and the in-engine shader implementation.' },

        { type: 'heading', content: 'Optimization Outcome' },
        { type: 'paragraph', content: 'The main goal of the workflow was to improve runtime efficiency by reducing texture memory use and simplifying sampling. By packing the data more aggressively and reconstructing the missing normal component in shader code, the material setup removed the need for one dedicated texture while lowering the overall sampling cost for the asset.' }
    ]
},
        
        {
    id: 7,
    category: ['3d'],
    title: 'Armor Bust - 3D Model/Texture/Render',
    shortDescription: 'A stylized character bust modeled and textured using ZBrush, Maya, and Substance 3D Painter.',
    fullDescription: 'A stylized character bust modeled and textured using ZBrush, Maya, and Substance 3D Painter. Rendered using Vray',

    thumbnail: './assets/images/006_model1_thumb.png',
    image: './assets/images/006_model1_thumb.png',

    technologies: 'ZBrush, Maya, Substance 3D Painter, 3D Modeling, Sculpting, Hard-Surface Modeling, Texturing',
    role: 'Artist',
    year: '2020',
    link: '#',

    contentBlocks: [
        { type: 'heading', content: 'Overview' },
        { type: 'paragraph', content: 'An old 3D asset I built. The goal was to create a compact but visually striking armored bust with strong shape language, readable panel structure, and a polished presentation render.' },

        {
            type: 'image',
            src: './assets/images/006_mod_1.png',
            alt: 'Stylized Sci-Fi Armor Bust'
        },
        {
            type: 'image',
            src: './assets/images/006_mod_2.png',
            alt: 'Stylized Sci-Fi Armor Bust'
        },
        {
            type: 'image',
            src: './assets/images/006_mod_3.png',
            alt: 'Stylized Sci-Fi Armor Bust'
        },

        { type: 'heading', content: 'Modeling' },
        { type: 'paragraph', content: 'The asset was developed through a workflow combining sculptural form exploration and controlled hard-surface cleanup. ZBrush was used to shape the overall design and refine major forms, while Maya was used to organize the model, clean supporting geometry, Unrwapping UVs, and prepare the asset for texturing.' },

        { type: 'heading', content: 'Texturing' },
        { type: 'paragraph', content: 'Substance 3D Painter was used for baking, texturing and exporting the final PBR maps.' },

        { type: 'heading', content: 'Rendering' },
        { type: 'paragraph', content: 'Rendered with the Vray rendering plugin in Maya' },
    ]
},
        {
            id: 8,
            category: ['3d'],
            title: 'Raullate Table - 3D Model/Texture/Render',
            shortDescription: 'A game-ready Raullate table modeled and textured using Maya, and Substance 3D Painter.',
            fullDescription: 'Another old 3D asset I built for Unity VR project. Modeled and textured using Maya, and Substance 3D Painter. Rendered using Vray for team presetation.',

            thumbnail: './assets/images/006_roullate_thumb.png',
            image: './assets/images/006_roullate_thumb.png',

            technologies: 'Maya, Substance 3D Painter, 3D Modeling, Sculpting, Hard-Surface Modeling, Texturing',
            role: 'Artist',
            year: '2020',
            link: '#',

            contentBlocks: [

                { type: 'heading', content: 'Overview' },
                {
                    type: 'image',
                    src: './assets/images/006_roullate_1.png',
                    alt: 'Raullate table1'
                },
                {
                    type: 'image',
                    src: './assets/images/006_roullate_2.png',
                    alt: 'Raullate table2'
                },
                {
                    type: 'image',
                    src: './assets/images/006_roullate_3.png',
                    alt: 'Raullate table3'
                },

                { type: 'heading', content: 'Modeling' },
                { type: 'paragraph', content: 'The model and UVs was developed in Maya and prepared the asset for texturing.' },

                { type: 'heading', content: 'Texturing' },
                { type: 'paragraph', content: 'Substance 3D Painter was used for baking, texturing and exporting the final PBR maps.' },

                { type: 'heading', content: 'Rendering' },
                { type: 'paragraph', content: 'Rendered with the Vray rendering plugin in Maya for presentation.' },
            ]
        },

        {
            id: 9,
            category: 'tools',
            title: 'Asset QA Tool for Maya and Blender',
            shortDescription: 'Streamlined batch export system for multiple 3D packages with validation.',
            fullDescription: 'Multi-DCC export pipeline supporting Maya, Blender, and 3DS Max. Features include automated file conversion, texture optimization, LOD generation, and integration with Perforce version control. Handles 100+ assets per batch with full logging and error reporting.',
            thumbnail: './assets/images/shadypady.png',
            image: 'https://via.placeholder.com/900x450/1a1a1a/4ecdc4?text=Batch+Export+Tool',
            technologies: 'Python, MEL, Blender Python API',
            role: 'Developer',
        },
        
        {
    id: 10,
    category: ['shaders'],
    title: 'Maya GLSL Mipmapping - UV Bleeding Debug Shader',
    shortDescription: 'A real-time GLSL debug shader for Maya Viewport 2.0 designed to expose potential UV bleeding and texture seam issues.',
    fullDescription: 'A real-time GLSL debug shader created for Maya Viewport 2.0 to help identify potential UV bleeding issues before final export or engine integration. The shader is designed for close-range texture inspection, exaggerating UV island boundaries, texel transitions, and edge conditions that can reveal mip bleed and padding problems. The goal was to build a lightweight artist-facing diagnostic material that could be assigned quickly during look development and asset validation, making it easier to catch texture layout problems early in the workflow.',

    thumbnail: './assets/images/008_mip_thumb.png',
    image: './assets/images/008_mip_thumb.png',

    technologies: 'GLSL, OGSFX, Maya Viewport 2.0',
    role: 'Author',
    year: '2023',
    link: '#',

    contentBlocks: [
        { type: 'heading', content: 'Key Features' },
        { type: 'paragraph', content: 'Real-time UV bleeding inspection in Maya Viewport 2.0 · Seam and padding visualization · Debug-focused GLSL shader workflow · Fast material assignment for asset validation · Useful during look development and export checks · Lightweight viewport diagnostic tool.' },

        {
            type: 'image',
            src: './assets/images/010_mipmappimg_demo.gif',
            alt: 'Maya GLSL UV Bleeding Debug Shader'
        },

        { type: 'heading', content: 'Purpose' },
        { type: 'paragraph', content: 'The shader was built as a diagnostic tool to reveal major UV bleading issues by forcing the miplevel using the GLSL function textureLod. This is especially useful for catching UV padding issues, seam contamination, and texture bleeding that can become visible in mip transitions.' },
        {
            type: 'code', content:
`color += textureLod(_MainTex, pure_sample_loc, mipLevel).rgb;`
        },

        { type: 'heading', content: 'Viewport Workflow' },
        { type: 'paragraph', content: 'The shader is intended to be assigned temporarily during asset review inside Maya, allowing the artist to move in close and inspect problematic areas interactively. This makes it useful as a quick validation pass between UV layout, texturing, and final export, without needing to rely only on offline inspection or downstream engine testing.' },

        { type: 'heading', content: 'Practical Use' },
        { type: 'paragraph', content: 'In production-style workflows, small UV padding problems often go unnoticed until lighting, mipmapping, or texture compression makes them visible. A dedicated debug shader helps surface those risks earlier, making it easier to decide whether an asset needs more padding, cleaner shell separation, or texture rebaking before it moves further down the pipeline.' },

    ]
},

    {
    id: 11,
    category: 'misc',
    title: 'The other side of the Universe - Unreal Cinematic Trailer',
    shortDescription: 'A cinematic trailer design project combining Unreal Engine, Maya, After Effects, and Premiere for scene design, animation, rendering, post, and final edit.',
    fullDescription: 'I’ve always been captivated by cinematic game trailers—especially those from Assassin’s Creed—so I set out to create my own, built around an original imaginative story. This project explores cinematic staging, mood, and visual storytelling through a real-time production pipeline. The trailer was developed using a hybrid DCC workflow: scene setup and set design in Unreal Engine, animation in Maya, and final lighting, FX, simulation, shaders, and rendering in Unreal. Rendered passes were refined in After Effects, with sound design and final editing completed in Premiere, resulting in a fully polished presentation piece.',

    thumbnail: './assets/images/011_trailer_thumb.png',
    image: './assets/images/011_trailer_thumb.png',

    technologies: 'Unreal Engine 5, Maya, Sequencer, Niagara, Material Graph, After Effects, Premiere Pro, Movie Render Queue',
    role: 'Author',
    year: '2022',
    link: '#',

    contentBlocks: [
        {
            type: 'heading',
            content: 'Trailer'
        },
        {
            type: 'video',
            url: 'https://www.youtube.com/watch?v=0eoprp_G71g/',
            embedSrc: 'https://www.youtube.com/embed/0eoprp_G71g',
            caption: 'Full Trailer'
        },
        { type: 'heading', content: 'Workflow' },
        { type: 'code', content: ' · Scene setup and set design done in Unreal Engine\n · Rig and Animation done in Maya\n · Lighting, FX, simulations, shaders, and rendering done in Unreal Engine\n · Compositing and some post effects done in After Effects\n · Sound design and editing done in Premiere\n' },
        {
            type: 'heading',
            content: 'Production Pipeline'
        },
        {
            type: 'paragraph',
            content: 'The production pipeline used Unreal Engine as the main hub for scene building, visual development, and final rendering, while Maya supported animation creation outside the engine. This setup allowed the project to combine the flexibility of DCC animation workflows with the speed and visual control of real-time cinematic rendering.'
        },
        {
            type: 'heading',
            content: 'Lighting & Final Look'
        },
        {
            type: 'paragraph',
            content: 'Lighting, shader work, FX, and simulation passes were developed directly inside Unreal Engine to shape the final visual tone of the trailer. This made it possible to unify the scene look and rendering workflow in one environment before sending the output into post-production for finishing touches.'
        },
        {
            type: 'heading',
            content: 'Post Production'
        },
        {
            type: 'paragraph',
            content: 'After rendering, the trailer was taken into After Effects for compositing and additional post-processing, then into Premiere for sound design, timing, and final editorial assembly. This final stage helped bring together the rendered visuals, motion pacing, and audio treatment into a complete cinematic presentation.'
        },
        {type: 'heading', content: 'Credits'},
 
            { type: 'code', content: ' · Dary Palasky - Character 3D Model\n · Must Save Jane - Watch Me Burn (Music)\n · Replica Studios - Generated Voice\n · MOHAMEDHUSSIEN - Hull Spaceship 3D Model\n' },
    ]
},
    {
    id: 12,
    category: ['misc'],
    title: 'Unreal Arch Viz - Interior Visualization',
    shortDescription: 'An architectural visualization project built with AutoCAD, 3ds Max, and Unreal Engine, combining layout planning, environment assembly, material development, cinematic cameras, and final rendering in real time.',
    fullDescription: 'A real-time architectural visualization project focused on building and presenting an interior space through a connected DCC-to-engine workflow. The production pipeline began with a 2D floor layout in AutoCAD, followed by environment modeling in 3ds Max, scene transfer through Unreal-Max Live Link, and final look development inside Unreal Engine. Materials, camera animation, lighting, and final rendering were all handled in-engine, using Lumen for dynamic global illumination and Movie Render Queue for polished output.',

    thumbnail: './assets/images/012/012_thumb.png',
    image: './assets/images/012/012_thumb.png',

    technologies: 'Unreal Engine, 3ds Max, AutoCAD, Lumen, Movie Render Queue, Live Link, ArchViz',
    role: 'Artist',
    year: '2023',
    link: '#',

    contentBlocks: [
        { type: 'heading', content: 'Workflow' },
        { type: 'code', content: ' · 2D Layout made in AutoCAD\n · Layout modeled in 3ds Max\n · 3D furniture assets downloaded from the internet\n · Scene connected through Unreal-Max Live Link\n · All materials and camera animation done in Unreal\n · Lighting and rendering done using Lumen and Movie Render Queue.\n' },

            {
                type: 'video',
                url: 'https://youtu.be/PUH7ts2_0bs?si=xWCjyrP6163od89v',
                embedSrc: 'https://www.youtube.com/embed/PUH7ts2_0bs?si=yUaHHdclxVp3h0mL',
                caption: 'Full Unreal Arch Viz'
            },
        { type: 'heading', content: 'Pipeline and detailed overview' },
        { type: 'paragraph', content: 'The project workflow began with a 2D architectural plan and continued through modeling, scene assembly, and final rendering across connected tools. Live Link supported a flexible iteration process between 3ds Max and Unreal, while Unreal Engine handled the final materials, camera animation, lighting, and rendering within a unified real-time presentation pipeline.' },

        {
            type: 'image',
            src: './assets/images/012/4BHK_Detailed Overview 1 of 13.png',
            alt: 'Raullate table3'
        },
        {
            type: 'image',
            src: './assets/images/012/4BHK_Detailed Overview 2 of 13.png',
            alt: 'Raullate table3'
        },
        {
            type: 'image',
            src: './assets/images/012/4BHK_Detailed Overview 3 of 13.png',
            alt: 'Raullate table3'
        },
        {
            type: 'image',
            src: './assets/images/012/4BHK_Detailed Overview 4 of 13.png',
            alt: 'Raullate table3'
        },
        {
            type: 'image',
            src: './assets/images/012/4BHK_Detailed Overview 5 of 13.png',
            alt: 'Raullate table3'
        },
        {
            type: 'image',
            src: './assets/images/012/4BHK_Detailed Overview 6 of 13.png',
            alt: 'Raullate table3'
        },
        {
            type: 'image',
            src: './assets/images/012/4BHK_Detailed Overview 7 of 13.png',
            alt: 'Raullate table3'
        },
        {
            type: 'image',
            src: './assets/images/012/4BHK_Detailed Overview 8 of 13.png',
            alt: 'Raullate table3'
        },
        {
            type: 'image',
            src: './assets/images/012/4BHK_Detailed Overview 9 of 13.png',
            alt: 'Raullate table3'
        },
        {
            type: 'image',
            src: './assets/images/012/4BHK_Detailed Overview 10 of 13.png',
            alt: 'Raullate table3'
        },
        {
            type: 'image',
            src: './assets/images/012/4BHK_Detailed Overview 11 of 13.png',
            alt: 'Raullate table3'
        },
        {
            type: 'image',
            src: './assets/images/012/4BHK_Detailed Overview 12 of 13.png',
            alt: 'Raullate table3'
        },
        {
            type: 'image',
            src: './assets/images/012/4BHK_Detailed Overview 12 of 13.png',
            alt: 'Raullate table3'
        }
    ]
}
];
