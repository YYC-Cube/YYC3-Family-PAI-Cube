/**
 * file i18n.ts
 * description yyc3 i18n 子命令组 — init / extract / audit
 * module @yyc3/cli
 * author YanYuCloudCube Team <admin@0379.email>
 * version 1.0.0
 * created 2026-07-15
 * updated 2026-07-15
 * status active
 * tags [cli],[i18n],[command]
 *
 * copyright YanYuCloudCube Team
 * license MIT
 *
 * brief i18n 国际化管理工具 — 初始化、键提取、覆盖率审计
 */

import { promises as fs } from "fs"
import path from "path"
import { Command } from "commander"
import { handleError } from "../utils/handle-error"
import { highlighter } from "../utils/highlighter"
import { logger } from "../utils/logger"
import { glob } from "glob"

export const i18n = new Command()
  .name("i18n")
  .description("🌐 i18n 国际化管理工具 — init / extract / audit")

// ─── yyc3 i18n init ────────────────────────────────────────────
i18n
  .command("init")
  .description("初始化 i18n 配置 — 创建 locales/ + 引擎配置文件")
  .argument("[path]", "项目路径", ".")
  .option("-l, --locales <locales>", "支持的语言 (逗号分隔)", "en,zh-CN")
  .option("--react", "同时安装 React 组件包", false)
  .action(async (projectPath: string, options) => {
    try {
      const targetDir = path.resolve(projectPath)
      const localesDir = path.join(targetDir, "src", "locales")
      const locales = options.locales
        .split(",")
        .map((l: string) => l.trim())

      logger.info(`🌐 初始化 i18n (语言: ${locales.join(", ")})...`)

      await fs.mkdir(localesDir, { recursive: true })

      for (const locale of locales) {
        const filePath = path.join(localesDir, `${locale}.json`)
        const isEn = locale === "en"
        const isZh = locale.startsWith("zh")
        const content = {
          common: {
            welcome: isEn ? "Welcome" : isZh ? "欢迎" : "Welcome",
            save: isEn ? "Save" : isZh ? "保存" : "Save",
            cancel: isEn ? "Cancel" : isZh ? "取消" : "Cancel",
          },
          nav: {
            home: isEn ? "Home" : isZh ? "首页" : "Home",
            settings: isEn ? "Settings" : isZh ? "设置" : "Settings",
          },
        }

        try {
          await fs.access(filePath)
          logger.log(`   ⏭️  ${locale}.json 已存在，跳过`)
        } catch {
          await fs.writeFile(filePath, JSON.stringify(content, null, 2) + "\n")
          logger.log(`   ✅ 创建 ${locale}.json`)
        }
      }

      // 生成引擎配置文件
      const configPath = path.join(targetDir, "src", "lib", "i18n.ts")
      await fs.mkdir(path.dirname(configPath), { recursive: true })

      const configContent = `/**\n * i18n 配置 — 由 yyc3 i18n init 生成\n * 文档: https://github.com/YanYuCloudCube/YYC3-i18n-Core\n */\nimport { I18nEngine } from '@yyc3/i18n-core';\n\nexport const i18nEngine = new I18nEngine({\n  locale: '${locales[0]}',\n  fallbackLocale: '${locales[0]}',\n});\n\nexport const supportedLocales = ${JSON.stringify(locales, null, 2)};\n`

      await fs.writeFile(configPath, configContent)
      logger.log(`   ✅ 创建 src/lib/i18n.ts`)

      logger.break()
      logger.success("i18n 初始化完成！")
      logger.log("   安装依赖: pnpm add @yyc3/i18n-core")
      if (options.react) {
        logger.log("   React 集成: pnpm add @yyc3/i18n-react")
      }
      logger.log(`   MCP Server: 详见 ${highlighter.info("@yyc3/i18n-core/mcp")}`)
    } catch (error) {
      handleError(error)
    }
  })

// ─── yyc3 i18n extract ─────────────────────────────────────────
i18n
  .command("extract")
  .description("从源码提取翻译键 (匹配 t() 调用)")
  .argument("[source]", "源码 glob 模式", "src/**/*.{ts,tsx}")
  .option("-o, --output <file>", "输出文件路径", "locales/extracted-keys.json")
  .action(async (source: string, options) => {
    try {
      const files = await glob(source.replace(/["']/g, ""), {
        ignore: ["node_modules/**", "dist/**", "coverage/**"],
      })

      const keys = new Set<string>()
      // 匹配 t('key') / t("key") / t(`key`) 调用
      const keyPattern = /\bt\(\s*['"`]([^'"`]+)['"`]/g

      for (const file of files) {
        try {
          const content = await fs.readFile(file, "utf8")
          let match: RegExpExecArray | null
          while ((match = keyPattern.exec(content)) !== null) {
            keys.add(match[1])
          }
        } catch {
          // skip binary files
        }
      }

      const sortedKeys = [...keys].sort()
      const output = options.output
      await fs.mkdir(path.dirname(output), { recursive: true }).catch(() => {})
      await fs.writeFile(
        output,
        JSON.stringify({ keys: sortedKeys }, null, 2),
      )

      logger.break()
      logger.success(`提取了 ${sortedKeys.length} 个翻译键 → ${output}`)
      if (sortedKeys.length > 0 && sortedKeys.length <= 30) {
        logger.log("   键列表:")
        for (const k of sortedKeys) {
          logger.log(`     • ${k}`)
        }
      }
    } catch (error) {
      handleError(error)
    }
  })

// ─── yyc3 i18n audit ───────────────────────────────────────────
i18n
  .command("audit")
  .description("审计翻译覆盖率 — 缺失键 / 多余键")
  .argument("[dir]", "语言文件目录", "src/locales")
  .option("-o, --output <file>", "报告输出路径 (JSON)")
  .action(async (dir: string, options) => {
    try {
      const targetDir = path.resolve(dir)
      let files: string[]
      try {
        files = await fs.readdir(targetDir)
      } catch {
        logger.error(`找不到语言目录: ${targetDir}`)
        process.exit(1)
      }

      const localeFiles = files.filter((f) => f.endsWith(".json"))
      if (localeFiles.length === 0) {
        logger.error(`语言目录中没有 .json 文件: ${targetDir}`)
        process.exit(1)
      }

      const localeData: Record<string, Record<string, unknown>> = {}
      for (const file of localeFiles) {
        const content = JSON.parse(
          await fs.readFile(path.join(targetDir, file), "utf8"),
        )
        localeData[file.replace(".json", "")] = content
      }

      const flatLocales: Record<string, Record<string, unknown>> = {}
      for (const [locale, data] of Object.entries(localeData)) {
        flatLocales[locale] = flattenKeys(data)
      }

      const baseLocale = Object.keys(flatLocales)[0]
      const baseKeys = Object.keys(flatLocales[baseLocale])

      logger.break()
      logger.info(
        `📊 i18n 覆盖率审计 (基准: ${baseLocale}, ${baseKeys.length} 键)`,
      )
      logger.log("─".repeat(60))

      const report: Record<string, unknown> = {}
      for (const [locale, data] of Object.entries(flatLocales)) {
        const localeKeys = Object.keys(data)
        const missing = baseKeys.filter((k) => !(k in data))
        const extra = localeKeys.filter((k) => !(k in baseKeys))
        const coverage =
          baseKeys.length > 0
            ? (
                ((baseKeys.length - missing.length) / baseKeys.length) *
                100
              ).toFixed(1)
            : "100.0"

        const status =
          parseFloat(coverage) === 100
            ? "✅"
            : parseFloat(coverage) >= 80
              ? "⚠️"
              : "🔴"
        logger.log(
          `  ${status} ${locale.padEnd(10)} ${coverage}% (${localeKeys.length}键, ${missing.length}缺失)`,
        )

        report[locale] = {
          coverage: parseFloat(coverage),
          missing,
          extra,
        }
      }

      if (options.output) {
        await fs.writeFile(
          options.output,
          JSON.stringify(report, null, 2),
        )
        logger.break()
        logger.log(`📄 报告已保存到 ${options.output}`)
      }
    } catch (error) {
      handleError(error)
    }
  })

// ─── helpers ───────────────────────────────────────────────────

function flattenKeys(
  obj: Record<string, unknown>,
  prefix = "",
): Record<string, unknown> {
  const result: Record<string, unknown> = {}
  for (const [k, v] of Object.entries(obj)) {
    const key = prefix ? `${prefix}.${k}` : k
    if (typeof v === "object" && v !== null) {
      Object.assign(result, flattenKeys(v as Record<string, unknown>, key))
    } else {
      result[key] = v
    }
  }
  return result
}
