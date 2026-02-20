import React, { useState } from "react";
import { base44 } from "@/api/base44Client";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Globe, Settings, Check } from "lucide-react";
import { getRegionConfig, formatCurrency } from "../utils/localization";

const regions = [
  { code: 'US', name: 'United States', flag: '🇺🇸' },
  { code: 'EU', name: 'European Union', flag: '🇪🇺' },
  { code: 'UK', name: 'United Kingdom', flag: '🇬🇧' },
  { code: 'JP', name: 'Japan', flag: '🇯🇵' },
  { code: 'CA', name: 'Canada', flag: '🇨🇦' },
  { code: 'AU', name: 'Australia', flag: '🇦🇺' },
  { code: 'IN', name: 'India', flag: '🇮🇳' },
  { code: 'CN', name: 'China', flag: '🇨🇳' },
  { code: 'BR', name: 'Brazil', flag: '🇧🇷' },
  { code: 'MX', name: 'Mexico', flag: '🇲🇽' },
  { code: 'ZA', name: 'South Africa', flag: '🇿🇦' }
];

export default function RegionSelector({ user, onUpdate }) {
  const [selectedRegion, setSelectedRegion] = useState(user?.region || 'US');
  const [saving, setSaving] = useState(false);

  const handleSave = async () => {
    setSaving(true);
    try {
      const config = getRegionConfig(selectedRegion);
      await base44.auth.updateMe({
        region: selectedRegion,
        preferred_currency: config.currency,
        language: config.language,
        timezone: config.timezone,
        date_format: config.dateFormat,
        number_format: config.numberFormat
      });
      onUpdate?.();
      window.location.reload(); // Reload to apply changes
    } catch (error) {
      console.error("Error updating region:", error);
    } finally {
      setSaving(false);
    }
  };

  const selectedConfig = getRegionConfig(selectedRegion);
  const currentConfig = getRegionConfig(user?.region || 'US');

  return (
    <Card className="border-0 shadow-lg">
      <CardHeader className="bg-charcoal text-cream rounded-t-lg">
        <CardTitle className="flex items-center gap-2">
          <Globe className="w-5 h-5" />
          Regional Settings
        </CardTitle>
      </CardHeader>
      <CardContent className="p-6">
        <div className="space-y-6">
          <div className="space-y-2">
            <label className="text-sm font-medium text-charcoal">Select Your Region</label>
            <Select value={selectedRegion} onValueChange={setSelectedRegion}>
              <SelectTrigger className="bg-white border-tan">
                <SelectValue placeholder="Choose region" />
              </SelectTrigger>
              <SelectContent>
                {regions.map((region) => (
                  <SelectItem key={region.code} value={region.code}>
                    <div className="flex items-center gap-2">
                      <span className="text-lg">{region.flag}</span>
                      <span>{region.name}</span>
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Preview */}
          <div className="bg-cream/50 p-4 rounded-lg border border-tan">
            <h4 className="font-semibold text-charcoal mb-3">Preview Settings</h4>
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <span className="text-slate-600">Currency:</span>
                <Badge className="ml-2 bg-gold text-charcoal">
                  {selectedConfig.currencySymbol} {selectedConfig.currency}
                </Badge>
              </div>
              <div>
                <span className="text-slate-600">Date Format:</span>
                <Badge className="ml-2 bg-tan text-white">
                  {selectedConfig.dateFormat}
                </Badge>
              </div>
              <div>
                <span className="text-slate-600">Number Format:</span>
                <Badge className="ml-2 bg-charcoal text-cream">
                  {selectedConfig.numberFormat}
                </Badge>
              </div>
              <div>
                <span className="text-slate-600">Timezone:</span>
                <Badge className="ml-2" variant="outline">
                  {selectedConfig.timezone}
                </Badge>
              </div>
            </div>
            
            <div className="mt-4 p-3 bg-white rounded border">
              <p className="text-sm text-slate-600 mb-1">Sample Display:</p>
              <p className="font-semibold">
                {formatCurrency(1234.56, { region: selectedRegion })} • 
                {selectedConfig.dateFormat === 'MM/DD/YYYY' ? ' 01/15/2025' : 
                 selectedConfig.dateFormat === 'DD/MM/YYYY' ? ' 15/01/2025' : 
                 ' 2025-01-15'}
              </p>
            </div>
          </div>

          {/* Current vs New */}
          {selectedRegion !== (user?.region || 'US') && (
            <div className="bg-gradient-to-r from-tan/10 to-gold/10 p-4 rounded-lg border border-gold/30">
              <div className="flex items-center gap-2 mb-2">
                <Settings className="w-4 h-4 text-tan" />
                <span className="font-medium text-charcoal">Changes</span>
              </div>
              <div className="text-sm space-y-1">
                <p>
                  <span className="text-slate-600">Currency:</span>
                  <span className="ml-2 line-through text-slate-400">{currentConfig.currencySymbol} {currentConfig.currency}</span>
                  <span className="ml-2 text-gold font-medium">→ {selectedConfig.currencySymbol} {selectedConfig.currency}</span>
                </p>
                <p>
                  <span className="text-slate-600">Date Format:</span>
                  <span className="ml-2 line-through text-slate-400">{currentConfig.dateFormat}</span>
                  <span className="ml-2 text-gold font-medium">→ {selectedConfig.dateFormat}</span>
                </p>
              </div>
            </div>
          )}

          <div className="flex justify-end gap-3">
            <Button
              onClick={handleSave}
              disabled={saving || selectedRegion === (user?.region || 'US')}
              className="bg-gold text-charcoal hover:bg-gold/90"
            >
              {saving ? (
                <>
                  <div className="w-4 h-4 border-2 border-charcoal/30 border-t-charcoal rounded-full animate-spin mr-2"></div>
                  Applying...
                </>
              ) : (
                <>
                  <Check className="w-4 h-4 mr-2" />
                  Apply Settings
                </>
              )}
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}