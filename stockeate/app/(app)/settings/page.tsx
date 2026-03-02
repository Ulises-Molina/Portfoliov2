import ThemeSelector from "@/components/settings/theme-selector"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

function SettingsPage() {
  return (
    <div className="space-y-6">
      <Card className="animate-in fade-in slide-in-from-bottom-2 duration-500">
        <CardHeader>
          <CardTitle>Tema visual</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <ThemeSelector />
        </CardContent>
      </Card>
    </div>
  )
}

export default SettingsPage
