import { Card, CardHeader, CardTitle, CardContent } from '../ui/Card';
import { Anchor, ShieldCheck, AlertCircle, MapPin, CheckCircle2 } from 'lucide-react';
import { mockSafetyData } from '../../data/mockSafetyData';

export const BoundaryGeofence = () => {
  const { boundaryInfo } = mockSafetyData;

  return (
    <Card className="h-full flex flex-col group border-white/5 relative overflow-hidden glass-card">
      <CardHeader className="pb-3 border-b border-white/5 bg-[#1C1B2B]/40 flex flex-row items-center justify-between">
        <CardTitle className="text-sm font-semibold flex items-center gap-2 uppercase tracking-widest text-bio-mint">
          <Anchor className="h-4 w-4" />
          MARITIME BOUNDARY & GEOFENCE SURVEILLANCE
        </CardTitle>
        <span className="text-[10px] font-bold text-bio-mint font-mono bg-bio-mint/10 border border-bio-mint/30 px-2 py-0.5 rounded">
          {boundaryInfo.geofenceState}
        </span>
      </CardHeader>

      <CardContent className="p-5 flex-1 flex flex-col justify-between gap-4">
        {/* Distance to IMBL Highlight Box */}
        <div className="bg-white/5 border border-white/10 rounded-xl p-3.5 flex items-center justify-between">
          <div>
            <span className="text-[9px] font-bold text-cool-gray uppercase tracking-widest block">
              Distance to International Maritime Boundary (IMBL)
            </span>
            <div className="flex items-baseline gap-2 mt-1">
              <span className="text-3xl font-bold font-mono text-soft-white">{boundaryInfo.imblDistance}</span>
              <span className="text-xs text-bio-mint font-bold uppercase">(34.1 km)</span>
            </div>
          </div>
          <span className="text-xs font-bold text-bio-mint font-mono bg-bio-mint/15 border border-bio-mint/30 px-2.5 py-1 rounded-lg">
            {boundaryInfo.imblStatus}
          </span>
        </div>

        {/* Spatial Geofence Zones List */}
        <div className="space-y-2 text-xs">
          <div className="bg-[#0B0B12] border border-white/5 p-2.5 rounded-lg flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-solar-amber"></span>
              <div>
                <span className="font-bold text-soft-white block">{boundaryInfo.restrictedZoneName}</span>
                <span className="text-[10px] text-cool-gray">Restricted Military/Coast Guard Zone</span>
              </div>
            </div>
            <span className="font-mono text-solar-amber font-bold">{boundaryInfo.restrictedZoneDist}</span>
          </div>

          <div className="bg-[#0B0B12] border border-white/5 p-2.5 rounded-lg flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-bio-mint"></span>
              <div>
                <span className="font-bold text-soft-white block">{boundaryInfo.mpaName}</span>
                <span className="text-[10px] text-cool-gray">Ecological Marine Protected Sanctuary</span>
              </div>
            </div>
            <span className="font-mono text-bio-mint font-bold">{boundaryInfo.mpaDist}</span>
          </div>
        </div>

        {/* Geofence Status Disclaimer */}
        <div className="flex items-center gap-2 text-[11px] text-cool-gray border-t border-white/5 pt-2">
          <CheckCircle2 className="w-4 h-4 text-bio-mint shrink-0" />
          <span>{boundaryInfo.geofenceAlert}</span>
        </div>
      </CardContent>
    </Card>
  );
};
