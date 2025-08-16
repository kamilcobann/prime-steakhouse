"use client"
import { useEffect } from "react"

export default function GTranslate() {
  useEffect(() => {
    // Script'i oluştur
    const script = document.createElement("script")
    script.src = "https://cdn.gtranslate.net/widgets/latest/float.js"
    script.defer = true

    // Script yüklendiğinde ayarları ata
    script.onload = () => {
      ;(window as any).gtranslateSettings = {
        default_language: "tr",
        detect_browser_language: true,
        languages: ["tr", "en"],
        wrapper_selector: ".gtranslate_wrapper",
        switcher_horizontal_position: "inline",
        float_switcher_open_direction: "bottom",
      }
    }

    document.body.appendChild(script)

    return () => {
      document.body.removeChild(script)
    }
  }, [])

  return <div className="gtranslate_wrapper"></div>
}
